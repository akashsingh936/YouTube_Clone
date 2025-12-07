const User = require('../Modals/user');
const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');


  const cookieOptions ={
    httpOnly: true,
    secure: false, //set t true in production
    sameSite: 'Lax'
  }

exports.signUp = async (req, res) => {
    try {
        const { channelName, userName, about, profilePic, password } = req.body;
        const isExist = await User.findOne({ userName });
        // console.log("in sign up", channelName, userName, about, profilePic, password)
        if (isExist) {
            res.status(400).json({ error: "Username already exist please try with other UserName" })
        } else {
            let updatedPass = await bcrypt.hash(password, 10)
            const newUser = new User({ channelName, userName, about, profilePic, password: updatedPass });
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully', success: "yes", data: newUser });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.signIn = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        if (user && await bcrypt.compare(password, user.password)) {

             const token = jwt.sign({userId: user._id}, 'Its_My_Secret_Key' );
             res.cookie('token', token, cookieOptions)
             console.log(token);
            res.json({ message: 'Logged in successfully', success: "true",token,user });
        } else {
            res.status(400).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });

    }
}



exports.logout = async(req,res)=>{
    res.clearCookie('token', cookieOptions).json({ message: 'Logged out successfully' });
}