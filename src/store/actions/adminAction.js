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
            console.warn("getCategory", error);
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

export function deleteCategory(data, callBack) {
    return async function (dispatch) {
        let token = localStorage.getItem('token')
        axios({
            method: 'POST',
            url: `${URL.BASE_URL}${URL.DELETE_CATEGORY}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorizationkey': token
            },
            data: data
        }).then(function (response) {
            callBack("success")
            dispatch(getCategory())
        }).catch(error => {
            callBack("error")
            console.warn("deleteCategory", error);
            // dispatch(changeLoading());
        });
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
            console.warn("getSliders", error);
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

export function deleteSliders(data, callBack) {
    return async function (dispatch) {
        let token = localStorage.getItem('token')
        axios({
            method: 'POST',
            url: `${URL.BASE_URL}${URL.DELETE_SLIDER}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorizationkey': token
            },
            data: data
        }).then(function (response) {
            callBack("success")
            dispatch(getSliders())
        }).catch(error => {
            callBack("error")
            console.warn("deleteSliders", error);
            // dispatch(changeLoading());
        });
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
            console.warn("getAstrologer", error);
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

export function deleteAstrologer(data, callBack) {
    return async function (dispatch) {
        let token = localStorage.getItem('token')
        axios({
            method: 'POST',
            url: `${URL.BASE_URL}${URL.DELETE_ASTROLOGER}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorizationkey': token
            },
            data: data
        }).then(function (response) {
            callBack("success")
            dispatch(getAstrologer())
        }).catch(error => {
            callBack("error")
            console.warn("deleteAstrologer", error);
        });
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
            console.warn("getUsers", error);
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

export function deleteUsers(data, callBack) {
    return async function (dispatch) {
        let token = localStorage.getItem('token')
        axios({
            method: 'POST',
            url: `${URL.BASE_URL}${URL.DELETE_USERS}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorizationkey': token
            },
            data: data
        }).then(function (response) {
            callBack("success")
            dispatch(getUsers())
        }).catch(error => {
            callBack("error")
            console.warn("deleteUsers", error);
        });
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
            console.warn("getProductCategory", error);
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

export function deleteProductCategory(data, callBack) {
    return async function (dispatch) {
        let token = localStorage.getItem('token')
        axios({
            method: 'POST',
            url: `${URL.BASE_URL}${URL.DELETE_PRODUCTCATEGORY}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorizationkey': token
            },
            data: data
        }).then(function (response) {
            callBack("success")
            dispatch(getProductCategory())
        }).catch(error => {
            callBack("error")
            console.warn("deleteProductCategory", error);
            // dispatch(changeLoading());
        });
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
            console.warn("getBlogList", error);
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

export function deleteBlog(data, callBack) {
    return async function (dispatch) {
        let token = localStorage.getItem('token')
        axios({
            method: 'POST',
            url: `${URL.BASE_URL}${URL.DELETE_BLOG}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorizationkey': token
            },
            data: data
        }).then(function (response) {
            callBack("success")
            dispatch(getBlogList())
        }).catch(error => {
            callBack("error")
            console.warn("deleteBlog", error);
            // dispatch(changeLoading());
        });
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
            console.warn("getProducts", error);
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

export function deleteProducts(data, callBack) {
    return async function (dispatch) {
        let token = localStorage.getItem('token')
        axios({
            method: 'POST',
            url: `${URL.BASE_URL}${URL.DELETE_PRODUCTS}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorizationkey': token
            },
            data: data
        }).then(function (response) {
            callBack("success")
            dispatch(getProducts())
        }).catch(error => {
            callBack("error")
            console.warn("deleteProducts", error);
            // dispatch(changeLoading());
        });
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
            console.warn("getPrivacyPolicy", error);
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

export function deletePrivacyPolicy(data, callBack) {
    return async function (dispatch) {
        let token = localStorage.getItem('token')
        axios({
            method: 'POST',
            url: `${URL.BASE_URL}${URL.DELETE_PRIVACYPOLICY}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorizationkey': token
            },
            data: data
        }).then(function (response) {
            callBack("success")
            dispatch(getPrivacyPolicy())
        }).catch(error => {
            callBack("error")
            console.warn("deletePrivacyPolicy", error);
            // dispatch(changeLoading());
        });
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
            console.warn("getTermCondition", error);
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

export function deleteTermCondition(data, callBack) {
    return async function (dispatch) {
        let token = localStorage.getItem('token')
        axios({
            method: 'POST',
            url: `${URL.BASE_URL}${URL.DELETE_TERMCONDITION}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorizationkey': token
            },
            data: data
        }).then(function (response) {
            callBack("success")
            dispatch(getTermCondition())
        }).catch(error => {
            callBack("error")
            console.warn("deleteTermCondition", error);
        });
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
