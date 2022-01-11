import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
  } from '@chakra-ui/react';
  import { useEffect, useState, useRef  } from "react";
export const CustomAlertDialog = (props) => {
    const cancelRef = useRef()
    
  
    return (
      <>
        <AlertDialog
          isOpen={props.show}
          leastDestructiveRef={cancelRef}
          onClose={props.showfun}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Course
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Are you sure? you want to delete the course.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={props.cancelAlert}>
                  Cancel
                </Button>
                <Button colorScheme='red' onClick={props.deleteAlert} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }