import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import type { IDashboardRow, IGlobalState, RoleState } from '../../../Types/types';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AGGridCommonComponent from '../../AGGridCommonComponent';
import type { ColDef } from 'ag-grid-community';
import "../../../assets/LandingScreen/ResponseScreen.css"

function ResponseScreen() {
    const navigate = useNavigate();
    const changeStatusText = (text: string) => {
        if (text === "todo")
            return "Open";
        else if (text === "in_progress")
            return "In Progress";
        else if (text === "completed")
            return "Approved";
    }
    const [rowData, setRowData] = useState<IDashboardRow[]>([]);
    const [colDefs, setColDefs] = useState<ColDef<IDashboardRow>[]>([
        {
            headerName: "#",
            valueGetter: (params) => params.node.rowIndex! + 1, // rowIndex starts from 0
            maxWidth: 50,
            sortable: false,
            filter: false,
        },
        { field: "id", headerName: "ID", maxWidth: 80, },
        {
            field: "title", headerName: "Checklist Name", cellRenderer: (params: any) => {
                return (
                    <span
                        className='title-link'
                        onClick={(event) => {
                            // Example navigation
                            navigate(`/survey/${params.data.id}/user/${userRole.role}`);
                        }}
                    >
                        {params.value}
                    </span>
                );
            },
        },
        {
            field: "status",
            headerName: "Status",
            valueGetter: (params) => {
                if (params.data.status === "todo") return "Open";
                if (params.data.status === "in_progress") return "In Progress";
                if (params.data.status === "completed") return "Approved";
                return params.data.status;
            },
            cellRenderer: (params: any) => {
                const label = params.value; // Already mapped by valueGetter

                let bgColor = "gray";
                let stColor = "white";
                if (label === "Approved") {
                    bgColor = "#E4FBF3"; stColor = "#008344";
                } else if (label === "In Progress") {
                    bgColor = "#FEF5E5"; stColor = "#C27D00";
                } else if (label === "Open") {
                    bgColor = "#E6EFF8"; stColor = "#0E8BDF";
                }

                return (
                    <button
                        style={{
                            backgroundColor: bgColor,
                            color: stColor,
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            cursor: "pointer",
                        }}
                    >
                        {label}
                    </button>
                );
            },
            filter: true,
        }


    ]);

    const userRole: RoleState = useSelector((s: IGlobalState) => s.roleValue);


    const { templateId } = useParams();

    const surveyNavigationFn = (event: any) => {
        console.log("doing nothing" + event);
    }

    const handleBack = () => {
        navigate(-1); // go back one step in history
    };

    useEffect(() => {
        const fetchData = async () => {
            const url: string = `http://192.168.1.192:8080/checklist/template/${templateId}`;

            const response = await axios.get(url);
            setRowData(response.data);
        }
        fetchData();

    }, [templateId]);

    return (
        <div className='responseScreen-container'>

            <div className="response-nav">
                {/* <button onClick={handleBack} >
                    <img src={BackSvg} alt="Back" />
                </button> */}
            </div>
            {(rowData.length > 0) ? <AGGridCommonComponent rowData={rowData} colDefs={colDefs} navigateFn={surveyNavigationFn} /> : <div>Error from CreatorLandinPage </div>}
        </div>
    )
}

export default ResponseScreen