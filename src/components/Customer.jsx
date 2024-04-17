import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Customer() {

    const [customers, setCustomers] = useState([]);



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

    const getCustomers = () => {
        fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/customers")
            .then(response => response.json())
            .then(responseData => {
                setCustomers(responseData._embedded.customers);
            })
            .catch(error => console.error(error));
    }
    return (
        <>
            <div className="ag-theme-material" style={{ height: 500, width: '100%', margin: 'auto' }} >

                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={15}



                />
            </div>
        </>
    );
}