import { Center, Spinner, Text, VStack } from '@chakra-ui/react';

type LoadingIndicatorProps = {
    message: string;
};

export function LoadingIndicator({ message }: LoadingIndicatorProps) {
    return (
        <Center mt="35vh">
            <VStack gap="1rem">
                <Spinner size="xl" />
                <Text>{message}</Text>
            </VStack>
        </Center>
    );
}
