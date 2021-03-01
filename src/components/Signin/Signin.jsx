import {useState , useReducer} from 'react';
import FomrFields from '../widgets/FormFields/FormFileds';
import styles from './signin.module.css';
import {firebase} from '../../firebase'


const Email={
        element: 'input',
        value:'',
        config:{
            name:"email_input",
            type:"email",
            placeholder:"Enter your email"
        },
        validation:{
            required:true,
            email:true
        },
        valid:false,
        touched:false,
        validationMessage: ""
    }

 const  Password ={
        element: 'input',
        value:'',
        config:{
            name:"password_input",
            type:"password",
            placeholder:"Enter your password"
        },
        validation:{
            required:true,
            password:true
        },
        valid:false,
        touched:false,
        validationMessage: ""
    }

const reducer = (state, action) => {
    if(action.blur){
        let validData = validate(state)
        return {...state, valid:validData[0] ,
             validationMessage:validData[1], 
            touched:action.blur}
    }
    
     return {...state ,  value: action.e.target.value }
}

const validate = (element) => {
    let error = [true, '']

    if (element.validation.email) {
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message = `${!valid ? "Must be valid email " : ''}`;
        error = !valid ? [valid, message] :error
    }

    if (element.validation.password) {
        const valid = element.value.length >= 5;
        const message = `${!valid ? "Must be greater than 5 " : ''}`;
        error = !valid ? [valid, message] :error
    }

    if (element.validation.required) {
        const valid = element.value.trim() !== '';
        const message = `${!valid ? "This field is required" : ''}`;
        error = !valid ? [valid, message] :error
    }

    return error
}



const Signin = ({history}) => {
    
    const [registerError, setRegisterError] = useState('');
    const [loading, setLoading] = useState(false);

    const [email, dispatch] = useReducer(reducer, Email) ;
    const [password, dispatchPassword] = useReducer(reducer, Password) ; 


    const submitForm = (e , type) => {
        e.preventDefault()
        if (type !== null) {
            
            let DataTOSubmit = {};
            let FormIsValid = true;

            DataTOSubmit={email:email.value , password:password.value}

            FormIsValid = email.valid && FormIsValid;
            FormIsValid = password.valid && FormIsValid;

            if (FormIsValid) {
                setLoading(true);
                setRegisterError('')
                if (type) {
                   firebase.auth()
                   .signInWithEmailAndPassword(
                    DataTOSubmit.email,
                    DataTOSubmit.password
                   ).then(() => {
                        history.push('/')
                    }).catch(error => {
                        setLoading(false)
                        setRegisterError(error.message)
                    })

                }else{
                    firebase.auth()
                    .createUserWithEmailAndPassword(
                        DataTOSubmit.email,
                        DataTOSubmit.password
                    ).then(() => {
                        history.push('/')
                    }).catch(error => {
                        setLoading(false)
                        setRegisterError(error.message)
                    })
                }
            }
        } 
    }

    const submitButton = ( ) => (
        loading ? 'loading...' : 
        <div>
            <button  onClick={(e) => submitForm(e, false)}>Register now </button>
            <button onClick={(e) => submitForm(e, true)}>Log in</button>
        </div>
    )
    const showError = () => (
        registerError !== '' ? 
        <div className={styles.error}>{registerError}</div> : ''
    )

    return ( 
        <div className={styles.logContainer}>
            <form onClick={(e) => submitForm(e, null)} >
                <h2>Register / Log in</h2>
                <FomrFields id={"email"} 
                            formData={email}
                           change={(element) => dispatch(element)}/>

                <FomrFields id={"password"} 
                            formData={password}
                           change={(element) => dispatchPassword(element)}/>

                    {submitButton()}
                    {showError()}
            </form>
        </div>
     );
}
 
export default Signin;