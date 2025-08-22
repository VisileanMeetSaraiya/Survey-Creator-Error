import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import "survey-creator-core/survey-creator-core.min.css";
import SurveyCreatorTheme from "survey-creator-core/themes";
import { registerCreatorTheme } from "survey-creator-core";
import axios from "axios";
// import { modifiedTheme } from "../assets/theme2";
// import "../assets/MinimalCreator.css";

registerCreatorTheme(SurveyCreatorTheme); // Add predefined Survey 

const createFunction = async (json: any): Promise<void> => {
    await axios.post("http://localhost:8080/checklist/withuser", {
        "userId": 7,
        "structure": json,
    });
};

function SurveyCreatorRenderComponent() {
    const creator = new SurveyCreator({
        showLogicTab: true,
        isAutoSave: false,
        showJSONEditorTab: false,
    });

    // creator.applyCreatorTheme(modifiedTheme);

    creator.showSaveButton = true;

    creator.saveSurveyFunc = async (
        saveNo: number,
        callback: (saveNo: number, success: boolean) => void
    ): Promise<void> => {
        try {
            await createFunction(creator.JSON);
            callback(saveNo, true);
        } catch (error) {
            console.error("Save failed:", error);
            callback(saveNo, false);
        }
    };

    return (<SurveyCreatorComponent creator={creator} />);
}

export default SurveyCreatorRenderComponent;