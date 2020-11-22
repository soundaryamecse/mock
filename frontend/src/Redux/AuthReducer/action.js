import axios from 'axios'
export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"



export const loginRequest = () =>({
    type : LOGIN_REQUEST
})

export const loginSuccess = (payload) =>({
    type :LOGIN_SUCCESS,
    payload
})

export const loginFailure = (payload) =>({
    type : LOGIN_FAILURE,
    payload
})

export const login=(payload)=>(dispatch)=>{
    dispatch(loginRequest())
    return axios.post('http://localhost:5000/api/admin/login',payload)
    // .then(res=>console.log(res))
    .then((res)=>dispatch(loginSuccess(res.data)))
    .catch((err)=>dispatch(loginFailure(err)))
}
