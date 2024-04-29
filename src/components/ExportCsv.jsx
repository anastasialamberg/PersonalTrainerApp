import { tr } from "date-fns/locale";
import React from "react";

export default function ExportCsv() {

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

    return (
        <div>
            <table>
                <tbody>
                    {
                        customers.map((cust, index) => (
                            <tr key={index}>
                                <td>{cust.firstname}</td>
                                <td>{cust.lastname}</td>
                                <td>{cust.streetaddress}</td>
                                <td>{cust.postcode}</td>
                                <td>{cust.city}</td>
                                <td>{cust.email}</td>
                                <td>{cust.phone}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}