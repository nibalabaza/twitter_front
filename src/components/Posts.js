import React, {useState} from 'react'
import { FaRegComment, FaUndoAlt, FaRegHeart, FaArrowUp } from "react-icons/fa"
import AddComment from './AddComment';


const Posts = (props) => {

const [AreCommentsVisible, setAreCommentsVisible] = useState(false)
    return (
        <div className="posts">
            <div className="post__header">
                <div className="post__avator">
                    <img src="/assets/nibal.png" alt="avator" />
                </div>
                <div className="post__name">
                    Nibal ABAZA
                </div>
                <div className="post__username">
                   
                </div>
                <div className="post__time">
                    {props.date_post}
                </div>
            </div>
            {/* Close post__header */}
            <div className="post__body">
                <div className="post__text">
                    {props.content_post}
                </div>
                <div className="post__image">
                    {/* <img src="/assets/baby.png" alt="post" width="100" height="200"/> */}
                    {/* {props.img_post !== "null" && props.img_post !== "undefined" ? */}
                    {props.img_post ?
                    <img src={`http://localhost:3001/${props.img_post}`} alt="post"/> :
                    null
                    }   
                </div>
                <div className="post__comments">
                    <FaRegComment onClick={()=>setAreCommentsVisible(!AreCommentsVisible)}/>
                    <span><FaUndoAlt /> 34</span>
                    <span><FaRegHeart /> 430</span>
                    <FaArrowUp />
                </div>
                {props.comments && AreCommentsVisible ? props.comments.map((comment)=>{ //if the state is true, disply the comment
                    return <p>{comment.content}</p>
                }) : null
                }

                {AreCommentsVisible ? <AddComment onCommentUpload={props.onCommentUpload} id_post={props.id_post}/> : null} 
                {/* // we pass the props that we passed in (post component(this props references the function we created to add comment )) */}
            

            </div>
        </div>
    )
}

export default Posts
