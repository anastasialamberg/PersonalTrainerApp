import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export default function AddCustomer({ onSave, onCancel }) {

    // kentät
    const [customer, setCustomer] = useState({

        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: '',
    });

    const [open, setOpen] = useState(false);

    // funktiot
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

        setCustomer({
            firstname: '',
            lastname: '',
            streetaddress: '',
            postcode: '',
            city: '',
            email: '',
            phone: ''
        });
    };

    const handleSave = () => {
        console.log("Saving customer: ", customer);
        onSave(customer);
        setCustomer({
            firstname: '',
            lastname: '',
            streetaddress: '',
            postcode: '',
            city: '',
            email: '',
            phone: ''
        });
        handleClose();
    };

    const handleCancel = () => {
        console.log("Tallennuksen peruutus");
        onCancel();
        handleClose();
    };

    const addCustomer = () => {
        onSave(customer);
        handleClose();
    }

    // dialog
    return (
        <>
            <Button onClick={handleClickOpen}>Add customer</Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>Add customer</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="firstname"
                        value={customer.firstname}
                        onChange={(e) => setCustomer({ ...customer, firstname: e.target.value })}
                        variant="standard" />
                    <TextField
                        margin="dense"
                        label="lastname"
                        value={customer.lastname}
                        onChange={(e) => setCustomer({ ...customer, lastname: e.target.value })}
                        variant="standard" />
                    <TextField
                        margin="dense"
                        label="streetaddress"
                        value={customer.streetaddress}
                        onChange={(e) => setCustomer({ ...customer, streetaddress: e.target.value })}
                        variant="standard" />
                    <TextField
                        margin="dense"
                        label="postcode"
                        value={customer.postcode}
                        onChange={(e) => setCustomer({ ...customer, postcode: e.target.value })}
                        variant="standard" />
                    <TextField
                        margin="dense"
                        label="city"
                        value={customer.city}
                        onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                        variant="standard" />
                    <TextField
                        margin="dense"
                        label="email"
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                        variant="standard" />
                    <TextField
                        margin="dense"
                        label="phone"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        variant="standard" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={addCustomer}>Cancel</Button>
                </DialogActions>

            </Dialog>
        </>
    )
}