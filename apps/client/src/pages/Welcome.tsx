import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../state/context';
import { useAsyncCallbacks } from '../state/hooks';
import { Prompt } from './UsernameModal';

export function Welcome() {
    const [username, setUsername] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { sendName, connectApiClient } = useAsyncCallbacks();
    const [error, setError] = useState('');
    const { appState } = useAppState();
    const navigate = useNavigate();
    useEffect(() => {
        connectApiClient().then(() => setIsModalOpen(true));
    }, [connectApiClient]);

    console.log(appState);

    const onSubmit = () => {
        sendName(username).then(errors => {
            if (errors) {
                const error = Array.isArray(errors) ? errors[0] : errors;
                setError(error);
            } else {
                setIsModalOpen(false);
                navigate('/rooms');
                console.log('here');
            }
        });
    };
    return (
        <Prompt
            header="Join the collaboration"
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={onSubmit}
        >
            <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>
        </Prompt>
    );
}
