import { useSelector } from "react-redux";
import type { IGlobalState, IListingRow, RoleState } from "../../Types/types";
import type { ColDef } from "ag-grid-community";
import axios from "axios";
import { useEffect, useState } from "react";
import AGGridCommonComponent from "../AGGridCommonComponent";
import { useNavigate } from "react-router-dom";
import { TitleCellRenderer } from "./TitleCellRenderer";
import "../../assets/LandingScreen/CommonLandingScreen.css"

const CommonLandingScreen = () => {
  const navigate = useNavigate();

  const [rowData, setRowData] = useState<IListingRow[]>([]);

  const userRole: RoleState = useSelector((s: IGlobalState) => s.roleValue);

  const normalColDef: ColDef<IListingRow>[] = [
    {
      headerName: "#",
      valueGetter: (params) => params.node.rowIndex! + 1, // rowIndex starts from 0
      width: 70,
      sortable: false,
      filter: false,
    },
    { field: "id", headerName: "ID" },
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
      width: 70,
      sortable: false,
      filter: false,
    },
    { field: "id", headerName: "ID" },
    { field: "title", headerName: "Checklist Name" },
    // { field: "label", headerName: "Label" },
    { field: "responseCount", headerName: "Responses", valueFormatter: (params) => params.value != null ? `${params.value} responses` : " " },
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
  ]

  const surveyNavigationFn = (event: any) => {
    if (event.event.target.tagName === 'BUTTON') return;
    navigate(`/survey/${event.data.id}/user/${userRole.role}`)
  }

  useEffect(() => {
    const fetchData = async () => {
      const url: string = userRole.role === "qa"
        ? "http://192.168.1.192:8080/checklist/templates/qa"
        : "http://192.168.1.192:8080/checklist/templates/v2";

      const response = await axios.get(url);
      setRowData(response.data);

    }
    fetchData();

  }, [userRole.role])

  return (
    <div className="container-common">
      <div className='header'>
        <div>Dashboard</div>
        <button className={userRole.role === "admin" ? "chk_btn" : "hideBtn" } onClick={() => navigate("/creator")}>+ New Checklist</button>
      </div>


      {(rowData.length > 0) ? <AGGridCommonComponent rowData={rowData} colDefs={userRole.role === "admin" ? adminColDef : normalColDef} navigateFn={surveyNavigationFn} /> : <div>Error from CreatorLandinPage </div>}
    </div>
  )
}

export default CommonLandingScreen;