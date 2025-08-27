import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import "survey-creator-core/survey-creator-core.min.css";
import SurveyCreatorTheme from "survey-creator-core/themes";
import { registerCreatorTheme } from "survey-creator-core";
import axios from "axios";
import { modifiedTheme } from "../assets/theme2";
import "../assets/creator.css"
// import "../assets/IssueFx.css"

registerCreatorTheme(SurveyCreatorTheme); // Add predefined Survey 

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        showThemeTab:true
    });

    creator.applyCreatorTheme(modifiedTheme);

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

    return (<SurveyCreatorComponent creator={creator}  />);
}

export default SurveyCreatorRenderComponent;


/*

import { useEffect } from "react";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import { registerCreatorTheme } from "survey-creator-core";
import SurveyCreatorTheme from "survey-creator-core/themes";
import axios from "axios";
import { modifiedTheme } from "../assets/theme2";

registerCreatorTheme(SurveyCreatorTheme);

const createFunction = async (json: any): Promise<void> => {
  await axios.post("http://localhost:8080/checklist/withuser", {
    userId: 7,
    structure: json,
  });
};

function SurveyCreatorRenderComponent() {
  useEffect(() => {
    // Dynamically add CSS files
    const coreCss = document.createElement("link");
    coreCss.rel = "stylesheet";
    coreCss.href = "/survey-creator-core/survey-creator-core.min.css";

    const minimalCss = document.createElement("link");
    minimalCss.rel = "stylesheet";
    minimalCss.href = "/assets/MinimalCreator.css";

    document.head.appendChild(coreCss);
    document.head.appendChild(minimalCss);

    return () => {
      // Cleanup: remove CSS when component unmounts
      document.head.removeChild(coreCss);
      document.head.removeChild(minimalCss);
    };
  }, []);

  const creator = new SurveyCreator({
    showLogicTab: true,
    isAutoSave: false,
    showJSONEditorTab: false,
  });

  creator.applyCreatorTheme(modifiedTheme);
  creator.showSaveButton = true;

  creator.saveSurveyFunc = async (
    saveNo: number,
    callback: (saveNo: number, success: boolean) => void
  ) => {
    try {
      await createFunction(creator.JSON);
      callback(saveNo, true);
    } catch (error) {
      console.error("Save failed:", error);
      callback(saveNo, false);
    }
  };

  return <SurveyCreatorComponent creator={creator} />;
}

export default SurveyCreatorRenderComponent;



*/