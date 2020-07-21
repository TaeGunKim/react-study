import React, { useState } from 'react'
import Axios from 'axios'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_actions';

function LoginPage(props){

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onSubmitHanddler = (event) =>{        
        event.preventDefault(); //이 코드가 있으면 매번 refresh를 안해도 됨

        /*
        console.log('email',Email)
        console.log('Password',Password)
        */

        
        let body = {
            email : Email,
            password : Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess){
                    props.history.push('/')
                }else{                    
                    console.log(response.payload.message);
                    //alert(ERROR);
                    alert(response.payload.message);
                }
            })

        
        
    }

    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center'
            ,width:'100%' , height: '100vh'        
        }}>
            <form style={{display:'flex', flexDirection:'column'}}
            onSubmit={onSubmitHanddler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br/>
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage