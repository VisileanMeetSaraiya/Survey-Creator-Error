import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry, colorSchemeDark, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "../assets/Aggrid.css"
ModuleRegistry.registerModules([AllCommunityModule]);

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
    resizable: true,
    menuTabs: ["filterMenuTab", "generalMenuTab", "columnsMenuTab"],
};

const AGGridCommonComponent = ({ rowData, colDefs, navigateFn }) => {

    return (
        <>
            {
                (rowData.length > 0) && (colDefs.length > 0) ? (<div style={{ width: "100%", height: "100vh" }} className='aggrid-container'>
                    <AgGridReact
                        theme={myTheme}
                        rowData={rowData}
                        columnDefs={colDefs}
                        defaultColDef={defaultColDef}
                        onRowClicked={navigateFn}
                        rowSelection={"multiple"}
                        onCellClicked={(params) => {
                            // Prevent navigation if checkbox cell is clicked
                            if (params.colDef.checkboxSelection) return;
                            navigateFn(params);
                        }}
                    />
                </div>) : (<div>Error</div>)
            }
        </>
    )
}

export default AGGridCommonComponent