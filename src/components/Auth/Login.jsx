import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { login, register } from '../../api/user';
import {useNavigate} from "react-router-dom"

const Login = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const navagate  = useNavigate()
    const toast = useToast();


    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [picLoading, setPicLoading] = useState(false);


    const submitHandler = async () => {
        setPicLoading(true);
        if (!email || !password) {
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
        try {
            const newData = {
                email: email,
                password: password,
            }
            console.log(newData)
            const { data } = await login(newData)
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
            navagate("/chats")
        } catch (error) {
            console.log(error.response.data.messsage);
            toast({
                title: "Error Occured!",
                description: error.response.data.messsage,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
        }
    };


    return <VStack spacing="5px">

        <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
                type="email"
                placeholder="Enter Your Email Address"
                onChange={(e) => setEmail(e.target.value)}
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
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
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
}

export default Login