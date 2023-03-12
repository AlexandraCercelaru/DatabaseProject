import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Table from '../FirstPage/Table';
import {MDBBtn} from "mdb-react-ui-kit";
import {useLocation, useNavigate} from "react-router-dom";

export default function AutoturismSecondPage() {
    const [dataTable, setDataTable] = useState([]);

    const state = useLocation().state;

    useEffect(() => {
        axios('http://localhost:9999/autoturisme/by-date/' + state.data)
            .then(res => setDataTable(res.data))
            .catch(err => console.log(err))
    }, []);

    const column = [
        {heading: 'Marca', value: 'marca'},
        {heading: 'Model', value: 'model'},
        {heading: 'Serie Sasiu', value: 'serieSasiu'},
        {heading: 'Data Programare', value: 'dataProgramare'},
        {heading: 'Numar Loc Lucru', value: 'nrLocLucru'},
        {heading: 'Nota Client', value: 'notaClient'},
        {heading: 'Ora Programare', value: 'oraProgramare'},
    ]
    const navigate = useNavigate();

    return (
        <div className="Autoturisme">
            <h1>Autoturisme pentru client</h1>
            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark' size='lg'
                    onClick={() => navigate(-1)}
            >Back</MDBBtn>
            <Table data={dataTable} column={column}/>
        </div>
    );
}