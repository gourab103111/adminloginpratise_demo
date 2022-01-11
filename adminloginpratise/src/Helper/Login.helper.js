import { useReducer, useState } from 'react';
import { useLoginContext } from '../context/Logincontextprovider';
import axios from 'axios';
import { constdata } from '../constant/Constants';

export const logInApiCall = async(state,setUserLogin,dispatch) =>{
    
        const loginPost = { userName: state.userName, password: state.password};
        let response = '';
       
         try{
             

             response = await axios.post(constdata.mainUrl+'LearnhatapiAdmin/adminLogin', loginPost,
              {
                    headers: { 
                        'Content-Type' : 'text/plain'
                    }
             }

            
        );

       

       if(response.data.isValidlogin){


             localStorage.setItem('userLogedIn',response.data.isValidlogin);
             localStorage.setItem('userData',response.data.userData);
             localStorage.setItem('session_token',response.data.jwt);

            setUserLogin(true);
                 
        }else{

           
        }

         }catch(err){

            console.log(response.status);

            state.invalidUserNameorPassword = 'Invalid username or password'
            dispatch({ type: "VALIDATE_FORM", payload: {...state} })



         }
        
     
        

      

}