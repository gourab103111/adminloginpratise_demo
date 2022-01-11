import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import {useLoginReducer } from './Login.reducer' 
import { logInApiCall } from '../../Helper/Login.helper'
import { useLoginContext } from '../../context/Logincontextprovider'

const Login = ()=> {

  const [state, dispatch] = useLoginReducer();
  const  {isUserLogin, setUserLogin} =  useLoginContext();


  

  return (
    <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
       
      </Stack>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={4}>
         
          
          <FormControl id="text">
           {state.invalidUserNameorPassword}   
            <FormLabel>Username</FormLabel>
            <Input type="text" value={state.userName} onChange={(event)=>{
                     dispatch({ type: "SET_USERNAME", payload: { username: event.target.value } });
            }} />
            {state.userNameError}
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={state.password} onChange={(event) => {
              dispatch({ type: "SET_PASSWORD", payload: { password: event.target.value } })
            }} />
             {state.passwordError}
          </FormControl>
          <Stack spacing={10}>
           
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={()=>{

                state.invalidUserNameorPassword = '';
        state.userNameError = '';
        state.passwordError = '';


        dispatch({ type: "VALIDATE_FORM", payload: {...state,invalidUserNameorPassword:'',userNameError:'',passwordError:''} });

        

        if(state.userName.length==0){
          
            state.userNameError = "Username can not be empty"

            dispatch({ type: "VALIDATE_FORM", payload: {...state} });


        }

        if(state.password.length==0){

          state.passwordError = "Password can not be empty"
          dispatch({ type: "VALIDATE_FORM", payload: {...state}});

          
           

        }

        if(state.password.trim().length>=1 && state.userName.trim().length>=1){
         
          state.isValidLogin = true;
          dispatch({ type: "VALIDATE_FORM", payload: {...state} });

         
        }else{
           
          state.invalidUserNameorPassword = 'Invalid username or password'
            dispatch({ type: "VALIDATE_FORM", payload: {...state} });

        
          }

               

               if(state.isValidLogin){
                logInApiCall(state,setUserLogin,dispatch);
               }

               

              }}
              >
             Login
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>
  );
}

export default Login;
