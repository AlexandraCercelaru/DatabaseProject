import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from '../FirstPage/Table';
import {MDBBtn} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";

export default function ServiciuSecondPage() {
    const [dataTable, setDataTable] = useState([]);

    useEffect(() => {
        axios('http://localhost:9999/servicii/multe')
            .then(res => setDataTable(res.data))
            .catch(err => console.log(err))
    }, []);

    const column = [
        { heading: 'Nume', value: 'nume' },
        { heading: 'Pret', value: 'pretUnitate' },
    ]

    const navigate = useNavigate();

    return (
        <div className="Servicii">
            <h1>Vedeti
                serviciile ale caror programari au pretul cel mai scump din programarile din care fac parte</h1>
            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark' size='lg'
                    onClick={() => navigate(-1)}
            >Back</MDBBtn>
            <Table data={dataTable} column={column} />
        </div>
    );
}