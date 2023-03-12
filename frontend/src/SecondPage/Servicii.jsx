import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './Servicii.module.css';
import Table from '../FirstPage/Table';
import {MDBBtn} from "mdb-react-ui-kit";
import {Link, useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';

export default function Servicii() {
    const [dataTable, setDataTable] = useState([]);
    const [nume, setNume] = useState([]);
    const [pret, setPret] = useState([]);

    const handleNume = (e) => {
        setNume(e.target.value);
    };

    const handlePret = (e) => {
        setPret(e.target.value);
    };

    useEffect(() => {
        axios('http://localhost:9999/servicii/all')
            .then(res => setDataTable(res.data))
            .catch(err => console.log(err))
    }, []);


    const column = [
        {heading: 'Nume', value: 'nume'},
        {heading: 'Pret unitate', value: 'pretUnitate'},
    ]

    const selectPost = (nume, pret) => {
        const item = dataTable.find(item => {
            return item.nume === nume && item.pretUnitate === Number(pret);
        });

        if (item !== undefined) {
            navigate('/updateserviciu', { state:{serviciuId: item.serviciuId, name:item.nume, pet:item.pretUnitate}});
        }
        else {
            toast("Nu a fost selectat nimic. Mai incearca!");
        }
    }

    const navigate = useNavigate();

    return (
        <div className="Servicii">
            <h1>Servicii</h1>
            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark' size='lg'
                    onClick={() => navigate(-1)}
            >Back</MDBBtn>
            <div>
                <label htmlFor="nume">Nume</label>
                <input id="name" type="text" onChange={handleNume}/>
                <label htmlFor="pret">Pret Unitate</label>
                <input id="name" type="text" onChange={handlePret}/>
            </div>
            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-end" color='dark' size='lg'
                    onClick={() => selectPost(nume, pret)}
            >Select</MDBBtn>
            <p></p>
            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark' size='lg'
                    onClick={() => navigate('/queryserviciu')}
            >Filtre</MDBBtn>
            <Table data={dataTable} column={column}/>
        </div>
    );
}