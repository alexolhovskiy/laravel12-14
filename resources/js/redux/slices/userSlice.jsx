import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchApi } from "../fetch";



export const fetchUser=createAsyncThunk(
    'user/fetchUser',async(data,thunkApi)=>{
        try{
            return await fetchApi(data.url, 'POST', data.data,data.token);
        }catch(error){
            return thunkApi.rejectWithValue(error.message);
        }
    });


const userSlice=createSlice({
    name:'user',
    initialState:{
        message:'',
        login:'',
        token:'',
        loading:false,
        error:null,
        id:null,
    },
    reducers:{
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUser.pending,(state,action)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.loading=false;
            console.log(action.payload.message);
            state.message=action.payload.message;
            state.login=action.payload.login;
            state.token=action.payload.token;
        })
        .addCase(fetchUser.rejected,(state,action)=>{
            state.loading=false;
            console.log(action.payload);
            state.error=action.payload;
        })
    }
})

export default userSlice.reducer;
// export const {clearMessage,setId}=personSlice.actions;