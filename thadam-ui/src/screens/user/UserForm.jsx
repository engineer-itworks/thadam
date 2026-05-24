import React, { useState } from 'react';
import { 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormHelperText, 
  Typography, 
  Divider, 
  Paper, 
  Box, 
  Grid 
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { BloodGroupEnum, getDropDownValuesFromEnum, RoleTypeEnum, StatusEnum } from '../../common/config';
import { useNavigate } from 'react-router';
import AlertMessage from '../../components/alert/AlertMessage';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export const UserForm = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    userId: '',
    name: "",
    role: '',
    contactNumber: '',
    bloodGroup: '',
    address: '',
    joinedDate: null,
    relievedDate: null,
    status: 0,
    branchName: '',
    emergencyContactPerson: '',
    emergencyContactRelationship: '',
    emergencyContactNumber: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    open: false,
    type: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, value) => {
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      saveUser(); // Clear form after successful submission if needed
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!user.userId) newErrors.userId = 'Employee ID is required';
    if (!user.name) newErrors.name = 'Name is required';
    if (!user.role) newErrors.role = 'Role is required';
    if (!user.contactNumber) newErrors.contactNumber = 'Contact number is required';
    if (!user.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
    if (!user.address) newErrors.address = 'Address is required';
    if (!user.joinedDate) newErrors.joinedDate = 'Joined date is required';
    if (!user.branchName) newErrors.branchName = 'Branch name is required';
    if (!user.emergencyContactPerson) newErrors.emergencyContactPerson = 'Emergency contact person is required';
    if (!user.emergencyContactNumber) newErrors.emergencyContactNumber = 'Emergency contact number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearAllFields = () => {
    setUser({
      userId: '',
      name: "",
      role: '',
      contactNumber: '',
      bloodGroup: '',
      address: '',
      joinedDate: null,
      relievedDate: null,
      status: 0,
      branchName: '',
      emergencyContactPerson: '',
      emergencyContactRelationship: '',
      emergencyContactNumber: '',
    });
    setErrors({});
  };

  const saveUser = async() => {
    setLoading(true);
    let url, update_method, response_message;

    if(user.id) {
      url = 'http://localhost:3000/user/update-user/' + user.id;
      update_method = "PUT";
      response_message = "User updated successfully";
    }
    else {
      url = 'http://localhost:3000/user/create-user';
      update_method = "POST";
      response_message = "User created successfully";
    }

    console.log("user----", user);

    await fetch(url, {
      method: update_method, // HTTP method
      headers: {
        'Content-Type': 'application/json', // Tells the server you're sending JSON
      },
      body: JSON.stringify(user), // Payload you're sending
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
        if(!user.id) {
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

  return (
    <div className="add-user">
      {alertMessage.open && <AlertMessage info={alertMessage} />}
      <Box sx={{ padding: "1rem" }}>
        <Paper elevation={3}>
          <div className='header'>
            <Typography className='title'>
              {user.id ? "Edit User" : "Add User"}
            </Typography>
            <span className='btn-row'>
              <Button variant="contained" color="primary" size="small" className='header-btn' onClick={() => navigate("/users")}>
                <FormatListBulletedIcon />&nbsp;View All Users
              </Button>
            </span>
            <Divider />
          </div>
          <Box className="body" sx={{ flexGrow: 1 }}>
            <Grid container spacing={3} sx={{mb: 2}}>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField 
                  fullWidth 
                  label="User ID *" 
                  name="userId" 
                  value={user.userId} 
                  onChange={handleChange} 
                  error={!!errors.userId} 
                  helperText={errors.userId} 
                  margin="dense"
                />
              </Grid>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField 
                  fullWidth 
                  label="Name *" 
                  name="name" 
                  value={user.name} 
                  onChange={handleChange} 
                  error={!!errors.name} 
                  helperText={errors.name} 
                  margin="dense"
                />
              </Grid>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField 
                  fullWidth 
                  label="Contact Number *" 
                  name="contactNumber" 
                  value={user.contactNumber} 
                  onChange={handleChange} 
                  error={!!errors.contactNumber} helperText={errors.contactNumber} 
                  margin='dense'
                />
              </Grid>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <FormControl fullWidth error={!!errors.role} margin="dense">
                  <InputLabel>Role (Designation) *</InputLabel>
                  <Select
                    label="Role Designation *"
                    name="role"
                    value={user.role}
                    onChange={handleChange}
                    margin="dense"
                  >
                    {
                      getDropDownValuesFromEnum(RoleTypeEnum).map(([key, val]) => (
                        <MenuItem key={key} value={val}>
                          {key}
                        </MenuItem>
                      ))
                    }
                  </Select>
                  {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <FormControl fullWidth error={!!errors.bloodGroup} margin="dense">
                  <InputLabel>Blood Group *</InputLabel>
                  <Select
                    label="Blood Group *"
                    name="bloodGroup"
                    value={user.bloodGroup}
                    onChange={handleChange}
                    margin="dense"
                  >
                    {
                      getDropDownValuesFromEnum(BloodGroupEnum).map(([key, val]) => (
                        <MenuItem key={key} value={val}>
                          {val}
                        </MenuItem>
                      ))
                    }
                  </Select>
                  {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField 
                  fullWidth 
                  label="Address *" 
                  name="address" 
                  value={user.address}
                  onChange={handleChange} 
                  error={!!errors.address} helperText={errors.address} 
                  margin='dense'
                />
              </Grid>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Joined Date *"
                    value={user.joinedDate}
                    onChange={(date) => handleDateChange('joinedDate', date)}
                    slotProps={{ textField: { fullWidth: true, error: !!errors.joinedDate, helperText: errors.joinedDate, margin: "dense" } }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Relieved Date"
                    value={user.relievedDate}
                    onChange={(date) => handleDateChange('relievedDate', date)}
                    slotProps={{ textField: { fullWidth: true, margin: "dense" } }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Relieved Date"
                    value={user.relievedDate}
                    onChange={(date) => handleDateChange('relievedDate', date)}
                    slotProps={{ textField: { fullWidth: true, margin: "dense" } }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <FormControl fullWidth error={!!errors.status} margin="dense">
                  <InputLabel>Status *</InputLabel>
                  <Select
                    label="Status *"
                    name="status"
                    value={user.status}
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
                  </Select>
                  {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{mb: 2}}>
              <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
                <Typography sx={{ backgroundColor: "#e7e7e7", padding: "5px", fontSize: "0.8rem" }}>
                  <strong>Branch Details</strong>
                </Typography>
                <Divider />
              </Grid>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField 
                  fullWidth 
                  label="Branch Name *" 
                  name="branchName" 
                  value={user.branchName} 
                  onChange={handleChange} error={!!errors.branchName} helperText={errors.branchName} 
                  margin='dense'
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{mb: 2}}>
              <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
                <Typography sx={{ backgroundColor: "#e7e7e7", padding: "5px", fontSize: "0.8rem" }}>
                  <strong>Emergency Contact Details</strong>
                </Typography>
                <Divider />
              </Grid>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField 
                  fullWidth 
                  label="Contact Person Name*" 
                  name="emergencyContactPerson" 
                  value={user.emergencyContactPerson} 
                  onChange={handleChange} 
                  error={!!errors.emergencyContactPerson} helperText={errors.emergencyContactPerson} 
                  margin="dense"
                />
              </Grid>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField 
                  fullWidth 
                  label="Relationship" 
                  name="emergencyRelationship" 
                  value={user.emergencyContactRelationship} 
                  onChange={handleChange} 
                  margin='dense'
                />
              </Grid>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField 
                  fullWidth 
                  label="Contact Number *" 
                  name="emergencyContactNumber" 
                  value={user.emergencyContactNumber}
                  onChange={handleChange} error={!!errors.emergencyContactNumber} 
                  helperText={errors.emergencyContactNumber} 
                  margin='dense'
                />
              </Grid>
            </Grid>
          </Box>
          <Box className="footer">
            <Box className="btn-row">
              <Button variant="contained" size="small" className='btn' loading={loading} onClick={(e) => handleSubmit(e)}>{user.id ? "Update Customer" : "Add Customer"}</Button>      
              <Button variant="outlined" size="small" className='btn' onClick={() => navigate("/users")}>Cancel</Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};
