import React from 'react'
import './Login.scss'
import { useState } from 'react';
import { Box, Paper, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router';
import ThadamLogo from "../../../src/images/thadam-logo.png";

const LogIn = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const logIn = () => {
        navigate("/");
    }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 400,
          padding: 5,
          margin: "auto",
          marginTop: 25
        },
      }}
      className="login"
    >
        <Paper elevation={0}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <img src={ThadamLogo} />
            </div>
            <div>
                <TextField id="standard-basic" label="Username*" variant="outlined" margin="normal" fullWidth />
                <FormControl variant="outlined" margin="normal" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label={
                                    showPassword ? 'hide the password' : 'display the password'
                                }
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <Button sx={{ marginTop: 3 }} variant="contained" margin="normal" onClick={logIn}>LOG IN</Button>
                <Button sx={{ marginTop: 3, marginLeft: 2 }} margin="normal">Forgot Password?</Button>
            </div>
        </Paper>
    </Box> 
  )
}

export default LogIn;
