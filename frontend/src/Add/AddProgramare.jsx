import {useEffect, useState} from 'react';
import { useHistory } from 'react';
import React from 'react';
import styles from "./AddAutoturism.module.css"
import Select from 'react-select';

import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
}
    from 'mdb-react-ui-kit';
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function AddProgramare() {

    const [autoturisme, setAutoturisme] = useState([]);
    const [angajati, setAngajati] = useState([]);

    const [autoturismId, setAutoturismId] = useState('');
    const [angajatId, setAngajatId] = useState('');
    const [data, setData] = useState('');
    const [notaClient, setNotaClient] = useState('');
    const [nrLocLucru, setNrLocLucru] = useState('');
    const [oraProgramare, setOraProgramare] = useState('');


    const handleAutoturismId = (option) => {
        setAutoturismId(option.value);
    };

    const handleAngajatId = (option) => {
        setAngajatId(option.value);
    }

    const handleData = (e) => {
        setData(e.target.value);
    };

    const handleNotaClient = (e) => {
        setNotaClient(e.target.value);
    };

    const handleNrLocLucru = (e) => {
        setNrLocLucru(e.target.value);
    };

    const handleOraProgramare = (e) => {
        setOraProgramare(e.target.value);
    };


    const navigate = useNavigate();

    const handleSubmit = (e) => {

        fetch("http://localhost:9999/programari/add", {
            method: 'POST',
            headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"},
            body: JSON.stringify({
                autoturismId: autoturismId,
                angajatId :angajatId,
                dataProgramare: data,
                nrLocLucru: nrLocLucru,
                notaClient: notaClient,
                oraProgramare: oraProgramare,
            })
        })
            .then((response) => response)
            .then(() => {
                setNrLocLucru('');
                setOraProgramare('');
                setNotaClient('');
                setData('');
                setAutoturismId('');
                setAngajatId('');
                navigate('/programari');
            })
    };

    useEffect(() => {
        axios('http://localhost:9999/angajati/all')
            .then(res => setAngajati(res.data))
            .catch(err => console.log(err));
    }, []);
    let angajatiList = angajati.length > 0 && angajati.map((item, i) => {
        return { label: item.nume + " " + item.prenume, value: item.angajatId };
    }, this);

    useEffect(() => {
        axios('http://localhost:9999/autoturisme/all')
            .then(res => setAutoturisme(res.data))
            .catch(err => console.log(err));
    }, []);
    let autoturismeList = autoturisme.length > 0 && autoturisme.map((item, i) => {
        return { label: item.model + " "+ item.serieSasiu, value: item.autoturismId };
    }, this);

    return (
        <MDBContainer className="my-5">
            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark' size='lg'
                    onClick={() => navigate(-1)}
            >Back</MDBBtn>

            <MDBCard>
                <MDBRow className='g-0 align-items-center'>

                    <MDBCol md='12'>
                        <MDBCardBody className='d-flex flex-column'>

                            <div className='d-flex flex-row mt-2 mx-auto'>
                                <MDBIcon fas icon="fas fa-cogs fa-2x" style={{ color: '#9494b8' }}/>
                                <span className="h4 fw-bold mb-0">DC Service Auto</span>
                            </div>

                            <h5 className="fw-normal my-4 pb-1 mx-auto" style={{letterSpacing: '1px'}}>Adauga o programare</h5>

                            <label htmlFor="name">Șasiu pentru autoturism</label>
                            <Select options={autoturismeList} onChange={handleAutoturismId}/>
                            <label htmlFor="name">Angajat</label>
                            <Select options={angajatiList} onChange={handleAngajatId}/>


                            <MDBInput wrapperClass='mb-3 mt-3' label='Data' id='formControlLg' type='data' size="md" onInput={handleData}/>
                            <MDBInput wrapperClass='mb-3' label='Nr loc lucru' id='formControlLg' type='nr' size="md" onInput={handleNrLocLucru}/>
                            <MDBInput wrapperClass='mb-3' label='Nota Client' id='formControlLg' type='nota_client' size="md" onInput={handleNotaClient}/>
                            <MDBInput wrapperClass='mb-3' label='Ora programare' id='formControlLg' type='ora_programare' size="md" onInput={handleOraProgramare}/>

                            <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={handleSubmit}>Add</MDBBtn>

                        </MDBCardBody>
                    </MDBCol>

                </MDBRow>
            </MDBCard>

        </MDBContainer>
    );
}