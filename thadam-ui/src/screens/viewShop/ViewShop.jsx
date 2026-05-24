import React from 'react'
import './ViewShop.scss'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const ViewShop = () => {
    const [age, setAge] = React.useState('');
    
      const handleChange = (event) => {
        setAge(event.target.value);
      };
  return (
    <div className='viewShop'>
        <div className="shopTop">
        <div className="shopTopLeft">
          <h3>View Shop</h3>
          <Button variant="contained" sx={{ background: '#FFCD1C' }}>View All</Button>
        </div>
        <Button variant="contained" sx={{ background: '#04B900' }}>Edit Shops</Button>
      </div>
      <div className='formfield'>
        <div className='inputForm'>
            <h3>ID</h3>
        <TextField id="outlined-basic" label="Enter ID" variant="outlined" sx={{ minWidth: 300 }}/>
        </div>
        <div className='inputForm'>
            <h3>Shop Name</h3>
        <TextField id="outlined-basic" label="Enter Shop name" variant="outlined" sx={{ minWidth: 300 }}/>
        </div>
        <div className='inputForm'>
            <h3>Address</h3>
        <TextField id="outlined-basic" label="Placeholder content for testing purpose" variant="outlined" sx={{ minWidth: 300 }}/>
        </div>
        <div className='inputForm'>
            <h3>Contact Number 1</h3>
        <TextField id="outlined-basic" label="Enter Contact Number 1" variant="outlined" sx={{ minWidth: 300 }}/>
        </div>
        <div className='inputForm'>
            <h3>Contact Number 2</h3>
        <TextField id="outlined-basic" label="Enter Contact Number 2" variant="outlined" sx={{ minWidth: 300 }}/>
        </div>
        <div className='inputForm'>
            <h3>Status</h3>
            <Box sx={{ minWidth: 223 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Active</MenuItem>
          <MenuItem value={20}>Inactive</MenuItem>
        </Select>
      </FormControl>
    </Box>
        </div>

        <Button variant="contained" sx={{ background: '#FF0000' , marginTop:'20px', marginBottom:'50px',marginLeft:'400px', width:'150px', height:'50px'}}>Delete</Button>

      </div>
    </div>
  )
}
