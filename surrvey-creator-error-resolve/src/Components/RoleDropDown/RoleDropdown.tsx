import type React from "react"
import { roleOptions, changeRole } from "../../redux/slice/roleSlice"
import "../../assets/RoleDropDown/dropdown.css"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../redux/store"
import type { RoleState } from "../../Types/types"
import { useLocation, useNavigate } from "react-router-dom"



const changeRoleText = (role: "siteuser" | "qa" | "admin"): string => {
  if (role === "siteuser")
    return "Site User";
  else if (role === "qa")
    return "Q.A.";
  else if (role === "admin")
    return "Admin";
  else
    return "error"
}

const RoleDropdown: React.FC = () => {
  const roleValue:RoleState = useSelector((state:RootState)=>state.roleValue);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeRole(event.target.value));
    if(!location.pathname.includes("common")){
      navigate("/common");
    }
  }

  return (
    <>
      <div className="role-container">
        <label htmlFor="role">Select Role: </label>
        <select id="role" value={roleValue.role} onChange={handleRoleChange} >
          {
            roleOptions.map((singleRoleOption) => (
              <option value={singleRoleOption} key={singleRoleOption} >
                {changeRoleText(singleRoleOption)}
              </option>
            ))
          }
        </select>
      </div>
    </>
  )
}

export default RoleDropdown