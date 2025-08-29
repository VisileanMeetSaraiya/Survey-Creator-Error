/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Model, PageModel } from 'survey-core';
import { Survey } from "survey-react-ui";
import 'survey-core/survey-core.css';
// import { newTheme } from '../assets/updatedComonentTheme';
import "../assets/SurveyComponentCSS.css";
// import { surveyComponentTheme } from '../assets/SurveyComponentTheme';

import { modifiedTheme } from '../assets/theme2';

const userId = 7;

const userRole: string = "qa";


export const SurveyComponent = (props: any) => {
    const checkListId = (props.checkListId ?? -1);
    const survey = new Model(props.surveyJson);

    console.log("Survey : " + JSON.stringify(survey));

    // const firstPage = survey.pages[0];
    // if (firstPage) {
    //     firstPage.readOnly = true;
    // }

    survey.pages.forEach((page, idx) => {
        if(idx != 0)
        {
            page.readOnly = true;
        }
    });

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