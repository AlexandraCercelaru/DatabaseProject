import { useState } from 'react';
import React from 'react';
import styles from "./Form.css"

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

export default function Form() {

    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [cnp, setCNP] = useState('');
    const [series, setSeries] = useState('');
    const [number, setNumber] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const handleCNP = (e) => {
        setCNP(e.target.value);
    };

    const handleSeries = (e) => {
        setSeries(e.target.value);
    };

    const handleNumber = (e) => {
        setNumber(e.target.value);
    };

    const handleAddress = (e) => {
        setAddress(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {

        fetch("http://localhost:9999/clienti/sign-up", {  // /" + cnp
            method: 'POST',
            headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"},
            body: JSON.stringify({
                nume: name,
                prenume: firstName,
                cnp: cnp,
                serie: series,
                numar: number,
                adresa: address,
                email: email,
                parola: password
            })
        })
            .then((response) => response)
            .then(() => {
                setName('');
                setFirstName('');
                setCNP('');
                setSeries('');
                setNumber('');
                setAddress('');
                setEmail('');
                setPassword('');
                navigate('/firstpage');
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

                            <h5 className="fw-normal my-4 pb-1 mx-auto" style={{letterSpacing: '1px'}}>To enjoy our services, make an account first</h5>

                            <MDBInput wrapperClass='mb-3' label='Nume' id='formControlLg' type='nume' size="md" onInput={handleName}/>
                            <MDBInput wrapperClass='mb-3' label='Prenume' id='formControlLg' type='prenume' size="md" onInput={handleFirstName}/>
                            <MDBInput wrapperClass='mb-3' label='CNP' id='formControlLg' type='cnp' size="md" onInput={handleCNP}/>
                            <MDBInput wrapperClass='mb-3' label='Serie' id='formControlLg' type='serie' size="md" onInput={handleSeries}/>
                            <MDBInput wrapperClass='mb-3' label='Numar' id='formControlLg' type='numar' size="md" onInput={handleNumber}/>
                            <MDBInput wrapperClass='mb-3' label='Adresa' id='formControlLg' type='adresa' size="md" onInput={handleAddress}/>
                            <MDBInput wrapperClass='mb-3' label='Email address' id='formControlLg' type='email' size="md" onInput={handleEmail}/>
                            <MDBInput wrapperClass='mb-3' label='Password' id='formControlLg' type='password' size="md" onInput={handlePassword}/>

                            <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={handleSubmit}>Register</MDBBtn>

                        </MDBCardBody>
                    </MDBCol>

                </MDBRow>
            </MDBCard>

        </MDBContainer>
    );
}