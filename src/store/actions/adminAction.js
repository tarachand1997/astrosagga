import * as URL from '../WebApiUrl'
import axios from 'axios'
import * as types from '../types'

export function setSidebarVisible(data) {
    return {
        type: types.SIDEBAR,
        payload: data,
    }
}

export function setSidebarFoldable(data) {
    return {
        type: types.SIDEBARFOLDABLE,
        payload: data,
    }
}

export function getCategory() {
    return async function (dispatch) {
        // dispatch(changeLoading(true));
        axios({
            method: 'GET',
            url: `${URL.BASE_URL}${URL.CATEGORY}`,
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'bearer ' + global.accessToken
            },
        }).then(function (response) {
            let categoryData = response?.data?.data;
            dispatch(saveCategoryData(categoryData))
        }).catch(error => {
            console.warn("totalpriceError", error);
            // dispatch(changeLoading());
        });
    }
}

export function saveCategoryData(data) {
    return {
        type: types.CATEGORYDATA,
        payload: data,
    }
}

export function getSliders() {
    return async function (dispatch) {
        // dispatch(changeLoading(true));
        axios({
            method: 'GET',
            url: `${URL.BASE_URL}${URL.SLIDERS}`,
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'bearer ' + global.accessToken
            },
        }).then(function (response) {
            let sliderData = response?.data?.data;
            dispatch(saveSlidersData(sliderData))
        }).catch(error => {
            console.warn("totalpriceError", error);
            // dispatch(changeLoading());
        });
    }
}

export function saveSlidersData(data) {
    return {
        type: types.SLIDERDATA,
        payload: data,
    }
}

export function getAstrologer() {
    return async function (dispatch) {
        // dispatch(changeLoading(true));
        axios({
            method: 'GET',
            url: `${URL.BASE_URL}${URL.ASTROLOGER}`,
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'bearer ' + global.accessToken
            },
        }).then(function (response) {
            let data = response?.data?.data;
            dispatch(saveAstrologerData(data))
        }).catch(error => {
            console.warn("totalpriceError", error);
            // dispatch(changeLoading());
        });
    }
}

export function saveAstrologerData(data) {
    return {
        type: types.GETASTROLOGER,
        payload: data,
    }
}

export function getUsers() {
    return async function (dispatch) {
        // dispatch(changeLoading(true));
        axios({
            method: 'GET',
            url: `${URL.BASE_URL}${URL.USERS}`,
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'bearer ' + global.accessToken
            },
        }).then(function (response) {
            let data = response?.data?.data;
            dispatch(saveUsersData(data))
        }).catch(error => {
            console.warn("totalpriceError", error);
            // dispatch(changeLoading());
        });
    }
}

export function saveUsersData(data) {
    return {
        type: types.GETUSERS,
        payload: data,
    }
}

export function getProductCategory() {
    return async function (dispatch) {
        // dispatch(changeLoading(true));
        axios({
            method: 'GET',
            url: `${URL.BASE_URL}${URL.PRODUCTCATEGORY}`,
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'bearer ' + global.accessToken
            },
        }).then(function (response) {
            let data = response?.data?.data;
            dispatch(saveProductCategory(data))
        }).catch(error => {
            console.warn("totalpriceError", error);
            // dispatch(changeLoading());
        });
    }
}

export function saveProductCategory(data) {
    return {
        type: types.GETPRODUCTCATEGORY,
        payload: data,
    }
}

export function getBlogList() {
    return async function (dispatch) {
        // dispatch(changeLoading(true));
        axios({
            method: 'GET',
            url: `${URL.BASE_URL}${URL.BLOGS}`,
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'bearer ' + global.accessToken
            },
        }).then(function (response) {
            let data = response?.data?.data;
            dispatch(saveBlogList(data))
        }).catch(error => {
            console.warn("totalpriceError", error);
            // dispatch(changeLoading());
        });
    }
}

export function saveBlogList(data) {
    return {
        type: types.GETBLOGS,
        payload: data,
    }
}

export function getProducts() {
    return async function (dispatch) {
        // dispatch(changeLoading(true));
        axios({
            method: 'GET',
            url: `${URL.BASE_URL}${URL.PRODUCTS}`,
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'bearer ' + global.accessToken
            },
        }).then(function (response) {
            let data = response?.data?.data;
            dispatch(saveProductList(data))
        }).catch(error => {
            console.warn("totalpriceError", error);
            // dispatch(changeLoading());
        });
    }
}

export function saveProductList(data) {
    return {
        type: types.GETPRODUCTS,
        payload: data,
    }
}

export function getPrivacyPolicy() {
    return async function (dispatch) {
        // dispatch(changeLoading(true));
        axios({
            method: 'GET',
            url: `${URL.BASE_URL}${URL.PRIVACYPOLICY}`,
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'bearer ' + global.accessToken
            },
        }).then(function (response) {
            let data = response?.data?.data;
            dispatch(savePrivacyPolicyList(data))
        }).catch(error => {
            console.warn("totalpriceError", error);
            // dispatch(changeLoading());
        });
    }
}

export function savePrivacyPolicyList(data) {
    return {
        type: types.GETPRIVACYPOLICY,
        payload: data,
    }
}

export function getTermCondition() {
    return async function (dispatch) {
        // dispatch(changeLoading(true));
        axios({
            method: 'GET',
            url: `${URL.BASE_URL}${URL.TERMCONDITION}`,
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'bearer ' + global.accessToken
            },
        }).then(function (response) {
            let data = response?.data?.data;
            dispatch(saveTermConditionList(data))
        }).catch(error => {
            console.warn("totalpriceError", error);
            // dispatch(changeLoading());
        });
    }
}

export function saveTermConditionList(data) {
    return {
        type: types.GETTERMCONDITION,
        payload: data,
    }
}

// export function getProducts() {
//     return async function (dispatch) {
//         // dispatch(changeLoading(true));
//         axios({
//             method: 'GET',
//             url: `${URL.BASE_URL}${URL.PRODUCTS}`,
//             headers: {
//                 'Content-Type': 'application/json',
//                 // 'Authorization': 'bearer ' + global.accessToken
//             },
//         }).then(function (response) {
//             let data = response?.data?.data;
//             dispatch(saveProductList(data))
//         }).catch(error => {
//             console.warn("totalpriceError", error);
//             // dispatch(changeLoading());
//         });
//     }
// }

// export function saveProductList(data) {
//     return {
//         type: types.GETPRODUCTS,
//         payload: data,
//     }
// }
