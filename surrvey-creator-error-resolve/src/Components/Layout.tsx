import { Link, Outlet } from 'react-router-dom'
import "../assets/Layout.css"

export const Layout = () => {
  return (
    <div className='container'>
      <div className="navigation">
        <nav className='navigation-panel'>
          {/* <Link to="/creator" className='link'>Creator</Link> */}
          {/* <Link to="/checklist" className='link'>Checklist</Link> */}
          {/* <Link to="/aggrid-example" className='link'>AG Grid</Link> */}
          <Link to="/creator-landing" className='link'>Creator-Landing</Link>
          <Link to="/site-user" className='link'>Site-User</Link>
          <Link to="/dashboard" className='link'>Dashboard</Link>
          {/* <Link to="/responses" className='link'>Responses</Link> */}
        </nav>
      </div>
      <div className="outlet-body">
        <Outlet />
      </div>
    </div>
  )
}
