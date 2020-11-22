import React from 'react'
import { useParams } from 'react-router-dom'
import {useSelector} from 'react-redux'

function OneTeacherData(){
    const {_id} =useParams()
    console.log(_id)
    const data = useSelector(state=>state.getTeacher.data)

    const teacher = data.find(item=>item._id===_id)
    console.log(teacher)

    return(
        <div>
             <div style={{alignSelf:"center",width:"fit-content",borderRadius:"50%",margin:"50px"}} key={teacher._id}>
                            <img src={teacher.avatar} alt="avatar" height="100px" width="100px" />
            </div>
            <div style={{display:"flex"}}>
                <div style={{width:"100px",marginLeft:"20px"}}><b>Name</b></div>
                <div><b>:</b>{teacher.name} </div>
            </div>
            <div style={{display:"flex",marginLeft:"20px"}}>
                <div style={{width:"100px"}}><b>Gender</b></div>
                <div><b>:</b>{teacher.gender}</div>
            </div>  
            <div style={{display:"flex",marginLeft:"20px"}}>
                <div style={{width:"100px"}}><b>Age</b></div>
                <div><b>:</b>{teacher.age}</div>
            </div>
            <div style={{display:"flex",marginLeft:"20px"}}>
                <div style={{width:"100px"}}><b>Grade</b></div>
                <div><b>:</b>{teacher.grade}</div>
            </div>
            <div style={{display:"flex",marginLeft:"20px"}}>
                <div style={{width:"100px"}}><b>Section</b></div>
                <div><b>:</b>{teacher.section}</div>
            </div>
            <div style={{display:"flex",marginLeft:"20px"}}>
                <div style={{width:"100px"}}><b>Subject</b></div>
                <div><b>:</b>{teacher.subject}</div>
            </div>
        </div>
    )
}

export default OneTeacherData