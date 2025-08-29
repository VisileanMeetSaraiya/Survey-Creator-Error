/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Model } from 'survey-core';
import { Survey } from "survey-react-ui";
import 'survey-core/survey-core.css';
import "../assets/SurveyComponentCSS.css";
import { modifiedTheme } from '../assets/theme2';
import { useEffect, useState } from 'react';

const userId = 7;

// const userRole: string = "manager";
const userRole: string = "qa";
// const userRole: string = "siteuser";


export const SurveyComponent = (props: any) => {
    const [jsonResponse, setJsonResponse] = useState(props.jsonResponse ?? {});
    const checkListId = (props.checkListId ?? -1);
    const survey = new Model(props.surveyJson);
    // const jsonResponse = (props.jsonResponse ?? {});

    //set json response
    survey.data = jsonResponse;

    survey.pages.forEach((page) => {

        const isEditableArray = page.getPropertyValue("isEditableBy");
        // console.log("value using getPropertyValue :---> "+(isEditableArray));

        // visibleTo
        const visibleToArray = page.getPropertyValue("visibleTo");
        // console.log("visible to array : "+visibleToArray);

        if (visibleToArray.includes(userRole)) {
            page.visible = true;
        } else {
            page.visible = false;
        }


        if (isEditableArray.includes(userRole)) {
            page.readOnly = false;
        } else {
            page.readOnly = true;
        }

    });

    survey.applyTheme(modifiedTheme)
    survey.onComplete.add((sender) => {

        // console.log("previous data : " + JSON.stringify(jsonResponse));
        // console.log("recent response : " + JSON.stringify(sender.data));


        const mergedResponse = {
            ...jsonResponse,        // previous data
            ...sender.data          // new data overrides old
        };


        console.log("mergedResponse : " + JSON.stringify(mergedResponse));


        if (checkListId !== -1) {
            const postResponse = async () => {
                const response = await axios.post("http://localhost:8080/response", {
                    "response": mergedResponse,
                    "userId": userId,
                    "checkListId": checkListId
                });
                console.log("Response of Post API :  "+ JSON.stringify(response.data.response));
                setJsonResponse(response.data.response);
                // survey.data = newResponse;
            }
            postResponse();
        } else {
            console.log("failed !!!!!!!!!!!!!!!!");

        }


    });

// USEFUL FOR INSTANT UPDATE ON SAME PAGE BUT WILL SKIP THANK YOU PAGE, because new render will be very immediate
    // useEffect(()=>{
    //     survey.data = jsonResponse;
    // },[jsonResponse]);

    return <Survey model={survey} />;
}
/*



*/