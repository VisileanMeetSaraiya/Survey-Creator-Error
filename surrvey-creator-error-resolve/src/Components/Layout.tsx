import { Link, Outlet } from 'react-router-dom'
import "../assets/Layout.css"

export const Layout = () => {
  return (
    <div className='container'>
        <div className="navigation">
            <nav className='navigation-panel'>
                <Link to="/creator" className='link'>Creator</Link>
                <Link to="/checklist" className='link'>Checklist</Link>
                {/* <Link to="/responses" className='link'>Responses</Link> */}
            </nav>
        </div>
        <div className="outlet-body">
            <Outlet/>
        </div>
    </div>
  )
}
