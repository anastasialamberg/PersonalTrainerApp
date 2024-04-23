import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { format, compareAsc } from "date-fns";

export default function Training() {

    //States
    const [trainings, setTrainings] = useState([]);
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
        }
    ];

    useEffect(() => {
        getTrainings();
    }, []);

    //using gettraininsg api
    const getTrainings = () => {
        fetch("https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings")
            .then(response => response.json())
            .then(responseData => {
                setTrainings(responseData);
            })
            .catch(error => console.error(error));
    }

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
        </>
    );
}
