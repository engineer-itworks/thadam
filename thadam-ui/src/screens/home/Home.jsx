import React, { use, useEffect, useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuDrawer from "../../components/menudrawer/MenuDrawer";
import { useNavigate } from "react-router";

//Custom Styles
import "./home.scss";
import { Outlet } from "react-router";

const Home = () => {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const openMenuDrawer = () => {
        setDrawerOpen(true);
    }

    const hideMenuDrawer = (val) => {
        setDrawerOpen(val);
    }

    const logout = () => {
        navigate("/login");
    }

    return (
        <div className="home">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => openMenuDrawer()}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: "pointer" }} onClick={() => navigate("/")}>
                        Thadam
                    </Typography>
                    <Button color="inherit" onClick={() => logout()}><LogoutIcon />Log Out</Button>
                </Toolbar>
            </AppBar>
            <MenuDrawer open={drawerOpen} close={hideMenuDrawer} />
            <Outlet />
        </div>
    )
}

export default Home;