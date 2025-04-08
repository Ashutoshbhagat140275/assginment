import React, { useRef, useState } from 'react';
import '../App.css';
import {useSelector,useDispatch} from 'react-redux'
import { fetchFlights} from '../features/flightdataSlice';
import { Navigate, useNavigate } from "react-router-dom";
import Flightspage from './Flightspage';

function Home() {
  const [origin, setOrigin] = useState('');
  const [dest, setDest] = useState('');
  const [date, setDate] = useState('');
  const [tickets, setTickets] = useState(0);
  const [errors, setErrors] = useState({}); // To store validation errors
  const istrue=useRef(true);
  const [istrue1,setIstrue1]=useState(true)
  const dispatch=useDispatch();
  const navigate = useNavigate();
  // Regular Expressions for Validation
  const originDestPattern = /^[a-zA-Z\s]+$/; // Only letters and spaces
  const ticketsPattern = /^[1-9][0-9]*$/; // Only positive integers

  const handleSubmit = async() => {
    const newErrors = {};
    
    // Validate Origin
    if (!originDestPattern.test(origin)) {
      newErrors.origin = 'Origin must contain only letters and spaces.';
    }

    // Validate Destination
    if (!originDestPattern.test(dest)) {
      newErrors.dest = 'Destination must contain only letters and spaces.';
    }

    if(origin && dest && origin === dest){
        newErrors.origin='Both cant be same';
        newErrors.dest='Both cant be same';
    }

    // Validate Date
    const currentDate=new Date()
    const enteredDate=new Date(date)
    if (!date) {
      newErrors.date = 'Please select a departure date.';
    }else if(currentDate>enteredDate){
      newErrors.date = 'Please select a valid date';
    }

    // Validate Tickets
    if (!ticketsPattern.test(tickets)) {
      newErrors.tickets = 'Tickets must be a positive number.';
    }else if(tickets>5){
        newErrors.tickets='No of tickets must be less than 6';
    }

    setErrors(newErrors);

    // If no errors, proceed with form submission
    if (Object.keys(newErrors).length === 0) {
     try{
      const status1=await dispatch(fetchFlights({origin,dest,date,tickets})).unwrap();
      console.log(status1);
        console.log(status1);
        console.log("naviagted")
        navigate('/flightspage')
        
      
     }catch(error){
      console.error('error')
     }
    }
    
    
    // dispatch(setOrigin(origin));
    // dispatch(setDest(dest));
    // dispatch(setDate(date));
    // dispatch(setTickets(tickets));
    
  };

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
               <label htmlFor="Origin" className="label">
               Origin
             </label>
             <input
               type="text"
               name="Origin"
               placeholder="Origin"
               className="input-button"
               value={origin}
               onChange={(e) => setOrigin(e.target.value)}
             />
             {errors.origin && <p style={{ color: 'red' }}>{errors.origin}</p>}
 
             <label htmlFor="Destination" className="label">
               Destination
             </label>
             <input
               type="text"
               name="Destination"
               placeholder="Destination"
               className="input-button"
               value={dest}
               onChange={(e) => setDest(e.target.value)}
             />
             {errors.dest && <p style={{ color: 'red' }}>{errors.dest}</p>}
 
             <label htmlFor="date" className="label">
               Departure time
             </label>
             <input
               type="date"
               name="date"
               placeholder="Departure time"
               className="input-button"
               value={date}
               onChange={(e) => setDate(e.target.value)}
             />
             {errors.date && <p style={{ color: 'red' }}>{errors.date}</p>}
 
             <label htmlFor="tickets" className="label">
               No of Tickets
             </label>
             <input
               type="text"
               name="tickets"
               placeholder="No of tickets"
               className="input-button"
               value={tickets}
               onChange={(e) => setTickets(e.target.value)}
             />
             {errors.tickets && <p style={{ color: 'red' }}>{errors.tickets}</p>}
 
             <button
               style={{ backgroundColor: 'blue', width: '94%', margin: '10px' }}
               onClick={handleSubmit}
             >
               View Flight
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;