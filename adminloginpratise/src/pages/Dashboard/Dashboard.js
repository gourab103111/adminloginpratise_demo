
import {useLoginContext} from '../../context/Logincontextprovider'
import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Center,
  Stack,
  Heading,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from "react-router-dom";






export function Dashboard(){
    const { isUserLogin, setUserLogin} =    useLoginContext();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const navigate = useNavigate();
    
    return (<>

     

      <Box p={4} >
        
        {/*  Box constet start  */}
    
      <Center py={6}>
      <Box
        maxW={'270px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
            
        <Box p={6}>

        <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              Manage Course
            </Heading>
            <Text color={'gray.500'}>This section used to create and Manage Course</Text>
          </Stack>


          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>11</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
               Active Course
              </Text>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>5</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
             Inactive Course
              </Text>
            </Stack>
          </Stack>
         

         
          <Button
            w={'full'}
            mt={8}
            bg={useColorModeValue('#151f21', 'gray.900')}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            onClick={()=>{
                   
               

                navigate('/createcourse');

            }}>
            Manage Course
          </Button>
        </Box>
      </Box>
    </Center>  


       {/*  Box constet end  */}

      </Box>
              
           </>);
}


export default Dashboard;