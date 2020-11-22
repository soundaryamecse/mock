import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Styled from 'styled-components'
import {login} from '../Redux/AuthReducer/action'
import {addTeacher} from "../Redux/AddTeacher/action"
import { getTeacher } from '../Redux/GetTeacher/action'
import {deleteTeacher} from "../Redux/DeleteTeacher/action"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Pagination from '@material-ui/lab/Pagination'
import axios from 'axios'
import {useThrottle} from 'use-throttle'
import {Link} from 'react-router-dom'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


const AdminLoginWrapper = Styled.div`
    height:50px;
    background:yellow;    
    i{
        color:blue;
        font-size:30px;
        float:right;
    }

`

const Loginbox = Styled.div`
    display:flex;
    flex-direction:column;
    float:right;
    border:1px solid grey;
    height:180px;
    width:200px;
    input{
        padding:10px;
        border:1px solid grey;
        outline:none;
        margin:10px;
        border-radius:10px;
    }
    button{
        background:blue;
        color:white;
        width:80px;
        border:none;
        border-radius:10px;
        margin-left:60px;
        padding:10px;
    }
`
const FormWrapper = Styled.div`
    background:yellow;
    input{
        padding:10px;
        width:140px;
        margin:10px;
        border-radius:10px;
        border:none;
        outline:none
    }
    select{
        padding:10px;
        margin:10px;
        border-radius:10px;
        border:none;
    }
    button{
        padding:10px;
        margin:10px;
        border:none;
        background:blue;
        color:white;
        border-radius:10px;
        outline:none;
    }
`
const TeacherCardWrapper =  Styled.div`
    margin:10px;
    border:1px solid lightgrey;
    width:200px;
    background : ${props=> props.bgcolor || "yellow"};
    padding:20px;
    border-radius:10px; 
    .delete{
        display:flex;
        justify-content:center;
    }
    button{
        margin:10px;
        padding:10px;
        border:none;
    }
`

function SchoolTeacher(){
    //Dialog open  for Login model
    const [openLogin,setOpenLogin] = React.useState(false)

    //AdminLogin variables
    const [email,setEmail] = React.useState("")
    const [password,setPassword] = React.useState("")

    //Adding the Teacher form variables
    const [teacherName,setTeacherName] = React.useState("")
    const [gender,setGender] = React.useState("Male")
    const [age,setAge] = React.useState("")
    const [grade,setGrade] = React.useState("")
    const [section,setSection] = React.useState("")
    const [subject,setSubject] = React.useState("")
    const [avatar,setAvatar] = React.useState("")

    const [bgColor,setBgColor] = React.useState("yellow")
    const [query,setQuery] = React.useState("")
    const throttledText =useThrottle(query,1000)
    
    
    const [openSnackBar,setOpenSnackBar] = React.useState(false)
    const [openDeleteSnackBar,setOpenDeleteSnackBar] = React.useState(false)

    //variables for sorting and filtering
    const [genderForFilter,setGenderForFilter] = React.useState("")
    const [ageForFilter,setAgeForFilter] = React.useState("")
    const [sortByAge,setSortByAge]=React.useState("")

    //Redux variables
    const isAuth = useSelector(state=>state.auth.isAuth)
    const data = useSelector(state=>state.getTeacher.data)
    const message = useSelector(state=>state.addTeacher.message)
    const DeleteMessage = useSelector(state=>state.deleteTeacher.DeleteMessage)
    const dispatch = useDispatch()

    //pagination
    const [page,setPage] = React.useState(1)
    const [totalPage,setTotalPage] = React.useState(1)
    const limit = 4
    

    //for getting the totalPage
   useEffect(()=>{
       
    if(genderForFilter==="" && ageForFilter==="" && sortByAge ==="" )
        { 
            axios.get("http://localhost:5000/api/teacher/getTeacherData?filter=&age=&sort=")
            .then(res=>setTotalPage(res.data.length))        
            dispatch(getTeacher(page,limit,"","","",""))
        }
    if(query){
            axios.get(`http://localhost:5000/api/teacher/getTeacherData?query=${query}`)
            .then(res=>setTotalPage(res.data.length))        
            dispatch(getTeacher(page,limit,"","","",query))
           }
    else if(genderForFilter==="" && ageForFilter  && sortByAge ==="")
    {
        axios.get(`http://localhost:5000/api/teacher/getTeacherData?filter=&age=${Number(ageForFilter)}&sort=`)
        .then(res=>setTotalPage(res.data.length))        
        dispatch(getTeacher(page,limit,"",Number(ageForFilter),"",""))
    }
    else if(genderForFilter && ageForFilter==="" && sortByAge==="")
    {
        axios.get(`http://localhost:5000/api/teacher/getTeacherData?filter=${genderForFilter}&age=&sort=`)
        .then(res=>setTotalPage(res.data.length))        
        dispatch(getTeacher(page,limit,genderForFilter,"","",""))
    }
    else if(sortByAge && genderForFilter==="" && ageForFilter===""){
        axios.get(`http://localhost:5000/api/teacher/getTeacherData?filter=&age=&sort=${sortByAge}`)
        .then(res=>setTotalPage(res.data.length))        
        dispatch(getTeacher(page,limit,"","",sortByAge,""))
    }
    else if(genderForFilter && ageForFilter && sortByAge==="")
    {
        axios.get(`http://localhost:5000/api/teacher/getTeacherData?filter=${genderForFilter}&age=${Number(ageForFilter)}&sort=`)
        .then(res=>setTotalPage(res.data.length))        
        dispatch(getTeacher(page,limit,genderForFilter,Number(ageForFilter),""))
    }
    else if(genderForFilter && sortByAge && ageForFilter==="")
    {
        axios.get(`http://localhost:5000/api/teacher/getTeacherData?filter=${genderForFilter}&age=&sort=${sortByAge}`)
        .then(res=>setTotalPage(res.data.length))        
        dispatch(getTeacher(page,limit,genderForFilter,"",sortByAge,""))
    }
    else if(ageForFilter && sortByAge && genderForFilter==="")
    {
        axios.get(`http://localhost:5000/api/teacher/getTeacherData?filter=&age=${ageForFilter}&sort=${sortByAge}`)
        .then(res=>setTotalPage(res.data.length))        
        dispatch(getTeacher(page,limit,"",ageForFilter,sortByAge,""))
    }
      else if(genderForFilter && ageForFilter && sortByAge){
        axios.get(`http://localhost:5000/api/teacher/getTeacherData?filter=${genderForFilter}&age=${Number(ageForFilter)}&sort=${sortByAge}`)
        .then(res=>setTotalPage(res.data.length))
        dispatch(getTeacher(page,limit,genderForFilter,Number(ageForFilter),sortByAge,""))
        }
    },[page,genderForFilter,ageForFilter,sortByAge,throttledText])

    //handles the data when the page gets change
    const handlePageChange = (event, value) => {
        setPage(value);
      };

    const handleLogin = async() =>{
        const payload = {
            email:email,
            password:password
        }
        console.log(payload)
        await dispatch(login(payload))
        setOpenLogin(false)
    }

    const handleClose=()=>{
        setOpenSnackBar(false)        
    }

    const changeBg=()=>{
       const rgb= `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)} ,${Math.floor(Math.random() * 256)})`
       setBgColor(rgb)
       }

    const handleAddTeacher = async()=>{
        const payload = {
            name : teacherName,
            avatar:avatar,
            gender : gender,
            age : age,
            grade:grade,
            section:section,
            subject:subject,
        }
        // console.log("in SchoolTeacher",payload)
        await dispatch(addTeacher(payload))        
         await setOpenSnackBar(true)
        await dispatch(getTeacher(page,limit))
        resetState()
    }

    const resetState = () => {
        setTeacherName("")
        setGender("male")
        setGrade("")
        setSection("")
        setAge("")
        setSubject("")
        setAvatar("")
    }

    const handleDeleteTeacher = async(id) =>{
        console.log(id)
        dispatch(deleteTeacher(id))
        setOpenDeleteSnackBar(true)
        await dispatch(getTeacher(page,limit))
    }
    const handleCloseDeleteSnack = ()=>{
        setOpenDeleteSnackBar(false)
    }

    

    // console.log(data)
    let count = Math.ceil(totalPage / limit)
    return(
        <div>
            {!isAuth?
                <div>
                <AdminLoginWrapper>
                    <div onClick={()=>setOpenLogin(true)}><i className="fas fa-user-shield"></i></div>
                </AdminLoginWrapper>
                {openLogin && 
                <Loginbox>
                    <div><input type="text" value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/></div>
                    <div><input type="password" value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/></div>
                    <div><button onClick={handleLogin}>Submit</button></div>
                </Loginbox>}
                <div style={{position:"relative",left:"52%",top:"67px"}}><i class="fas fa-search"></i></div>
                <input type="text" value={query} placeholder="Search by Name" style={{padding:"10px",marginLeft:"40%",marginTop:"3%",marginBottom:"3%",borderRadius:"10px",border:"1px solid lightgrey"}} onChange={(e)=>setQuery(e.target.value)}/>
                <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
                {data && data.map(item=>(
                    <Link to ={`${item._id}`} style={{textDecoration:"none"}}><TeacherCardWrapper>
                     <div onLoad={changeBg} key={item._id}  style={{background:`${bgColor}`,padding:"10px"}}>
                        <div style={{alignSelf:"center",width:"fit-content",borderRadius:"50%",margin:"auto"}} key={item._id}>
                            <img src={item.avatar} alt="avatar" height="100px" width="100px" />
                        </div>
                        <div style={{display:"flex"}}>
                            <div style={{width:"100px",marginLeft:"20px"}}><b>Name</b></div>
                            <div><b>:</b>{item.name} </div>
                        </div>
                        <div style={{display:"flex",marginLeft:"20px"}}>
                            <div style={{width:"100px"}}><b>Gender</b></div>
                            <div><b>:</b>{item.gender}</div>
                        </div>  
                        <div style={{display:"flex",marginLeft:"20px"}}>
                            <div style={{width:"100px"}}><b>Age</b></div>
                            <div><b>:</b>{item.age}</div>
                        </div>
                        <div style={{display:"flex",marginLeft:"20px"}}>
                            <div style={{width:"100px"}}><b>Grade</b></div>
                            <div><b>:</b>{item.grade}</div>
                        </div>
                        <div style={{display:"flex",marginLeft:"20px"}}>
                            <div style={{width:"100px"}}><b>Section</b></div>
                            <div><b>:</b>{item.section}</div>
                        </div>
                        <div style={{display:"flex",marginLeft:"20px"}}>
                            <div style={{width:"100px"}}><b>Subject</b></div>
                            <div><b>:</b>{item.subject}</div>
                        </div>
                    </div>                
                    </TeacherCardWrapper>
                    </Link>
                ))}
                </div>
                <div style={{display:"flex"}}>
                    <div>
                        <div><b><i>Filter By Gender</i></b></div>
                        <select value={genderForFilter} onChange={(e)=>setGenderForFilter(e.target.value)} style={{padding:"5px",marginLeft:"10px"}}>
                            <option value="">All</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div>
                        <div style={{marginLeft:"10px"}}><b><i>Filter By Age</i></b></div>
                        <select value={ageForFilter} onChange={(e)=>setAgeForFilter(e.target.value)} style={{padding:"5px",marginLeft:"10px"}}>
                            <option value="">All</option>
                            <option value="20">above 20</option>
                            <option value="30">above 30</option>
                            <option value="40">above 40</option>
                            <option value="50">above 50</option>
                        </select>
                    </div>
                    <div>
                        <div style={{marginLeft:"10px"}}><b><i>Sort by Age</i></b></div>
                        <select value={sortByAge} onChange={(e)=>setSortByAge(e.target.value)} style={{padding:"5px",marginLeft:"10px"}}>
                            <option value="">All</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                    <div><Pagination count={count} page={page} onChange={handlePageChange} size="large" variant="outlined" color="primary"
                            style={{ display: "inline-block",marginLeft:"35%",width:"100%"}} /></div>
                </div>
               </div> 
                :
                <div>
                    {/* <div>Add Teacher</div> */}
                    <FormWrapper>
                        <input type="text" value={teacherName} onChange={(e)=>setTeacherName(e.target.value)} placeholder="Teacher Name" />
                        <select value={gender} onChange={(e)=>setGender(e.target.value)}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <input type="text" value={age} onChange={(e)=>setAge(e.target.value)} placeholder="Age" />
                        <input type="text" value={grade} onChange={(e)=>setGrade(e.target.value)} placeholder="Grade" />
                        <input type="text" value={section} onChange={(e)=>setSection(e.target.value)} placeholder="Section" />
                        <input type="text" value={subject} onChange={(e)=>setSubject(e.target.value)} placeholder="Subject" />
                        <input type="text" value={avatar} onChange={(e)=>setAvatar(e.target.value)} placeholder="Image Link" />
                        <button onClick={handleAddTeacher}>Add Teacher Details</button>
                    </FormWrapper>
                    <Snackbar open={openSnackBar} autoHideDuration={2000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                        {message}
                        </Alert>
                    </Snackbar>
                    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
                {data && data.map(item=>(
                    <TeacherCardWrapper>
                     <div onLoad={changeBg} key={item._id}  style={{background:`${bgColor}`,padding:"10px"}}>
                        <div style={{alignSelf:"center",width:"fit-content",borderRadius:"50%",margin:"auto"}} key={item._id}>
                            <img src={item.avatar} alt="avatar" height="100px" width="100px" />
                        </div>
                        <div style={{display:"flex"}}>
                            <div style={{width:"100px",marginLeft:"20px"}}><b>Name</b></div>
                            <div><b>:</b>{item.name} </div>
                        </div>
                        <div style={{display:"flex",marginLeft:"20px"}}>
                            <div style={{width:"100px"}}><b>Gender</b></div>
                            <div><b>:</b>{item.gender}</div>
                        </div>  
                        <div style={{display:"flex",marginLeft:"20px"}}>
                            <div style={{width:"100px"}}><b>Age</b></div>
                            <div><b>:</b>{item.age}</div>
                        </div>
                        <div style={{display:"flex",marginLeft:"20px"}}>
                            <div style={{width:"100px"}}><b>Grade</b></div>
                            <div><b>:</b>{item.grade}</div>
                        </div>
                        <div style={{display:"flex",marginLeft:"20px"}}>
                            <div style={{width:"100px"}}><b>Section</b></div>
                            <div><b>:</b>{item.section}</div>
                        </div>
                        <div style={{display:"flex",marginLeft:"20px"}}>
                            <div style={{width:"100px"}}><b>Subject</b></div>
                            <div><b>:</b>{item.subject}</div>
                        </div>
                    </div>
                    <div className="delete"><button style={{background:`${bgColor}`,color:"white"}} onClick={()=>handleDeleteTeacher(item._id)}>Delete</button></div>
                    </TeacherCardWrapper>
                ))}
                </div>
                <Pagination count={count} page={page} onChange={handlePageChange} size="large" variant="outlined" color="primary"
                        style={{ display: "inline-block",marginLeft:"35%"}} />
                <Snackbar open={openDeleteSnackBar} autoHideDuration={2000} onClose={handleCloseDeleteSnack}>
                        <Alert onClose={handleCloseDeleteSnack} severity="success">
                        {DeleteMessage}
                        </Alert>
                    </Snackbar>
                </div>
            }
        </div>
    )
}

export default SchoolTeacher