import React, { useEffect, useState } from 'react';
import {
  Button,
  Paper,
  Box, 
  Typography,
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem
} from "@mui/material";
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import AlertMessage from '../../components/alert/AlertMessage';
import TableList from '../../components/table/TableList';
import { getDropDownValuesFromEnum, StatusEnum } from '../../common/config';
import { productTableColumns } from '../../common/tableColumns';

import { useDispatch } from 'react-redux';

// Custom CSS
import './products.scss';
import { selectCustomer } from '../../slice/customerSlice';
import DeleteModal from '../../components/modal/DeleteModal';

export const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    open: false,
    type: "",
    message: "",
  });

  const getAllCustomers = async() => {
    await fetch('http://localhost:3000/customers/get-all-customers') // Replace with your API URL
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Convert response to JSON
    })
    .then(data => {
      setCustomerList(data);
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
  }

  const addProduct = () => {
    dispatch(selectCustomer({}));
    navigate("/new-product");
  }

  const editProduct = (customerInfo) => {
    dispatch(selectCustomer(customerInfo));
    navigate("/edit-product");
  }

  const deleteCustomerConfirm = (customerInfo) => {
    setSelectedCustomerId(customerInfo.id);
    dispatch(selectCustomer(customerInfo));
    handleDeleteModal(true);
  }

  const deleteCustomer = async() => {
    await fetch('http://localhost:3000/customers/delete-customer/' + selectedCustomerId, {
      method: "DELETE", // HTTP method
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the JSON from the response
    })
    .then(data => {
      setAlertMessage({open: true, type: "success", message: "Customer deleted successfully"});
      getAllCustomers();
      handleDeleteModal(false);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  const handleDeleteModal = (val) => {
    setOpenDeleteModal(val);
  }

  useEffect(() => {
    getAllCustomers();
  }, [])

  return (
    <div className="shops">
      {alertMessage.open ? <AlertMessage info={alertMessage} /> : null}
      <Box sx={{ padding: "1rem" }}>
        <Paper elevation={3}>
          <div className='header'>
            <Typography className='title'>
              Products
            </Typography>
            <span className='btn-row'>
              <Button variant="contained" className='btn header-btn' sx={{ background: '#04B900' }} onClick={() => addProduct()}>
                <PersonAddIcon />&nbsp;Add New Product
              </Button>
              <Button variant="contained" className='btn header-btn' sx={{ background: '#3240C3' }} disabled>
                <UpgradeIcon />&nbsp;Export
              </Button>
            </span>
          </div>
          <div className='body'>
            <Grid container spacing={2}>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField id="standard-basic" label="Customer Name" variant="outlined" fullWidth size="small" />
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
                <TableList columns={productTableColumns} data={customerList} onEdit={editProduct} onDelete={deleteCustomerConfirm} />
              </Paper>
            </div>
            <div>
              <DeleteModal open={openDeleteModal} close={handleDeleteModal} onConfirm={deleteCustomer} />
            </div>
          </div>
        </Paper>
      </Box>
    </div>
  );
};
