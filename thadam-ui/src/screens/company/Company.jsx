import React, { useState } from 'react';
import './Company.scss';
import {
  Paper, TextField, Button, FormControl, InputLabel, Select, MenuItem,
  Grid, Box, Typography, FormHelperText, Divider, RadioGroup, FormControlLabel, Radio, FormLabel
} from '@mui/material';
import { useNavigate } from 'react-router';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { getDropDownValuesFromEnum, CurrencyTypeEnum } from '../../common/config';
import AlertMessage from '../../components/alert/AlertMessage';

export const Company = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState({
    companyName: '',
    businessType: '',
    industryType: '',
    address: '',
    licenseNumber: '',
    gstNumber: '',
    fssaiNumber: '',
    currency: '',
    branches: '',
    status: 'Active',
  });

  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState({ open: false, type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Submitted Company:", company);
      setAlertMessage({ open: true, type: 'success', message: 'Company profile saved successfully!' });
      clearForm();
    }
  };

  const clearForm = () => {
    setCompany({
      companyName: '', businessType: '', industryType: '', address: '',
      licenseNumber: '', gstNumber: '', fssaiNumber: '', currency: '', branches: '', status: 'Active'
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!company.companyName) newErrors.companyName = 'Company name is required';
    if (!company.businessType) newErrors.businessType = 'Business type is required';
    if (!company.industryType) newErrors.industryType = 'Industry type is required';
    if (!company.address) newErrors.address = 'Address is required';
    if (!company.currency) newErrors.currency = 'Currency is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="company-form">
      {alertMessage.open && <AlertMessage info={alertMessage} />}
      <Box sx={{ padding: "1rem" }}>
        <Paper elevation={3}>
          <div className='header'>
            <Typography className='title'>Add Company</Typography>
            <span className='btn-row'>
              <Button variant="contained" color="primary" size="small" className='header-btn' onClick={() => navigate("/view-company")}> <FormatListBulletedIcon />&nbsp;View All </Button>
            </span>
            <Divider />
          </div>

          <Box className="body" sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <TextField label="Company Name *" name="companyName" value={company.companyName} onChange={handleChange} error={!!errors.companyName} helperText={errors.companyName} fullWidth margin="dense" />
              </Grid>
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <TextField label="Business Type *" name="businessType" value={company.businessType} onChange={handleChange} error={!!errors.businessType} helperText={errors.businessType} fullWidth margin="dense" />
              </Grid>
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <TextField label="Industry Type *" name="industryType" value={company.industryType} onChange={handleChange} error={!!errors.industryType} helperText={errors.industryType} fullWidth margin="dense" />
              </Grid>
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <TextField label="Address *" name="address" value={company.address} onChange={handleChange} error={!!errors.address} helperText={errors.address} fullWidth margin="dense" multiline rows={4} />
              </Grid>
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <FormControl fullWidth error={!!errors.currency} margin="dense">
                  <InputLabel>Currency *</InputLabel>
                  <Select label="Currency *" name="currency" value={company.currency} onChange={handleChange}>
                    {getDropDownValuesFromEnum(CurrencyTypeEnum).map(([key, val]) => (
                      <MenuItem key={key} value={val}>{key}</MenuItem>
                    ))}
                  </Select>
                  {errors.currency && <FormHelperText>{errors.currency}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <TextField label="License Number" name="licenseNumber" value={company.licenseNumber} onChange={handleChange} fullWidth margin="dense" />
              </Grid>
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <TextField label="GST Number" name="gstNumber" value={company.gstNumber} onChange={handleChange} fullWidth margin="dense" />
              </Grid>
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <TextField label="FSSAI Number" name="fssaiNumber" value={company.fssaiNumber} onChange={handleChange} fullWidth margin="dense" />
              </Grid>
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <TextField label="Branches" name="branches" value={company.branches} onChange={handleChange} fullWidth margin="dense" />
              </Grid>
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <FormControl component="fieldset" margin="dense">
                  <FormLabel>Status</FormLabel>
                  <RadioGroup name="status" value={company.status} onChange={handleChange} row>
                    <FormControlLabel value="Active" control={<Radio />} label="Active" />
                    <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <Box className="footer">
            <Box className="btn-row">
              <Button variant="contained" size="small" className='btn' onClick={(e) => handleSubmit(e)}>Save Company</Button>
              <Button variant="outlined" size="small" className='btn' onClick={clearForm}>Cancel</Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};
