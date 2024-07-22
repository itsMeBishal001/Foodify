const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const REST_API_URL = `${API_BASE_URL}/api/restaurants?`;
export const REST_API_MENU_URL = `${API_BASE_URL}/api/menu?`;
export const REST_API_OFFSET_URL = `${API_BASE_URL}/api/restaurants/list/v5/offset`;
export const REST_DATA_API_URL = `${API_BASE_URL}/dapi/menu/v4/full?menuId=`;
export const CDN_IMG_URL = "https://res.cloudinary.com/swiggy/image/upload/";
export const CDN_IMG_URL_RES = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";
export const IMG_CDN_URL = "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/";
export const REST_API_SEARCH_URL = `${API_BASE_URL}/dapi/restaurants/search/suggest?`;
