import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
export default function ClickableChips() {
  const handleClick = () => {
    alert('Sorry! You can search only Tokyo prefecture');
    console.info('user clicked the tokyo')
  };
  const HandleClick=()=>{
    alert ("Sorry!You can search only Tokyo prefecture now.As soon as we will provide for this prefecture.")
  }

  return (
    <Stack direction="row" spacing={1} >
      <Chip icon={<LocationOnIcon style={{fontSize:"20px",color:"white"}}/>} variant='outline' label="Tokyo" onClick={handleClick}  style={{border:"1px solid white",color:"white"}}/>
      <Chip icon={<LocationOnIcon style={{fontSize:"20px",color:"white"}}/>} variant='outline' label="Matsumoto" onClick={HandleClick} style={{border:"1px solid white",color:"white"}}/>
    
    </Stack>
  );
}
