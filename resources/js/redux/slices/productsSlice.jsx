import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchApi } from "../fetch";



export const fetchProducts=createAsyncThunk(
    'person/fetchProducts',async(data,thunkApi)=>{
        try{
            return await fetchApi(data.url, 'POST', data.data,data.token);
        }catch(error){
            return thunkApi.rejectWithValue(error.message);
        }
    });


const productsSlice=createSlice({
    name:'products',
    initialState:{
        items:[],
        loading:false,
        error:null,
        id:null,
    },
    reducers:{
        clearMessage:(state,action)=>{
            state.message='';
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.pending,(state,action)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.loading=false;
            console.log(action.payload);
            state.items=action.payload;
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.loading=false;
            console.log(action.payload);
            state.error=action.payload;
        })
    }
})

export default productsSlice.reducer;
export const {clearMessage}=productsSlice.actions;