import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

type UsernameModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    header: string;
} & PropsWithChildren;

export function Prompt({
    isOpen,
    onClose,
    header,
    onSubmit,
    children,
}: UsernameModalProps) {
    const initialRef = React.useRef(null);

    return (
        <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{header}</ModalHeader>
                <ModalBody pb={6}>{children}</ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onSubmit}>
                        Submit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
