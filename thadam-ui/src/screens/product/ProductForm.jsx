import React, { useEffect, useState } from "react";
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
  FormControlLabel,
  Alert,
  Divider,
  IconButton,
  Tooltip,
  Collapse,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useNavigate, useParams } from "react-router";
import {
  getDropDownValuesFromEnum,
  ProductTypeEnum,
  StatusEnum,
} from "../../common/config";
import AlertMessage from "../../components/alert/AlertMessage";

import { isAlphabet, isNumberic } from "../../common/validation";
import { useSelector } from "react-redux";
import "./products.scss";
import ProductTypeFields from "../../components/ProductTypeFields";

export const ProductForm = () => {
  const navigate = useNavigate();
  const selectedCustomerInfo = useSelector(
    (state) => state.customer.selectedCustomer,
  );
  const { customerId } = useParams();

  const [product, setProduct] = useState({
    productId: "",
    name: "",
    productCode: "",
    description: "",
    productType: "",
    sku: "",
    status: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    open: false,
    type: "",
    message: "",
  });

  const [productVariations, setProductVariations] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const saveProduct = async () => {
    console.log("product---", product);
    // setLoading(true);
    // let url, update_method, response_message;

    // if(customer.id) {
    //   url = 'http://localhost:3000/customers/update-customer/' + customer.id;
    //   update_method = "PUT";
    //   response_message = "Customer updated successfully";
    // }
    // else {
    //   url = 'http://localhost:3000/customers/create-customer';
    //   update_method = "POST";
    //   response_message = "Customer created successfully";
    // }

    // await fetch(url, {
    //   method: update_method, // HTTP method
    //   headers: {
    //     'Content-Type': 'application/json', // Tells the server you're sending JSON
    //   },
    //   body: JSON.stringify(customer), // Payload you're sending
    // })
    //   .then(async response => {
    //     if (!response.ok) {
    //       if(response.status == 400) {
    //         const errorData = await response.json();
    //         throw new Error(errorData.details[0].message);
    //       }
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.json(); // Parse the JSON from the response
    //   })
    //   .then(data => {
    //     if(!customer.id) {
    //       clearAllFields();
    //     }

    //     setAlertMessage({open: true, type: "success", message: response_message});
    //     setLoading(false);
    //   })
    //   .catch(error => {
    //     setAlertMessage({open: true, type: "error", message: error.message});
    //     setLoading(false);
    //   });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      saveProduct(); // Clear form after successful submission if needed
    }
  };

  const clearAllFields = () => {
    setProduct({
      customerId: "",
      name: "",
      primaryContactNumber: "",
      secondaryContactNumber: "",
      address: "",
      status: "",
    });
  };

  // For validations
  const validateForm = () => {
    const newErrors = {};

    if (!product.name) {
      newErrors.name = "Name is required";
    } else if (!isAlphabet(product.name)) {
      newErrors.name = "Name is invalid";
    }

    if (!product.productCode) {
      newErrors.productCode = "Product code is required";
    } else if (!isAlphabet(product.productCode)) {
      newErrors.productCode = "Product code is invalid";
    }

    if (!product.description) {
      newErrors.description = "Description is required";
    } else if (!isAlphabet(product.description)) {
      newErrors.description = "Description is invalid";
    }

    if (!product.productType) {
      newErrors.productType = "Product type is required";
    } else if (!isAlphabet(product.productType)) {
      newErrors.productType = "Description is invalid";
    }

    if (!product.sku) {
      newErrors.sku = "SKU is required";
    } else if (!isAlphabet(product.sku)) {
      newErrors.sku = "SKU is invalid";
    }

    if (product.status == undefined) newErrors.status = "Status is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    setProduct(selectedCustomerInfo);
  }, []);

  return (
    <div className="customer-form">
      {alertMessage.open ? <AlertMessage info={alertMessage} /> : null}
      <Box sx={{ padding: "1rem" }}>
        <Paper elevation={3}>
          <div className="header">
            <Typography className="title">
              {product.id ? "Edit Product" : "Add Product"}
            </Typography>
            &nbsp;&nbsp;
            {/* <Breadcrumbs aria-label="breadcrumb" separator=">">
              <Link underline="hover" color="inherit" sx={{cursor: "pointer"}} onClick={() => navigate("/customers")}>
                Customers
              </Link>
              <Typography sx={{ color: 'text.primary' }}>{customerId ? "Edit Customer" : "Add Customer"}</Typography>
            </Breadcrumbs> */}
            <span className="btn-row">
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="header-btn"
                onClick={() => navigate("/customers")}
              >
                <FormatListBulletedIcon />
                &nbsp;View All Products
              </Button>
            </span>
            <Divider />
          </div>
          <Box className="body" sx={{ flexGrow: 1 }}>
            <Grid container spacing={3} sx={{ mb: 2 }}>
              <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
                <Typography
                  sx={{
                    backgroundColor: "#e7e7e7",
                    padding: "5px",
                    fontSize: "0.8rem",
                  }}
                >
                  <strong>Basic Product Details</strong>
                </Typography>
              </Grid>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField
                  label="Product Name *"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  margin="dense"
                />
              </Grid>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField
                  label="Product Code *"
                  variant="outlined"
                  fullWidth
                  name="productCode"
                  value={product.productCode}
                  onChange={handleChange}
                  error={!!errors.productCode}
                  helperText={errors.productCode}
                  margin="dense"
                />
              </Grid>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField
                  label="Product Description *"
                  variant="outlined"
                  fullWidth
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  error={!!errors.description}
                  helperText={errors.description}
                  margin="dense"
                />
              </Grid>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <FormControl
                  fullWidth
                  error={!!errors.productType}
                  margin="dense"
                >
                  <InputLabel>Product Type *</InputLabel>
                  <Select
                    label="Product Type *"
                    name="productType"
                    value={product.productType}
                    onChange={handleChange}
                    margin="dense"
                  >
                    {getDropDownValuesFromEnum(ProductTypeEnum).map(
                      ([key, val]) => (
                        <MenuItem key={key} value={val}>
                          {key}
                        </MenuItem>
                      ),
                    )}
                  </Select>
                  {errors.productType && (
                    <FormHelperText>{errors.productType}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              {/* <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
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
              </Grid> */}
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField
                  label="SKU *"
                  variant="outlined"
                  fullWidth
                  name="sku"
                  value={product.sku}
                  onChange={handleChange}
                  error={!!errors.sku}
                  helperText={errors.sku}
                  margin="dense"
                />
              </Grid>
              <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }}>
                <FormControl fullWidth error={!!errors.status} margin="dense">
                  <InputLabel>Status *</InputLabel>
                  <Select
                    label="Status *"
                    name="status"
                    value={product.status}
                    onChange={handleChange}
                    margin="dense"
                  >
                    {getDropDownValuesFromEnum(StatusEnum).map(([key, val]) => (
                      <MenuItem key={key} value={val}>
                        {key}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.status && (
                    <FormHelperText>{errors.status}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
                <Divider />
              </Grid>
              {<ProductTypeFields productType={product.productType} />}
            </Grid>
            <Grid container spacing={3} sx={{ mb: 2 }}>
              {/* <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
                    <Typography sx={{ backgroundColor: "#e7e7e7", padding: "5px", fontSize: "0.8rem" }}>
                        <strong>Product Price and Available Details</strong>
                    </Typography>
                    <Divider />
                    {
                        product.productType == ProductTypeEnum.Variable ?
                        (
                            <h1>VariableProduct</h1>
                        ) : null
                    }
                </Grid> */}
            </Grid>
          </Box>
          <Box className="footer">
            <Box className="btn-row">
              <Button
                variant="contained"
                size="small"
                className="btn"
                loading={loading}
                onClick={(e) => handleSubmit(e)}
              >
                {product.id ? "Update Product" : "Add Product"}
              </Button>
              <Button
                variant="outlined"
                size="small"
                className="btn"
                onClick={() => navigate("/products")}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};
