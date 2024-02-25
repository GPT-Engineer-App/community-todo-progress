import React, { useState } from "react";
import { Box, Button, Flex, Heading, Input, Text, VStack, useToast, Progress, IconButton, Stack, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Textarea, Avatar } from "@chakra-ui/react";
import { FaPlus, FaThumbsUp, FaCommentAlt } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]); // This would be replaced with your Firebase data
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTodo, setSelectedTodo] = useState(null);

  // Placeholder function for adding a to-do item
  const handleAddTodo = () => {
    // Here you would add the to-do to Firebase
    const newTodo = {
      id: todos.length + 1,
      title: inputValue,
      progress: 0,
      comments: [],
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
    toast({
      title: "Todo added.",
      description: "We've added your todo for the community.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  // Placeholder for handling like/comment action
  const handleAction = (todoId, action) => {
    // Here you would update the to-do in Firebase based on the action ('like' or 'comment')
    toast({
      title: `Todo ${action}d.`,
      description: `You have ${action}d a todo.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  // Placeholder for opening the comments modal
  const handleOpenComments = (todo) => {
    setSelectedTodo(todo);
    onOpen();
  };

  // Render comments for a to-do item
  const renderComments = (todo) => {
    return todo.comments.map((comment, index) => (
      <Box key={index} p={2} shadow="md" borderWidth="1px">
        <Flex alignItems="center">
          <Avatar size="sm" name={comment.author} />
          <Text ml={2}>{comment.content}</Text>
        </Flex>
      </Box>
    ));
  };

  return (
    <VStack spacing={4}>
      <Heading>Community Todo List</Heading>
      <Flex>
        <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Add a new feature request..." />
        <Button leftIcon={<FaPlus />} ml={2} onClick={handleAddTodo}>
          Add
        </Button>
      </Flex>
      <Stack spacing={3}>
        {todos.map((todo) => (
          <Box key={todo.id} p={5} shadow="md" borderWidth="1px">
            <Flex justifyContent="space-between" alignItems="center">
              <Text>{todo.title}</Text>
              <IconButton aria-label="Like todo" icon={<FaThumbsUp />} onClick={() => handleAction(todo.id, "like")} />
              <IconButton aria-label="Comment on todo" icon={<FaCommentAlt />} onClick={() => handleOpenComments(todo)} />
            </Flex>
            <Progress value={todo.progress} mt={2} />
          </Box>
        ))}
      </Stack>

      {/* Comments Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comments</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{selectedTodo && renderComments(selectedTodo)}</ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default Index;
