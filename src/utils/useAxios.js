import axios from 'axios'
// grab info in supplied token (npm install jwt-decode)
import jwt_decode from "jwt-decode";
// used to calculate date diff (better than moment.js) if tokens are expired
import dayjs from 'dayjs'
import {useContext} from 'react'
import {AuthContext} from '../context/AuthProvider'

const baseURL = process.env.REACT_APP_URL_PREFIX || "" // grabs from .env file in root folder

// where the token will be "saved as" in local storage
const tokenName = 'authToken'
const refreshName = 'refreshToken'

// 'AUTH_HEADER_TYPES' specified in settings.py in Django
const headerName = 'Bearer'

// API: token endpoints
const refreshURL = "/api/token/refresh/"
const tokenLoginURL = "/api/token/"
const signupURL = "/api/signup/"

const anonAxios = axios.create({baseURL});

const getLocalToken = () => {
    return localStorage.getItem(tokenName)
}

const signup = async (formData) => {
    try {
        const response = await anonAxios.post(signupURL, formData)
        return response.data
    } catch (err) {
        return err
    }
}

const signinBackend = async (formData) => {
    let userResponse = null
    try {
        // const anonAxios = axios.create({baseURL});
        const response = await anonAxios.post(tokenLoginURL, formData)
        if (response.data) {
            localStorage.setItem(tokenName, response.data.access)
            localStorage.setItem(refreshName, response.data.refresh)
            // must manually do the useAxios here because you can't circular hook with the context
            // TODO delete
            const authAxios = axios.create({
                baseURL,
                headers: {Authorization: `${headerName} ${response.data.access}`}
            });
            userResponse = await authAxios.get('/api/v1/user/whoami/')
        }
        return {token: response.data.access, user: userResponse.data}
    } catch (err) {
        console.log("login error", err)
        return null
    }
}

const appRefresh = async () => {
    // must manually do the useAxios here because you can't circular hook with the context
    // refresh token most likely expired so try to refresh access
    const refreshResponse = await axios.post(`${baseURL}${refreshURL}`, {
        refresh: localStorage.getItem(refreshName)
    });
    const newToken = refreshResponse.data.access
    localStorage.setItem(tokenName, newToken)

    const authAxios = axios.create({
        baseURL,
        headers: {Authorization: `${headerName} ${newToken}`}
    });
    const whoamiResponse = await authAxios.get('/api/v1/user/whoami/')
    const choicesResponse = await anonAxios.get('/api/all_choices/')
    return {
        user: whoamiResponse.data,
        token: newToken,
        choices: choicesResponse.data
    }
}

const getAllChoices = async () => {
    // const response = await anonAxios.get('/api/all_choices/')
    // if (response.status === 200)
    //     return response.data
    return null
}

const clearToken = () => {
    localStorage.removeItem(tokenName)
    localStorage.removeItem(refreshName)
}


// custom hook
const useAxios = () => {
    const {token, setToken} = useContext(AuthContext)

    const authAxios = axios.create({
        baseURL,
        headers: {Authorization: `${headerName} ${token}`}
    });

    // Refresh token if it has expired before sending request
    authAxios.interceptors.request.use(async req => {
        // jwt_decode is a non-depreciated version of atob()
        const decodedJWT = jwt_decode(token)

        // dayjs has data comparison functionality based on "exp" supplied in token
        const isExpired = dayjs.unix(decodedJWT.exp).diff(dayjs()) < 1;

        if (!isExpired) return req

        const response = await axios.post(`${baseURL}${refreshURL}`, {
            refresh: localStorage.getItem(refreshName)
        });

        localStorage.setItem(tokenName, response.data.access)

        setToken(response.data.access)

        req.headers.Authorization = `${headerName} ${response.data.access}`
        return req
    })

    return authAxios
}

export {useAxios, getLocalToken, clearToken, signup, getAllChoices, signinBackend, appRefresh};