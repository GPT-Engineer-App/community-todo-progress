import React, { useState } from "react";
import { Box, Button, Flex, Heading, Input, Text, VStack, useToast, Progress, IconButton, Stack, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Textarea, Avatar } from "@chakra-ui/react";
import { FaPlus, FaThumbsUp, FaCommentAlt } from "react-icons/fa";

const isAdmin = true; // This should be determined by user authentication logic

const Index = () => {
  // ... (other component code remains unchanged)

  // Function to handle progress change for admin
  const handleProgressChange = (todoId, newProgress) => {
    // Here you would update the progress of the to-do in Firebase
    setTodos(todos.map((todo) => (todo.id === todoId ? { ...todo, progress: newProgress } : todo)));
  };

  // ... (the rest of the Index component remains unchanged)
  const [todos, setTodos] = useState([]); // This would be replaced with your Firebase data
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTodo, setSelectedTodo] = useState(null);

  // Placeholder function for adding a to-do item
  const [descriptionValue, setDescriptionValue] = useState("");
  const handleAddTodo = (event) => {
    event.preventDefault();
    // Here you would add the to-do to Firebase
    const newTodo = {
      id: todos.length + 1,
      title: inputValue,
      description: descriptionValue,
      progress: 0,
      comments: [],
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
    setDescriptionValue("");
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
      <Box as="form" onSubmit={handleAddTodo}>
        <VStack spacing={3}>
          <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Title of the feature request..." />
          <Textarea value={descriptionValue} onChange={(e) => setDescriptionValue(e.target.value)} placeholder="Be very clear of what you mean..." required />
          <Button leftIcon={<FaPlus />} type="submit">
            Publish
          </Button>
        </VStack>
      </Box>
      <Stack spacing={3}>
        {todos.map((todo) => (
          <Box key={todo.id} p={5} shadow="md" borderWidth="1px">
            {isAdmin ? (
              // Allowing admin to edit the progress of a todo
              <Flex justifyContent="space-between" alignItems="center">
                <Text>{todo.title}</Text>
                <Input type="number" value={todo.progress} onChange={(e) => handleProgressChange(todo.id, e.target.value)} />
              </Flex>
            ) : (
              // Regular user functionality to like and comment on a todo
              <Flex justifyContent="space-between" alignItems="center">
                <Text>{todo.title}</Text>
                <IconButton aria-label="Like todo" icon={<FaThumbsUp />} onClick={() => handleAction(todo.id, "like")} />
                <IconButton aria-label="Comment on todo" icon={<FaCommentAlt />} onClick={() => handleOpenComments(todo)} />
              </Flex>
            )}
            <Progress value={todo.progress} mt={2} />
            <Text mt={2}>{todo.description}</Text>
            <Flex justifyContent="space-between" alignItems="center" mt={2}>
              <IconButton aria-label="Like todo" icon={<FaThumbsUp />} onClick={() => handleAction(todo.id, "like")} />
              {!isAdmin && <IconButton aria-label="Comment on todo" icon={<FaCommentAlt />} onClick={() => handleOpenComments(todo)} />}
            </Flex>
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
