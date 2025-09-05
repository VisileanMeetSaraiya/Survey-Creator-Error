import { useSelector } from "react-redux";
import type { IGlobalState, IListingRow, RoleState } from "../../Types/types";
import type { ColDef } from "ag-grid-community";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import AGGridCommonComponent from "../AGGridCommonComponent";
import { useNavigate } from "react-router-dom";
import { TitleCellRenderer } from "./TitleCellRenderer";
import "../../assets/LandingScreen/CommonLandingScreen.css"
import type { AgGridReact } from "ag-grid-react";
import ActionMenu from "../Helper/ActionMenu";


const CommonLandingScreen = () => {
  const navigate = useNavigate();
  const gridRef = useRef<AgGridReact>(null);


  const [loading, setLoading] = useState(true);

  const [rowData, setRowData] = useState<IListingRow[]>([]);

  const userRole: RoleState = useSelector((s: IGlobalState) => s.roleValue);

  const normalColDef: ColDef<IListingRow>[] = [
    {
      headerName: "#",
      valueGetter: (params) => params.node.rowIndex! + 1, // rowIndex starts from 0
      maxWidth: 50,
      sortable: false,
      filter: false,
      menuTabs: [],
    },
    { field: "id", headerName: "ID", maxWidth: 80, },
    { field: "title", headerName: "Checklist Name", cellRenderer: TitleCellRenderer },
    // { field: "label", headerName: "Label" },
    { field: "responseCount", headerName: "Responses", valueFormatter: (params) => params.value != null ? `${params.value} responses` : " " },
    { field: "authorName", headerName: "Author" },
    { field: "descriptionOfSurvey", headerName: "Description" },
  ]

  const adminColDef: ColDef<IListingRow>[] = [
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
            className="title-link"
            onClick={() => {
              // Example navigation
              navigate(`/template/${params.data.id}`);
            }}
          >
            {params.value}
          </span>
        );
      },
    },
    // { field: "label", headerName: "Label" },
    { field: "responseCount", headerName: "Responses", valueFormatter: (params) => params.value != null ? `${params.value} responses` : " " },
    { field: "authorName", headerName: "Author" },
    { field: "descriptionOfSurvey", headerName: "Description" },
    // {
    //   headerName: "Actions",
    //   cellRenderer: (params) => {
    //     return (
    //       <button
    //         type='button'
    //         className='delete-btn'
    //         onClick={async (e) => {
    //           e.stopPropagation();
    //           const confirmDelete = window.confirm(
    //             `Are you sure you want to delete checklist "${params.data.title}"?`
    //           );
    //           if (!confirmDelete) return;

    //           try {
    //             await axios.delete(`http://192.168.1.192:8080/checklist/${params.data.id}`);
    //             setRowData((prev) => prev.filter((row) => row.id !== params.data.id));
    //           } catch (error) {
    //             console.error("Delete failed", error);
    //           }
    //         }}
    //       >
    //         Delete
    //       </button>
    //     );
    //   },
    // },
    {
      cellRenderer: (params: any) => <ActionMenu data={params.data} onDeleted={(id) => {
        setRowData((prev) => prev.filter((row) => row.id !== id));
      }} />
      ,
      maxWidth: 80,
      filter: false,
      sortable: false,
      menuTabs: []
    }


  ]

  const surveyNavigationFn = (event: any) => {
    setLoading(true);
    if (event.event.target.tagName === 'BUTTON') return;
    if (userRole.role === "admin")
      navigate(`/creator/${event.data.id}`);
    else
      navigate(`/survey/${event.data.id}/user/${userRole.role}`);

    setLoading(false);

  }

  const templateNavigateFn = (e) => {
    if (userRole.role === "qa")
      navigate(`/survey/${e.data.id}/user/qa`);
    else
      navigate(`/template/${e.data.id}`)
  }

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setGridOption(
      "quickFilterText",
      (document.getElementById("filter-text-box") as HTMLInputElement).value,
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const url: string = userRole.role === "qa"
        ? "http://192.168.1.192:8080/checklist/templates/qa"
        : "http://192.168.1.192:8080/checklist/templates/v2";

      const response = await axios.get(url);
      setRowData(response.data);

    }
    fetchData();
    setLoading(false);

  }, [userRole.role])

  if (loading) {
    <h6>LOADING</h6>
  }

  return (
    <div className="container-common">
      <div className='common-header'>
        <div className="create_btn_row">
          <button className={userRole.role === "admin" ? "chk_btn" : "hideBtn"} onClick={() => navigate("/creator")}>Create Checklist</button>
        </div>
        <div className="example-header">
          <input
            type="text"
            id="filter-text-box"
            placeholder="Search..."
            onInput={onFilterTextBoxChanged}
          />
        </div>


      </div>

      {(rowData.length > 0) ? <AGGridCommonComponent
        gridRef={gridRef} rowData={rowData} colDefs={userRole.role === "admin" ? adminColDef : normalColDef} navigateFn={templateNavigateFn} /> : <div>Error from CreatorLandinPage </div>}
    </div>
  )
}

export default CommonLandingScreen;