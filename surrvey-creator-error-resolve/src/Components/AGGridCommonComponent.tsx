import type { ColDef, RowSelectionOptions } from "ag-grid-community";
import { ModuleRegistry, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "../assets/Aggrid.css"
import { AllEnterpriseModule, LicenseManager } from "ag-grid-enterprise";

ModuleRegistry.registerModules([AllEnterpriseModule]);
LicenseManager.setLicenseKey(import.meta.env.VITE_AG_GRID_LICENSE_KEY);

// to use myTheme in an application, pass it to the theme grid option
const myTheme = themeQuartz
    .withParams({
        backgroundColor: "#FFFFFF",
        borderColor: "#EBEEF0",
        columnBorder: true,
        browserColorScheme: "light",
        chromeBackgroundColor: {
            ref: "foregroundColor",
            mix: 0.07,
            onto: "backgroundColor"
        },
        fontFamily: {
            googleFont: "Inter"
        },
        foregroundColor: "#252525",
        headerBackgroundColor: "#FFFFFF",
        headerFontSize: 14,
        headerTextColor: "#7E8C96"
    });

const defaultColDef: ColDef = {
    flex: 1,
    sortable: true,
    filter: true,
     floatingFilter: true,
    resizable: true,
    menuTabs: ["filterMenuTab", "generalMenuTab", "columnsMenuTab"],
};

const rowSelectionOptions : RowSelectionOptions = {
    mode:"multiRow",
    checkboxes : true,
    checkboxLocation:"selectionColumn",

}
const AGGridCommonComponent = ({gridRef, rowData, colDefs, navigateFn }) => {

    return (
        <>
            {
                (rowData.length > 0) && (colDefs.length > 0) ? (<div style={{ width: "100%", height: "100vh" }} className='aggrid-container'>
                    <AgGridReact
                        ref={gridRef}
                        theme={myTheme}
                        rowData={rowData}
                        columnDefs={colDefs}
                        defaultColDef={defaultColDef}
                        onRowClicked={()=>{}}
                        rowSelection={
                            rowSelectionOptions
                        }
                        popupParent={document.body} 
                    />
                </div>) : (<div>Error</div>)
            }
        </>
    )
}

export default AGGridCommonComponent