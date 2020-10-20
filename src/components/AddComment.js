import React, { useEffect, useState} from 'react';
import Axios from 'axios';

const AddComment = (props) => {
const [commentContent, setCommentContent] = useState("")

const submitComment = () => {
      Axios.post(`http://localhost:3001/post/${props.id_post}/comments`,
        {content : commentContent,
         IdPost : props.idPost} //what we send to backend
        ,{ headers: { 
          Authorization:"Bearer " + window.localStorage.getItem("jwt")
        }})
        .then((response) => {
          
          console.log("addComment response", response);
          props.onCommentUpload(response.data)//the reponse of the server contains the new comment created
      }).then(()=>{
        
        
      })
  }

    return (
        <div className="twittes">
            <div className="postForm__bottom">
                <div className="btnSection">
                    <input type="text" onChange={(event)=> setCommentContent(event.target.value)}/>
                    <input onClick= {submitComment} type="button" value="Tweet" className="btn btn-tweet" />
                </div>
            </div>
        </div>
          
     
    )
}

export default AddComment
