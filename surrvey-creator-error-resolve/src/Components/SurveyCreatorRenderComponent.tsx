import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import "survey-creator-core/survey-creator-core.min.css";
import SurveyCreatorTheme from "survey-creator-core/themes";
import { registerCreatorTheme } from "survey-creator-core";
import axios from "axios";
import { modifiedTheme } from "../assets/theme2";
import "../assets/creator.css"
import { Serializer, SvgRegistry } from "survey-core";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

registerCreatorTheme(SurveyCreatorTheme); // Add predefined Survey 

const customIcon = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M19.5275 7.5275L9.5275 17.5275C9.3775 17.6775 9.1875 17.7475 8.9975 17.7475C8.8075 17.7475 8.6175 17.6775 8.4675 17.5275L4.4675 13.5275C4.1775 13.2375 4.1775 12.7575 4.4675 12.4675C4.7575 12.1775 5.2375 12.1775 5.5275 12.4675L8.9975 15.9375L18.4675 6.4675C18.7575 6.1775 19.2375 6.1775 19.5275 6.4675C19.8175 6.7575 19.8175 7.2375 19.5275 7.5275Z" />
</svg>`;

SvgRegistry.registerIcon("tick-icon", customIcon);

//isVisibleTo
Serializer.addProperty("page", {
  name: "visibleTo:multiplevalues", // The ":multiplevalues" suffix is crucial for multi-select
  displayName: "Who will be able to see this page?",
  category: "general",
  choices: [
    { value: "siteuser", text: "Site User" },
    { value: "qa", text: "Q.A." },
    { value: "manager", text: "Manager" }
  ]
});

//isEditableBy
Serializer.addProperty("page", {
  name: "isEditableBy:multiplevalues", // The ":multiplevalues" suffix is crucial for multi-select
  displayName: "Who will be able to Edit this page?",
  category: "general",
  choices: [
    { value: "siteuser", text: "Site User" },
    { value: "qa", text: "Q.A." },
    { value: "manager", text: "Manager" }
  ]
});

// const randomString = () => {
//   let ans = "";
//   for(let i = 0; i < 10; i++){
//      const ri = Math.floor(Math.random() * 26); 
//     const ch = String.fromCharCode(97 + ri); 
//     ans += ch;
//   }
//   return ans;
// }

// const randomNumber = () : string => (Math.random()*10000000).toString();

// eslint-disable-next-line @typescript-eslint/no-explicit-any

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createFunction = async (json: any, title: string, description:string): Promise<void> => {
  const response = await axios.post("http://192.168.1.192:8080/checklist/create/structure/userandtitle", {
    "userId": 7,
    "structure": json,
    "title": title,
    "description":description
  });

  console.log("response of creator API : " + JSON.stringify(response.data));

};


const SurveyCreatorRenderComponent = () => {

  const [demoCreator, setDemoCreator] = useState<SurveyCreator>();
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {

    if (!demoCreator) {
      const creator = new SurveyCreator({
        showLogicTab: true,
        isAutoSave: false,
        showJSONEditorTab: true,
        showThemeTab: true,
        propertyGridNavigationMode: "accordion"
      });

      creator.applyCreatorTheme(modifiedTheme);

      const templateId = params.templateId;
      const fetchData = async () => {
        if (templateId) {
          const res = await axios.get(`http://192.168.1.192:8080/checklist/${templateId}`)
          const template = res.data.checkListStructureJson;
          creator.JSON = JSON.parse(template);
          console.log("structure : " + JSON.stringify(template));
        }
        setLoading(false)
      }

      fetchData();



      creator.showSaveButton = true;

      creator.saveSurveyFunc = async (
        saveNo: number,
        callback: (saveNo: number, success: boolean) => void
      ): Promise<void> => {
        try {
          const title = creator.survey.getPropertyValue("title");
          const description = creator.survey.getPropertyValue("description");
          await createFunction(creator.JSON, title, description);
          callback(saveNo, true);
          // console.log(creator)
        } catch (error) {
          console.error("Save failed:", error);
          callback(saveNo, false);
        }
      };

      creator.activatePropertyGridCategory("general");

      setDemoCreator(creator);
    }

  }, [params.templateId, demoCreator]);

  if (loading)
    return <div>Loading.........</div>

  return (<SurveyCreatorComponent creator={demoCreator ?? new SurveyCreator()} />);




  // creator.JSON = structure ?? {};

  // if (structure) { creator.JSON = JSON.parse(structure); }





  // creator.onPageAdded.add((sender,options) => {
  //   // options.page.addNewQuestion("boolean",`${"isPassed"+{}}`);
  // })


  // creator.onQuestionAdded.add((_,options)=>{
  //   options.question. = randomNumber.toString();
  // })

  // creator.onQuestionAdded.add((sender, option) => {
  //   option.question.showCommentArea = true;
  //   option.question.name = randomString();
  //   // option.question.readOnly = true;
  // })




  // creator.activatePropertyGridCategory("customCategory");

}

export default SurveyCreatorRenderComponent;
