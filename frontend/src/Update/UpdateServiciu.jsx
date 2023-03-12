import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow} from "mdb-react-ui-kit";
import {useLocation, useNavigate} from "react-router-dom";

export default function UpdateServiciu() {

    const state = useLocation().state;

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
        setNume(state.name);
        setPret(state.pet);

        axios('http://localhost:9999/servicii/all')
            .then(res => setDataTable(res.data))
            .catch(err => console.log(err))
    }, []);

    const serviciu = axios.create({
        baseURL: "http://localhost:9999/servicii", headers: {
            "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
    });

    const updatePost = (nume, pret) => {
        serviciu.post("/update", {
            serviciuId: state.serviciuId,
            nume: nume,
            pretUnitate: pret
        });

        navigate('/servicii');
    }

    const navigate = useNavigate();

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
                                <MDBIcon fas icon="fas fa-cogs fa-2x" style={{color: '#9494b8'}}/>
                                <span className="h4 fw-bold mb-0">DC Service Auto</span>
                            </div>

                            <h5 className="fw-normal my-4 pb-1 mx-auto" style={{letterSpacing: '1px'}}>Serviciu
                                Update</h5>


                            <MDBInput wrapperClass='mb-3 mt-3' label='Nume' id='formControlLg' type='data' size="md"
                                      onInput={handleNume} value={nume}/>
                            <MDBInput wrapperClass='mb-3' label='Pret' id='formControlLg' type='nr' size="md"
                                      onInput={handlePret} value={pret}/>
                            <MDBBtn className="mb-4 px-5" color='dark' size='lg'
                                    onClick={() => updatePost(nume, pret)}>Update</MDBBtn>

                        </MDBCardBody>
                    </MDBCol>

                </MDBRow>
            </MDBCard>

        </MDBContainer>);
}