import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Model, Survey } from "survey-react-ui";
import { modifiedTheme } from "../assets/theme2";
import { useSelector } from "react-redux";
import type { RoleState } from "../Types/types";

const userId: number = 7;
// const userRole: string = "siteuser";
// const userRole: string = "qa";

interface IResponse {
    "id": number,
    "response": object,
    "createdTime": string,
    "updatedTime": string
}

interface ICreateResponse {
    "id": number,
    "checkListStructureJson": string,
    "responses": IResponse[],
    "location": string,
    "role": string,
    "titleOfSurvey": string,
    "template": string
}

export const UpdatedSurveyComponent = () => {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [jsonResponse, setJsonResponse] = useState({});
    const [surveyModel, setSurveyModel] = useState<Model>(new Model());
    const userrole: RoleState = useSelector((s) => s.roleValue);
    const userRole = userrole.role;

    
    useEffect(() => {
        const structureId = params.structureId;


        const fetchData = async () => {
            if (!structureId) return;

            const apiRes = userRole === "siteuser"
                ? await axios.post(`http://192.168.1.192:8080/checklist/assign/new`, {
                    userId,
                    checkListId: structureId,
                })
                : await axios.get(`http://192.168.1.192:8080/checklist/${structureId}`);

            const res: ICreateResponse = apiRes.data;
            const template = res.checkListStructureJson;

            // Initialize survey model only once
            const tempModel = new Model(template);

            tempModel.applyTheme(modifiedTheme);
            // Set last response only if exists
            if (res.responses?.length > 0) {
                const lastResponse = res.responses[res.responses.length - 1];
                setJsonResponse(lastResponse);
                tempModel.data = lastResponse.response;
            }

            //restricte access of user
            tempModel.pages.forEach((page) => {

                const isEditableArray = page.getPropertyValue("isEditableBy");

                // visibleTo
                const visibleToArray = page.getPropertyValue("visibleTo");

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

            // Add complete handler once
            tempModel.onComplete.add((sender) => {
                const mergedResponse = {
                    ...jsonResponse,
                    ...sender.data,
                };

                axios.post("http://192.168.1.192:8080/response/role", {
                    response: mergedResponse,
                    userId,
                    checkListId: res.id,
                    currentRole: userRole,
                }).then((response) => setJsonResponse(response.data.response));
            });

            setSurveyModel(tempModel);
            setLoading(false);
        };

        fetchData();
    }, [params.structureId, params.userRole]); // keep minimal deps


    if (loading)
        return <div>Loading.........</div>

    return (
        <Survey model={surveyModel} />
    )
}
