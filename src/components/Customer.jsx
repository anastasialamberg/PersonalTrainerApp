import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button, Snackbar } from "@mui/material";
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
        {
            //cellrenderer for delete button
            headerName: '',
            cellRenderer: params => (
                <Button
                    size="small"
                    color="error"
                    onClick={() => deleteCustomer(params.data)}
                >
                    Delete
                </Button>
            ),
            width: 120
        },
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

    //delete customer
    const deleteCustomer = (customer) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            fetch(customer._links.customer.href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setSnackMessage("The customer was deleted succesfully!");
                        setOpenSnackBar(true);
                        getCustomers();
                    } else {
                        window.alert("Something went wrong with deleting");
                    }
                })
                .catch(error => console.error(error));
        }
    };

    //save new customer
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