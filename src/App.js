import "./App.css";
import { useState,useEffect } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import parse from 'html-react-parser';
import { Link } from "react-router-dom";
import axios from "axios"
import Navcomponent from "./components/NavComponent"
import {getUser,getToken} from './services/authorize';

import { IconButton} from "@material-tailwind/react";

//---icon---
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare,faTrash } from '@fortawesome/free-solid-svg-icons'

const App = () => {
  
  
  const Alert = withReactContent(Swal)
  const [blogs, setBlogs] = useState([])

  const fetcData=()=>{
    axios.get(`${process.env.REACT_APP_API}/blogs`)
    .then( res =>{ 
      setBlogs(res.data) })
    .catch(err=> {
      Alert.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response.data,
      })
    })
  }
  
  const deleteBlog = (slug) => {
    axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`,{headers:{authorization:`Bearer ${getToken()}`}})
    .then(res => {
      fetcData()
      Alert.fire({
          icon: 'success',
          title: 'Delete Done.',
          text: res.data.message,
          timer: 1000,
        })
    })
  }

  const handleDeleteBlog = (slug) =>{
    Alert.fire({
      icon: 'warning',
      title: 'Want to Delete Blog?',
      showCancelButton:true,
    }).then((result)=>{
      if (result.isConfirmed) {
        deleteBlog(slug)
        
      }
    })
  }

  useEffect(() => {
    fetcData()
  },[])

  

  return(
  <>
    <div className="mx-lg container p-8">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="space-y-5 bg-slate-300 border rounded-lg border-1 border-gray-300 p-10">
          <Navcomponent/>
            <div className="grid grid-cols-2 grid-rows-3 gap-4 grid-flow-dense">
              {blogs.map((blog,index)=>(
                
                  <div className="flex flex-col justify-between p-6 pr-6 bg-white border-l-8 border-transparent rounded-md shadow-md space-y-2" key={`blogs ${index}`} >
                    <div className="flex justify-between">
                    <Link to={`/blog/${blog.slug}`}><h2 className="text-2xl mb-2">{blog.title}</h2></Link>
                      <div className="flex space-x-2">
                        {getUser() && (
                        <>
                          <Link to={`/blog/edit/${blog.slug}`}>
                            <IconButton color="green" size="md">
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </IconButton>
                          </Link>
                          <IconButton color="red" onClick={()=>handleDeleteBlog(blog.slug)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </IconButton>
                        </>
                        )}
                        
                      </div>
                    </div>
                    <Link to={`/blog/${blog.slug}`}>
                      { blog && parse(blog.content)}
                    </Link>
                    <div className="flex flex-row justify-between">
                      <p className="text-gray-500">Author: {blog.author}</p>
                      <p className="text-gray-500">Publish Date: {new Date(blog.createdAt).toDateString()}</p>
                    </div>
                  </div>
                
              ))}
            </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default App;
