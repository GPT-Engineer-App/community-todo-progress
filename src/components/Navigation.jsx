import React from "react";
import { Box, Link, Flex } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navigation = () => {
  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="teal.500" color="white">
      <Box>
        <Link as={RouterLink} to="/" px={2}>
          Home
        </Link>
        <Link as={RouterLink} to="/admin" px={2}>
          Admin
        </Link>
        <Link as={RouterLink} to="/forum" px={2}>
          Forum
        </Link>
        <Link as={RouterLink} to="/login" px={2}>
          Login
        </Link>
      </Box>
    </Flex>
  );
};

export default Navigation;
