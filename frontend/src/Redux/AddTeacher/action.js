import axios from 'axios'
export const ADD_TEACHER_REQUEST = "ADD_TEACHER_REQUEST"
export const ADD_TEACHER_SUCCESS = "ADD_TEACHER_SUCCESS"
export const ADD_TEACHER_FAILURE = "ADD_TEACHER_FAILURE"



export const addTeacherRequest = () =>({
    type : ADD_TEACHER_REQUEST
})

export const addTeacherSuccess = (payload) =>({
    type :ADD_TEACHER_SUCCESS,
    payload
})

export const addTeacherFailure = (payload) =>({
    type : ADD_TEACHER_FAILURE,
    payload
})

export const addTeacher=(payload)=>(dispatch)=>{
    console.log(payload)
    dispatch(addTeacherRequest())
    return axios.post('http://localhost:5000/api/teacher/addTeacher',payload)
    // .then(res=>console.log(res))
    .then((res)=>dispatch(addTeacherSuccess(res.data)))
    .catch((err)=>dispatch(addTeacherFailure(err)))
}
