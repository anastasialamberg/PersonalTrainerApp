import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export default function AddTraining({ onSave, onCancel, customers }) {
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
        customerId: ''
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

        setTraining({
            date: '',
            duration: '',
            activity: '',
            customerId: ''
        });
    };

    const handleSave = () => {
        console.log("Saving training: ", training);


        console.log("Customer list: ", customers);

        onSave(training);
        handleClose();
    };

    const handleCancel = () => {
        onCancel();
        handleClose();
    };


    return (
        <>
            <Button onClick={handleClickOpen}>Add training</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add training</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Date"
                        type="datetime-local"
                        value={training.date}
                        onChange={(e) => setTraining({ ...training, date: e.target.value })}
                        variant="standard"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Duration"
                        type="text"
                        value={training.duration}
                        onChange={(e) => setTraining({ ...training, duration: e.target.value })}
                        variant="standard"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Activity"
                        type="text"
                        value={training.activity}
                        onChange={(e) => setTraining({ ...training, activity: e.target.value })}
                        variant="standard"
                        fullWidth
                    />
                    <TextField

                        margin="dense"
                        label="Customer"
                        value={training.customerId}
                        onChange={(e) => setTraining({ ...training, customerId: e.target.value })}
                        variant="standard"
                        fullWidth
                    >
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
