import React, { useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, IconButton, Tooltip, Alert, Button, Box, Typography, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';
import NoRecords from '../NoRecords';
import icon_edit from "../../images/icon_edit.png";
import icon_delete from "../../images/icon_delete.png";

import "./table.scss";

const TableList = ({columns, data, onEdit, onDelete}) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    return (
        <div className="table-container">
            <TableContainer>
                <Table stickyHeader aria-label="shops table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                          sx={{ fontWeight: 'bold' }}  // Add this line
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} align="center">
                              <NoRecords />
                            </TableCell>
                        </TableRow>
                      ) : (
                        data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            {columns.map((column) => {
                                return(
                                  column.id != "status" && column.id != "action" ?
                                    (<TableCell key={column.id} align={column.align}>
                                      {row[column.id]}
                                    </TableCell>)
                                  :
                                  (column.id == "status" ?
                                    <TableCell key={column.id} align={column.align}>
                                      {
                                        row[column.id] == 1 ? (
                                          <Chip size="small" className='bg-green' label="Active" />
                                        ) : (
                                          <Chip size="small" className='bg-red' label="Inactive" />
                                        )
                                      }
                                    </TableCell>
                                  :
                                  <TableCell key={column.id} align={column.align}>
                                    <Tooltip title="Edit">
                                      <Button className="btn-edit" sx={{padding: 0.5, backgroundColor: "#f1f1f1"}} onClick={() => onEdit(row)}><img src={icon_edit} style={{width: "1.3rem"}} /></Button>
                                    </Tooltip>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Tooltip title="Delete">
                                      <Button className="btn-delete" sx={{padding: 0.5, backgroundColor: "#f1f1f1"}} onClick={() => onDelete(row)}><img src={icon_delete} style={{width: "1.3rem"}} /></Button>
                                    </Tooltip>
                                  </TableCell>)
                                )
                              }
                            )}
                          </TableRow>
                        )
                      ))
                    }
                  </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}

export default TableList;