import React from 'react';
import { useState, useEffect } from "react";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
// import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import StoreIcon from '@mui/icons-material/Store';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { useNavigate } from 'react-router';
import ThadamTextLogo from "../../../src/images/thadam-text-logo.png";

const MenuDrawer = ({ open, close }) => {
    const navigate = useNavigate();
    const [appDrawer, setAppDrawer] = useState(open);
    
    const toggleDrawer = (openDrawer) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setAppDrawer(openDrawer);
        close(openDrawer);
    };

    useEffect(() => {
        setAppDrawer(open);
    }, [open]);
    
    const getMenuList = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem key="dashboard" disablePadding>
                    <ListItemButton onClick={() => navigate("/customers")}>
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText primary="Customers" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="live" disablePadding>
                    <ListItemButton onClick={()=>navigate("/view-company")}>
                        <ListItemIcon>
                            <StoreIcon />
                        </ListItemIcon>
                        <ListItemText primary="Company" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="dashboard" disablePadding>
                    <ListItemButton onClick={() => navigate("/users")}>
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText primary="User" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="dashboard" disablePadding>
                    <ListItemButton onClick={() => navigate("/order")}>
                        <ListItemIcon>
                            <ListAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Order" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="dashboard" disablePadding>
                    <ListItemButton onClick={() => navigate("/products")}>
                        <ListItemIcon>
                            <Inventory2Icon />
                        </ListItemIcon>
                        <ListItemText primary="Products" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
          <Drawer
            anchor={"left"}
            open={appDrawer}
            onClose={toggleDrawer(false)}
          > 
            <Box sx={{paddingLeft: 1, paddingRight: 1, position: "relative", height: "10vh", background: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)"}}>
                <div style={{bottom: "1rem", position: "absolute"}}>
                    <h3>Vivekmani M</h3>
                    <h5>Superadmin</h5>
                </div>
            </Box>
            {getMenuList()}
          </Drawer>
        </div>
    )
}

export default MenuDrawer;