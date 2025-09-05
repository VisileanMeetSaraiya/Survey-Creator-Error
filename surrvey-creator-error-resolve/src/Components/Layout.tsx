import { Link, Outlet, useNavigate } from 'react-router-dom'
import "../assets/Layout.css"
import RoleDropdown from './RoleDropDown/RoleDropdown'
import BackSvg from "../assets/SVGs/Back Button.svg";
import "../assets/Layout.css"
export const Layout = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // go back one step in history
  };

  return (
    <div className='container'>
      <div className="navigation">
        <div className="nav-btn">
          <button onClick={handleBack} >
            <img src={BackSvg} alt="Back" />
          </button>
        </div>
        <RoleDropdown />
      </div>
      <div className="outlet-body">
        <Outlet />
      </div>
    </div>
  )
}
