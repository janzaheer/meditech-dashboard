// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { BASE_URL } from "../utlis/apiUrls";
// import  {STATUS} from '../utlis/status'
// const initialState = {
//     sortProducts: [],
//     sortProductsStatus: STATUS.IDLE
// }

// const sortSlice = createSlice({
//     name: 'sort',
//     initialState,
//     reducers: {
//         clearSort: (state, action) => {
//             state.sortProducts = [];
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//         .addCase(fetchAsyncSortProduct.pending, (state, action) => {
//             state.sortProductsStatus = STATUS.LOADING;
//         })

//         .addCase(fetchAsyncSortProduct.fulfilled, (state, action) => {
//             state.sortProducts = action.payload;
//             state.sortProductsStatus = STATUS.SUCCEEDED;
//         })

//         .addCase(fetchAsyncSortProduct.rejected, (state, action) => {
//             state.sortProductsStatus = STATUS.FAILED;
//         })
//     }
// })
// // /api/v1/items/?search=
// export const fetchAsyncSortProduct = createAsyncThunk('product-sort/fetch', async(sortTerm) => {
//     const response = await fetch(`${BASE_URL}api/v1/items/?ordering=${sortTerm}`);
//     const data = await response.json();
//     console.log('sort',data.results)
//     return data.results;
// });

// export const { setSortTerm, clearSort } = sortSlice.actions;
// export const getSortProducts = (state) => state.sort.sortProducts;
// export const getSortProductsStatus = (state) => state.sort.sortProductsStatus;
// export default sortSlice.reducer;