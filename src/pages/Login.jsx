import React from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

function Login() {
  // Placeholder function for handling login - to be replaced with Firebase logic
  const handleLogin = (event) => {
    event.preventDefault();
    console.log("Login logic goes here");
  };

  return (
    <Box p={4}>
      <form onSubmit={handleLogin}>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
        </FormControl>
        <FormControl id="password" isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <Button width="full" mt={4} type="submit">
          Sign In
        </Button>
      </form>
    </Box>
  );
}

export default Login;
