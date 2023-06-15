/* eslint-disable eqeqeq */
import { createAsyncThunk, createSlice, 
    // current 
} from '@reduxjs/toolkit'
// import { useDispatch } from 'react-redux';
// import { json } from 'react-router-dom';
import API from "../api";

export const initialState = {
    logged: false,
    user: null,
    loader: false,
    authChecked: false,
};



export const setupLogin = createAsyncThunk('donation/setupLogin', async (options) => {
    // console.log(token, "token");
    const token = API.getToken();
    if (token) {
        const user=JSON.parse( localStorage.getItem('user')??"{}");
        
        return { logged: true, user: user };

    }else{
        return { logged: false, user: null };

    }




});



export const saveAuth = createAsyncThunk('donation/saveAuth', async (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    console.log(user);
    return user;
});


export const logout = createAsyncThunk('donation/logout', async (user) => {
    localStorage.removeItem('user');
    localStorage.removeItem('_xtoken');
    return null;
});



export const donationReducer = createSlice({
    extraReducers: {


        [saveAuth.fulfilled]: (state, action) => {
            const data = action.payload;
            return { ...state, loader: false, user: data, logged: true }
        },
        [logout.fulfilled]: (state, action) => {
            const data = action.payload;
            return { ...state, loader: false, user: data, logged: false }
        },
        [setupLogin.fulfilled]: (state, action) => {
            const data = action.payload;
            console.log(data,"auth checked");
            return { ...state, loader: false, user: data.user, logged: data.logged, authChecked: true }
        },

    },
    initialState,
    name: 'donation'
})
export default donationReducer.reducer;
