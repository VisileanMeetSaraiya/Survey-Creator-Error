'use client';
import { useState } from "react";

import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry, colorSchemeDark, themeQuartz} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "../assets/Aggrid.css";
import { useNavigate } from "react-router-dom";

ModuleRegistry.registerModules([AllCommunityModule]);

// Row Data Interface
interface IRow {
    make: string;
    model: string;
    price: number;
    electric: boolean;
}

// Create new GridExample component
const GridExample = () => {

    const navigate = useNavigate();
    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState<IRow[]>([
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
        { make: "Mercedes", model: "EQA", price: 48890, electric: true },
        { make: "Fiat", model: "500", price: 15774, electric: false },
        { make: "Nissan", model: "Juke", price: 20675, electric: false },
    ]);

    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
        { field: "make" },
        { field: "model" },
        { field: "price" },
        { field: "electric" },
    ]);

    const defaultColDef: ColDef = {
        flex: 1,
        cellStyle: { textAlign: "center" },
        headerClass: "ag-center-header"
    };

    const myTheme = themeQuartz.withPart(colorSchemeDark);

    return (
        // Data Grid will fill the size of the parent container
        <div style={{ width: "100%", height: "100vh" }} className='aggrid-container'>
            <AgGridReact
                theme={myTheme}
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                onRowClicked={(event) => navigate(`/details/${event.data.make}`)}
            />
        </div>
    )
}

export default GridExample;