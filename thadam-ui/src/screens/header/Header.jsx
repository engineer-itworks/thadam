import React, { useState } from 'react'
import './Header.scss'
import Logo from '../../images/logo.png'
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuDrawer from "../../components/menudrawer/MenuDrawer";

export const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <header>
        <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setDrawerOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Thadam
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
    </header>
  )
}
