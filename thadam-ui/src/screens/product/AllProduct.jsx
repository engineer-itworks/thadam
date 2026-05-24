import React from 'react'
import './products.scss'
import {Button,Paper} from '@mui/material';
import TableList from '../../components/table/TableList';
import { useNavigate } from 'react-router';

export const AllProduct = () => {

  const columns = [
    { id: 'id', label: 'ID', minWidth: 30, align: 'left' },
    { id: 'name', label: 'Product Name', minWidth: 120, align: 'left' },
    { id: 'category', label: 'Category(s)', minWidth: 200, align: 'left' },
    { id: 'type', label: 'Product Type', minWidth: 200, align: 'left' },
    { id: 'status', label: 'Status', minWidth: 100, align: 'left' },
    { id: 'action', label: 'Action', minWidth: 150, align: 'left' },
  ];

  const data = [
    { id: 1, name: 'Apple', category: 'Manufacturer (Super Admin)', type: 'Variable', status: 'Active', action: 'Edit/Delete' },
    { id: 2, name: 'Orange', category: 'Distributor (Super Admin)', type: 'Variable', status: 'Inactive', action: 'Edit/Delete' },
    { id: 3, name: 'Beetroot', category: 'Admin', type: 'Variable', status: 'Deleted', action: 'Edit/Delete' },
    { id: 4, name: 'Rice', category: 'Field Marketing Manager', type: 'Single', status: 'Active', action: 'Edit/Delete' },
    { id: 5, name: 'Beetroot', category: 'Marketing Executive', type: 'Single', status: 'Active', action: 'Edit/Delete' },
    { id: 6, name: 'Coconut', category: 'Manufacturer (Super Admin)', type: 'Variable', status: 'Active', action: 'Edit/Delete' },
    { id: 7, name: 'Idly', category: 'Distributor (Super Admin)', type: 'Single', status: 'Inactive', action: 'Edit/Delete' },
    { id: 8, name: 'Onion', category: 'Admin', type: 'Variable', status: 'Deleted', action: 'Edit/Delete' },
    { id: 9, name: 'Beetroot', category: 'Field Marketing Manager', type: 'Single', status: 'Active', action: 'Edit/Delete' },
    { id: 10, name: 'Rice', category: 'Marketing Executive', type: 'Single', status: 'Active', action: 'Edit/Delete' },
    { id: 11, name: 'Coconut', category: 'Manufacturer (Super Admin)', type: 'Variable', status: 'Active', action: 'Edit/Delete' },
    { id: 12, name: 'Onion', category: 'Distributor (Super Admin)', type: 'Variable', status: 'Inactive', action: 'Edit/Delete' },
    { id: 13, name: 'Idly', category: 'Admin', type: 'Single', status: 'Deleted', action: 'Edit/Delete' },
    { id: 14, name: 'Rice', category: 'Field Marketing Manager', type: 'Variable', status: 'Active', action: 'Edit/Delete' },
    { id: 15, name: 'Coconut', category: 'Marketing Executive', type: 'Variable', status: 'Active', action: 'Edit/Delete' },
  ];

  const navigate=useNavigate();


  return (
    <div className='all-product'>
        <div className='all-product-header'>
            <div className='header-left'>
                <h3>All Product</h3>
                <Button variant="contained" sx={{background:'#04B900'}} onClick={()=>navigate('/new-product')}>Add New</Button>
            </div>
            <div className='header-right'>
            <Button variant="contained" sx={{background:'#3240C3'}}>Export</Button>
            </div>
        </div>
        <div className="TableContent">
        <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={3}>
          <TableList columns={columns} data={data} editUrl="edit-customer" />
        </Paper>
      </div>
    </div>
  )
}
