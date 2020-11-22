import React from 'react'
import {Switch,Route} from 'react-router-dom'
import SchoolTeacher from '../Components/SchoolTeacher'

function Routes(){
    return(
        <Switch>
            <Route path="/" render={(props)=><SchoolTeacher props={props}/>} />
            <Route path="/:id" ></Route>
        </Switch>
    )
}

export default Routes