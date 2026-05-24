import React from 'react'
import './ViewOrder.scss'
import { useNavigate } from 'react-router';
import { Button, Paper } from '@mui/material';
import TableList from '../../components/table/TableList';


export const ViewOrder = () => {
    const navigate = useNavigate();

  const columns = [
    { id: 'id', label: 'ID', minWidth: 30, align: 'left' },
    { id: 'name', label: 'Name', minWidth: 120, align: 'left' },
    { id: 'product', label: 'Product', minWidth: 200, align: 'left' },
    { id: 'qty', label: 'Quantity', minWidth: 200, align: 'left' },
    { id: 'rs', label: 'Rs', minWidth: 100, align: 'left' },
    { id: 'status', label: 'Status', minWidth: 100, align: 'left' },
    { id: 'action', label: 'Action', minWidth: 150, align: 'left' },
  ];

  const data = [
    { id: 1, name: 'Madurai (HQ)', product: 'Orange', qty: 1,rs: '1000', status: 'Active', action: 'Edit/Delete' },
    { id: 2, name: 'Mannargudi', product: 'Rice', qty: 2,rs: '1000', status: 'Inactive', action: 'Edit/Delete' },
    { id: 3, name: 'Thanjavur', product: 'Rice', qty: 5, rs: '1000',status: 'Inactive', action: 'Edit/Delete' },
    { id: 4, name: 'Theni', product: 'Apple', qty: 7,rs: '1000', status: 'Active', action: 'Edit/Delete' },
    { id: 5, name: 'Tirunelveli', product: 'Oil', qty: 1,rs: '1000', status: 'Active', action: 'Edit/Delete' },
    { id: 6, name: 'Madurai (HQ)', product: 'Toy', qty: 3,rs: '1000', status: 'Active', action: 'Edit/Delete' },
    { id: 7, name: 'Mannargudi', product: 'Oil', qty: 4,rs: '1000', status: 'Inactive', action: 'Edit/Delete' },
    { id: 8, name: 'Thanjavur', product: 'Chain', qty: 4,rs: '1000', status: 'Deleted', action: 'Edit/Delete' },
    { id: 9, name: 'Theni', product: 'Toy', qty: 3,rs: '1000', status: 'Active', action: 'Edit/Delete' },
    { id: 10, name: 'Tirunelveli', product: 'Apple', qty: 9,rs: '1000', status: 'Active', action: 'Edit/Delete' },
    { id: 11, name: 'Madurai (HQ)', product: 'Orange', qty: 11,rs: '1000', status: 'Active', action: 'Edit/Delete' },
    { id: 12, name: 'Mannargudi', product: 'Chocolate', qty: 2,rs: '1000', status: 'Inactive', action: 'Edit/Delete' },
    { id: 13, name: 'Thanjavur', product: 'Sweet', qty: 3,rs: '1000', status: 'Deleted', action: 'Edit/Delete' },
    { id: 14, name: 'Theni', product: 'Apple', qty: 2,rs: '1000', status: 'Active', action: 'Edit/Delete' },
    { id: 15, name: 'Tirunelveli', product: 'Orange', qty: 1,rs: '1000', status: 'Active', action: 'Edit/Delete' },
  ];

  return (
    <div className="user">
          <div className="user-header">
            <div className="user-header-left">
              <h3>All Orders</h3>
              <Button variant="contained" sx={{ background: '#04B900' }} onClick={() => navigate('/add-user')}>
                Add Order
              </Button>
            </div>
            <div className="user-header-right">
              <Button variant="contained" sx={{ background: '#3240C3' }}>Export</Button>
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
