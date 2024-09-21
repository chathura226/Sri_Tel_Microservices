import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useState } from "react";

const NavBar = () => {
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
    window.location.href = "/";
  };
  // const colorMode=useThemeContext()
  // const theme=useTheme()

  const togggleLegend = () => {
    setIsLegendOpen(!isLegendOpen);
  };
  return (
    <header background-color={"#141b2d"}>
      <nav>
        <div className="navButtons">
          <Link to="/">
            <span>Home</span>
          </Link>
          {/* <Link to="/available"><span>Available Books</span></Link> */}
          {user && (
            <Link to="/reserve">
              <span>Reservations</span>
            </Link>
          )}
        </div>

        {user ? (
          <div className="userDetials user-status">
            <div>
              {" "}
              <span className="material-symbols-outlined">account_circle</span>
              <p>
                Hi{" "}
                {user.roleDetails.firstName + " " + user.roleDetails.lastName}
              </p>
            </div>
            <button className="logsign" onClick={handleClick}>
              Log out
            </button>
          </div>
        ) : (
          <div className="links user-status">
            <Link to="/login">
              <button className="logsign">Login</button>
            </Link>
            <Link to="/signup">
              <button className="logsign">Sign Up</button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
