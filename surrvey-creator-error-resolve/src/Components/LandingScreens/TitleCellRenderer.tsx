import type { ICellRendererParams } from "ag-grid-community";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../assets/LandingScreen/TitleCellRenderer.css";

const TitleCellRenderer = (props: ICellRendererParams) => {
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <div className="title-cell-wrapper" style={{ position: "relative" }}>
                <span
                    className="title-link"
                    onClick={() => navigate(`/template/${props.data.id}`)}
                >
                    {props.value}
                </span>

                <button
                    className="title-cell-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/survey/${props.data.id}`);
                    }}
                >
                    Fill Checklist
                </button>
            </div>
        </>

    );
};

export { TitleCellRenderer };