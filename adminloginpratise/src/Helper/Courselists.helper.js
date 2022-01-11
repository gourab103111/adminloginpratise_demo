import { toast } from "@chakra-ui/react";
import axios from "axios";
import { constdata } from "../constant/Constants";

export const loadCourseLists = async (setcourseLsists, searchText) => {
  const getCourseJsonLists = { token: localStorage.getItem("session_token") };
  let response = "";

  try {
    response = await axios.post(
      constdata.mainUrl + "LearnhatapiCourse/getCourses",
      getCourseJsonLists,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
    setcourseLsists(response.data);
  } catch (err) {
  } finally {
  }
};


export const loadSectors = async (setsectorlists) => {
  const getCourseJsonLists = { token: localStorage.getItem("session_token") };
  let response = "";

  try {
    response = await axios.post(
      constdata.mainUrl + "LearnhatapiCourse/getSectors",
      getCourseJsonLists,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
    setsectorlists(response.data);
  } catch (err) {
  } finally {
  }
};

export const inactiVeCourse = async (
  setcourseLsists,
  temp_array,
  array_position
) => {
  const getCourseJsonLists = {
    token: localStorage.getItem("session_token"),
    course_id: temp_array[array_position].id,
    active_status: temp_array[array_position].isActive,
  };
  let response = "";

  try {
    response = await axios.post(
      constdata.mainUrl + "LearnhatapiCourse/activeInactiveCourse",
      getCourseJsonLists,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
    if (response.data.issuccess) {
      temp_array[array_position].isActive = response.data.active_status;
      setcourseLsists(temp_array);
    }
  } catch (err) {
  } finally {
  }
};




export const deleteCourse = async (
  setcourseLsists,
  temp_array,
  array_position
) => {
  const getCourseJsonLists = {
    token: localStorage.getItem("session_token"),
    course_id: temp_array[array_position].id,
  };


  let response = "";

  try {
    response = await axios.post(
      constdata.mainUrl + "LearnhatapiCourse/deleteCourse",
      getCourseJsonLists,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
    if (response.data.issuccess) {
      temp_array.splice(array_position, 1);
      setcourseLsists(temp_array);


     
    }
  } catch (err) {
  } finally {
  }
};



export const upDateCourse = async (
  post_data,
  resetData
) => {
  const getCourseJsonLists = {
    token: localStorage.getItem("session_token"),
    post_data: post_data,
  };
  

  console.log(post_data.courseImageFile);
  
 
  const fromdata = new FormData()
  fromdata.append('post_data', post_data);
  fromdata.append('token', localStorage.getItem("session_token"));
  fromdata.append('course_image_file', post_data.courseImageFile);
  

  let response = "";

  try {
    response = await axios.post(
      constdata.mainUrl + "LearnhatapiCourse/updateCourse",
      fromdata,
      getCourseJsonLists,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );

    if (response.data.issuccess) {
      resetData();

      return true;
      
    }

    
  } catch (err) {
  } finally {

    return false;
  }
};



export const createCourse = async (
  post_data,
  resetData
) => {
  const getCourseJsonLists = {
    token: localStorage.getItem("session_token"),
    post_data: post_data,
  };


  let response = "";

  try {
    response = await axios.post(
      constdata.mainUrl + "LearnhatapiCourse/createCourse",
      getCourseJsonLists,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
    
    if (response.data.issuccess) {

      resetData();
      
    }
  } catch (err) {
  } finally {
  }
};
