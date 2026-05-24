import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Button,
  Paper,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import TableList from '../../components/table/TableList';
import { getDropDownValuesFromEnum, StatusEnum } from '../../common/config';

import { userTableColumns } from '../../common/tableColumns';

import './User.scss';

export const UserList = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  const [userList, setUserList] = useState([]);

  const addUser = () => {
    navigate("/new-user");
  }

  const getAllUsers = async () => {
    await fetch('http://localhost:3000/users/get-all-users') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUserList(data);
        console.log('User data received:', data);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  };

  const handleChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="user">
      <Box sx={{ padding: "1rem" }}>
        <Paper elevation={3}>
          <div className='header'>
            <Typography className='title'>
              Users
            </Typography>
            <span className='btn-row'>
              <Button variant="contained" className='btn header-btn' sx={{ background: '#04B900' }} onClick={addUser}>
                <PersonAddIcon />&nbsp;Add New User
              </Button>
              <Button variant="contained" className='btn header-btn' sx={{ background: '#3240C3' }} disabled>
                <UpgradeIcon />&nbsp;Export
              </Button>
            </span>
          </div>
          <div className='body'>
            <Grid container spacing={2}>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField id="standard-basic" label="User Name" variant="outlined" fullWidth size="small" />
              </Grid>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField id="standard-basic" label="Contact Number" variant="outlined" size="small" fullWidth />
              </Grid>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <Box >
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Status"
                      
                    >
                      {
                        getDropDownValuesFromEnum(StatusEnum).map(([key, val]) => (
                          <MenuItem key={key} value={val}>
                            {key}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <Box className="btn-row">
                  <Button variant="contained" className='btn' size="small" color="secondary" disabled><FilterAltIcon />&nbsp;Apply Filters</Button>
                  <Button variant="contained" className='btn' size="small" color="secondary" disabled><ClearAllIcon />&nbsp;Reset</Button>
                </Box>
              </Grid>
            </Grid>
            <div>
              <Paper sx={{ mt: 2, width: '100%', overflow: 'hidden' }} elevation={3}>
                <TableList columns={userTableColumns} data={userList} />
              </Paper>
            </div>
          </div>
        </Paper>
      </Box>
      {/* <Box sx={{ padding: "1rem" }}>
        <Paper elevation={3} sx={{ padding: "0.5rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <Typography variant="h6" component="h6" sx={{ display: "inline-block", marginRight: "0.5rem" }}>
              Users
            </Typography>
            <Button variant="contained" sx={{ float: "right", background: '#04B900' }} onClick={() => navigate("/add-user")}>
              <PersonAddIcon />&nbsp;Add New
            </Button>
            <Button variant="contained" sx={{ float: "right", background: '#3240C3', marginRight: "0.5rem" }}>
              <UpgradeIcon />&nbsp;Export
            </Button>
          </div>
          <Accordion className="filter-container" expanded={expanded} onChange={handleChange}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">{expanded ? "Hide Filters" : "Show Filters"}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                  <TextField id="name" label="Name" variant="outlined" fullWidth size="small" />
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                  <TextField id="role" label="Role" variant="outlined" size="small" fullWidth />
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                      labelId="status-label"
                      id="status-select"
                      label="Status"
                      sx={{ width: '100%' }}
                      size="small"
                    >
                      {
                        getDropDownValuesFromEnum(StatusEnum).map(([key, val]) => (
                          <MenuItem key={key} value={val}>
                            {key}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </AccordionDetails>
            <AccordionActions>
              <Button variant="contained" color="secondary" size="small"><ClearAllIcon />&nbsp;Reset</Button>
              <Button variant="contained" color="secondary" size="small"><FilterAltIcon />&nbsp;Apply Filters</Button>
            </AccordionActions>
          </Accordion>
          <div className='TableContent'>
            <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={3}>
              <TableList columns={columns} data={userList} editUrl="edit-user" />
            </Paper>
          </div>
        </Paper>
      </Box> */}
    </div>
  );
};
