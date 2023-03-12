import { useState } from 'react';
import { useHistory } from 'react';
import React from 'react';
import styles from "./AddAutoturism.module.css"

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

export default function AddAutoturism() {

    const [marca, setMarca] = useState('');
    const [model, setModel] = useState('');
    const [serieSasiu, setSerieSasiu] = useState('');
    const [notaClient, setNotaClient] = useState('');


    const handleMarca = (e) => {
        setMarca(e.target.value);
    };

    const handleModel = (e) => {
        setModel(e.target.value);
    };

    const handleSerieSasiu = (e) => {
        setSerieSasiu(e.target.value);
    };

    const handleNotaClient = (e) => {
        setNotaClient(e.target.value);
    };


    const navigate = useNavigate();

    const handleSubmit = (e) => {

        fetch("http://localhost:9999/autoturisme/add", {
            method: 'POST',
            headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"},
            body: JSON.stringify({
                marca: marca,
                model: model,
                serieSasiu: serieSasiu,
                notaClient: notaClient,
            })
        })
            .then((response) => response)
            .then(() => {
                setMarca('');
                setModel('');
                setSerieSasiu('');
                setNotaClient('');
                navigate('/addprogramare');
                //console.log('merge');
            })
        // console.log('merge');
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

                            <h5 className="fw-normal my-4 pb-1 mx-auto" style={{letterSpacing: '1px'}}>Adauga un autoturism</h5>

                            <MDBInput wrapperClass='mb-3' label='Marca' id='formControlLg' type='nume' size="md" onInput={handleMarca}/>
                            <MDBInput wrapperClass='mb-3' label='Model' id='formControlLg' type='prenume' size="md" onInput={handleModel}/>
                            <MDBInput wrapperClass='mb-3' label='Serie Sasiu' id='formControlLg' type='cnp' size="md" onInput={handleSerieSasiu}/>
                            <MDBInput wrapperClass='mb-3' label='Nota Client' id='formControlLg' type='serie' size="md" onInput={handleNotaClient}/>

                            <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={handleSubmit}>Add</MDBBtn>

                        </MDBCardBody>
                    </MDBCol>

                </MDBRow>
            </MDBCard>

        </MDBContainer>
    );
}