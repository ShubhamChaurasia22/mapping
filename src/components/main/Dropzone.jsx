import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Text, Button, VStack, HStack, Wrap } from '@chakra-ui/react';
import EnterDataModal from '../modal/EnterDataModal';
import EnterOpponentModal from '../modal/EnterOpponentModal';
import SavedDataTable from '../table/SavedDataTable';
import * as XLSX from 'xlsx';

const Dropzone = () => {
  const [urls, setUrls] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [showUrls, setShowUrls] = useState(false);
  const [fileName, setFileName] = useState("");
  const [showDataModal, setShowDataModal] = useState(false);
  const [savedData, setSavedData] = useState([]);
  const [opponentsData, setOpponentsData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showOpponentModal, setShowOpponentModal] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileName(file.name);
    console.log("File dropped:", file); // Debugging line

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log("JSON Data:", jsonData); // Debugging line

      // Adjust the column name to match your Excel file
      const urlColumn = jsonData.map(row => row.URL).filter(Boolean);
      console.log("Extracted URLs:", urlColumn); // Debugging line
      setUrls(urlColumn);
      setFileUploaded(true);
    };

    reader.readAsArrayBuffer(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
  });

  const handleReset = () => {
    setUrls([]);
    setFileUploaded(false);
    setShowUrls(false);
    setFileName("");
    setShowTable(false);
    setShowDataModal(false);
    setShowOpponentModal(false);
    setSavedData([]);
    setOpponentsData([]);
  };

  const handleStart = () => {
    setShowUrls(true);
  };

  const handleDataSubmit = (data) => {
    setSavedData([...savedData, data]);
    setShowDataModal(false); // Close the data modal after submission
  };

  const handleShowOpponentModal = () => {
    setShowOpponentModal(true);
  };

  const handleEnterData = () => {
    setShowDataModal(true); // Show the data modal when clicking Enter Data button
    setShowTable(false); // Hide the table when clicking Enter Data button
  };

  const handleShowTable = () => {
    setShowTable(!showTable);
    setShowDataModal(false);
    setShowOpponentModal(false);
  };

  const handleOpponentsSubmit = (data) => {
    setOpponentsData([...opponentsData, data]);
    setShowOpponentModal(false); // Close the opponent modal after submission
  };

  useEffect(() => {
    console.log("Opponents Data:", opponentsData);
  }, [opponentsData]);

  return (
    <Box>
      {!fileUploaded ? (
        <Box
        className="dropzone"
          width="100%"
          mx="auto"
          mt="2rem"
          p={10}
          border="2px dashed"
          borderColor={isDragActive ? 'teal.500' : 'gray.200'}
          bg={isDragActive ? 'teal.50' : 'gray.50'}
          textAlign="center"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <Text>Drop the files here ...</Text>
          ) : (
            <Text>Drag 'n' drop an Excel file here, or click to select file</Text>
          )}
        </Box>
      ) : (
        <Box
          width="100%"
          mx="auto"
          mt="2rem"
          p={10}
          border="2px dashed"
          borderColor="teal.500"
          bg="gray.50"
          textAlign="center"
        >
          <Text>Uploaded File: {fileName}</Text>
        </Box>
      )}
      {fileUploaded && !showUrls && (
        <HStack spacing={4} mt="2rem" justify="center">
          <Button onClick={handleStart} colorScheme="teal">
            Start
          </Button>
        </HStack>
      )}
      {showUrls && (
        <Wrap spacing={4} mt="2rem" justify="center">
          {urls.map((url, index) => (
            <Button
              key={index}
              as="a"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              colorScheme="teal"
              variant="outline"
            >
              {`Button URL ${index+1}`}
            </Button>
          ))}
        </Wrap>
      )}
      {showUrls && (
        <VStack spacing={4} mt="2rem">
          <HStack spacing={4}>
            <Button onClick={handleShowOpponentModal} colorScheme="teal">
              Enter Opponents
            </Button>
            <Button onClick={handleEnterData} colorScheme="teal">
              Enter Data
            </Button>
            <Button onClick={handleShowTable} colorScheme="teal">
              {showTable ? 'Hide Table' : 'Show Table'}
            </Button>
          </HStack>
          <EnterOpponentModal isOpen={showOpponentModal} onClose={() => setShowOpponentModal(false)} onSubmit={handleOpponentsSubmit} />
          <EnterDataModal isOpen={showDataModal} onClose={() => setShowDataModal(false)} onSubmit={handleDataSubmit} />
          {showTable && <SavedDataTable data={savedData} opponentsData={opponentsData} />}
          <Button onClick={handleReset} colorScheme="red">
            Reset
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default Dropzone;
