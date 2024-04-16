import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";

export default function Customer() {

    const [customers, setCustomers] = useState([]);

    const columnDefs = [
        { field: 'firstname' },
        { field: 'lastname' },
        { field: 'streetaddress' },
        { field: 'postcode' },
        { field: 'city' },
        { field: 'email' },
        { field: 'phone' },
    ];

    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = () => {
        fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api")
            .then(response => response.json())
            .then(responseData => {
                setCustomers(responseData._embedded.customers);
            })
            .catch(error => console.error(error));
    }
    return (
        <>
            <div className="ag-theme-material" style={{ height: 500, width: '100%' }} >

                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}


                />
            </div>
        </>
    );
}