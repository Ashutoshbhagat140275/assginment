import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { createSelector } from 'reselect';


// const dispatch=useDispatch()
// Async thunk to fetch flight data
export const fetchFlights = createAsyncThunk(
  'fetchflights',
  async (params, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/api/flights', {
        params: {
          origin: params.origin,
          destination: params.dest,
          date: params.date,
        },
      });

      const data= response.data;
      return{flight:data ,tickets:params.tickets} // Return the flight data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// export const addData=createAsyncThunk(
//   'addData',
//   async({username,password,key},{dispatch})=>{
//     try{
//       const response=await axios.post('http://localhost:5000/login',{
//         username:username,
//         password:password,
//         key:key,
//       });
   
//       if(response.status===200){
        
//       }
//     }catch(error){
//       console.error('Error during login:',error);
//       throw error;
//     }
//   }
// );

// export const addData=async({username,password,key,Is_logged_In})=>{
//   if(!Is_logged_In){
//   const response=await axios.post('http://localhost:5000/login',{
//     username:username,
//     password:password,
//     key:key,
//     Is_logged_In:true
//   })
//   if(response.status===200){
//     dispatch(Is_logged_In(true))
//   }
// }
// }

// Redux slice
const flightdataSlice = createSlice({
  name: 'flightData',
  initialState: {
    flight: {
      origin: '',
      destination: '',
      date: '',
      price: '',
    },
    status: 'idle',
    availability: true,
    tickets:0,
    
  },
  reducers: {
    // setOrigin:(state,action)=>{
    //     state.origin=action.payload
    //  },
    //  setDest:(state,action)=>{
    //     state.dest=action.payload
    //  },
    //  setDate:(state,action)=>{
    //     state.date=action.payload
    //  },
    //  setTickets:(state,action)=>{
    //     state.tickets=action.payload
    //  }
        //  addTickets:(state,action)=>{
        //   state.tickets=action.payload
        //  }
        // Is_logged_In:(state,action)=>{
        //   state.logged_in=action.payload
        // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.flight = action.payload.flight;
        state.tickets=action.payload.tickets; // Update the flight data
      })
      .addCase(fetchFlights.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// Input selectors
const selectFlightData = (state) => state.flightData.flight;
const selectStatus = (state) => state.flightData.status;
const selectTickets=(state)=>state.flightData.tickets;
// Memoized selector
export const selectFlightDetails = createSelector(
  [selectFlightData, selectStatus,selectTickets],
  (flight, status,tickets) => ({
    ...flight,
    status,
    tickets,
  })
);

export default flightdataSlice.reducer;