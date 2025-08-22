import axios from 'axios';
import { useEffect, useState } from 'react'
import { SurveyComponent } from './SurveyComponent';
// import "../assets/FormPage.css";

const userId = 7;

export const FormPage = () => {
  const [structureList, setStructureList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const structureResponse = await axios.get(`http://localhost:8080/checklist/user/${userId}`);

      const res = structureResponse.data;
      setStructureList(res);
    }
    fetchData();
  }, []);

  return (
    <div
      className='main-div'
    >
      {structureList && structureList.length > 0 ? (
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
            >
              <SurveyComponent
                surveyJson={singleStructure.checkListStructureJson}
                checkListId={singleStructure.id}
                style={{ width: "100%" }}
              />
            </div>
          </div>

        ))
      ) : <div className='error-notification'>ERROR</div>}
    </div>
  );


}
