import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import React, { Children, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import UserListItem from '../UserAvatar/UserListItem';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import instance from '../../api';

const GroupChatModal = ({ children }) => {

    const { user, chats, setChats } = ChatState();
    const { isOpen, onOpen, onClose } = useDisclosure();


    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            };
            const { data } = await instance.get(`/user?search=${search}`, config);
            setLoading(false);
            setSearchResult(data.users);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };
    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            toast({
                title: "Please fill all the feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            };
            const { data } = await instance.post(
                `/chat/group`,
                {
                    name: groupChatName,
                    users: JSON.stringify(selectedUsers.map((u) => u._id)),
                },
                config
            );
            console.log(data)
            setChats([data, ...chats]);
            onClose();
            toast({
                title: "New Group Chat Created!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        } catch (error) {
            toast({
                title: "Failed to Create the Chat!",
                description: error.response.data,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toast({
                title: "User already added",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        setSelectedUsers([...selectedUsers, userToAdd]);
    };

    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
    };

    return <>
        <span onClick={onOpen}>{children}</span>

        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader
                    fontSize="35px"
                    fontFamily="Work sans"
                    d="flex"
                    justifyContent="center"
                >
                    Create Group Chat
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody display="flex" flexDir="column" alignItems="center">
                    <FormControl>
                        <Input
                            placeholder="Chat Name"
                            mb={3}
                            onChange={(e) => setGroupChatName(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <Input
                            placeholder="Add Users eg: John, Piyush, Jane"
                            mb={1}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </FormControl>
                    <Box w="100%" d="flex" flexWrap="wrap">
                        {selectedUsers.map((u) => (
                            <UserBadgeItem
                                key={u._id}
                                user={u}
                                handleFunction={() => handleDelete(u)}
                            />
                        ))}
                    </Box>
                    {loading ? (
                        // <ChatLoading />
                        <div>Loading...</div>
                    ) : (
                        searchResult
                            ?.slice(0, 4)
                            .map((user) => (
                                <UserListItem
                                    key={user._id}
                                    users={user}
                                    handleFunction={() => handleGroup(user)}
                                />
                            ))
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={handleSubmit}
                        colorScheme="blue">
                        Create Chat
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
}

export default GroupChatModal