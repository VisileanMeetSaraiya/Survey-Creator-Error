import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Model, Survey } from "survey-react-ui";

// const SurveyJson =  {
//   pages: [{
//     name: "PersonalDetails",
//     elements: [{
//       type: "text",
//       name: "FirstName",
//       title: "Enter your first name:"
//     }, {
//       type: "text",
//       name: "LastName",
//       title: "Enter your last name:"
//     }, {
//       type: "panel",
//       name: "Contacts",
//       state: "collapsed",
//       title: "Contacts (optional)",
//       elements: [{
//         type: "text",
//         name: "Telegram",
//         title: "Telegram:"
//       }, {
//         type: "text",
//         name: "GitHub",
//         title: "GitHub username:"
//       }]
//     }]
//   }]
// };

export const UpdatedSurveyComponent = () => {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [surveyModel, setSurveyModel] = useState<Model>(new Model());

    useEffect(() => {
        const structureId = params.structureId;
        const fetchData = async () => {
            if (structureId) {
                //api call here
                const res = await axios.get(`http://192.168.1.192:8080/checklist/${structureId}`)
                //get structure from response
                const template = res.data.checkListStructureJson;
                //set structure to "surveyJson"
                const tempModel = new Model(template);
                setSurveyModel(tempModel);
                //make loading to 'false'
                setLoading(false);
            }
        }
        fetchData();
    }, [params.structureId]);

    if (loading)
        return <div>Loading.........</div>

    return (
        <Survey model={surveyModel} />
    )
}
