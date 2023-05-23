
export const BASE_URL = process.env.NODE_ENV == 'development' ? `http://ec2-43-206-254-199.ap-northeast-1.compute.amazonaws.com/` : `https://api.cosmedicos.com/`;
// export const ORDER_ENDPOINT = 'api/v1/orders/';
// export const ORDER_PLACED_ENDPOINT = 'api/v1/orders/place_order/';
export const ADDRESS_REMOVE_ENDPOINT = 'api/v1/user/remove_address/';
export const ADDRESS_ADD_ENDPOINT = `api/v1/user/add_address/`;
// export const USER_LIST_ENDPOINT = 'api/v1/user/';
export const ADD_PRODUCT_ENDPOINT = `create_item/`;
export const SELLER_ENDPOINT = 'api/v1/seller/request/'

export const USER_LIST_ENDPOINT = () => {
    return `api/v1/user/`;
}

export const SIGNUP_ENDPOINT = () => {
    return `api/v1/auth/register/`;
}

export const LOGIN_ENDPOINT = () => {
    return `api/v1/auth/login/`;
}

export const END_POINT = () => {
    return `api/v1/items/`;
}

export const FAV_ENDPOINT = () => {
    return `api/v1/favourite/items/`
}

export const SORT_ENDPOINT = () => {
    return `?ordering=`;
}

export const CATEGORY_ENDPOINT = () => {
    return `api/v1/category/`;
}

export const CATEGORY_ITEMS_LIST_ENDPOINT = () => {
    return `?category__name=`;
}

export const ORDER_ENDPOINT = () => {
    return `api/v1/orders/`;
}

export const ORDER_PLACED_ENDPOINT = () => {
    return `place_order/`;
}

export const ORDER_CANCEL = (id) => {
    return `${id}/canceled_order/`;
}

export const changeUrl = () => {
    return 'http://127.0.0.1:8000/';
}
