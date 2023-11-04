import {
  Button, Box,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack, Image
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../modules/fetch";
import backgroundImage  from "../assets/1.jpg";
import backgroundImage2  from "../assets/2.jpg";


const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setIsLogin] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, [window.localStorage.getItem("token")]);

  return (
    <Flex
      w="100%"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="teal.500"
      color="white"
    >
      <Link to="/">
      <Image w="40px"
       h="40px" 
       rounded='2xl'
       src={backgroundImage2} alt="Selected Image" />
       </Link>
      
  <Flex mr={500} cursor="pointer">
  <Link to="/">
    <Text fontSize="xl" fontWeight="bold" 
    _hover={{ color: "black", fontSize: "2xl" ,transition: "color 0.2s"}}>
      Bookshelf App
    </Text>
    </Link>
  </Flex>


      <HStack>
        {isLogin && (
          <Link to="/newbook">
            <Button 
            color="teal.500"
            fontWeight="bold"
            rounded="xl"
            background={`url(${backgroundImage})`}> Create New Book</Button>
          </Link>
        )}
        {!isLogin ? (
          <Button onClick={onOpen} 
          colorScheme="blue"
          rounded="xl"
          >
            Login
          </Button>
        ) : (
          <Button
            colorScheme="blue"
            onClick={() => {
              window.localStorage.removeItem("token");
              setIsLogin(false);
              navigate("/")
            }}
            rounded="xl">
            Logout
          </Button>
        )}
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form
          id="login-form"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const token = await loginUser(
                e.target.email.value,
                e.target.password.value
              );
              window.localStorage.setItem("token", token.token);
              navigate("/");
              onClose();
            } catch (err) {
              toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          }}
        >
          <ModalOverlay />
          <ModalContent
           backgroundImage={backgroundImage}>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                  backgroundColor="white"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                  backgroundColor="white"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" form="login-form" colorScheme="blue" mr={3}>
                Login
              </Button>
              <Link to="/register" onClick={onClose}>
                <Button variant="ghost">
                  Doesn't Have Account? Click here
                </Button>
              </Link>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Flex>
  );
};

export default Navbar;
