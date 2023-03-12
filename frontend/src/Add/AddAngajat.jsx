import { useState } from 'react';
import { useHistory } from 'react';
import React from 'react';
import styles from "./AddAngajat.module.css"

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

export default function AddAngajat() {

    const [nume, setNume] = useState('');
    const [prenume, setPrenume] = useState('');
    const [dataNastere, setDataNastere] = useState('');
    const [adresa, setAdresa] = useState('');
    const [cnp, setCNP] = useState('');
    const [serie, setSerie] = useState('');
    const [numar, setNumar] = useState('');
    const [dataAngajare, setDataAngajare] = useState('');


    const handleNume = (e) => {
        setNume(e.target.value);
    };

    const handlePrenume = (e) => {
        setPrenume(e.target.value);
    };

    const handleDataNastere = (e) => {
        setDataNastere(e.target.value);
    };

    const handleAdresa = (e) => {
        setAdresa(e.target.value);
    };

    const handleCNP = (e) => {
        setCNP(e.target.value);
    };

    const handleSerie = (e) => {
        setSerie(e.target.value);
    };

    const handleNumar = (e) => {
        setNumar(e.target.value);
    };

    const handleDataAngajare = (e) => {
        setDataAngajare(e.target.value);
    };


    const navigate = useNavigate();

    const handleSubmit = (e) => {

        fetch("http://localhost:9999/angajati/add", {
            method: 'POST',
            headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"},
            body: JSON.stringify({
                nume: nume,
                prenume: prenume,
                dataNastere: dataNastere,
                cnp: cnp,
                serie: serie,
                numar: numar,
                adresa: adresa,
                dataAngajare: dataAngajare,
            })
        })
            .then((response) => response)
            .then(() => {
                setNume('');
                setPrenume('');
                setDataNastere('');
                setAdresa('');
                setCNP('');
                setSerie('');
                setNumar('');
                setDataAngajare('');
                navigate('/angajati');
            })
    };


    return (
        <MDBContainer className="my-5">

            <MDBCard>
                <MDBRow className='g-0 align-items-center'>

                    <MDBCol md='12'>
                        <MDBCardBody className='d-flex flex-column'>

                            <div className='d-flex flex-row mt-2 mx-auto'>
                                <MDBIcon fas icon="fas fa-cogs fa-2x" style={{ color: '#9494b8' }}/>
                                <span className="h4 fw-bold mb-0">DC Service Auto</span>
                            </div>

                            <h5 className="fw-normal my-4 pb-1 mx-auto" style={{letterSpacing: '1px'}}>Adauga un angajat</h5>

                            <MDBInput wrapperClass='mb-3' label='Nume' id='formControlLg' type='nume' size="md" onInput={handleNume}/>
                            <MDBInput wrapperClass='mb-3' label='Prenume' id='formControlLg' type='prenume' size="md" onInput={handlePrenume}/>
                            <MDBInput wrapperClass='mb-3' label='Data nastere' id='formControlLg' type='cnp' size="md" onInput={handleDataNastere}/>
                            <MDBInput wrapperClass='mb-3' label='CNP' id='formControlLg' type='serie' size="md" onInput={handleCNP}/>
                            <MDBInput wrapperClass='mb-3' label='Serie' id='formControlLg' type='serie' size="md" onInput={handleSerie}/>
                            <MDBInput wrapperClass='mb-3' label='Numar' id='formControlLg' type='serie' size="md" onInput={handleNumar}/>
                            <MDBInput wrapperClass='mb-3' label='Adresa' id='formControlLg' type='serie' size="md" onInput={handleAdresa}/>
                            <MDBInput wrapperClass='mb-3' label='Data angajare' id='formControlLg' type='serie' size="md" onInput={handleDataAngajare}/>

                            <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={handleSubmit}>Add</MDBBtn>

                        </MDBCardBody>
                    </MDBCol>

                </MDBRow>
            </MDBCard>

        </MDBContainer>
    );
}