import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button } from "@mui/material";
import { useState } from "react";

const DiseaseDialog = ({ open, handleClose, handleSubmit, dialogValue, setDialogValue }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add a new disease</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Did you miss any disease in our list? Please, add it!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={dialogValue.name}
            onChange={(event) =>
              setDialogValue({
                ...dialogValue,
                name: event.target.value,
              })
            }
            label="name"
            type="text"
            variant="standard"
          />
          <TextField
            margin="dense"
            id="findings"
            value={dialogValue.findings}
            onChange={(event) =>
              setDialogValue({
                ...dialogValue,
                findings: event.target.value,
              })
            }
            label="findings"
            type="text"
            variant="standard"
          />
          <TextField
            margin="dense"
            id="impression"
            value={dialogValue.impression}
            onChange={(event) =>
              setDialogValue({
                ...dialogValue,
                impression: event.target.value,
              })
            }
            label="impression"
            type="text"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DiseaseDialog;
