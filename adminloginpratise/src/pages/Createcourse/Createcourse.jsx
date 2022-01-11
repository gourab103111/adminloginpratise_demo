import { useLoginContext } from "../../context/Logincontextprovider";
import { ReactNode, useEffect, useReducer, useState } from "react";
import { Box, Button, Select, toast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { CourseBreadcum } from "./CourseBreadcum";
import { useLocation } from "react-router-dom";
import {
  upDateCourse,
  createCourse,
  loadSectors,
} from "../../Helper/Courselists.helper";

export const Createcourse = () => {
  //const {element} =  useLocation();
  const { state } = useLocation();
  const courseData = state ? JSON.parse(state) : null;

  const createCourseForms = {
    courseId: courseData ? courseData.id : "0",
    courseName: courseData ? courseData.name : "",
    courseDescription: courseData ? courseData.courseDescription : "",
    courseSector: courseData ? courseData.sectorId : "",
    courseImage: courseData ? courseData.courseImage : "",
    courseImageFile: "",
  };
  const useReducerCreateCourse = (state, action) => {
    switch (action.type) {
      case "UPDATE_COURSENAME":
        return { ...state, courseName: action.payload.courseName };
      case "UPDATE_COURSEDESCRIPTION":
        return {
          ...state,
          courseDescription: action.payload.courseDescription,
        };
      case "UPDATE_SECTOR":
        return {
          ...state,
          courseSector: action.payload.courseSector,
        };
      case "UPDATE_SELECT_FILE":
        return {
          ...state,
          courseImageFile: action.payload.courseImageFile,
        };
      default:
        return { ...state };
    }
  };
  const [loginFromState, loginFromStateDispacher] = useReducer(
    useReducerCreateCourse,
    createCourseForms
  );

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    return new Promise((resolve) => {
      const post_data = {
        courseId: courseData ? courseData.id : "0",
        courseName: loginFromState.courseName,
        courseDescription: loginFromState.courseDescription,
        courseSector: loginFromState.courseSector,
        
      };

      // console.log(post_data);

      if (courseData) {
        upDateCourse(loginFromState, reset);
      } else {
        createCourse(loginFromState, reset);
      }
    });
  }

  const [sectorlists, setsectorlists] = useState([]);

  useEffect(() => {
    loadSectors(setsectorlists);
  }, []);

  return (
    <>
      <CourseBreadcum seleted_item="createcourse" />

      <Box p={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type={"hidden"}
            name="course_id"
            value={courseData ? courseData.id : "0"}
          />
          <FormControl isInvalid={errors.course_name}>
            <FormLabel htmlFor="course_name">Course Name</FormLabel>
            <Input
              id="course_name"
              placeholder="Course Name"
              {...register("course_name", {
                required: "Please enter course name",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
              name="course_name"
              onChange={(event) => {
                loginFromStateDispacher({
                  type: "UPDATE_COURSENAME",
                  payload: { courseName: event.target.value },
                });
              }}
              value={loginFromState.courseName}
            />
            <FormErrorMessage>
              {errors.course_name && errors.course_name.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.course_description}>
            <FormLabel htmlFor="course_description">
              Course Description
            </FormLabel>
            <Textarea
              id="course_description"
              placeholder="Course Description"
              {...register("course_description", {
                required: "Please enter course description",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
              name="course_description"
              onChange={(event) => {
                loginFromStateDispacher({
                  type: "UPDATE_COURSEDESCRIPTION",
                  payload: { courseDescription: event.target.value },
                });
              }}
              value={loginFromState.courseDescription}
            />
            <FormErrorMessage>
              {errors.course_description && errors.course_description.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.course_select_sector}>
            <FormLabel htmlFor="course_select_sector">Sector Lists</FormLabel>
            <Select
              key="seletc1"
              name="course_select_sector"
              placeholder="Select sector"
              {...register("course_select_sector", {
                required: "Please select sector",
              })}
              onChange={(event) => {
                console.log(event.target.value);
                loginFromStateDispacher({
                  type: "UPDATE_SECTOR",
                  payload: { courseSector: event.target.value },
                });
              }}
              value={loginFromState.courseSector}
            >
              {sectorlists.map((ele) => {
                return (
                  <option key={ele.id} value={ele.id}>
                    {ele.sectorName}
                  </option>
                );
              })}
            </Select>

            <FormErrorMessage>
              {errors.course_select_sector &&
                errors.course_select_sector.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.course_description}>
            <FormLabel htmlFor="upload_course_picture">
              Course Picture
            </FormLabel>
            <input
              type="file"
              name="upload_course_picture"
              onChange={(event) => {
                loginFromStateDispacher({
                  type: "UPDATE_SELECT_FILE",
                  payload: { courseImageFile: event.target.files[0] },
                });
              }}
            />
          </FormControl>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Createcourse;
