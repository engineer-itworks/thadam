import { Box } from "@mui/material";
import EmptyFolderIcon from "../images/empty_folder_icon.png";

const boxStyle = {
    background: "#f7f7f7",
    borderRadius: "5px",
    lineHeight: 2,
    padding: "5rem",
    textAlign: "center"
}

const NoRecords = () => {
    return (
        <Box style={boxStyle}>
            <img src={EmptyFolderIcon} />
            <h5>No records found</h5>
        </Box>
    )
}

export default NoRecords;