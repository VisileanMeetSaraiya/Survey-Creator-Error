import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ActionMenu.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import axios from "axios";
interface ActionMenuProps {
  data: any;
  onDeleted: (id: number) => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ data, onDeleted }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className="action-menu">
      <IconButton aria-describedby={id} onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Button
          variant="outlined"
          color="error"
          onClick={async () => {
            try {
              await axios.delete(`http://192.168.1.192:8080/checklist/${data.id}`);
              onDeleted(data.id); // notify parent
            } catch (error) {
              console.error("Delete failed", error);
            } finally {
              handleClose();
            }
          }}
        >
          Delete
        </Button>
      </Popover>
    </div>
  );
};

export default ActionMenu;