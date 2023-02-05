// import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
// import { BASE_URL } from "../utlis/apiUrls";
// import axios from "axios";
// import { getToken } from "./authSlice";


// // export const fetchFavProducts = createAsyncThunk(
// //     'favSlice/fetchFavProduct',
// //     async () => {
// //         const user = useSelector(state => state.user);
// //         const userToken = useSelector((state)=> state.user.username)
// //         console.log(user)
// //         let Api = BASE_URL + `api/v1/favourite/items/`
// //         try {
// //             const response = await axios.get(Api,
// //             {
// //                 headers: { 'Content-Type': "application/json", 'Authorization' : `Token ${userToken}`}
// //             });
// //             console.log(response.data)
// //             return response.data

// //           } catch (err) {
// //             console.log(err)
// //           }
// //     }
// //   );
// export const STATUSES = Object.freeze({
//     IDLE: 'idle',
//     ERROR: 'error',
//     LOADING: 'loading',
// });

// const favSlice = createSlice({
//     name: 'favorite',
//     initialState: {
//         favProducts : [],
//          status: STATUSES.IDLE,
        
//     },


   
//     reducers: {

//         setFav(state,action){
//             state.favProducts = action.payload
        
//         },
//         setStatus(state, action) {
//             state.status = action.payload;
//         },

//         // addFavProductToList(state,action){
//         //     const tempItem = state.favProducts.find(item => item.id === action.payload.id);
//         //     // state.favProducts.push(action.payload)
//         //     if (tempItem) {
//         //         const tempCart = state.favProducts.map(item => {
//         //             if (item.id === action.payload.id) {
//         //                 let newQty = item.quantity + action.payload.quantity;
                      
//         //                 return { ...item, quantity: newQty};
//         //             } else {
//         //                 return item;
//         //             }
//         //         });
//         //         state.favProducts = tempCart;
               
//         //     } else {
//         //         state.favProducts.push(action.payload);
              
//         //     }
//         // },
//         // removeFavProduct(state,action){
//         //     state.favProducts = state.favProducts.filter((fav) => fav.id !== action.payload)
//         // }
//     },
// });
// // export const selectAllFavList = (state) => state.favorite.favProducts;
// export const {setFav,setStatus} = favSlice.actions;
// export default favSlice.reducer;

// // Thunks



    

// export function fetchFavProducts() {
    
//     return async function FetchFavProductThunk(dispatch) {
//         // let Token = useSelector((state)=>state.user.token)
//         dispatch(setStatus(STATUSES.LOADING));
         
//         let Api = `api/v1/favourite/items/`
//         let FavURL = BASE_URL + Api
//         try {
            
//             axios({
//                 url: `${FavURL}`,
//                 method: 'get',
//                 headers: { 'Content-Type': "application/json", Authorization: `Token ${getToken()}`}
//             })
//                 .then((res) => {
//                     console.log(res.data.token)
//                     dispatch(setFav(res.data));
//                     dispatch(setStatus(STATUSES.IDLE));
//                 })

//         } catch (err) {
//             console.log(err)
//             dispatch(setStatus(STATUSES.ERROR));
//         }   
//     }
// }