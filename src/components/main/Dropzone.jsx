import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Text, Button, VStack, HStack, Wrap } from '@chakra-ui/react';
import EnterDataModal from '../modal/EnterDataModal';
import EnterOpponentModal from '../modal/EnterOpponentModal';
import SavedDataTable from '../table/SavedDataTable';
import * as XLSX from 'xlsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  setUrls,
  setFileUploaded,
  setFileName,
  setShowDataModal,
  addSavedData,
  addOpponentData,
  toggleShowTable,
  setShowOpponentModal,
  reset,
  setShowUrls,
} from '../../slices/dataSlice';

const Dropzone = () => {
  const dispatch = useDispatch();
  const {
    urls,
    fileUploaded,
    fileName,
    showDataModal,
    savedData,
    opponentsData,
    showTable,
    showOpponentModal,
    showUrls,
  } = useSelector((state) => state.data);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    dispatch(setFileName(file.name));
    console.log("File dropped:", file);

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log("JSON Data:", jsonData);

      const urlColumn = jsonData.map(row => row.URL).filter(Boolean);
      console.log("Extracted URLs:", urlColumn);
      dispatch(setUrls(urlColumn));
      dispatch(setFileUploaded(true));
    };

    reader.readAsArrayBuffer(file);
  }, [dispatch]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
  });

  const handleReset = () => {
    dispatch(reset());
  };

  const handleStart = () => {
    dispatch(setShowUrls(true));
  };

  const handleDataSubmit = (data) => {
    dispatch(addSavedData(data));
    dispatch(setShowDataModal(false));
  };

  const handleShowOpponentModal = () => {
    dispatch(setShowOpponentModal(true));
  };

  const handleEnterData = () => {
    dispatch(setShowDataModal(true));
  };

  const handleToggleTable = () => {
    dispatch(toggleShowTable());
  };

  const handleOpponentsSubmit = (data) => {
    dispatch(addOpponentData(data));
    dispatch(setShowOpponentModal(false));
  };

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
        <VStack spacing={4} mt="2rem">
          <Wrap spacing={4} justify="center">
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
                {`Button URL ${index + 1}`}
              </Button>
            ))}
          </Wrap>
          <HStack spacing={4}>
            <Button onClick={handleShowOpponentModal} colorScheme="teal">
              Enter Opponents
            </Button>
            <Button onClick={handleEnterData} colorScheme="teal">
              Enter Data
            </Button>
            <Button onClick={handleToggleTable} colorScheme="teal">
              {showTable ? 'Hide Table' : 'Show Table'}
            </Button>
          </HStack>
          <EnterOpponentModal isOpen={showOpponentModal} onClose={() => dispatch(setShowOpponentModal(false))} onSubmit={handleOpponentsSubmit} />
          <EnterDataModal isOpen={showDataModal} onClose={() => dispatch(setShowDataModal(false))} onSubmit={handleDataSubmit} />
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
