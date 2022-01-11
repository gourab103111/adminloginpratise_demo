import { createContext, useContext, useEffect, useState } from "react";



const LoginContext = createContext();
export function Logincontextprovider({children}){

    const [ isUserLogin, setUserLogin ] = useState(false);

    useEffect(()=>{

        setUserLogin(localStorage.getItem("userLogedIn"));

    },[]);


    return (
      

        <LoginContext.Provider  value={{ isUserLogin, setUserLogin }}>
           {children} 
        </LoginContext.Provider>


    );


}



export  function useLoginContext(){

    return useContext(LoginContext);
}