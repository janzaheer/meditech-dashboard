
export const BASE_URL = process.env.NODE_ENV == 'development' ? `http://ec2-43-206-254-199.ap-northeast-1.compute.amazonaws.com/` : `https://api.cosmedicos.com/`;
// export const BASE_URL = `https://api.cosmedicos.com/`;
export const END_POINT = `api/v1/items/`; // list endpoint
export const LOGIN_ENDPOINT = 'api/v1/auth/login/';
export const SIGNUP_ENDPOINT = 'api/v1/auth/register/';
export const ORDER_ENDPOINT = 'api/v1/orders/';
export const ORDER_PLACED_ENDPOINT = 'api/v1/orders/place_order/';
export const CATEGORY_ENDPOINT = 'api/v1/category/';
export const CATEGORY_ITEMS_LIST_ENDPOINT = '?category__name=';
export const SORT_ENDPOINT = 'api/v1/items/?ordering=';
export const FAV_ENDPOINT = `api/v1/favourite/items/`;
export const ADDRESS_REMOVE_ENDPOINT = 'api/v1/user/remove_address/';
export const ADDRESS_ADD_ENDPOINT = `api/v1/user/add_address/`;
export const USER_LIST_ENDPOINT = 'api/v1/user/';
export const ADD_PRODUCT_ENDPOINT = `create_item/`;

export const ORDER_CANCEL = (id) => {
    return `api/v1/orders/${id}/canceled_order/`
}

export const changeUrl = () => {
    return 'http://127.0.0.1:8000/';
}