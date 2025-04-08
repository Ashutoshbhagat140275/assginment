import React from 'react';
import { useSelector } from 'react-redux';
import { selectFlightDetails } from '../features/flightdataSlice';

function Flightspage() {
  const flightDetails = useSelector(selectFlightDetails);
  console.log(flightDetails);
  let totalFair=0;
  let totalfair=0;
  if(flightDetails[0]){
  const price=flightDetails[0].price;
  const tickets=flightDetails.tickets;
  totalFair=price*tickets;
  }
  const flights = Object.keys(flightDetails)
    .filter((key) => !isNaN(key)) // Filter numeric keys
    .map((key) => flightDetails[key]); // Map keys to flight objects


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
          justifyContent:'center',
          flexDirection:'column',
        }}
      >
         <div
          style={{
            width: 900, // Increased fixed width
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', // Distribute inner divs equally
            padding: '4px', // Add padding inside the transparent div
          }}
        >
          <div style={{ flex: 1, textAlign: 'center' }}> {/* Equal width for each inner div */}
            <h4>{flightDetails[0]?.date || 'N/A'}</h4>
            <p>Departure Date</p>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}> {/* Equal width for each inner div */}
            <h4>
              {flightDetails[0]?.origin || 'N/A'} - {flightDetails[0]?.destination || 'N/A'}
            </h4>
            <p>Origin - Destination</p>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}> {/* Equal width for each inner div */}
            <h4>{flightDetails?.tickets || 'N/A'}</h4>
            <p>Passengers</p>
          </div>
        </div>
      
        <div style={{marginTop:'20px'}}>
          <h3>Availabe Flights</h3>
        </div>
        
        {flights.map((flight, index) => (
          <div
            key={index}
            style={{
              width: 900,
              backgroundColor: 'rgba(0,0,0,0.7)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '4px',
              marginBottom: '10px', // Add spacing between flight cards
            }}
          >
            <div style={{ flex: 1, textAlign: 'center' }}>
              <h4>{flight.time || 'N/A'}</h4>
              <p>Departure time</p>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <h4>
                {flight._id || 'N/A'} - {flight.destination || 'N/A'}
              </h4>
              <p>Flight ID</p>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <h4>${flight.price || 'N/A'}</h4>
              <p>Fair per ticket</p>
            </div>
            <div
  style={{
    flex: 1,
    textAlign: 'center',
    display: 'flex', // Add flexbox to align items
    flexDirection: 'column', // Stack content vertically
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
    gap: '1px', // Add spacing between the total fare and the button
  }}
>
  <h4>Total Fair: ${flight.price * flightDetails.tickets || 'N/A'}</h4>
  <button style={{marginBottom:'20px', borderRadius: '5px', cursor: 'pointer' }} >
    Book
  </button>
</div>
          </div>
        ))}
      </div>
     </div>
    
   
  )
}

export default Flightspage;

