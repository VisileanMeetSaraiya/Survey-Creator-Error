import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry, colorSchemeDark, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "../assets/Aggrid.css";
import { useNavigate } from "react-router-dom";


ModuleRegistry.registerModules([AllCommunityModule]);

// const myTheme = themeQuartz.withPart(colorSchemeDark);

const defaultColDef: ColDef = {
    flex: 1,
    cellStyle: { textAlign: "center" },
    headerClass: "ag-center-header"
};

const AGGridCommonComponent = ({ rowData, colDefs, navigateFn  }) => {
    const navigate = useNavigate();

    return (
        <>
            {
                (rowData.length > 0) && (colDefs.length > 0) ? (<div style={{ width: "100%", height: "100vh" }} className='aggrid-container'>
                    <AgGridReact
                        theme={themeQuartz}
                        rowData={rowData}
                        columnDefs={colDefs}
                        defaultColDef={defaultColDef}
                        onRowClicked={navigateFn}
                    />
                </div>) : (<div>Error</div>)
            }
        </>
    )
}

export default AGGridCommonComponent