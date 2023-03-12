import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Table from '../FirstPage/Table';
import {MDBBtn} from "mdb-react-ui-kit";
import {useLocation, useNavigate} from "react-router-dom";

export default function ServiciiFirstPage() {
    const [dataTable, setDataTable] = useState([]);

    const state = useLocation().state;

    useEffect(() => {
        axios('http://localhost:9999/servicii/' + state.pet + "/" + state.nrLocLucru)
            .then(res => setDataTable(res.data))
            .catch(err => console.log(err))
    }, []);

    const column = [
        {heading: 'Nume', value: 'nume'},
        {heading: 'Pret unitate', value: 'pretUnitate'},
        { heading: 'Data Programare', value: 'dataProgramare' },
        { heading: 'Ora Programare', value: 'oraProgramare' },
        { heading: 'Nr loc lucru', value: 'nrLocLucru' },
    ]
    const navigate = useNavigate();

    return (
        <div className="Servicii">
            <h1>Serviciile cu pretul mai mare sau egal decat cel selectat de la programarea de la nr de loc selectat</h1>
            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark' size='lg'
                    onClick={() => navigate(-1)}
            >Back</MDBBtn>
            <Table data={dataTable} column={column}/>
        </div>
    );
}