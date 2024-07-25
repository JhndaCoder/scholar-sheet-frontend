import { Fragment } from "react"
import Form from "../../molecules/Form/Form"
import Input from "../../../common/Input/Input"
import { Link ,useNavigate} from "react-router-dom"

const Login = () => {

    const navigate = useNavigate()
    const InputFieldData = [
        {
            placeholder: 'Institute Email',
            type: 'email',
            autoComplete: 'email',
            "aria-label": 'Institute Email',            
        },
        {
            placeholder: 'Password',
            type: 'password',
            autoComplete: 'current-password',
            "aria-label": 'Password',            
        }
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form submitted')
        navigate('/verify-email')

    }

  return (
    <Fragment>
        <Form
            title="Login to your account"
            subTitle="Welcome back to Scholar Sheet"
            subtext={<Fragment>Don’t have an account? <Link to='/'>Sign up</Link></Fragment>}
            onSubmit={handleSubmit}
        >
            {InputFieldData.map((inputField, index) => {
                return <Input key={index} {...inputField} />
            })}
        </Form>
    </Fragment>
  )
}
export default Login