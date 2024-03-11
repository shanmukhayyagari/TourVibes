/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import { auth } from '../Actions/actions';

export default function (SpecificComponent,option,adminRoute=null){
    function AuthCheck(props){

        let user = useSelector(state=>state.user);
        const dispatch = useDispatch();

        const history = useHistory();

        useEffect(()=>{

            dispatch(auth()).then(res=>{

                // console.log('Auth.js dispatch')

                if(!res.payload.data.isAuth){
                    if(option){
                        history.push('/login');
                    }
                }
                else {
                    //supposed to be Admin page, but not admin person wants to go inside
                    if (adminRoute && !res.payload.data.isAdmin) {
                        history.push('/')
                    }
                    //Logged in Status, but Try to go into log in page 
                    else {
                        if (option === false) {
                            history.push('/')
                        }
                    }
                }

            })

        },[]);

        return (
            <SpecificComponent {...props} user={user}></SpecificComponent>
        )

    }
    return AuthCheck;
}
