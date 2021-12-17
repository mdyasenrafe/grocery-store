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
import Cart from "./Pages/Cart/Cart";
import PrivateRoute from "./Pages/LoginPage/PrivateRoute/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
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
          <Route path="/home" element={<Home />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
