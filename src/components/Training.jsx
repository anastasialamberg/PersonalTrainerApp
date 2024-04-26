import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { format } from "date-fns";
import { Button, Snackbar } from "@mui/material";

export default function Training() {

    //States
    const [trainings, setTrainings] = useState([]);
    const [openSnackbar, setOpenSnackBar] = useState(false);
    const [snackmessage, setSnackMessage] = useState("");

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
            //cellrenderer for delete button
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

    useEffect(() => {
        getTrainings();
    }, []);

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

    // Function to delete a training
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





    return (
        <>
            <div className="ag-theme-material" style={{ height: 600, width: 900, margin: 'auto' }}>
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
        </>
    );
}
