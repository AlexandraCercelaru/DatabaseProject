import React, {useEffect, useState} from 'react';

import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from 'mdb-react-ui-kit';
import {Link, useNavigate} from "react-router-dom";
import Select from "react-select";
import axios from "axios";

export default function QueryServiciu() {

    const [servicii, setServicii] = useState([]);
    const [programari, setProgramari] = useState([]);
    const [pret, setPret] = useState([]);
    const [nrLocLucru, setNrLocLucru] = useState([]);

    const navigate = useNavigate()

    const handleServiciuPret = (option) => {
        setPret(option.value);
    }

    const handleNrLocLucru = (option) => {
        setNrLocLucru(option.value);
    }

    useEffect(() => {
        axios('http://localhost:9999/servicii/all')
            .then(res => setServicii(res.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios('http://localhost:9999/programari/all')
            .then(res => setProgramari(res.data))
            .catch(err => console.log(err));
    }, []);

    let serviciiList = servicii.length > 0 && servicii.map((item, i) => {
        return {label: item.pretUnitate, value: item.pretUnitate};
    }, this);

    let programariList = programari.length > 0 && programari.map((item2, i) => {
        return {label: item2.nrLocLucru, value: item2.nrLocLucru};
    }, this);


    const viewServicii = (pret, nrLocLucru) => {
        navigate('/serviciifirstpage', {state: {pet: pret, nrLocLucru: nrLocLucru}})
    }


    return (
        <MDBContainer className="my-5">

            <MDBCard>
                <MDBRow className='g-0 align-items-center'>

                    <MDBCol md='12'>
                        <MDBCardBody className='d-flex flex-column'>
                            <h2 className="fw-normal my-2 pb-1" style={{letterSpacing: '1px'}}>Query Servicii</h2>
                        </MDBCardBody>
                    </MDBCol>

                    <MDBCol md='12'>
                        <MDBCardBody className='d-flex flex-column'>
                            <label htmlFor="name">Selectati serviciile cu pretul mai mare sau egal cu : </label>
                            <Select options={serviciiList} onChange={handleServiciuPret}/>
                            <label htmlFor="name">de la programarea de la numarul de loc:  </label>
                            <Select options={programariList} onChange={handleNrLocLucru}/>
                            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark'
                                    size='lg'
                                    onClick={() => viewServicii(pret,nrLocLucru)}
                            >Select</MDBBtn>
                        </MDBCardBody>
                    </MDBCol>

                    <MDBCol md='12'>
                        <MDBCardBody className='d-flex flex-column'>
                            <h6 className="fw-normal my-2 pb-1" style={{letterSpacing: '1px'}}>Vedeti
                            serviciile ale caror programari au pretul cel mai scump din programarile din care fac parte </h6>
                            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark'
                                    size='lg'
                                    onClick={() => navigate("/serviciusecondpage") }
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
