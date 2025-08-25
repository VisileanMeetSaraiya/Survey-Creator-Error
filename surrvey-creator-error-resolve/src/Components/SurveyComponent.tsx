import axios from 'axios';
import { Model } from 'survey-core';
import { Survey } from "survey-react-ui";
import 'survey-core/survey-core.css';
// import { newTheme } from '../assets/updatedComonentTheme';
import "../assets/SurveyComponentCSS.css";
// import { surveyComponentTheme } from '../assets/SurveyComponentTheme';

import { modifiedTheme } from '../assets/theme2';

const userId = 7;

export const SurveyComponent = (props: any) => {const checkListId = (props.checkListId ?? -1);
    const survey = new Model(props.surveyJson);

    survey.applyTheme(modifiedTheme)
    survey.onComplete.add((sender) => {
        if (checkListId !== -1) {
            const postResponse = async () => {
                const response = await axios.post("http://localhost:8080/response", {
                    "response": sender.data,
                    "userId": userId,
                    "checkListId": checkListId
                });
                console.log(response.data);

            }
            postResponse();
        } else {
            console.log("failed !!!!!!!!!!!!!!!!");

        }


    });

    return <Survey model={survey} />;
}
/*



*/