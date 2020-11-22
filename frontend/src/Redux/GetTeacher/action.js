import axios from 'axios'
export const GET_TEACHER_REQUEST = "GET_TEACHER_REQUEST"
export const GET_TEACHER_SUCCESS = "GET_TEACHER_SUCCESS"
export const GET_TEACHER_FAILURE = "GET_TEACHER_FAILURE"



export const getTeacherRequest = () =>({
    type : GET_TEACHER_REQUEST
})

export const getTeacherSuccess = (payload) =>({
    type :GET_TEACHER_SUCCESS,
    payload
})

export const getTeacherFailure = (payload) =>({
    type : GET_TEACHER_FAILURE,
    payload
})

export const getTeacher=(page,limit,filter,age,sort)=>(dispatch)=>{
    console.log("in getTeacher",typeof(page),typeof(limit))
    dispatch(getTeacherRequest())
    return axios.get(`http://localhost:5000/api/teacher/pagination?page=${page}&limit=${limit}&filter=${filter}&age=${age}&sort=${sort}`)
    // .then(res=>console.log(res))
    .then((res)=>dispatch(getTeacherSuccess(res.data.current)))
    .catch((err)=>dispatch(getTeacherFailure(err)))
}
