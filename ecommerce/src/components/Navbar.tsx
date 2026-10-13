import { useAuthStore } from "../store/authStore";

interface NavbarProps {
  setPage: (page: string) => void;
}

function Navbar({ setPage }: NavbarProps) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    setPage("products");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => setPage("products")}>
        ECommerce
      </div>
      <div className="navbar-links">
        <button onClick={() => setPage("products")}>Products</button>
        {!user && (
          <>
            <button onClick={() => setPage("signup")}>Signup</button>
            <button onClick={() => setPage("signin")}>Sign In</button>
          </>
        )}
        {user && (
          <>
            <span className="welcome-user">
              Welcome, {user.name} ({user.role})
            </span>
            {user.role === "ADMIN" && (
              <button onClick={() => setPage("admin")}>Admin Dashboard</button>
            )}
            {user.role === "USER" && (
              <button onClick={() => setPage("user")}>User Dashboard</button>
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;