import type { ICellRendererParams } from "ag-grid-community";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TitleCellRenderer = (props: ICellRendererParams) => {
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <style>
                {`
      .title-cell-btn {
  position: absolute;
  right: 0;             /* stick to right instead of left */
  top: 50%;             /* center vertically */
  transform: translateY(-50%);
  color: #0E8BDF;
  background-color: #fff;
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid #0E8BDF;
  cursor: pointer;
  opacity: 0;           /* hidden by default */
  transition: opacity 0.2s ease-in-out;
}

.title-cell-btn:hover {
  color: #fff;
  background-color: #0E8BDF;
}

.title-cell-wrapper:hover .title-cell-btn {
  opacity: 1;           /* only show when parent hovered */
}

    `}
            </style>

            <div className="title-cell-wrapper" style={{ position: "relative" }}>
                {/* add padding-left so text doesn't overlap with button */}
                <span>{props.value}</span>

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