/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Model } from 'survey-core';
import { Survey } from "survey-react-ui";
import 'survey-core/survey-core.css';
import "../assets/SurveyComponentCSS.css";
import { modifiedTheme } from '../assets/theme2';

const userId = 7;

// const userRole: string = "manager";
const userRole: string = "qa";
// const userRole: string = "siteuser";


export const SurveyComponent = (props: any) => {
    const checkListId = (props.checkListId ?? -1);
    const survey = new Model(props.surveyJson);

    survey.pages.forEach((page) => {

        const isEditableArray = page.getPropertyValue("isEditableBy");
        console.log("value using getPropertyValue :---> "+(isEditableArray));

        // visibleTo
        const visibleToArray = page.getPropertyValue("visibleTo");
        console.log("visible to array : "+visibleToArray);

        if(visibleToArray.includes(userRole)){
            page.visible = true;
        }else{
            page.visible = false;
        }
        

        if(isEditableArray.includes(userRole))
        {
            page.readOnly = false;
        }else{
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