import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, useScrollTrigger, Button } from "@mui/material";
import DeleteIcon from "../../images/delete-icon.png";

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const deleteIconStyle = {
    width: "25%",
    opacity: 0.7
}

const DeleteModal = ({open, close, onConfirm}) => {
    const [openModal, setOpenModal] = useState(open);

    const handleClose = () => {
        setOpenModal(false);
        close(false);
    }

    useEffect(() => {
        setOpenModal(open);
    }, [open]);

    return (
        <div>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={boxStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Do you want to delete this Record?
                    </Typography>
                    <Box sx={{textAlign: "center", mt: 4, mb: 4}}>
                        <img src={DeleteIcon} style={deleteIconStyle} />
                    </Box>
                    <Box style={{textAlign: "center"}}>
                        <Button variant="contained" size="small" color="error" sx={{mr: 1}} onClick={onConfirm}>Yes</Button>
                        <Button variant="outlined" size="small" color="error" sx={{ml: 1}} onClick={handleClose}>No</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default DeleteModal;