import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import './Clienti.module.css';
import Table from '../FirstPage/Table';
import {MDBBtn, MDBInput} from "mdb-react-ui-kit";


export default function Clienti() {
    const [dataTable, setDataTable] = useState([]);
    const [cnp, setCNP] = useState([]);

    const client = axios.create({
        baseURL: "http://localhost:9999/clienti",
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
        axios('http://localhost:9999/clienti/all')
            .then(res => setDataTable(res.data))
            .catch(err => console.log(err))
    }, []);

    const deletePost = (cnp) => {
        client.delete(cnp)
    }

    const column = [
        {heading: 'Nume', value: 'nume'}, {heading: 'Prenume', value: 'prenume'}, {
            heading: 'Cnp', value: 'cnp'
        }, {heading: 'Serie', value: 'serie'}, {heading: 'Numar', value: 'numar'}, {
            heading: 'Adresa', value: 'adresa'
        }, {heading: 'Email', value: 'email'}, {heading: 'Parola', value: 'parola'},
    ]

    const navigate = useNavigate();

    return (<div className="Clienti">
        <h1>Clienti</h1>
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
        <MDBBtn href={"/form"} className="mb-4 px-5" color='dark' size='lg'
        >Adauga client</MDBBtn>
        <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark' size='lg'
                onClick={() => navigate('/queryclient')}
        >Filtre</MDBBtn>
        <Table data={dataTable} column={column}/>
    </div>);
}