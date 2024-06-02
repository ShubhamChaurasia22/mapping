import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, FormHelperText, VStack } from '@chakra-ui/react';

const EnterOpponentModal = ({ isOpen, onClose, onSubmit }) => {
  const [opponent, setOpponent] = useState({ name: '', query: '' });

  const handleSubmit = () => {
    if (opponent.name && opponent.query) {
      onSubmit(opponent);
      setOpponent({ name: '', query: '' }); // Clear the opponent state after submission
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter Opponent</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Opponent Name</FormLabel>
              <Input value={opponent.name} onChange={(e) => setOpponent({ ...opponent, name: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>Opponent Search Query</FormLabel>
              <Input value={opponent.query} onChange={(e) => setOpponent({ ...opponent, query: e.target.value })} />
              <FormHelperText>Example: www.example.com?q=</FormHelperText>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleSubmit}>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EnterOpponentModal;
