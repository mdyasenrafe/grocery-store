import "./App.css";
import NavBar from "./Pages/Shared/NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage/Home/Home";
import NotFound from "./Pages/Shared/NotFound/NotFound";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Login from "./Pages/LoginPage/Login/Login";
import AuthProvider from "./Context/AuthProvider";
import Resigter from "./Pages/LoginPage/Resigter/Resigter";
import Cart from "./Pages/CartPage/Cart";
import PrivateRoute from "./Pages/LoginPage/PrivateRoute/PrivateRoute";
import CheckOut from "./Pages/CheekOutPage/CheekOut";
import NewProducts from "./Pages/HomePage/NewProducts/NewProducts";
import Footer from "./Pages/Shared/Footer/Footer";
import DashboardHome from "./Pages/DashBoard/DashboardHome/DashboardHome";
import Dashboard from "./Pages/DashBoard/Dashboard/Dashboard";
import Pay from "./Pages/DashBoard/User/Pay/Pay";
import MyOrders from "./Pages/DashBoard/User/MyOrders/MyOrders";
import AddReview from "./Pages/DashBoard/User/AddReview/AddReview";
import MakeAdmin from "./Pages/DashBoard/Admin/MakeAdmin/MakeAdmin";
import AdminRoute from "./Pages/LoginPage/AdminRoute/AdminRoute";
import ManageAllOrders from "./Pages/DashBoard/Admin/ManageAllOrders/ManageAllOrders";
import ManageAllProducts from "./Pages/DashBoard/Admin/ManageAllProducts/ManageAllProducts";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<NewProducts />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/resigter" element={<Resigter />}></Route>
          <Route
            path="/product/:id"
            element={
              <PrivateRoute>
                <ProductDetails />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <CheckOut />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route exact path="/dashboard" element={<DashboardHome />}></Route>
            <Route exact path="/dashboard/pay" element={<Pay />}></Route>
            <Route
              exact
              path="/dashboard/my-orders"
              element={<MyOrders />}
            ></Route>
            <Route
              exact
              path="/dashboard/add-review"
              element={<AddReview />}
            ></Route>
            <Route
              path="/dashboard/make-admin"
              element={
                <AdminRoute>
                  <MakeAdmin />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/dashboard/manage-all-orders"
              element={
                <AdminRoute>
                  <ManageAllOrders />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/dashboard/manage-all-products"
              element={
                <AdminRoute>
                  <ManageAllProducts />
                </AdminRoute>
              }
            ></Route>
          </Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
