import React,{ useEffect} from 'react'
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


/*
import { response } from 'express';
*/

   

function LandingPage(props){

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, [])

    const onClickHandler = () => {

        confirmAlert({
            title: '정말 로그아웃 하시겠습니까?',
            message: '진짜진짜로?',
            buttons: [
              {
                label: '예',
                onClick: () => 
                axios.get('api/users/logout')
                    .then(response => {
                        //console.log(response.data)
                        if(response.data.success){
                            confirmAlert({
                                title: '정상 로그아웃 되었습니다.',
                                message: '로그인 페이지로 돌아가시겠습니까?',
                                buttons: [
                                {
                                    label: '예',
                                    onClick: () => props.history.push("/login")
                                },
                                {
                                    label: '아니오',
                                    onClick: () => props.history.push("/")
                                }
                                ]
                            });     
                        }else{
                            confirmAlert({
                                title: 'Failed to Lotout.',            
                                buttons: [
                                  {
                                    label: '확인',
                                    onClick: () =>                 
                                        props.history.push("/register")
                                  }
                                ],
                                closeOnEscape: false,
                                closeOnClickOutside: false
                            });
                        }
                    })
              }
              /*,
              {
                label: '아니오',
                onClick: () => props.history.push("/")
              }
              */
            ]
          }); 


        
    }

    const onClickLoginHandler = () => {
        confirmAlert({
            title: 'go to Login Page.',
            /*message: '진짜진짜로?',*/
            buttons: [
              {
                label: '확인',
                onClick: () =>                 
                    props.history.push("/login")
              }
            ],
            closeOnEscape: false,
            closeOnClickOutside: false
        });
        
    }
    const onClickRegisterHandler = () => {
        confirmAlert({
            title: 'go to Register Page.',            
            buttons: [
              {
                label: '확인',
                onClick: () =>                 
                    props.history.push("/register")
              }
            ],
            closeOnEscape: false,
            closeOnClickOutside: false
        });
        
    }

    
    

    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center'
            ,width:'100%' , height: '100vh'        
        }}>
            <div>
                <h2>시작 페이지</h2>  
            </div>

            
            <div>
                <button onClick={onClickLoginHandler}>
                    로그인
                </button>

                <button onClick={onClickHandler}>
                    로그아웃
                </button>

                <button onClick={onClickRegisterHandler}>
                    회원가입
                </button>
            </div>

              

        </div>
    )
}

export default withRouter(LandingPage)