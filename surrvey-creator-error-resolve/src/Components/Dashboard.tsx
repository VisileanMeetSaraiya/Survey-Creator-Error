/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColDef } from "ag-grid-community";
import axios from "axios";
import { useEffect, useState } from "react";
import AGGridCommonComponent from "./AGGridCommonComponent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RoleState } from "../Types/types";

interface IRow {
    id: number;
    title: string;
    status: string;
}

export const Dashboard = () => {
    const navigate = useNavigate();
    const userRole: RoleState = useSelector((state)=>state.roleValue);

    const creatorNavigationFn = (event : any) => {
        //no operation
        console.log(event);
        if (event.event.target.tagName === 'BUTTON') return;
        navigate(`/survey/${event.data.id}/user/${userRole.role}`)
        
    };

    const value = useSelector((state: any)=> state.value);
    console.log(value);
    
    const [rowData, setRowData] = useState<IRow[]>([]);
    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
        {
            headerName: "#",
            valueGetter: (params) => params.node.rowIndex! + 1, // rowIndex starts from 0
            width: 70,
            sortable: false,
            filter: false,
        },
        { field: "id" },
        { field: "title" },
        {
            field: "status",
            headerName: "Status",
            cellRenderer: (params: any) => {
                const status = params.value;

                // Map status to background colors
                let bgColor = "gray";
                let stColor = "white";
                if (status === "completed"){
                     bgColor = "#E4FBF3";
                     stColor = "#008344"
                }
                else if (status === "in_progress"){
                     bgColor = "#FEF5E5";
                     stColor = "#C27D00"
                }
                else if (status === "todo") {
                     bgColor = "#E6EFF8";
                     stColor = "#0E8BDF"
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
                        onClick={() => alert(`Status: ${status}`)}
                    >
                        {status}
                    </button>
                );
            }
        }
    ]);

    useEffect(() => {
        const fetchData = async () => {

            const AllStructureAPIResponse = await axios.get("http://192.168.1.192:8080/checklist/active");

            const datalist: IRow[] = AllStructureAPIResponse.data;
            setRowData(datalist);

        }
        fetchData()
    }, []);


    return (
        <>
            <div className="container">
                <div className='header'>
                    <div>Dashboard</div>
                    <div>Value : </div>
                </div>
                {(rowData.length > 0) ? <AGGridCommonComponent rowData={rowData} colDefs={colDefs} navigateFn={creatorNavigationFn} /> : <div>Error from CreatorLandinPage </div>}
            </div>
        </>
    )
}
