import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';

const SavedDataTable = ({ data, opponentsData }) => {
  const generateOpponentLinks = (productTitle, upc) => {
    return opponentsData.map((opponent, index) => {
      const productTitleLink = opponent.query + encodeURIComponent(productTitle);
      const upcLink = opponent.query + encodeURIComponent(upc);
      return (
        <React.Fragment key={index}>
          <Td>
            <Button as="a" href={prependHTTP(productTitleLink)} target="_blank" rel="noopener noreferrer" colorScheme="teal" variant="outline">
              {`${opponent.name} PT Link`}
            </Button>
          </Td>
          <Td>
            <Button as="a" href={prependHTTP(upcLink)} target="_blank" rel="noopener noreferrer" colorScheme="teal" variant="outline">
              {`${opponent.name} UPC Link`}
            </Button>
          </Td>
        </React.Fragment>
      );
    });
  };

  const prependHTTP = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return `http://${url}`;
    }
    return url;
  };

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Product Title</Th>
          <Th>UPC</Th>
          {opponentsData.map((opponent, index) => (
            <React.Fragment key={index}>
              <Th colSpan="2">{`${opponent.name}`}</Th>
            </React.Fragment>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item, index) => (
          <Tr key={index}>
            <Td>{item.productTitle}</Td>
            <Td>{item.upc}</Td>
            {generateOpponentLinks(item.productTitle, item.upc)}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default SavedDataTable;
