import { useEffect, useState } from "react";
import {
  Box,
  HStack,
  IconButton,
  Center,
  Heading,
  Text,
  Image,
  SimpleGrid,
  VStack,
  InputGroup,
  InputRightElement,
  Input,
  Flex,
} from "@chakra-ui/react";
import {
  DeleteIcon,
  EditIcon,
  SearchIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import Pagination from "@choc-ui/paginator";

import { CourseBreadcum } from "./CourseBreadcum";
import {
  loadCourseLists,
  inactiVeCourse,
  deleteCourse,
} from "../../Helper/Courselists.helper";
import { useNavigate } from "react-router-dom";

import { CustomAlertDialog } from "../../component/Customalert.dialog";

export function Listscourses() {
  const perPageConstant = 5;
  const [courseLsists, setcourseLsists] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [perPage, setperPage] = useState(perPageConstant);
  const [pageStart, setpageStart] = useState(0);
  const [showdialog, setshowdialog] = useState(false);
  const [indexCourse, setindexCourse] = useState(-1);
  
  const navigate = useNavigate();

  const cancelAlert = () => {
    setshowdialog(!showdialog);
  };

  const deleteAlert = () => {
    setshowdialog(!showdialog);
    let temp_array = [...courseLsists];
    console.log(indexCourse);
    deleteCourse(setcourseLsists, temp_array, indexCourse);
  };

  const filterItems = (arr, query) => {
    return arr.filter(
      (el) => el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  };

  const findSeletedItemPosition = (temp_array, element) => {
    let array_position = 0;

    temp_array.filter((el, ind) => {
      if (Number.parseInt(el.id) === Number.parseInt(element.id)) {
        array_position = ind;
      }
    });

    return array_position;
  };

  useEffect(() => {
    // await
    loadCourseLists(setcourseLsists, searchText);
    // setcourseLsistsPagination(courseLsists.slice(pageStart, perPage));
  }, []);

  return (
    <>
      <Flex flexDirection={"columns"}>
        <CourseBreadcum seleted_item="courselists" />
        <InputGroup mt={"15px"} mr={"20px"} width={"40vw"}>
          <Input
            placeholder="Search"
            onChange={(event) => {
              setsearchText(event.target.value);
            }}
          />
          <InputRightElement
            children={
              <SearchIcon
                color="green.500"
                onClick={() => {
                  // loadCourseLists(setcourseLsists, searchText);
                  //setsearchText();
                }}
              />
            }
          />
        </InputGroup>
      </Flex>
      <Box p={4}>
        <CustomAlertDialog
          show={showdialog}
          cancelAlert={cancelAlert}
          deleteAlert={deleteAlert}
        />
        <SimpleGrid columns={{ md: 4, sm: 1 }} spacing={4}>
          {Number.parseInt(courseLsists.length) >= 1 ? (
            filterItems(courseLsists, searchText)
              .slice(pageStart, perPage)
              .map((element) => {
               // seleted_array_index = 0;
                return (
                  <Box
                    key={element.id}
                    boxShadow={"2xl"}
                    rounded={"lg"}
                    p={6}
                    textAlign={"center"}
                    minW={"20vw"}
                  >
                    <Heading fontSize="xl">{element.name}</Heading>
                    <Text noOfLines={2} mt={2} mb={3}>
                      {element.courseDescription}
                    </Text>
                    <VStack>
                      <Center>
                        <Image
                          boxSize="100px"
                          objectFit="cover"
                          src={element.courseImage}
                          alt={element.name}
                        />
                      </Center>
                    </VStack>
                    <HStack mt={"10px"}>
                      <Text>Status :</Text>
                      <Text>
                        {Number.parseInt(element.isActive) === 1
                          ? "Active"
                          : "InActive"}
                      </Text>
                    </HStack>
                    <HStack mt={"10px"}>
                      <IconButton
                        variant="outline"
                        colorScheme="teal"
                        aria-label="Edit Course"
                        icon={<EditIcon />}
                        onClick={() => {
                          if (true) {
                            const array_position = findSeletedItemPosition(
                              courseLsists,
                              element
                            );
                           const data_object =  courseLsists[array_position];
                            
                           navigate("/createcourse", { state: JSON.stringify(data_object) } )
                            
                          }
                        }}
                        // mx={2}
                      />

                      <IconButton
                        variant="outline"
                        colorScheme="teal"
                        aria-label="Delete Course"
                        icon={<DeleteIcon />}
                        onClick={() => {
                          if (true) {
                            const array_position = findSeletedItemPosition(
                              courseLsists,
                              element
                            );

                           
                            setindexCourse(array_position);
                            setshowdialog(!showdialog);
                          }
                        }}
                        // mx={2}
                      />
                      <IconButton
                        variant="outline"
                        colorScheme="teal"
                        aria-label="Inactive Course"
                        onClick={() => {
                          let temp_array = [...courseLsists];
                          const array_position = findSeletedItemPosition(
                            temp_array,
                            element
                          );
                          inactiVeCourse(
                            setcourseLsists,
                            temp_array,
                            array_position
                          );
                        }}
                        icon={
                          Number.parseInt(element.isActive) === 1 ? (
                            <ViewOffIcon />
                          ) : (
                            <ViewIcon />
                          )
                        }
                        // mx={2}
                      />
                    </HStack>
                  </Box>
                );
              })
          ) : (
            <Text>No Data</Text>
          )}
        </SimpleGrid>
      </Box>

      {filterItems(courseLsists, searchText).length > perPageConstant ? (
        <Flex
          w="full"
          bg={"gray"}
          pt={2}
          pb={2}
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Pagination
            key={0}
            defaultCurrent={1}
            pageSize={perPage}
            total={filterItems(courseLsists, searchText).length}
            paginationProps={{ display: "flex", mb: 4 }}
            pageNeighbours={1}
            size={"sm"}
            onChange={(page) => {
              setpageStart(perPageConstant * page - perPageConstant);
              setperPage(perPageConstant * page);
            }}
          />
        </Flex>
      ) : (
        ""
      )}
    </>
  );
}

export default Listscourses;
