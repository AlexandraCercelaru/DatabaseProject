import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Programari.module.css';
import Table from '../FirstPage/Table';
import {MDBBtn} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";

export default function Programari() {
    const [dataTable, setDataTable] = useState([]);

    useEffect(() => {
        axios('http://localhost:9999/programari/all')
            .then(res => setDataTable(res.data))
            .catch(err => console.log(err))
    }, []);

    const column = [
        { heading: 'Data Programare', value: 'dataProgramare' },
        { heading: 'Nr loc lucru', value: 'nrLocLucru' },
        { heading: 'Nota Client', value: 'notaClient' },
        { heading: 'Ora Programare', value: 'oraProgramare' },
    ]

    const navigate = useNavigate();

    return (
        <div className="Programari">
            <h1>Programari</h1>
            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark' size='lg'
                    onClick={() => navigate(-1)}
            >Back</MDBBtn>
            <MDBBtn href={"addprogramare/"} className="mb-4 px-5" color='dark' size='lg'
            >Adauga programare</MDBBtn>
            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark' size='lg'
                    onClick={() => navigate('/queryprogramare')}
            >Filtre</MDBBtn>
            <Table data={dataTable} column={column} />
        </div>
    );
}