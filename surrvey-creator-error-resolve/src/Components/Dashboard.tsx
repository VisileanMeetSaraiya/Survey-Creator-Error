import type { ColDef } from "ag-grid-community";
import axios from "axios";
import { useEffect, useState } from "react";
import AGGridCommonComponent from "./AGGridCommonComponent";

interface IRow {
    id: number;
    title: string;
    status: string;
}

export const Dashboard = () => {
    const creatorNavigationFn = (event) => {
        
    };

    const [rowData, setRowData] = useState<IRow[]>([]);
    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
        { field: "id" },
        { field: "title" },
        { field: "status" }
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
                </div>
                {(rowData.length > 0) ? <AGGridCommonComponent rowData={rowData} colDefs={colDefs} navigateFn={creatorNavigationFn} /> : <div>Error from CreatorLandinPage </div>}
            </div>
        </>
    )
}
