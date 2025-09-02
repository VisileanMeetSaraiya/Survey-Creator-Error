/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ColDef } from "ag-grid-community";
import AGGridCommonComponent from "./AGGridCommonComponent";
import axios from "axios";

interface IRow {
    id: number;
    title: string;
}


export const SiteUserLandingPage = () => {
    const navigate = useNavigate();

    const surveyNavigationFn = (event : any) => {
        if(event.event.target.tagName === 'BUTTON') return;
        navigate(`/survey/${event.data.id}`)
    }

    const [rowData, setRowData] = useState<IRow[]>([]);
    const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
        { field: "id" },
        { field: "title" }
    ]);
    
    useEffect(() => {
        const fetchData = async () => {

            const AllStructureAPIResponse = await axios.get("http://192.168.1.192:8080/checklist/templates");

            const datalist: IRow[] = AllStructureAPIResponse.data;
            setRowData(datalist);

        }
        fetchData()
    }, []);

    return (
        <>
            <div className="container">
                <div className='header'>
                    <div>Site-User Page</div>
                </div>
                {(rowData.length > 0) ? <AGGridCommonComponent rowData={rowData} colDefs={colDefs} navigateFn={surveyNavigationFn} /> : <div>Error from CreatorLandinPage </div>}
            </div>
        </>
    )
}
