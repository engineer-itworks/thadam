import React, { useEffect, useState } from 'react';
import {
  Button,
  Paper,
  Box,
  Typography,
  Accordion,
  AccordionActions,
  AccordionSummary,
  AccordionDetails,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router';

import BusinessIcon from '@mui/icons-material/Business';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import TableList from '../../components/table/TableList';

import { getDropDownValuesFromEnum, StatusEnum } from '../../common/config';

export const ViewCompany = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  const [companyList, setCompanyList] = useState([]);

  const columns = [
    { id: 'companyId', label: 'Company ID', minWidth: 30, align: 'left' },
    { id: 'name', label: 'Name', minWidth: 120, align: 'left' },
    { id: 'location', label: 'Location', minWidth: 150, align: 'left' },
    { id: 'status', label: 'Status', minWidth: 100, align: 'left' },
    { id: 'action', label: 'Action', minWidth: 150, align: 'left' },
  ];

  const getAllCompanies = async () => {
    try {
      const response = await fetch('http://localhost:3000/companies/get-all-companies');
      if (!response.ok) throw new Error('Failed to fetch companies');
      const data = await response.json();
      setCompanyList(data);
      console.log('Companies fetched:', data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };

  useEffect(() => {
    getAllCompanies();
  }, []);

  return (
    <div className="companies">
      <Box sx={{ padding: "1rem" }}>
        <Paper elevation={3} sx={{ padding: "0.5rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <Typography variant="h6" component="h6" sx={{ display: "inline-block", marginRight: "0.5rem" }}>
              Companies
            </Typography>
            <Button variant="contained" sx={{ float: "right", background: '#04B900' }} onClick={() => navigate("/company")}>
              <BusinessIcon />&nbsp;Add New Company
            </Button>
            <Button variant="contained" sx={{ float: "right", background: '#3240C3', marginRight: "0.5rem" }}>
              <UpgradeIcon />&nbsp;Export
            </Button>
          </div>

          <Accordion className="filter-container" expanded={expanded} onChange={handleChange}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{expanded ? "Hide Filters" : "Show Filters"}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                  <TextField label="Company Name" variant="outlined" fullWidth size="small" />
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                  <TextField label="Location" variant="outlined" fullWidth size="small" />
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select label="Status" size="small">
                      {
                        getDropDownValuesFromEnum(StatusEnum).map(([key, val]) => (
                          <MenuItem key={key} value={val}>{key}</MenuItem>
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

          <div className="TableContent">
            <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={3}>
              <TableList columns={columns} data={companyList} editUrl="edit-company" />
            </Paper>
          </div>
        </Paper>
      </Box>
    </div>
  );
};
