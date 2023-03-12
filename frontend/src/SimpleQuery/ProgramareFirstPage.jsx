import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Table from '../FirstPage/Table';
import {MDBBtn} from "mdb-react-ui-kit";
import {useLocation, useNavigate} from "react-router-dom";

export default function ProgramareFirstPage() {
    const [dataTable, setDataTable] = useState([]);

    const state = useLocation().state;

    useEffect(() => {
        axios('http://localhost:9999/programari/by-pet/' + state.pet)
            .then(res => setDataTable(res.data))
            .catch(err => console.log(err))
    }, []);

    const column = [
        { heading: 'Data Programare', value: 'dataProgramare' },
        { heading: 'Nr loc lucru', value: 'nrLocLucru' },
        { heading: 'Nota Client', value: 'notaClient' },
        { heading: 'Ora Programare', value: 'oraProgramare' },
        {heading: 'Nume', value: 'nume'},
        {heading: 'Pret unitate', value: 'pretUnitate'},
    ]
    const navigate = useNavigate();

    return (
        <div className="Programari">
            <h1>Programarile care au pretul la servicii mai mare decat cel stabilit</h1>
            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark' size='lg'
                    onClick={() => navigate(-1)}
            >Back</MDBBtn>
            <Table data={dataTable} column={column}/>
        </div>
    );
}