import { FormControl, FormLabel, Input, InputRightElement, Button, VStack, InputGroup, useToast } from '@chakra-ui/react';
import axios from 'axios'

import React, { useState } from 'react'
import { register } from '../../api/user';

const Register = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    confirmpassword: "",
    password: "",
  })
  const [image, setImage] = useState("")



  // const [name, setName] = useState();
  // const [email, setEmail] = useState();
  // const [confirmpassword, setConfirmpassword] = useState();
  // const [password, setPassword] = useState();
  // const [avatar, setAvatar] = useState();
  const [picLoading, setPicLoading] = useState(false);


  const CLOUD_NAME = 'dk0a9bheb';
  const UPLOAD_PRESET_NAME = 'chat-app-pro';
  const UPLOAD_FOLDER_NAME = 'chat-app-avatar';
  const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

  const uploadFileToCloudinary = async (file) => {
    const formDataImage = new FormData();
    formDataImage.append('file', file);
    formDataImage.append('upload_preset', UPLOAD_PRESET_NAME);
    formDataImage.append('folder', UPLOAD_FOLDER_NAME);
    try {
      const response = await axios.post(CLOUDINARY_API_URL, formDataImage, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.secure_url;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const submitHandler = async () => {
    setPicLoading(true);
    console.log(formData)
    if (!formData.name || !formData.confirmpassword || !formData.password || !formData.email) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (formData.password !== formData.confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    try {
      console.log(image)
      const avatar = await uploadFileToCloudinary(image)
      const newData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmpassword,
        image: avatar
      }
      console.log(newData)
      const { data } = await register(newData)
      console.log(data)
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      // đây sẽ là điều hướng ...
    } catch (error) {
      console.log(error.response.data.messsage);
      toast({
        title: "Error Occured!",
        description: error.response.data.messsage ,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };



  
  return <>
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
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
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleInputChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="avatar">
        <FormLabel>Upload your Avatar</FormLabel>
        <Input
          type="file"
          p={1.5}
          name="image"
          onChange={(event)=>{setImage(event.target.files[0])}}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>

  </>
}

export default Register