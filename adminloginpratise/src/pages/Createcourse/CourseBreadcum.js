import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from "react-router-dom"

export function CourseBreadcum({ seleted_item }) {
  return (
    <Breadcrumb width="100%" padding={5} spacing='8px' position="sticky" top="0px" backgroundColor={"white"} separator={<ChevronRightIcon color='gray.500' />}>
      <BreadcrumbItem>
        <BreadcrumbLink as={RouterLink} to="/" >Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage={seleted_item === 'courselists'}>
        <BreadcrumbLink as={RouterLink} to="/courselists" >List Course </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage={seleted_item === 'createcourse'}>
        <BreadcrumbLink as={RouterLink} to="/createcourse" >Create Course </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}