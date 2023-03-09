import { Box, Button, CardMedia, Modal } from '@mui/material';
import { useState } from 'react';
import { DropEvent, FileRejection } from 'react-dropzone';
import StyledDropzone from './styled_dropzone';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30rem',
  maxWidth: '80%',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const FileSelector = ({
  openDropzone,
  setOpenDropZone,
  uploadFunction,
  isProfile,
}: {
  openDropzone: boolean;
  setOpenDropZone: React.Dispatch<React.SetStateAction<boolean>>;
  uploadFunction: (file: File) => Promise<void>;
  isProfile: boolean;
}) => {
  const onDrop = <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    } else {
      setFile(null);
    }
  };

  const [file, setFile] = useState<File | null>(null);

  const handleOnSave = async () => {
    if (!file) return;
    await uploadFunction(file);
    setOpenDropZone(false);
  };

  return (
    <Modal
      keepMounted={true}
      open={openDropzone}
      onClose={() => setOpenDropZone(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        {!file && <StyledDropzone onDrop={onDrop} />}
        {file && (
          <>
            <CardMedia
              style={{
                margin: '1rem',
                width: isProfile ? '10rem' : '25rem',
                height: isProfile ? '10rem' : 'auto',
                borderRadius: isProfile ? '5rem' : '0.2rem',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              component='img'
              src={URL.createObjectURL(file || new Blob())}
            />
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              <Button variant='contained' onClick={handleOnSave}>
                Save
              </Button>
              <Button variant='contained' onClick={() => setFile(null)}>
                Reject
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default FileSelector;
