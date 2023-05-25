import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
    confirmOpen: boolean
    message: string
    setConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setAgree: React.Dispatch<React.SetStateAction<boolean>>
}
export default function ConfirmPopup({confirmOpen, setConfirmOpen, message, setAgree} : Props) {
  const handleClose = () => {
    setConfirmOpen(false);
  };
  return (
    <div>
      <Dialog
        open={confirmOpen}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Confirm Action
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={() => {
            setAgree(true)
          }}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
