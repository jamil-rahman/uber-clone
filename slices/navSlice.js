import { createSlice } from "@reduxjs/toolkit";

//default information for my data layer

const initialState = {
    origin: null,                   //starting point, where my user is
    destination: null,              //where my user will be going
    travelTimeInformation: null     //all the information needed for the travel, which will be populated using APIs
}

export const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },      //state tells the current state of the data layer, action allows when a component dispatches the information from the Data Layer
        setTravelTimeInformation: (state,action) => {
            state.travelTimeInformation = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        }
    }
});

export const {setDestination, setOrigin, setTravelTimeInformation} = navSlice.actions;

// To grab data from the data layer, use Selectors

export const selectOrigin = (state) => state.nav.origin;
export const selectDestiation = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;

export default navSlice.reducer;        //exporting it to my store, i.e store.js