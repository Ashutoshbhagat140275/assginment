import React, { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
 

function Login() {
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const genrate_key=(username)=>{
        let key1="";
        let str=username;
          for(let i=0;i<str.length;i=i+2){
             key1+=str[i];
          }
          return key1;
    }

    const handleSubmit=async(username,password)=>{
        let error="";
        const username1=localStorage.getItem(username)
        if(username1){
        const key=genrate_key(username);
        if(username1.username===username && username1.password===password){
          const reponse=await axios.put('http://localhost:5000/loginUser',{
            username:username,
            password:password,
          },{
            Is_logged_In:true
          })
          console.log("Logged_In")
          navigate('/booking')
        }else{
        console.error('credentials dont match')
      }
    }else{
      error+="please sign up first";
    }
    
    }

    const handleSubmit1=async({username,password})=>{
        const key=genrate_key(username);
        const key1=localStorage.setItem(username,{username:username,key:key,password:password,Is_logged_In:true})
        const set=await axios.post('https://localhost:5000/signUp',{
          username:username,
          password:password,
          auth_key:key
      }
    )
    if(set.status===200){
      console.log("sign_uped")
      navigate('/booking')
    }
    }
    return (
        <div>
          <div
          
            style={{
              backgroundImage: `url('./BG_Img.jpg')`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100vw',
              height: '100vh',
              margin: 0,
              padding: 0,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 350,
                backgroundColor: 'rgba(0,0,0,0.7)',
                margin: 600,
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                padding:'10px'
              }}
            >
              <div style={{ width: '100%' }}>
                   <label htmlFor="username" className="label">
                   Username
                 </label>
                 <input
                   type="text"
                   name="username"
                   placeholder="Username"
                   className="input-button"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                 />
                 {/* {errors.origin && <p style={{ color: 'red' }}>{errors.origin}</p>} */}
     
                 <label htmlFor="password" className="label">
                   Password
                 </label>
                 <input
                   type="password"
                   name="********"
                   placeholder="Password"
                   className="input-button"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                 />
                 {/* {errors.dest && <p style={{ color: 'red' }}>{errors.dest}</p>} */}
     
                <button  style={{ backgroundColor: 'blue', width: '94%', margin: '10px' }}
                onClick={()=>{handleSubmit()}}
                >Login</button>
                   <button  style={{ backgroundColor: 'blue', width: '94%', margin: '10px' }}
                onClick={()=>{handleSubmit1()}}
                >Sign_up</button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Login
