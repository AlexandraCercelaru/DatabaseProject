import React, {useEffect, useState} from 'react';

import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from 'mdb-react-ui-kit';
import {Link, useNavigate} from "react-router-dom";
import Select from "react-select";
import axios from "axios";

export default function QueryClient() {

    const [model, setModel] = useState([]);

    const data = ["A110 Coupe", "Focus", "Defender 90", "Spyder", "i30 Fastback"];

    const navigate = useNavigate();

    const handleModel = (option) => {
        setModel(option.value);
    }

    let dataList = data.length > 0 && data.map((item, i) => {
        return {label: item, value: item};
    }, this);


    const viewClient = (model) => {
        navigate('/clientfirstpage', {state: {model: model}})
    }

    return (
        <MDBContainer className="my-5">

            <MDBCard>
                <MDBRow className='g-0 align-items-center'>

                    <MDBCol md='12'>
                        <MDBCardBody className='d-flex flex-column'>
                            <h2 className="fw-normal my-2 pb-1" style={{letterSpacing: '1px'}}>Query Clienti</h2>
                        </MDBCardBody>
                    </MDBCol>

                    <MDBCol md='12'>
                        <MDBCardBody className='d-flex flex-column'>
                            <label htmlFor="name">Selectati toti clientii pentru autoturismele
                                cu model : </label>
                            <Select options={dataList} onChange={handleModel}/>
                            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark'
                                    size='lg'
                                    onClick={() => viewClient(model)}
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
