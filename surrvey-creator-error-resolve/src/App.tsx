import { Route, Routes } from "react-router-dom"
import { CreatorPage } from "./Components/CreatorPage"
import { FormPage } from "./Components/FormPage"
import "./App.css"

function App() {

  return (
    <>
      <div className="page">
        {/* <Routes>
          <Route path='/' Component={Layout}>
            <Route path='/creator' Component={CreatorPage} />
            <Route path='/checklist' Component={FormPage} />
          </Route>
        </Routes> */}
          <Routes>
            <Route path='/creator' Component={CreatorPage} />
            <Route path='/checklist' Component={FormPage} />
        </Routes>
      </div>
    </>
  )
}

export default App
