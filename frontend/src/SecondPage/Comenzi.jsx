import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Comenzi.module.css';
import Table from '../FirstPage/Table';
import {MDBBtn} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export default function Comenzi() {
    const [dataTable, setDataTable] = useState([]);
    const [cantitate, setCantitate] = useState([]);
    const [pret, setPret] = useState([]);

    const handleCantitate = (e) => {
        setCantitate(e.target.value);
    };

    const handlePret = (e) => {
        setPret(e.target.value);
    };

    const comanda = axios.create({
        baseURL: "http://localhost:9999/comenzi",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
    });

    function refreshPage() {
        window.location.reload(false);
    }

    useEffect(() => {
        axios('http://localhost:9999/comenzi/all')
            .then(res => setDataTable(res.data))
            .catch(err => console.log(err))
    }, []);

    const column = [
        { heading: 'Cantitate', value: 'cantitate' },
        { heading: 'Pret Unitate', value: 'pretUnitate' },
        { heading: 'Observatii', value: 'observatii' },
    ]

        const selectPost = (cantitate, pret) => {
            const item = dataTable.find(item => {
                return item.cantitate === Number(cantitate) && item.pretUnitate === Number(pret);
            });

            if (item !== undefined) {
                navigate('/updatecomanda', {
                    state: {
                        comandaId: item.comandaId,
                        programareId: item.programareId,
                        cantitate: item.cantitate,
                        pet: item.pretUnitate,
                        observatii: item.observatii
                    }
                });
            } else {
                toast("Nu a fost selectat nimic. Mai incearca!");
            }
        }

    const navigate = useNavigate();

    const deletePost = (cantitate, pret) => {
        comanda.delete(cantitate + "/" + pret)
    }

    return (
        <div className="Comenzi">
            <h1>Comenzi</h1>
            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark' size='lg'
                    onClick={() => navigate(-1)}
            >Back</MDBBtn>
            <div>
                <label htmlFor="cantitate">Cantitate</label>
                <input id="name" type="text" onChange={handleCantitate}/>
                <label htmlFor="pret">Pret Unitate</label>
                <input id="name" type="text" onChange={handlePret}/>
            </div>
            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-end" color='dark' size='lg'
                    onClick={() => deletePost(cantitate,pret)}
            >Delete</MDBBtn>
            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark' size='lg'
                    onClick={() => window.location.reload(false)}
            >Refresh</MDBBtn>
            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-end" color='dark' size='lg'
                    onClick={() => selectPost(cantitate, pret)}
            >Select for Update</MDBBtn>
            <p></p>
            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark' size='lg'
                    onClick={() => navigate('/querycomanda')}
            >Filtre</MDBBtn>
            <Table data={dataTable} column={column} />
        </div>
    );
}