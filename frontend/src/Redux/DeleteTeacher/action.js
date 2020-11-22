import axios from 'axios'
export const DELETE_TEACHER_REQUEST = "DELETE_TEACHER_REQUEST"
export const DELETE_TEACHER_SUCCESS = "DELETE_TEACHER_SUCCESS"
export const DELETE_TEACHER_FAILURE = "DELETE_TEACHER_FAILURE"



export const deleteTeacherRequest = () =>({
    type : DELETE_TEACHER_REQUEST
})

export const deleteTeacherSuccess = (payload) =>({
    type :DELETE_TEACHER_SUCCESS,
    payload
})

export const deleteTeacherFailure = (payload) =>({
    type : DELETE_TEACHER_FAILURE,
    payload
})

export const deleteTeacher=(payload)=>(dispatch)=>{
    console.log(payload)
    dispatch(deleteTeacherRequest())
    return axios.delete(`http://localhost:5000/api/teacher/deleteTeacher?_id=${payload}`)
    // .then(res=>console.log(res))
    .then((res)=>dispatch(deleteTeacherSuccess(res.data)))
    .catch((err)=>dispatch(deleteTeacherFailure(err)))
}
