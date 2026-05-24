import React from 'react'
import './NewProduct.scss'
import { styled } from '@mui/material/styles';
import {Button,TextField,Select,MenuItem,InputLabel,FormControl,FormGroup,FormControlLabel,Checkbox} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router';
import { getDropDownValuesFromEnum, ProductTypeEnum, StatusEnum } from '../../common/config';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const NewProduct = () => {
    
    const [type, setType] = React.useState('');

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const navigate=useNavigate();

  return (
    <div className='new-product'>
        <div className='product-header'>
            <h3>Add New Product</h3>
            <Button variant="contained" sx={{background:'#FFCD1C',color:'black'}} onClick={()=>navigate('/all-product')}>View All</Button>
        </div>

        <div className='product-form'>
            <div className='product-box'>
            <TextField id="outlined-basic" label="Product Name" variant="outlined" />
            <TextField
          id="outlined-multiline-static"
          label="Product Description"
          multiline
          rows={4}
        />
            <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Fruits" />
      <FormControlLabel control={<Checkbox />} label="Vegetables" />
      <FormControlLabel control={<Checkbox />} label="Misc" />
    </FormGroup>
    <TextField id="outlined-basic" label="SKU" variant="outlined" />
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload Product Image
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => console.log(event.target.files)}
        multiple
      />
    </Button>
            </div>

            <div className='product-box'>
            <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Product Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={handleChange}
          sx={{width:'240px'}}
        >
          {
            getDropDownValuesFromEnum(ProductTypeEnum).map(([key, val]) => (
              <MenuItem key={key} value={val}>
                {key}
              </MenuItem>
            ))
          }
          {/* <MenuItem value={'Single'}>Single</MenuItem>
          <MenuItem value={'Double'}>Double</MenuItem>
          <MenuItem value={'Triple'}>Triple</MenuItem> */}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={handleChange}
        >
          {
            getDropDownValuesFromEnum(StatusEnum).map(([key, val]) => (
              <MenuItem key={key} value={val}>
                {key}
              </MenuItem>
            ))
          }
          {/* <MenuItem value={'Single'}>Single</MenuItem>
          <MenuItem value={'Double'}>Double</MenuItem>
          <MenuItem value={'Triple'}>Triple</MenuItem> */}
        </Select>
      </FormControl>
      <TextField
          id="outlined-multiline-static"
          label="Tags"
          multiline
          rows={4}
        />
        <TextField id="outlined-basic" label="B2B Price (Rs.)" variant="outlined" />
        <TextField id="outlined-basic" label="B2C Price (Rs.)" variant="outlined" />
        <TextField id="outlined-basic" label="Tax" variant="outlined" />
            </div>
            <div className='product-box'>
            <Button variant="contained" sx={{background:'#3240C3', width:'250px', height:'50px'}}>View All</Button>
            </div>
        </div>
    </div>
  )
}
