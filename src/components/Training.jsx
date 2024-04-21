
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { format, compareAsc } from "date-fns";

export default function Training() {

    const [trainings, setTrainings] = useState([]);

    const columnDefs = [
        {
            field: 'date',
            valueFormatter: params => format(new Date(params.value), 'dd.MM.yyyy HH:mm'), sortable: true, filter: true, floatiFilter: true
        },
        { field: 'duration', sortable: true, filter: true, floatiFilter: true },
        { field: 'activity', sortable: true, filter: true, floatiFilter: true },

        {
            headerName: 'Customer',
            valueGetter: () => {
                const customer = fetch(`https://customerrestservice-personaltraining.rahtiapp.fi/api/customers/${customerId}`)
                    .then(response => response.json())
                    .then(customerData => `${customerData.firstname} ${customerData.lastname}`)
                    .catch(error => {
                        console.error('Error fetching customer data:', error);
                        return '';
                    });
                return customer;
            }
        }
    ];

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings")
            .then(response => response.json())
            .then(responseData => {
                setTrainings(responseData._embedded.trainings);
            })
            .catch(error => console.error(error));
    }

    return (
        <>
            <div className="ag-theme-material" style={{ height: 600, width: '120%', margin: 'auto' }}>

                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={9}
                />
            </div>
        </>
    );
}