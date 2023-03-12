import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Table from '../FirstPage/Table';
import {MDBBtn} from "mdb-react-ui-kit";
import {useLocation, useNavigate} from "react-router-dom";

export default function ComandaFirstPage() {
    const [dataTable, setDataTable] = useState([]);

    const state = useLocation().state;

    useEffect(() => {
        axios('http://localhost:9999/comenzi/by-cantitate/' + state.cantitate)
            .then(res => setDataTable(res.data))
            .catch(err => console.log(err))
    }, []);

    const column = [
        { heading: 'Cantitate', value: 'cantitate' },
        { heading: 'Pret Unitate', value: 'pretUnitate' },
        { heading: 'Observatii', value: 'observatii' },
    ]
    const navigate = useNavigate();

    return (
        <div className="Comenzi">
            <h1>Angajatii din data si ora aleasa</h1>
            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark' size='lg'
                    onClick={() => navigate(-1)}
            >Back</MDBBtn>
            <Table data={dataTable} column={column}/>
        </div>
    );
}