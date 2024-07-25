import { Fragment } from "react"
import './Auth.scss'
import Logo from "../../atoms/Logo/Logo"
import { Outlet } from "react-router-dom"
import TermsOfService from "../../atoms/TermsOfService/TermsOfService"

const Auth = () => {
  return (
    <Fragment>
        <div className="auth-page-container-main">
            <Logo />
            <Outlet />
            <TermsOfService />
        </div>
    </Fragment>
  )
}
export default Auth