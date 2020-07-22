import React,{useEffect} from 'react';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_actions';

export default function (SpecificComponent, option, adminRoute = null) {
 
    //option   (1) null : 아무나 출입가능 (2) true : 로그인한 유저만 출입 가능 (3) false : 로그인한 유저는 출입불가
    //adminRoute    true,false 

    function AuthenticationCheck(props){

        const dispatch = useDispatch();

        //useEffect는 react library에서 가져옴
        useEffect(() => {

            dispatch(auth()).then(response => {
                //console.log("auth▼▼▼");
                console.log(response)
                //console.log("auth▲▲▲");

                
                if(!response.payload.isAuth){
                    // 로그인하지않은 상태
                    //if(option)  이거랑 
                    //if(option ===true)  이거랑 같은의미                    
                    if(option){                        
                        props.history.push('/login')

                    }
                }else{
                    //로그인한 상태
                    if(adminRoute && !response.payload.isAdmin){
                        alert("11")
                        props.history.push('/')
                    }else{
                        if(option === false){
                            alert("22")
                            props.history.push('/')
                        }
                    }
                }
            })         
            

        }, [])

        return (
            <SpecificComponent />
        )

    }

    return AuthenticationCheck
}