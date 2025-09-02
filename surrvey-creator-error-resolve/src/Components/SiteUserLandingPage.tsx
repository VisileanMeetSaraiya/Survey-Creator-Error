/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ColDef } from "ag-grid-community";
import AGGridCommonComponent from "./AGGridCommonComponent";
import axios from "axios";
import "../assets/SiteUserLandingPage.css";

interface IRow {
    id: number;
    title: string;
}

export const SiteUserLandingPage = () => {

    const handleChange = (event: any) => {
        console.log("select fn data : " + event.target.value);
        setCurrentUserRole(event.target.value);
    }

    const [currentUserRole, setCurrentUserRole] = useState<string>("siteuser");

    const navigate = useNavigate();


    const surveyNavigationFn = (event: any) => {
        if (event.event.target.tagName === 'BUTTON') return;
        navigate(`/survey/${event.data.id}/user/${currentUserRole}`)
    }

    const [rowData, setRowData] = useState<IRow[]>([]);
    const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
        { field: "id" },
        { field: "title" }
    ]);

    const fetchData = useCallback(async () => {
        const url = currentUserRole === "siteuser"
            ? "http://192.168.1.192:8080/checklist/templates"
            : "http://192.168.1.192:8080/checklist/templates/qa";

        const response = await axios.get(url);
        setRowData(response.data);
    }, [currentUserRole]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);;

    return (
        <>
            <div className="container">
                <div className='header'>
                    <div>{currentUserRole === "qa" ? 'Q.A.' : 'Site-User'} Page</div>
                    <div className="role-dropdown">
                        <select name="role-drodowm" id="role-drodowm" className="role-dropdown" onChange={handleChange} value={currentUserRole}>
                            <option value="siteuser">Site User</option>
                            <option value="qa">Q.A.</option>
                        </select>
                    </div>
                </div>
                {(rowData.length > 0) ? <AGGridCommonComponent rowData={rowData} colDefs={colDefs} navigateFn={surveyNavigationFn} /> : <div>Error from CreatorLandinPage </div>}
            </div >
        </>
    )
}
