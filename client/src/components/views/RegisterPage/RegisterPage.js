import React, { useState } from 'react'
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_actions';
import { withRouter } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function RegisterPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")


    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }
    const onSubmitHanddler = (event) =>{        
        event.preventDefault(); //이 코드가 있으면 매번 refresh를 안해도 됨

        /*
        console.log('email',Email)
        console.log('Password',Password)
        */

        if(Password !== ConfirmPassword){
            confirmAlert({
                title: '경고',   
                message:'비밀번호와 비밀번호 확인은 같아야 합니다.',
                buttons: [
                {
                    label: '확인',
                    onClick: () => ''
                }
                ],
                closeOnEscape: false,
                closeOnClickOutside: false
            }); 
            return false;            
        }


        let body = {            
            email : Email,
            name : Name,
            password : Password,
            confirmPassword : ConfirmPassword
        }


        //만약 redux를 쓰지 않는다면 axios를 사용했을 것이다
        //Axios.post('/api/users/register',body)


        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success){
                    alert("Complete Sign up!\nNow you can Login~")
                    props.history.push("/login")
                }else{
                    alert("Failed to sign up")
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

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

                <br/>
                <button>
                    회원가입
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
