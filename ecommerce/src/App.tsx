import { useState } from "react";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

function App() {
  const [page, setPage] = useState("products");

  const renderPage = () => {
    switch (page) {
      case "signup":
        return <SignupPage />;
      case "signin":
        return <SigninPage setPage={setPage} />;
      case "admin":
        return <AdminDashboard />;
      case "user":
        return <UserDashboard />;
      case "products":
      default:
        return (
          <>
            <h1>E-Commerce Product Management System</h1>
            <p className="subtitle">Browse Products</p>
            <ProductList />
          </>
        );
    }
  };

  return (
    <>
      <Navbar setPage={setPage} />
      <div className="container">{renderPage()}</div>
    </>
  );
}

export default App;