import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Register from '../components/Auth/Register'
import Login from '../components/Auth/Login'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const [user, setUser] = useState()

    const navigate = useNavigate()

    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setUser(userInfo)
        if(!userInfo){
            navigate('/')
        }
    },[navigate])
  


  return <Container maxW="xl" centerContent>
    <Box
      d="flex"
      justifyContent="center"
      p={3}
      bg={"while"}
      w="100%"
      m="40px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px"
    >
      <Text fontSize="4xl" fontFamily="Work sans" color="black" textAlign="center" >Chap App Pro</Text>
    </Box>
    <Box bg="white" w="100%" p={4} borderRadius='lg' borderWidth='1px' color='black'>
      <Tabs variant='soft-rounded'>
        <TabList mb="1em">

          <Tab w="50%">Login</Tab>
          <Tab w="50%">Register</Tab>

        </TabList>
        <TabPanels>

          <TabPanel> <Login /> </TabPanel>
          <TabPanel> <Register /> </TabPanel>

        </TabPanels>
      </Tabs>
    </Box>
  </Container>
}

export default Home