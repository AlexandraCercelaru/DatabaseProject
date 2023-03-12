import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from '../FirstPage/Table';
import {MDBBtn} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";

export default function AutoturismThirdPage() {
    const [dataTable, setDataTable] = useState([]);

    useEffect(() => {
        axios('http://localhost:9999/autoturisme/multe')
            .then(res => setDataTable(res.data))
            .catch(err => console.log(err))
    }, []);

    const column = [
        { heading: 'Marca', value: 'marca' },
        { heading: 'Model', value: 'model' },
        { heading: 'Serie Sasiu', value: 'serieSasiu' },
        { heading: 'Numar de programari', value: 'numarProg' },
    ]

    const navigate = useNavigate();

    return (
        <div className="Autoturism">
            <h1>Autoturismul cu cele mai multe programari</h1>
            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark' size='lg'
                    onClick={() => navigate(-1)}
            >Back</MDBBtn>
            <Table data={dataTable} column={column} />
        </div>
    );
}