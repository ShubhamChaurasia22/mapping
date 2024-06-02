import { Box, Flex } from '@chakra-ui/react';
import Header from './components/header/Header';
import Dropzone from './components/main/Dropzone';
import './App.css';

function App() {

  return (
    <Box>
      <Header />
      <Flex justify="center" p={4}>
        <Dropzone />
      </Flex>
    </Box>
  );
}

export default App
