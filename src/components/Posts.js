import React, {useState, useEffect} from 'react'
import { FaRegComment, FaRegHeart, FaRegSmile, FaRegGrinSquintTears, FaRegMeh, FaThinkPeaks, FaRegFrown, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa"
import AddComment from './AddComment';

// Tech debt, rethink/refactor
const reaction_code_string = {
    0x2764: <FaRegHeart />,            // Heart
    0x1F923: <FaRegGrinSquintTears />, // ROFL
    0x1F600: <FaRegSmile />,           // smiley
    0x1F610: <FaRegMeh />,             // neutral
    0x1F641: <FaRegFrown />,           // frown
    0x1F44D: <FaRegThumbsUp />,        // thumbs up
    0x1F44E: <FaRegThumbsDown />,      // thumbs down
}

function Reactions(props){
    const { post_reactions, click_handler } = props
    return Object.keys(reaction_code_string).map((key, i) => {
        return (
            <span key={i} onClick={() => click_handler(key)}>
                { <span className={post_reactions[key] ? "text-primary" : ""}>{reaction_code_string[key]}</span> }
                {' '}
                { key in post_reactions ? post_reactions[key] : "0"}
            </span>
        )
    })
}

const Posts = (props) => {
    console.log("posts-props", props)
    // HACK! Refactor ASAP
    const is_author = !Boolean(props.id_followed)
    const author = props.store_users[props.id_user]
    // console.log("author",author)
    // console.log("props.store_users",props.store_users)
    // console.log("props", props)
    const [post_reactions, set_post_reactions] = useState({})
    const [AreCommentsVisible, setAreCommentsVisible] = useState(false)

   
    function reactions_array_to_object(reactions_array){
        const res = {}
        reactions_array.forEach( reaction => {
            if(!res[reaction.type]){
                res[reaction.type] = 1
            }else{
                res[reaction.type]++
            }
        })
        set_post_reactions(res)
    }

    useEffect(()=> {
        const url = `http://localhost:3001/post/${props.id_post}/reactions`
        const jwt = window.localStorage.getItem("jwt")
        const options = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json',
            }
        }
        fetch(url, options)
        .then(res => res.json())
        .then(json => reactions_array_to_object(json))
        .catch(err => console.error(err))
    }, [])

    function add_reaction(reaction_type){
        const url = `http://localhost:3001/post/${props.id_post}/reactions`
        const jwt = window.localStorage.getItem("jwt")
        const options = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization:`Bearer ${jwt}`
            },
            body: JSON.stringify({type: reaction_type})
        }
        fetch(url, options)
        .then(res => {
            if(res.ok){
                const new_comments = Object.assign({}, post_reactions)
                const reaction_count = new_comments[reaction_type]
                new_comments[reaction_type] = reaction_count ? reaction_count + 1 : 1
                set_post_reactions(new_comments)
            }
        })
    }

    return (
        <div className="posts">
            <div className="post__header">
                <div className="post__avator">
                    <img src="/assets/nibal.png" alt="avator" />
                </div>
                <div className="post__name">
                    {author ? author.pseudo : ''}
                </div>
                <div className="post__username">
                   
                </div>
                <div className="post__time">
                    {new Date(props.date_post).toLocaleString()}
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
                    <Reactions post_reactions={post_reactions} click_handler={add_reaction} />
                </div>
                {props.comments && AreCommentsVisible ? props.comments.map((comment)=>{ //if the state is true, disply the comment
                const auther= props.store_users[comment.id_user]
                    return (
                        
                        <p key={comment.id_comment}>
                            <span>{auther.avatar}</span>
                            {" "}
                           <span><strong>{auther.pseudo}</strong></span> 
                           {" "}  
                            <span>{comment.content}</span>
                        </p>
                    )
                }) : null
                }

                {AreCommentsVisible ? <AddComment onCommentUpload={props.onCommentUpload} id_post={props.id_post}/> : null} 
                {/* // we pass the props that we passed in (post component(this props references the function we created to add comment )) */}

                {is_author ? <button onClick={props.remove_post} type="button" className="btn btn-danger">Delete</button> : null}

            </div>
        </div>
    )
}

export default Posts
