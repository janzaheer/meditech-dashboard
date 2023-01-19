import axios from 'axios';
import { BASE_URL, END_POINT } from '../utlis/apiUrls';
const { createSlice } = require('@reduxjs/toolkit');


export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },
    reducers: {
        setProducts(state, action) {
            state.data = action.payload;
        },
        // sortAction:(state,action)=>{
        //     let sorted = state.data.sort(function(item1,item2){
        //               if (item1.price < item2.price) return -1;
        //               if (item1.price > item2.price) return 1;
        //               return 0;
        //           })
        //           state.data = sorted;
        // },
        // unsortAction:(state,action)=>{
        //     state.data = state.data.sort(function(item1,item2){
        //         if (item1.id< item2.id) return -1;
        //         if (item1.id > item2.id) return 1;
        //           return 0;
        //     });
        // },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },

});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;
// Thunks

export function fetchProducts() {
    return async function fetchProductThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            axios({
                url: `${BASE_URL}${END_POINT}`,
                method: 'get',
            })
                .then((res) => {
                    // console.log(res.data.results)
                    dispatch(setProducts(res.data.results));
                    dispatch(setStatus(STATUSES.IDLE));
                })

        } catch (err) {
            console.log(err)
            dispatch(setStatus(STATUSES.ERROR));
        }
        
    }
}
