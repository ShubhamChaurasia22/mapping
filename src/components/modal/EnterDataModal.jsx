import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

const EnterDataModal = ({ isOpen, onClose, onSubmit }) => {
  const [productTitle, setProductTitle] = useState('');
  const [upc, setUpc] = useState('');

  const handleSubmit = () => {
    onSubmit({ productTitle, upc });
    setProductTitle('');
    setUpc('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter Data</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Product Title</FormLabel>
            <Input value={productTitle} onChange={(e) => setProductTitle(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>UPC</FormLabel>
            <Input value={upc} onChange={(e) => setUpc(e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleSubmit}>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EnterDataModal;
