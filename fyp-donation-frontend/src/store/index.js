import { configureStore } from "@reduxjs/toolkit";
import donation from './reducer';
const store = configureStore({
    reducer: {
        donation
    }
});
export default store;