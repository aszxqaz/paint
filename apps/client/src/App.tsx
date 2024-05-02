import { ChakraProvider, theme } from '@chakra-ui/react';
import './index.css';
import { Paint } from './pages/Paint';

export function App() {
    return (
        <ChakraProvider theme={theme}>
            <Paint />
        </ChakraProvider>
    );
}
