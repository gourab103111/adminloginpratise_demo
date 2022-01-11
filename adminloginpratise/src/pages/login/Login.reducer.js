import { useReducer, useState } from "react";

const initialState = {
  userName: "",
  password: "",
  userNameError: "",
  passwordError: "",
  invalidUserNameorPassword: "",
  isValidLogin: false,
};

const useReduceraction = (state, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return {
        ...state,
        userName: action.payload.username,
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload.password,
      };
    case "VALIDATE_FORM":
      return {
        ...action.payload,
      };

     
    default:
      return state;
  }
};

export function useLoginReducer() {
  return useReducer(useReduceraction, initialState);
}
