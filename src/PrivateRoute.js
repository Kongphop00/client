import {getUser } from './services/authorize';
import { Route,Navigate } from "react-router-dom";

const PrivateRoute = ({children}) =>{
       return  getUser() ? <>{children}</> : <><Navigate to={'/login'}/></>   
}

export default PrivateRoute;