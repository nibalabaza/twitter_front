// import React, { useEffect, useState, useRef } from 'react';
// import Axios from 'axios';

// const Comments = (props) => {


// const submitPost = () => {
//     let formData = new FormData()
//     var imgFile = imgContainer
   
//     formData.append("postimg", imgFile.current.files[0]);
//     formData.append("ContentPost", contentPost)
  
//     console.log(contentPost)
//       Axios.post('http://localhost:3001/post/create-post', formData
//       // {ContentPost : contentPost,
//       //    ImgPost : imgPost}
//          ,{ headers: {
//           Authorization:"Bearer " + window.localStorage.getItem("jwt"),
//           "Content-Type" : "multipart/form-data"
//         }})
//         .then((response) => {
//             setPosts([...response.data,...posts])
//           console.log(response);
//       }).then(()=>{
//         imgFile.current.value = null
//         postContainer.current.value = null
        
//       })
//   }

//     useEffect(()=>{
//         console.log("useEffect")
//         Axios.get('http://localhost:3001/user/follwed/post', {
//              headers: {
//             Authorization:"Bearer " + window.localStorage.getItem("jwt"),
//             "Content-Type" : "multipart/form-data"
//           }
//     }).then((response) => {
//         console.log("response.data");
//         console.log(response.data);
//         setPosts(response.data)
       
//     })
// },[])

//     return (
//         <div className="twittes">
//             <div className="home"></div>
//             <div className="postForm">
//                 <div className="postForm__first">
//                     <span><img src="/assets/nibal.png" alt="" /></span>
//                     <input type="text" ref = {postContainer} onChange ={(e)=>{setContentPost(e.target.value)}} placeholder="What's happening"/><br></br>
                    
//                     {/* <button >Submit</button> */}
//                 </div>
//                 <div className="postForm__bottom">
//                     <div className="postForm__icons">
//                         <FaRegImage className="ic" />
//                         <FaRegListAlt className="ic" />
//                         <FaRegSmile className="ic" />
//                         <FaCalendarCheck className="ic" />
//                     </div>
//                     <input  name="postimg" ref= {imgContainer} type="file" /><br></br>
//                     <div className="btnSection">
//                         <input onClick= {submitPost} type="button" value="Tweet" className="btn btn-tweet" />
//                     </div>

//                 </div>
//             </div>
//             {posts.map(post=> <Posts {...post} />)}
//         </div>
//     )
// }

// export default Comments
