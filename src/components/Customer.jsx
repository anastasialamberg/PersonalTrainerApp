import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Snackbar } from "@mui/material";
import AddCustomer from "./AddCustomer";

export default function Customer() {


    //States
    const [customers, setCustomers] = useState([]);
    const [openSnackbar, setOpenSnackBar] = useState(false);
    const [snackmessage, setSnackMessage] = useState("");

    //Colum Definitions for AGGrid
    const columnDefs = [
        { field: 'firstname', sortable: true, filter: true, floatiFilter: true },
        { field: 'lastname', sortable: true, filter: true, floatiFilter: true },
        { field: 'streetaddress', sortable: true, filter: true, floatiFilter: true },
        { field: 'postcode' },
        { field: 'city', sortable: true, filter: true, floatiFilter: true },
        { field: 'email', sortable: true, filter: true, floatiFilter: true },
        { field: 'phone', sortable: true, filter: true, floatiFilter: true },
    ];

    useEffect(() => {
        getCustomers();
    }, []);

    //get all customers
    const getCustomers = () => {
        fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/customers")
            .then(response => response.json())
            .then(responseData => {
                setCustomers(responseData._embedded.customers);
            })
            .catch(error => console.error(error));
    };

    const handleSave = (newCustomer) => {
        fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/customers", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
        })
            .then(response => {
                if (response.ok) {
                    setSnackMessage("The customer was saved successfully!");
                    setOpenSnackBar(true);
                } else {
                    window.alert("Something went wrong with saving");
                }
            })
            .catch(error => console.error(error));
    };

    const handleCancel = () => {

    };

    return (
        <>

            <AddCustomer onSave={handleSave} onCancel={handleCancel} />
            <div className="ag-theme-material" style={{ height: 500, width: 1500, margin: 'auto' }} >

                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={15}

                />
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackBar(false)}
                message={snackmessage}
            />
        </>
    );
}