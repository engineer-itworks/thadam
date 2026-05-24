import React, { useEffect, useState } from 'react'
import { 
  Button, 
  TextField, 
  Box, 
  InputLabel, 
  MenuItem, 
  FormControl, 
  Select, 
  Paper, 
  Typography, 
  FormHelperText, 
  Snackbar, 
  Alert, 
  Divider 
} from "@mui/material";
import Grid from '@mui/material/Grid';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useNavigate, useParams } from 'react-router';
import { getDropDownValuesFromEnum, StatusEnum } from '../../common/config';
import AlertMessage from '../../components/alert/AlertMessage';

import { isAlphabet, isNumberic } from '../../common/validation';
import { useSelector } from 'react-redux';
import "./customers.scss";

export const CustomerForm = () => {
  const navigate = useNavigate();
  const selectedCustomerInfo = useSelector((state) => state.customer.selectedCustomer);
  const { customerId } = useParams();

  const [customer, setCustomer] = useState({
    customerId: '',
    name: '',
    primaryContactNumber: '',
    secondaryContactNumber: '',
    address: '',
    status: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    open: false,
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const saveCustomer = async() => {
    setLoading(true);
    let url, update_method, response_message;

    if(customer.id) {
      url = 'http://localhost:3000/customers/update-customer/' + customer.id;
      update_method = "PUT";
      response_message = "Customer updated successfully";
    }
    else {
      url = 'http://localhost:3000/customers/create-customer';
      update_method = "POST";
      response_message = "Customer created successfully";
    }

    await fetch(url, {
      method: update_method, // HTTP method
      headers: {
        'Content-Type': 'application/json', // Tells the server you're sending JSON
      },
      body: JSON.stringify(customer), // Payload you're sending
    })
      .then(async response => {
        if (!response.ok) {
          if(response.status == 400) {
            const errorData = await response.json();
            throw new Error(errorData.details[0].message);
          }
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON from the response
      })
      .then(data => {
        if(!customer.id) {
          clearAllFields();
        }
        
        setAlertMessage({open: true, type: "success", message: response_message});
        setLoading(false);
      })
      .catch(error => {
        setAlertMessage({open: true, type: "error", message: error.message});
        setLoading(false);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      saveCustomer(); // Clear form after successful submission if needed
    }
  };

  const clearAllFields = () => {
    setCustomer({
      customerId: '',
      name: '',
      primaryContactNumber: '',
      secondaryContactNumber: '',
      address: '',
      status: '',
    });
  }

  // For validations
  const validateForm = () => {
    const newErrors = {};

    if (!customer.customerId) newErrors.customerId = 'Customer Id is required';

    if (!customer.name) {
      newErrors.name = 'Name is required';
    }
    else if(!isAlphabet(customer.name)) {
      newErrors.name = 'Name is invalid';
    }

    if (!customer.primaryContactNumber) {
      newErrors.primaryContactNumber = 'Primary contact number is required';
    }
    else if(!isNumberic(customer.primaryContactNumber)) {
      newErrors.primaryContactNumber = 'Primary contact number is invalid';
    }
    else if(customer.primaryContactNumber.length != 10) {
      newErrors.primaryContactNumber = 'Enter 10 digit contact number only';
    }

    if(customer.secondaryContactNumber && !isNumberic(customer.secondaryContactNumber)) {
      newErrors.secondaryContactNumber = 'Secondary contact number is invalid';
    }
    else if(customer.secondaryContactNumber && customer.primaryContactNumber.length != 10) {
      newErrors.secondaryContactNumber = 'Enter 10 digit contact number only';
    }
    
    if (!customer.address) newErrors.address = 'Address is required'; // Add this check
    if (customer.status == undefined) newErrors.status = 'Status is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    setCustomer(selectedCustomerInfo);
  }, []);

  return (
    <div className="customer-form">
      {alertMessage.open ? <AlertMessage info={alertMessage} /> : null}
      <Box sx={{ padding: "1rem" }}>
        <Paper elevation={3}>
          <div className='header'>
            <Typography className='title'>
              {customer.id ? "Edit Customer" : "Add Customer"}
            </Typography>
            &nbsp;&nbsp;
            {/* <Breadcrumbs aria-label="breadcrumb" separator=">">
              <Link underline="hover" color="inherit" sx={{cursor: "pointer"}} onClick={() => navigate("/customers")}>
                Customers
              </Link>
              <Typography sx={{ color: 'text.primary' }}>{customerId ? "Edit Customer" : "Add Customer"}</Typography>
            </Breadcrumbs> */}
            <span className='btn-row'>
              <Button variant="contained" color="primary" size="small" className='header-btn' onClick={() => navigate("/customers")}>
                <FormatListBulletedIcon />&nbsp;View All Customers
              </Button>
            </span>
            <Divider />
          </div>
          <Box className="body" sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField
                  label="Customer ID *"
                  variant="outlined"
                  fullWidth
                  name="customerId"
                  value={customer.customerId}
                  onChange={handleChange}
                  error={!!errors.customerId}
                  helperText={errors.customerId}
                  margin="dense"
                />
              </Grid>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField
                  label="Name *"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={customer.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  margin="dense"
                />
              </Grid>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField
                  label="Primary Contact Number *"
                  variant="outlined"
                  fullWidth
                  name="primaryContactNumber"
                  value={customer.primaryContactNumber}
                  onChange={handleChange}
                  error={!!errors.primaryContactNumber}
                  helperText={errors.primaryContactNumber}
                  margin="dense"
                />
              </Grid>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField
                  label="Secondary Contact Number"
                  variant="outlined"
                  fullWidth
                  name="secondaryContactNumber"
                  value={customer.secondaryContactNumber}
                  error={!!errors.secondaryContactNumber}
                  helperText={errors.secondaryContactNumber}
                  onChange={handleChange}
                  margin="dense"
                />
              </Grid>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField
                  label="Address *"
                  variant="outlined"
                  fullWidth
                  name="address"
                  value={customer.address}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  error={!!errors.address}
                  helperText={errors.address}
                  margin="dense"
                />
              </Grid>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <FormControl fullWidth error={!!errors.status} margin="dense">
                  <InputLabel>Status *</InputLabel>
                  <Select
                    label="Status *"
                    name="status"
                    value={customer.status}
                    onChange={handleChange}
                    margin="dense"
                  >
                    {
                      getDropDownValuesFromEnum(StatusEnum).map(([key, val]) => (
                        <MenuItem key={key} value={val}>
                          {key}
                        </MenuItem>
                      ))
                    }
                    {/* <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem> */}
                  </Select>
                  {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Box className="footer">
            <Box className="btn-row">
              <Button variant="contained" size="small" className='btn' loading={loading} onClick={(e) => handleSubmit(e)}>{customer.id ? "Update Customer" : "Add Customer"}</Button>      
              <Button variant="outlined" size="small" className='btn' onClick={() => navigate("/customers")}>Cancel</Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </div>
  )
}
