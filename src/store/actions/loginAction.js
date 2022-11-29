import * as URL from '../WebApiUrl'
import axios from 'axios'
import * as types from '../types'

export function saveLoginData(data) {
    return {
        type: types.LOGINDATA,
        payload: data,
    }
}

const setLocalStorage = (loginData) => {
    localStorage.setItem('token', loginData.access_token);
    localStorage.setItem('userDetail', JSON.stringify(loginData.data));
}

export function login(data, callBack) {
    return async function (dispatch) {
        // dispatch(changeLoading(true));
        axios({
            method: 'POST',
            url: `${URL.BASE_URL}${URL.LOGIN}`,
            data: data,
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'bearer ' + global.accessToken
            },
        }).then(function (response) {
            let loginData = response.data;
            setLocalStorage(loginData)
            dispatch(saveLoginData(loginData))
            callBack()
        }).catch(error => {
            console.warn("login", error.response);
            callBack(error.response.data.message)
            // dispatch(changeLoading());
        });
    }
}

export function logout(callBack) {
    return async function (dispatch) {
        // dispatch(changeLoading(true));
        axios({
            method: 'POST',
            url: `${URL.BASE_URL}${URL.LOGOUT}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorizationkey': global.accessToken
            },
        }).then(function (response) {
            localStorage.removeItem('token');
            localStorage.removeItem('userDetail');
            dispatch(logoutUser())
            // callBack()
        }).catch(error => {
            localStorage.removeItem('token');
            localStorage.removeItem('userDetail');
            dispatch(logoutUser())
            // callBack()
            console.warn("logout", error);
            // dispatch(changeLoading());
        });
    }
}

export function logoutUser() {
    return {
        type: types.LOGOUT
    }
}