import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Table from '../FirstPage/Table';
import {MDBBtn} from "mdb-react-ui-kit";
import {useLocation, useNavigate} from "react-router-dom";

export default function AngajatFirstPage() {
    const [dataTable, setDataTable] = useState([]);

    const state = useLocation().state;
    console.log(state.data);
    console.log(state.ora);

    useEffect(() => {
        axios('http://localhost:9999/angajati/by-date/' + state.data + "/" + state.ora)
            .then(res => setDataTable(res.data))
            .catch(err => console.log(err))
    }, []);

    const column = [
        { heading: 'Nume', value: 'nume' },
        { heading: 'Prenume', value: 'prenume' },
        { heading: 'Data Programare', value: 'dataProgramare' },
        { heading: 'Ora Programare', value: 'oraProgramare' },
    ]
    const navigate = useNavigate();

    return (
        <div className="Angajati">
            <h1>Angajatii din data si ora aleasa</h1>
            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark' size='lg'
                    onClick={() => navigate(-1)}
            >Back</MDBBtn>
            <Table data={dataTable} column={column}/>
        </div>
    );
}