import React from 'react'
import {Switch,Route} from 'react-router-dom'
import SchoolTeacher from '../Components/SchoolTeacher'
import OneTeacherData from '../Components/OneTeacherData'

function Routes(){
    return(
        <Switch>
            <Route path="/"  exact render={(props)=><SchoolTeacher props={props}/>} />
            <Route path="/:_id" render={(props=><OneTeacherData props={props}/>)}/ >
        </Switch>
    )
}

export default Routes