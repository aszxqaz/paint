import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Link,
    VStack,
    useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApiClient } from '../api';
import { Prompt } from './UsernameModal';

export function LobbyPage() {
    const [roomname, setRoomname] = useState('');
    const [error, setError] = useState('');
    const { apiClient } = useApiClient();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {}, []);

    const onSubmit = async () => {
        setIsLoading(true);
        const response = await apiClient.createRoom(roomname);
        if ('error' in response) {
            const error = Array.isArray(response.error)
                ? response.error[0]
                : response.error;
            setError(error);
        } else {
            onClose();
            navigate(`/rooms/${response.data.room.id}`);
            console.log('received room from server');
        }
        setIsLoading(false);
    };

    return (
        <VStack>
            <VStack>
                {appState.rooms?.map(room => (
                    <Link as={NavLink} to={`/${room.id}`} />
                ))}
            </VStack>
            <Button
                onClick={onOpen}
                isLoading={isLoading}
                isDisabled={isLoading}
            >
                Create room
            </Button>
            <Prompt
                header="Create a room"
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={onSubmit}
            >
                <FormControl>
                    <FormLabel>Room name</FormLabel>
                    <Input
                        value={roomname}
                        onChange={e => setRoomname(e.target.value)}
                        placeholder="Username"
                    />
                    <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>
            </Prompt>
        </VStack>
    );
}
