import SurveyCreatorRenderComponent from './SurveyCreatorRenderComponent';
import "../assets/MinimalCreator.css"

export const CreatorPage = () => {
  // const [loading, setLoading] = useState(true);





  return (
    <>
      <div
        className="container"
        style={{
          display: "grid",
          placeItems: "center",   // shorthand for alignItems + justifyContent
          height: "100vh",
          width: "100%"
        }}
      >
        {
          <div style={{ width: "95%", height: "100%" }}>
            <div className="creator-div">
              <SurveyCreatorRenderComponent />
            </div>
          </div>
        }

      </div>

    </>
  )
}

