import { Route, Routes } from "react-router-dom"
import { CreatorPage } from "./Components/CreatorPage"
import { FormPage } from "./Components/FormPage"
import "./App.css"
import { Layout } from "./Components/Layout"
import GridExample from "./Components/AGGridExample"
import CreatorLandinPage from "./Components/CreatorLandinPage"
import { SiteUserLandingPage } from "./Components/SiteUserLandingPage"
import { UpdatedSurveyComponent } from "./Components/UpdatedSurveyComponent"
import { Dashboard } from "./Components/Dashboard"
import CommonLandingScreen from "./Components/LandingScreens/CommonLandingScreen"

function App() {

  return (
    <>
      <div className="page">
        <Routes>
          <Route path='/' Component={Layout}>
            <Route path='/creator' Component={CreatorPage} />
            <Route path='/creator/:templateId' Component={CreatorPage} />
            <Route path='/checklist' Component={FormPage} />
            <Route path='/aggrid-example' Component={GridExample} />
            <Route path='/creator-landing' Component={CreatorLandinPage} />
            <Route path='/site-user' Component={SiteUserLandingPage} />
            <Route path='/dashboard' Component={Dashboard} />
            <Route path='/survey/:structureId/user/:userRole' Component={UpdatedSurveyComponent} />
            <Route path='/survey/:structureId' Component={UpdatedSurveyComponent} />
            <Route path="/common" Component={CommonLandingScreen}/>
          </Route>
        </Routes>
        {/* <Routes>
            <Route path='/creator' Component={CreatorPage} />
            <Route path='/checklist' Component={FormPage} />
        </Routes> */}
      </div>
    </>
  )
}

export default App
