import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Typography,
  
} from "@mui/material";

import {
  Person,
  Settings,
  Logout,
} from "@mui/icons-material";

import { useAuth } from "../../authcontext/AuthContext";

export default function UserProfileMenu() {

  const [anchorEl, setAnchorEl] = useState(null);

  const { user, logout ,loading} = useAuth();

  const navigate = useNavigate();

  const open = Boolean(anchorEl);


  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleProfile = () => {
    handleClose();

    navigate("/provider/Provider/settings");
  };


  const handleSettings = () => {
    handleClose();

    navigate("/provider/Provider/settings");
  };


  const handleLogout = async () => {

    handleClose();

    await logout();

    navigate("/");
  };


  const fullName =
    user?.profile?.full_name ||
      user?.full_name ||
      "";


  return (
    <>
      <IconButton
        onClick={handleOpen}
        size="small"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          borderRadius: "10px",
          padding: "6px 10px",
          
        }}
        style={{backgroundColor:"#e9e6e6"}}
      >

        <Avatar
          sx={{
            width: 34,
            height: 34,
            backgroundColor: "#172033",
            fontSize: "14px",
          }}
        >
          {fullName.charAt(0).toUpperCase()}
        </Avatar>


        <Typography
          sx={{
            color: "#484848",
            fontSize: "14px",
            fontWeight: 500,
            
          }}
        >
          {fullName}
        </Typography>
          <ArrowDropDownIcon/>
      </IconButton>
          
          
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
          
        <MenuItem onClick={handleProfile} >

          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>

          My Profile
           

        </MenuItem>

        <MenuItem>
         <p
  style={{
    display: "block",
    background: "#38acfa",
    minWidth: "70px",
    height: "20px",
    textAlign: "center",
    fontSize: "12px",
    color: "white",
    borderRadius: "20px",
    marginLeft: "40px",
    lineHeight: "20px",
  }}
>
  {loading
    ? "Loading..."
    : user?.profile?.profile_type ||
      user?.profile_type ||
      ""}
</p>
        </MenuItem>
         

        <MenuItem onClick={handleSettings}>

          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>

          Settings

        </MenuItem>


        <Divider />


        <MenuItem onClick={handleLogout}>

          <ListItemIcon>
            <Logout
              fontSize="small"
              sx={{
                color: "#e53935",
              }}
            />
          </ListItemIcon>

          <Typography
            sx={{
              color: "#e53935",
            }}
          >
            Logout
          </Typography>

        </MenuItem>

      </Menu>
      
    </>
  );
}