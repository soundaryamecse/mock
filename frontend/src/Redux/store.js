import {createStore,combineReducers,compose,applyMiddleware} from 'redux'
import authReducer from './AuthReducer/authReducer'
import getTeacherReducer from './GetTeacher/getTeacherReducer'
import addTeacherReducer from "./AddTeacher/addTeacherReducer"
import deleteTeacherReducer from "./DeleteTeacher/DeleteTeacherReducer"
import thunk from 'redux-thunk'

const rootReducer = combineReducers(
    {auth:authReducer,
    getTeacher:getTeacherReducer,
    addTeacher:addTeacherReducer,
    deleteTeacher:deleteTeacherReducer,
})

let composeEnhancers = compose

if (process.env.NODE_ENV !== "production") {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
}

const enhancers =  composeEnhancers(applyMiddleware(thunk))
const store = createStore(rootReducer,enhancers)

export default store