import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [show, setShow] = useState(false);
 
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState();
  const [type, setType] = useState(0);
  const [ruc, setRuc] = useState(0);
  const [state, setState] = useState({
    role: false,
  });

  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);


  const onChangeHandle = (e) => {
    setState ({
      [e.target.name] : e.target.checked
    });
  }

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword || !address || !type) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };
      const role = state.role;

      const { data } = await axios.post( "/api/user", { name, email, password, type, ruc, role }, config );
      console.log(data);

      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInformation", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");

    } catch (error) {
      console.log(error.message);  
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
    
  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <div className="select-items">
      <FormControl id="type" isRequired>
        <FormLabel>TYPES OF USER</FormLabel>
        <select name="type" className="selecType" onChange={e => setType(e.target.value)}>
          <option value="">Default</option>
          <option value="1">TRADER</option>
          <option value="2">CLIENT</option>
          <option value="3">FARM</option>
        </select>
      </FormControl>
      <FormControl id="ruc" isRequired>
        <FormLabel>WHAT</FormLabel>
        <select name="type" className="selecType" onChange={e => setRuc(e.target.value)}>
          <option value="">Default</option>
          <option value="1">RUC</option>
          <option value="2">TIN</option>
          <option value="3">CEDULA</option>
        </select>
      </FormControl>
      </div>
      <FormControl id="address" isRequired>
        <FormLabel>Address</FormLabel>
        <Input
          type="text"
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
        />
      </FormControl>
      <FormControl id="phonenumber" isRequired>
        <FormLabel>PhoneNumber</FormLabel>
        <Input
          type="number"
          placeholder="PhoneNumber"
          // onChange={(e) => setAddress(e.target.value)}
        />
      </FormControl>
      <FormControl id="token" isRequired>
        <FormLabel>Token</FormLabel>
        <Input
          type="text"
          placeholder="Token"
          // onChange={(e) => setAddress(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button colorScheme='cyan' h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
            title="Your Password must include an UPPER and Lowercase letter, a number, special characters between 8 and 20 characters" required
          />
          <InputRightElement width="4.5rem">
            <Button colorScheme='cyan' h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <div className="admin">
        <div className="admin-input">
        <input type="checkbox" value={state.role} name="role" onChange={(e) => onChangeHandle(e)}/>
        <p>check me</p>
        </div>
      </div>


      <Button fontWeight="bold"
        colorScheme="teal"
        width="100%"
        style={{ marginTop: 15, fontWeight: 'bold' }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;