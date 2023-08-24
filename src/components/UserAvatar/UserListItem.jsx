import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Avatar, Box, Text } from '@chakra-ui/react'

const UserListItem = ({ users, handleFunction }) => {
    const { user } = ChatState()
    // console.log(users)




    return <>
        <Box
            onClick={handleFunction}
            cursor="pointer"
            bg="#E8E8E8"
            _hover={{
                background: "#38B2AC",
                color: "white",
            }}
            w="100%"
            display="flex"
            alignItems="center"
            color="black"
            px={3}
            py={2}
            mb={2}
            borderRadius="lg"
        >
            <Avatar
                mr={2}
                size="sm"
                cursor="pointer"
                name={users.name}
                src={users.image}
            />
            <Box>
                <Text>{users.name}</Text>
                <Text fontSize="xs">
                    <b>Email : </b>
                    {users.email}
                </Text>
            </Box>
        </Box>
    </>
}

export default UserListItem