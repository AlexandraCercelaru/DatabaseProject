import React, {useEffect, useState} from 'react';

import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow} from 'mdb-react-ui-kit';
import {Link, useNavigate} from "react-router-dom";
import Select from "react-select";
import axios from "axios";

export default function QueryComanda() {

    const [cantitate, setCantitate] = useState([]);
    const [numar, setNumar] = useState([]);

    const navigate = useNavigate();

    const handleCantitate = (option) => {
        setCantitate(option.target.value);
    }

    const handleNumar =(option) => {
        setNumar(option.target.value);
    }

    const viewComanda = (cantitate) => {
        navigate('/comandafirstpage', {state: {cantitate: cantitate}})
    }

    const viewAll = (numar) => {
        navigate('/comandasecondpage', {state: {number: numar}})
    }

    return (
        <MDBContainer className="my-5">

            <MDBCard>
                <MDBRow className='g-0 align-items-center'>

                    <MDBCol md='12'>
                        <MDBCardBody className='d-flex flex-column'>
                            <h2 className="fw-normal my-2 pb-1" style={{letterSpacing: '1px'}}>Query Comenzi</h2>
                        </MDBCardBody>
                    </MDBCol>

                    <MDBCol md='12'>
                        <MDBCardBody className='d-flex flex-column'>
                            <label htmlFor="name">Selectati toate comenzile cu cantitate mai mare decat : </label>
                            <MDBInput wrapperClass='mb-3' label='Cantitate' id='formControlLg' type='cantitate' size="md" onInput={handleCantitate}/>
                            <label htmlFor="name">de la programarile cu numar minim de comenzi </label>
                            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark'
                                    size='lg'
                                    onClick={() => viewComanda(cantitate)}
                            >Select</MDBBtn>
                        </MDBCardBody>
                    </MDBCol>

                    <MDBCol md='12'>
                        <MDBCardBody className='d-flex flex-column'>
                            <label htmlFor="name">Afisati clientii, autoturismele pe care le detin si
                            cate comenzi a dat fiecare client
                            cu un numar de comenzi mai mare de : </label>
                            <MDBInput wrapperClass='mb-3' label='Numar de comenzi' id='formControlLg' type='cantitate' size="md" onInput={handleNumar}/>
                            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark'
                                    size='lg'
                                    onClick={() => viewAll(numar)}
                            >Select</MDBBtn>
                        </MDBCardBody>
                    </MDBCol>

                </MDBRow>
            </MDBCard>
            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark' size='lg'
                    onClick={() => navigate(-1)}
            >Back</MDBBtn>

        </MDBContainer>
    );
}
