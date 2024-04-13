import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { applyMiddleware } from "@reduxjs/toolkit";
import reducer from "./Reducers";
const middleware=[thunk];

const store=configureStore({
    reducer:reducer,
},applyMiddleware(...middleware));



export default store;