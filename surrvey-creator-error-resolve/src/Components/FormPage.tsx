import axios from 'axios';
import { useEffect, useState } from 'react'
import { SurveyComponent } from './SurveyComponent';
import "../assets/FormPage.css";

const userId = 7;

export const FormPage = () => {
  const [structureList, setStructureList] = useState([]);
  const [jsonResponse, setJsonResponse] = useState({});

  useEffect(() => {
    async function fetchData() {
      const structureResponse = await axios.get(`http://localhost:8080/checklist/user/${userId}`);

      const res = structureResponse.data;
      res.reverse();
      setStructureList(res);

      const lastResponse = res[0];

      const checklistId: number = lastResponse.id;

      const lastResponseOfLastChecklist = await axios.get(`http://localhost:8080/response/user/${userId}/checklist/${checklistId}`);
      // const jsonData = lastResponseOfLastChecklist.data[0].response.length == 0 ? undefined :  lastResponseOfLastChecklist.data[0].response;

      // setJsonResponse(jsonData);
      const data = lastResponseOfLastChecklist.data;

      const jsonData =
        data.length > 0 && data[0].response?.length > 0
          ? data[0].response
          : undefined;

      setJsonResponse(jsonData);
      console.log("JSON response : " + jsonData);
    }
    fetchData();
  }, []);

  return (
    <div
      className='main-div'
    >

      {
        structureList && jsonResponse && structureList.length > 0 ? (
          <div key={0}>
            <div className='error-notification'>Checklist : {1}</div>
            <div style={{
              flex: 1,
              width: "100%",
              minWidth: "300px",
              color: "black"  // safe on mobiles
            }}
              className='form-component'
            >
              <SurveyComponent
                surveyJson={structureList[0].checkListStructureJson}
                checkListId={structureList[0].id}
                jsonResponse={jsonResponse}
                style={{ width: "100%" }}
              />
            </div>
          </div>
        ) : <div> Error </div>
      }


      {
        /* {structureList && structureList.length > 0 ? (
        structureList.map((singleStructure: any, index: number) => (

          <div
            key={index}
          >
            <div className='error-notification'>Checklist : {index + 1}</div>
            <div style={{
              flex: 1,
              width: "100%",
              minWidth: "300px",
              color: "black"  // safe on mobiles
            }}
            className='form-component'
            >
              <SurveyComponent
                surveyJson={singleStructure.checkListStructureJson}
                checkListId={singleStructure.id}
                style={{ width: "100%" }}
              />
            </div>
          </div>

        ))
        ) : <div className='error-notification'>ERROR</div>} */
      }

    </div>
  );


}
