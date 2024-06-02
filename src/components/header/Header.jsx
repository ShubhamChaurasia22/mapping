// src/components/Header.js
import { Box, Flex, Text } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box
      bg="teal.500"
      w="100%"
      p={4}
      color="white"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Flex justify="space-between" align="center">
        <Text fontSize="xl" fontWeight="bold">
          Mapping
        </Text>
      </Flex>
    </Box>
  );
};

export default Header;
