/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import type { ColDef } from "ag-grid-community";
import axios from 'axios';
import AGGridCommonComponent from './AGGridCommonComponent';
import "../assets/CreatorLandingPage.css";
import { useNavigate } from 'react-router-dom';
/*
{
        "id": 113,
        "title": "d title",
        "authorName": "demo_user2",
        "responseCount": 0,
        "descriptionOfSurvey": "d description"
    }
*/
interface IRow {
    id: number;
    title: string;
    // label: string;
    responseCount: string;
    authorName: string;
    descriptionOfSurvey: string;
}

const CreatorLandinPage = () => {
    const [hide, setHide] = useState(false);
    const navigate = useNavigate();

    const creatorNavigationFn = (event) => {
        if (event.event.target.tagName === 'BUTTON') return;
        navigate(`/creator/${event.data.id}`)
    };

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
        { field: "id", headerName: "ID" },
        { field: "title", headerName: "Checklist Name" },
        // { field: "label", headerName: "Label" },
        { field: "responseCount", headerName: "Responses", valueFormatter: (params) =>params.value != null ? `${params.value} responses` : " "},
        { field: "authorName", headerName: "Author" },
        { field: "descriptionOfSurvey", headerName: "Description" },
        {
            headerName: "Actions",
            cellRenderer: (params) => {
                return (
                    <button
                        type='button'
                        className='delete-btn'
                        onClick={async (e) => {
                            e.stopPropagation();
                            const confirmDelete = window.confirm(
                                `Are you sure you want to delete checklist "${params.data.title}"?`
                            );
                            if (!confirmDelete) return;

                            try {
                                await axios.delete(`http://192.168.1.192:8080/checklist/${params.data.id}`);
                                setRowData((prev) => prev.filter((row) => row.id !== params.data.id));
                            } catch (error) {
                                console.error("Delete failed", error);
                            }
                        }}
                    >
                        Delete
                    </button>
                );
            },
        },
    ]);

    useEffect(() => {
        const fetchData = async () => {

            const AllStructureAPIResponse = await axios.get("http://192.168.1.192:8080/checklist/templates/v2");

            const datalist: IRow[] = AllStructureAPIResponse.data;
            setRowData(datalist);

        }
        fetchData()
    }, []);


    return (
        <>
            <div className="container">
                <div className='header'>
                    <div>Creator Page</div>
                    <button className={"new_chk"  } onClick={() => navigate("/creator")}>+ New Checklist</button>
                </div>
                {(rowData.length > 0) ? <AGGridCommonComponent rowData={rowData} colDefs={colDefs} navigateFn={creatorNavigationFn} /> : <div>Error from CreatorLandinPage </div>}
            </div>
        </>
    )
}

export default CreatorLandinPage