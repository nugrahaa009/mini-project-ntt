import Cookies from "js-cookie";
import Login from "../pages/Login";
import { Home } from "../pages/Home";
import { Product } from "../pages/Product";
import { AppLayout } from "../components/Layout/AppLayout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
  const token = Cookies.get("token");

  return token ? children : <Navigate to="/login" replace />;
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <AppLayout>
                <Home />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/products"
          element={
            <PrivateRoute>
              <AppLayout>
                <Product />
              </AppLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
