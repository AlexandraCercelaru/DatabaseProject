import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from '../FirstPage/Table';
import {MDBBtn} from "mdb-react-ui-kit";
import {useLocation, useNavigate} from "react-router-dom";

export default function AutoturismFourthPage() {
    const [dataTable, setDataTable] = useState([]);

    const state = useLocation().state;

    useEffect(() => {
        axios('http://localhost:9999/autoturisme/query-complex/' + state.adr)
            .then(res => setDataTable(res.data))
            .catch(err => console.log(err))
    }, []);

    const column = [
        { heading: 'Marca', value: 'marca' },
        { heading: 'Model', value: 'model' },
        { heading: 'Serie Sasiu', value: 'serieSasiu' },
        { heading: 'Nume', value: 'nume' },
        { heading: 'Prenume', value: 'prenume' },
        { heading: 'Nume Serviciu', value: 'nume' },
        { heading: 'Pret', value: 'pretUnitate' },
    ]

    const navigate = useNavigate();

    return (
        <div className="Autoturisme">
            <h1>Afisati toate autoturismele, clientii carora le apartin,
                serviciul si pretul pentru serviciul folosit de fiecare reparate de angajatii
                care locuiesc in judetul selectat anterior</h1>
            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark' size='lg'
                    onClick={() => navigate(-1)}
            >Back</MDBBtn>
            <Table data={dataTable} column={column} />
        </div>
    );
}