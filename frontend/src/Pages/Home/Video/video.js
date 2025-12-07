import React, { useState, useEffect } from 'react'
import './video.css';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import { Link, useParams } from 'react-router-dom';
import { useparams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { BASE_URL } from '../../../App';
// import { getCommentByVideoId } from '../../../../../Controllers/comment';
const Video = () => {
    const [message, setMessage] = useState("");

    const [data, setData] = useState(null);
    const [videoUrl, setVideoUrl] = useState("");
    const { id } = useParams();
    const [comments, setComments] = useState([]);


    const fetchVideoById = async () => {
        await axios.get(`${BASE_URL}/api/getVideoById/${id}`).then((response) => {
            console.log(response);
            setData(response.data.video);
            setVideoUrl(response.data?.video?.videoLink);
        }).catch(error => {
            console.log(error);
        })
    }


    const getCommentByVideoId = async () => {
        try {
            await axios.get(`${BASE_URL}/commentApi/comment/${id}`)
                .then((response) => {
                    console.log(response);
                    setComments(response.data.comments)
                }).catch(error => {
                    console.log(error);
                })
        }
        catch (error) {
            console.log("Error", error.message)
        }
    }
    useEffect(() => {
        fetchVideoById();
        getCommentByVideoId();
    }, [])
    console.log(message);

    const handleComment = async () => {
        const body = {
            "message": message,
            "video": id
        }
        await axios.post(`${BASE_URL}/commentApi/comment`, body, { withCredentials: true }).then((response) => {
            console.log(response)
            const newComment = response.data.comment;
            setComments([...comments, newComment])
            setMessage(" ")
        }).catch(error => {
            toast.error("please Login First to comment")
            console.log(error)
        })
    }
    return (
        <div className='video'>
            <div className='videoPostSection'>
                <div className='video_youtube'>
                    {data && <video width="400" height="400" controls autoPlay className='video_youtube_video'>

                        <source src={videoUrl} type="video/mp4" />
                        <source src={videoUrl} type="video/webm" />

                        Your Browser does not support the video tag.
                    </video>}

                </div>
                <div className='video_youtubeAbout'>
                    <div className='video_uTubeTitle'>{data?.title}</div>
                    <div className='youtube_video_ProfileBlock'>
                        <div className='youtube_video_ProfileBlock_left'>
                            <Link to={`/user/${data?.user?._id}`} className='youtube_video_ProfileBlock_left_img'>
                                <img className='youtube_video_ProfileBlock_left_image' alt="" src={data?.user?.profilePic} />
                            </Link>
                            <div className='  youtubeVideo_subsView'>
                                <div className='youtubePostProfileName'> {data?.user?.channelName} </div>
                                <div className='youtubePostProfileSubs'> {data?.user?.createdAt.slice(0, 10)}</div>

                            </div>
                            <div className=' subscribeBtnYoutube'>Subssribe</div>

                        </div>

                        <div className='youtube_video_likeBlock'>
                            <div className='youtube_video_likeBlock_Like'>
                                <ThumbUpOutlinedIcon />
                                <div className='youtube_video_likeBlock_NoOfLikes'>{data?.like}</div>
                            </div>
                            <div className='youtubeVideoDivider'></div>

                            <div className='youtube_video_likeBlock_Like'>
                                < ThumbDownOutlinedIcon />

                            </div>

                        </div>


                    </div>

                    <div className='youtube_video_About'>
                        <div>{data?.createdAt.slice(0, 10)}</div>
                        <div>{data?.description}</div>
                    </div>
                </div>

                <div className='youtubeCommentSection'>
                    <div className='youtubeCommentSectionTitle'>{comments.length} Comment</div>

                    <div className=' youtubeSelfComment'>
                        <img className=' video_youtubeSelfCommentProfile' src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" />
                        <div className='addAComment'>
                            <input type="text" value={message} onChange={(e) => { setMessage(e.target.value) }} className='addAcommentInput' placeholder="add a comment" />
                            <div className=' cancelSubmitComment'>
                                <div className='cancelComment'>Cancel</div>
                                <div className='cancelComment' onClick={handleComment}>Comment</div>
                            </div>
                        </div>
                    </div>

                    <div className='youtubeOthersComments'>

                        {
                            comments.map((item, index) => {
                                return (
                                    <div className='youtubeSelfComment'>
                                        <img className=' video_youtubeSelfCommentProfile' src={item?.user?.profilePic} />
                                        <div className='others_commentSection'>
                                            <div className=' others_commentSectionHeader'>
                                                <div className='channelName_comment'>{item?.user?.channelName}</div>
                                                <div className='commentTimingOhters'>{item?.createdAt.slice(0, 10)}</div>
                                            </div>

                                            <div className='otherCommentSectionComment'>
                                                {item?.message}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }


                    </div>

                </div>
            </div>

            <div className='videoSuggestions'>

                <div className='videoSuggestionsBlock'>
                    <div className='video_suggetion_thumbnail'>
                        <img src="https://images.unsplash.com/photo-1431576901776-e539bd916ba2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=871" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className='video_suggetions_About'>
                        <div className='video_suggetions_About_title'>IPL Final CSK VS GT 2023 Batting Shivam Dubey #cricket #CSK</div>
                        <div className='video_suggetions_About_Profile'>Cricket 777</div>
                        <div className='video_suggetions_About_Profikle'>136K Views . 1 day ago</div>
                    </div>
                </div>


                <div className='videoSuggestionsBlock'>
                    <div className='video_suggetion_thumbnail'>
                        <img src="https://plus.unsplash.com/premium_photo-1661943659036-aa040d92ee64?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className='video_suggetions_About'>
                        <div className='video_suggetions_About_title'>IPL Final CSK VS GT 2023 Batting Shivam Dubey #cricket #CSK</div>
                        <div className='video_suggetions_About_Profile'>Cricket 777</div>
                        <div className='video_suggetions_About_Profikle'>136K Views . 1 day ago</div>
                    </div>
                </div>
                <div className='videoSuggestionsBlock'>
                    <div className='video_suggetion_thumbnail'>
                        <img src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className='video_suggetions_About'>
                        <div className='video_suggetions_About_title'>IPL Final CSK VS GT 2023 Batting Shivam Dubey #cricket #CSK</div>
                        <div className='video_suggetions_About_Profile'>Cricket 777</div>
                        <div className='video_suggetions_About_Profikle'>136K Views . 1 day ago</div>
                    </div>
                </div>


                <div className='videoSuggestionsBlock'>
                    <div className='video_suggetion_thumbnail'>
                        <img src="https://plus.unsplash.com/premium_photo-1734543932679-3857ac2a4d11?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=871" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className='video_suggetions_About'>
                        <div className='video_suggetions_About_title'>IPL Final CSK VS GT 2023 Batting Shivam Dubey #cricket #CSK</div>
                        <div className='video_suggetions_About_Profile'>Cricket 777</div>
                        <div className='video_suggetions_About_Profikle'>136K Views . 1 day ago</div>
                    </div>
                </div>

                <div className='videoSuggestionsBlock'>
                    <div className='video_suggetion_thumbnail'>
                        <img src="https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=844" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className='video_suggetions_About'>
                        <div className='video_suggetions_About_title'>IPL Final CSK VS GT 2023 Batting Shivam Dubey #cricket #CSK</div>
                        <div className='video_suggetions_About_Profile'>Cricket 777</div>
                        <div className='video_suggetions_About_Profikle'>136K Views . 1 day ago</div>
                    </div>
                </div>


                <div className='videoSuggestionsBlock'>
                    <div className='video_suggetion_thumbnail'>
                        <img src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774" alt="" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className='video_suggetions_About'>
                        <div className='video_suggetions_About_title'>IPL Final CSK VS GT 2023 Batting Shivam Dubey #cricket #CSK</div>
                        <div className='video_suggetions_About_Profile'>Cricket 777</div>
                        <div className='video_suggetions_About_Profikle'>136K Views . 1 day ago</div>
                    </div>
                </div>

            </div>
            <ToastContainer />
        </div>
    )
}

export default Video;

