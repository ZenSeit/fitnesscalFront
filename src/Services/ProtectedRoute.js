import {Navigate,useLocation} from 'react-router-dom'
import {useContext} from 'react'
import { SessionContext } from './SessionContext'
import { VerifyToken } from './Login'

export const ProtectedRoute = ({children}) => {

    const loca = useLocation()

    if(!VerifyToken().availableToken){
        return <Navigate to='/' state={loca}/>
    }
  return children
}