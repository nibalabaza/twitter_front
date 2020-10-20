import React, { useEffect, useState, useRef } from 'react';
import Axios from 'axios';
import { FaRegImage, FaRegListAlt, FaRegSmile, FaCalendarCheck } from "react-icons/fa"
import Posts from "./Posts"

const Twittes = (props) => {
    const [posts, setPosts] = useState([])
    const [contentPost, setContentPost] = useState('');
    const imgContainer = useRef('');
    const postContainer = useRef('');

    //find the post that correspond the comment
    const updatePostComment = (newComment) => {
        const {id_post}= newComment //id_post = newComment.id_post
        console.log("upc", id_post,posts)
        const modifiedPosts = [...posts]
        let i = 0
        let l = posts.length
        for(i; i < l; i++){
            if(posts[i].id_post == id_post){
                if(posts[i].comments){
                   
                    modifiedPosts[i].comments.push(newComment)
                } else {
                    console.log("posts[i]", posts[i])
                    modifiedPosts[i].comments=[newComment]//if there is no comments, create the array comments
                }
            }
        }
        return modifiedPosts
    }

    function delete_post(post_id){
        const url = `http://localhost:3001/post/${post_id}`
        const jwt = window.localStorage.getItem("jwt")
        if(!jwt){ return }
        const options = {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json',
            }
        }
        fetch(url, options)
        .then(()=>{
            const modified_posts = [...posts]
            const l = modified_posts.length
            let i = 0
            for(i; i < l; i++){
                if(modified_posts[i].id_post = post_id){
                    modified_posts.splice(i, 1)
                }
            }
            setPosts(modified_posts)
        })
        .catch(error => console.log('could not delete post'))
    }
    
    //take the results of the updatePostComment and use it like setState (to add new comment)
    const updatePostsWithNewComment = (newComment) => {
        console.log("newComment", newComment)
        setPosts(updatePostComment(newComment)) 
    }

    const submitPost = () => {
        let formData = new FormData()
        var imgFile = imgContainer
    
        formData.append("postimg", imgFile.current.files[0]);
        formData.append("ContentPost", contentPost)
    
        console.log(contentPost)
        Axios.post('http://localhost:3001/post/create-post', formData,
            { headers: {
            Authorization:"Bearer " + window.localStorage.getItem("jwt"),
            "Content-Type" : "multipart/form-data"
            }})
        .then((response) => {
            setPosts([...response.data,...posts])
            console.log(response);
        }).then(()=>{
            imgFile.current.value = null
            postContainer.current.value = null
        })
    }

    useEffect(()=>{
        Axios.get('http://localhost:3001/user/follwed/post', {
            headers: {
                Authorization:"Bearer " + window.localStorage.getItem("jwt"),
                "Content-Type" : "multipart/form-data"
            }
        }).then((response) => {
            setPosts(response.data)
            console.log("response.data",response.data)
        })
    },[])

    return (
        <div className="twittes">
            <div className="postForm">
                <div className="postForm__first">
                    <span><img src="/assets/nibal.png" alt="" /></span>
                    <input type="text" ref = {postContainer} onChange ={(e)=>{setContentPost(e.target.value)}} placeholder="What's happening"/><br></br>
                </div>
                <div className="postForm__bottom">
                    <div className="postForm__icons">
                        <FaRegImage className="ic" />
                        <FaRegListAlt className="ic" />
                        <FaRegSmile className="ic" />
                        <FaCalendarCheck className="ic" />
                    </div>
                        <input  name="postimg" ref= {imgContainer} type="file" />
                    <div className="btnSection">
                        <input onClick= {submitPost} type="button" value="Tweet" className="btn btn-tweet" />
                    </div>
                </div>
            </div>
            {posts.map(post => <Posts remove_post={()=>delete_post(post.id_post)} key={post.id_post} onCommentUpload={updatePostsWithNewComment} store_users={props.store_users} {...post} />)}
             {/* //we passed a props to call the function updatePostsWithNewComment(we use this props in thress components) */}
        </div>
    )
}

export default Twittes
