import React, {useEffect, useState} from 'react';

import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow} from 'mdb-react-ui-kit';
import {Link, useNavigate} from "react-router-dom";
import Select from "react-select";
import axios from "axios";

export default function QueryProgramare() {

    const [pretSetat, setPret] = useState([]);

    const navigate = useNavigate();

    const handlePret = (option) => {
        setPret(option.target.value);
    }

    const viewProgramare = (pretSetat) => {
        navigate('/programarefirstpage', {state: {pet: pretSetat}})
    }

    return (
        <MDBContainer className="my-5">

            <MDBCard>
                <MDBRow className='g-0 align-items-center'>

                    <MDBCol md='12'>
                        <MDBCardBody className='d-flex flex-column'>
                            <h2 className="fw-normal my-2 pb-1" style={{letterSpacing: '1px'}}>Query Programari</h2>
                        </MDBCardBody>
                    </MDBCol>

                    <MDBCol md='12'>
                        <MDBCardBody className='d-flex flex-column'>
                            <label htmlFor="name">Selectati toate programarile care au pretul la servicii mai mare decat : </label>
                            <MDBInput wrapperClass='mb-3' label='Pret' id='formControlLg' type='pret' size="md" onInput={handlePret}/>
                            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark'
                                    size='lg'
                                    onClick={() => viewProgramare(pretSetat)}
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
