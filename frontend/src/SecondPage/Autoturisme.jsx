import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Autoturisme.module.css';
import Table from '../FirstPage/Table';
import {MDBBtn} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";

export default function Autoturisme() {
    const [dataTable, setDataTable] = useState([]);

    useEffect(() => {
        axios('http://localhost:9999/autoturisme/all')
            .then(res => setDataTable(res.data))
            .catch(err => console.log(err))
    }, []);

    const column = [
        { heading: 'Marca', value: 'marca' },
        { heading: 'Model', value: 'model' },
        { heading: 'Serie Sasiu', value: 'serieSasiu' },
    ]

    const navigate = useNavigate();

    return (
        <div className="Autoturisme">
            <h1>Autoturisme</h1>
            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark' size='lg'
                    onClick={() => navigate(-1)}
            >Back</MDBBtn>
            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark' size='lg'
                    onClick={() => navigate('/queryautoturism')}
            >Filtre</MDBBtn>
            <Table data={dataTable} column={column} />
        </div>
    );
}