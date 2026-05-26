import React from "react";
import { BrowserRouter, Routes, Route, Switch } from "react-router";

// Components
import Home from "../screens/home/Home";
import { CustomerList } from "../screens/customers/CustomerList";
import { CustomerForm } from "../screens/customers/CustomerForm";
import { ProductList } from "../screens/product/ProductList";
import { ProductForm } from "../screens/product/ProductForm";
import { Company } from "../screens/company/Company";
import { UserList } from "../screens/user/UserList";
import { UserForm } from "../screens/user/UserForm";
import { ViewOrder } from "../screens/order/ViewOrder";
import { NewProduct } from "../screens/product/NewProduct";
import { AllProduct } from "../screens/product/AllProduct";
import { ViewCompany } from "../screens/company/ViewCompany";
import LogIn from "../screens/login/Login";

const ThadamRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/" element={<Home />}>
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/new-customer" element={<CustomerForm />} />
            <Route path="/edit-customer" element={<CustomerForm />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/new-product" element={<ProductForm />} />

            <Route path="/company" element={<Company />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/new-user" element={<UserForm />} />
            <Route path="/edit-user" element={<UserForm />} />
            <Route path="/order" element={<ViewOrder />} />
            <Route path="/all-product" element={<AllProduct />} />
            <Route path="/view-company" element={<ViewCompany />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default ThadamRouter;
