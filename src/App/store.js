import {configureStore} from '@reduxjs/toolkit';
import flightreducer from '../features/flightdataSlice'

const store=configureStore({
    reducer:{
      flightData:flightreducer,
    }
});

export default store;