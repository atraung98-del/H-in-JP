import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import * as React from 'react';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function ClickableChips() {
   const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 

  return (
    <Stack direction="row" spacing={1} >
      <Chip icon={<LocationOnIcon style={{fontSize:"20px",color:"white"}}/>} variant='outline' label="Tokyo" onClick={handleOpen}  style={{border:"1px solid white",color:"white"}}/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Notice
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             This prefecture or city is not avaliable for now.
          </Typography>
        </Box>
      </Modal>
      <Chip icon={<LocationOnIcon style={{fontSize:"20px",color:"white"}}/>} variant='outline' label="Matsumoto" onClick={handleOpen} style={{border:"1px solid white",color:"white"}}/>
    
    </Stack>
  );
}
