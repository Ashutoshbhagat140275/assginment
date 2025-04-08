import express from 'express';
import cors from 'cors';
import { use } from 'react';
// import User from './model_user.js';
// import db from './db.js';

const port=5000;
const app=express();

app.use(cors());
app.use(express.json());

const flights=[
  {id:1,origin:'Nashik',destination:'yeola',date:'2025-04-23',price:'5000',time:'09:11-12:10',_id:'G-48'},
    {id:1,origin:'Nashik',destination:'yeola',date:'2025-04-23',price:'7000',time:'19:11-20:10',_id:'G-49'},
    {id:1,origin:'Nashik',destination:'yeola',date:'2025-04-23',price:'3000',time:'07:11-08:10',_id:'G-58'},
    {id:2,origin:'sinner',destination:'yeola',date:'2025-05-23',price:'3000',time:'04:00-04:30',_id:'A-39'},
    {id:3,origin:'Nashik',destination:'sinner',date:'2025-04-8',price:'3500',time:'10:11-11:10',_id:'Y-87'}
]

const userInfo=[

]

app.get('/api/flights',(req,res)=>{
  console.log(req.query);
    const {origin,destination,date}=req.query;
  
    const flight=flights.filter((flight)=>{
      const flightdate=new Date(flight.date).toISOString().split('T')[0];
      const querydate=new Date(date).toISOString().split('T')[0];
      return (
      flight.origin.toLowerCase()===origin.toLocaleLowerCase() && 
     flight.destination.toLowerCase()===destination.toLocaleLowerCase() && flightdate===querydate
      );
    }
    );
    if (flight.length > 0) {
      console.log(flight);
        res.json(flight); // Return the filtered flights
      } else {
        res.status(404).json({ message: 'No flights found' }); // Return 404 if no flights match
      }
})

// app.post('/loginUser',async(req,res)=>{
//   const {username,password}=req.body;
//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required' });
//   }
//   try{
//     const user=await User.findOne({username});
//     if(!user){
//       return res.status(404).json({message:'user not found'})
//     }

//     if(user.password!==password){
//           return req.status(401).json({message:'incalid password'})
//     }

//     user.Is_logged_In=true;
//     await user.save();
  
//     res.status(200).json({
//       message: 'Login successful',
//       user: {
//         username: user.username,
//         isLoggedIn: user.isLoggedIn,
//       },
//     });
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }

// });

// app.post('/signUp',async(req,res)=>{
//   const {username,password,Is_logged_In}=req.body;

//   if(!username || !password){
//     return res.status(400).json({message:'username and password are required'})
//   }

  
//   const newUser=new User({username,password,Is_logged_In});
//   await newUser.save();

//   res.status(201).json({message:'signup sucessful'})
// })

// app.put('/signOut',async(req,res)=>{
//   const {username,password,Is_logged_In}=req.body;
  
//   if(!username||!password){
//     return res.status(400).json({message:'username and password is required'})
//   }
//   const data=await User.findOne({username})
//   if(data.password===password){
//   const updateResource=await User.findOneAndUpdate(
//     {username:username},
//     {Is_logged_In:false},
//     {new:true}
//   );
//   if(!updateResource){
//     return res.status(404).json({message:'resource not found'});
//   }
//   res.status(200).json({message:'Update successful'})
//   }
//   else{
//     res.status(401).json({message:'password not correct'})
//   }
// })

app.listen(port,()=>{
    console.log('running');
})



