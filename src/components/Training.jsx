// Training.jsx

import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { format } from "date-fns";
import { Button, Snackbar } from "@mui/material";
import AddTraining from "./AddTraining";

import { Link } from "react-router-dom";

export default function Training() {
    //States
    const [trainings, setTrainings] = useState([]);
    const [openSnackbar, setOpenSnackBar] = useState(false);
    const [snackmessage, setSnackMessage] = useState("");
    const [customers, setCustomers] = useState([]);

    // Kentät
    const columnDefs = [
        {
            field: 'date',
            valueFormatter: params => format(new Date(params.value), 'dd.MM.yyyy HH:mm'),
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        { field: 'duration', sortable: true, filter: true, floatingFilter: true },
        { field: 'activity', sortable: true, filter: true, floatingFilter: true },
        {
            headerName: 'Customer',
            valueGetter: params => {
                const customer = params.data.customer;
                return `${customer.firstname} ${customer.lastname}`;
            },
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            headerName: '',
            cellRenderer: params => (
                <Button
                    size="small"
                    color="error"
                    onClick={() => deleteTraining(params.data)}
                >
                    Delete
                </Button>
            ),
            width: 120
        },
    ];

    // Haetaan harjoitukset ja asiakastiedot
    useEffect(() => {
        getTrainings();
        getCustomers();
    }, []);

    // Haetaan kaikki harjoitukset
    const getTrainings = () => {
        fetch("https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch trainings');
                }
                return response.json();
            })
            .then(responseData => {
                setTrainings(responseData);
            })
            .catch(error => console.error(error));
    };

    // Haetaan kaikki asiakastiedot
    //get all customers
    const getCustomers = () => {
        fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/customers")
            .then(response => response.json())
            .then(responseData => {
                setCustomers(responseData._embedded.customers);
            })
            .catch(error => console.error(error));
    };

    // Harjoituksen poistaminen
    const deleteTraining = (training) => {
        if (window.confirm("Are you sure you want to delete this training?")) {
            fetch(`https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/${training.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to delete training: ${response.status}`);
                    }
                    setSnackMessage("The training was deleted successfully!");
                    setOpenSnackBar(true);
                    getTrainings();
                })
                .catch(error => {
                    console.error(error);
                    window.alert("Something went wrong with deleting");
                });
        }
    };

    // tallenetaan uusi treeni: ei toimi
    const handleSave = () => {

        const selectedCustomer = customers.find(customer => customer.firstname === trainings.firstname && customer.lastname === trainings.lastname);

        if (!selectedCustomer) {
            window.alert("Customer not found!");
            return;
        }

        const isoDate = new Date(trainings.date).toISOString();

        const trainingToAdd = {
            date: isoDate,
            activity: trainings.activity,
            duration: trainings.duration,
            customer: selectedCustomer
        };

        fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trainingToAdd)
        })
            .then(response => {
                if (response.ok) {
                    setSnackMessage("The training was saved successfully!");
                    setOpenSnackBar(true);
                    getTrainings();
                } else {
                    window.alert("Something went wrong with saving");
                }
            })
            .catch(error => {
                console.error(error);
                window.alert("An error occurred while processing the request");
            });
    };


    const handleCancel = () => {

    };

    return (
        <>
            <AddTraining customers={customers} onSave={handleSave} onCancel={handleCancel} trainings={trainings} />
            <div className="ag-theme-material" style={{ height: 600, width: 1000, margin: 'auto' }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={9}
                />
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackBar(false)}
                message={snackmessage}
            />
            <Link to="/statistics">Go to Statistics</Link>
        </>
    );
}
