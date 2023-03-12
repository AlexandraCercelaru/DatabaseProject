import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Angajati.module.css';
import Table from '../FirstPage/Table';
import {MDBBtn} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

export default function Angajati() {
    const [dataTable, setDataTable] = useState([]);
    const [cnp, setCNP] = useState([]);

    const angajat = axios.create({
        baseURL: "http://localhost:9999/angajati",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
    });

    function refreshPage() {
        window.location.reload(false);
    }

    const handleCNP = (e) => {
        setCNP(e.target.value);
        console.log(e.target.value);
    };

    useEffect(() => {
        axios('http://localhost:9999/angajati/all')
            .then(res => setDataTable(res.data))
            .catch(err => console.log(err))
    }, []);

    const deletePost = (cnp) => {
        angajat.delete(cnp)
    }

    const column = [
        { heading: 'Nume', value: 'nume' },
        { heading: 'Prenume', value: 'prenume' },
        { heading: 'Data Nastere', value: 'dataNastere' },
        { heading: 'Cnp', value: 'cnp' },
        { heading: 'Serie', value: 'serie' },
        { heading: 'Numar', value: 'numar' },
        { heading: 'Adresa', value: 'adresa' },
        { heading: 'Data Angajare', value: 'dataAngajare' },
    ]

    const navigate = useNavigate();

    return (
        <div className="Angajati">
            <h1>Angajati</h1>
            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark' size='lg'
                    onClick={() => navigate(-1)}
            >Back</MDBBtn>
            <div>
                <label htmlFor="name">CNP</label>
                <input id="name" type="text" onChange={handleCNP}/>
            </div>
            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark' size='lg'
                    onClick={() => deletePost(cnp)}
            >Delete</MDBBtn>
            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark' size='lg'
                    onClick={() => window.location.reload(false)}
            >Refresh</MDBBtn>
            <p></p>
            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark' size='lg'
                    onClick={() => navigate('/queryangajat')}
            >Filtre</MDBBtn>
            <Table data={dataTable} column={column} />
        </div>
    );
}