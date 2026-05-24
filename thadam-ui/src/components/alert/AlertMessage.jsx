import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const AlertMessage = ({info}) => {
    const [open, setOpen] = useState(info.open);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    return (
        <div>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert
                    severity={info.type}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {info.message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default AlertMessage;