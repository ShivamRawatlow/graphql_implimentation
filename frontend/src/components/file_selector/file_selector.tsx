import { Button, CardMedia, Grid, Modal } from '@mui/material';
import { useState } from 'react';
import { DropEvent, FileRejection } from 'react-dropzone';
import StyledDropzone from './styled_dropzone';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30rem',
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
}: {
  openDropzone: boolean;
  setOpenDropZone: React.Dispatch<React.SetStateAction<boolean>>;
  uploadFunction: (file: File) => Promise<void>;
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
      open={openDropzone}
      onClose={() => setOpenDropZone(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Grid sx={style}>
        <StyledDropzone onDrop={onDrop} />
        <Grid
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {file && (
            <>
              <CardMedia
                style={{
                  margin: '1rem',
                  width: '10rem',
                  height: '10rem',
                  borderRadius: '5rem',
                }}
                component='img'
                src={URL.createObjectURL(file || new Blob())}
              />
              <Grid
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Button variant='contained' onClick={handleOnSave}>
                  Save
                </Button>
                <Button variant='contained' onClick={() => setFile(null)}>
                  Reject
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Modal>
  );
};

export default FileSelector;
