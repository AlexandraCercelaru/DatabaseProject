import React, {useEffect, useState} from 'react';

import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from 'mdb-react-ui-kit';
import {Link, useNavigate} from "react-router-dom";
import Select from "react-select";
import axios from "axios";

export default function QueryAutoturism() {

    const [clienti, setClienti] = useState([]);
    const [clientId, setClientId] = useState('');

    const [dataSetata, setData] = useState([]);
    const [adresaSetata, setAdresa] = useState([]);

    const data = ["2022-04-02", "2022-05-26", "2022-05-27", "2022-05-28", "2022-12-31"];
    const adresa = ["Arad", "Bacau", "Bucuresti", "Gorj", "Maramures", "Valcea"];

    const navigate = useNavigate()

    const handleAdresa = (option) => {
        setAdresa(option.value);
    }

    const handleClientId = (option) => {
        setClientId(option.value);
    }

    const handleData = (option) => {
        setData(option.value);
    }

    useEffect(() => {
        axios('http://localhost:9999/clienti/all')
            .then(res => setClienti(res.data))
            .catch(err => console.log(err));
    }, []);

    let clientiList = clienti.length > 0 && clienti.map((item, i) => {
        return {label: item.nume + " " + item.prenume, value: item.clientId};
    }, this);

    let dataList = data.length > 0 && data.map((item2, i) => {
        return {label: item2, value: item2};
    }, this);

    let adresaList = adresa.length > 0 && adresa.map((item3, i) => {
        return {label: item3, value: item3};
    }, this)

    const viewAutoturisme = (clientId) => {
        navigate('/autoturismefirstpage', {state: {clientId: clientId}})
    }

    const viewAutoturismeWithDate = (dataSetata) => {
        navigate('/autoturismesecondpage', {state: {data: dataSetata}})
    }

    const viewAngajatAdresa = (adresa) => {
        navigate('/autoturismfourthpage', {state: {adr: adresa}})
    }

    return (
        <MDBContainer className="my-5">

            <MDBCard>
                <MDBRow className='g-0 align-items-center'>

                    <MDBCol md='12'>
                        <MDBCardBody className='d-flex flex-column'>
                            <h2 className="fw-normal my-2 pb-1" style={{letterSpacing: '1px'}}>Query Autoturisme</h2>
                        </MDBCardBody>
                    </MDBCol>

                    <MDBCol md='12'>
                        <MDBCardBody className='d-flex flex-column'>
                            <label htmlFor="name">Selectati toate autoturismele programate in data</label>
                            <Select options={dataList} onChange={handleData}/>
                            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark'
                                    size='lg'
                                    onClick={() => viewAutoturismeWithDate(dataSetata)}
                            >Select</MDBBtn>

                            <label htmlFor="name">Selectati toate autoturismele pentru clientul: </label>
                            <Select options={clientiList} onChange={handleClientId}/>
                            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark'
                                    size='lg'
                                    onClick={() => viewAutoturisme(clientId)}
                            >Select</MDBBtn>

                            <MDBCol md='12'>
                                <MDBCardBody className='d-flex flex-column'>
                                    <h6 className="fw-normal my-2 pb-1" style={{letterSpacing: '1px'}}>Vedeti
                                        autoturismul cu cele mai multe programari</h6>
                                    <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark'
                                            size='lg'
                                            onClick={() => navigate("/autoturismethirdpage") }
                                    >Select</MDBBtn>
                                </MDBCardBody>
                            </MDBCol>

                            <label htmlFor="name">Afisati toate autoturismele, clientii carora le apartin,
                            serviciul si pretul pentru serviciul folosit de fiecare reparate de angajatii
                            care locuiesc in : </label>
                            <Select options={adresaList} onChange={handleAdresa}/>
                            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark'
                                    size='lg'
                                    onClick={() => viewAngajatAdresa(adresaSetata)}
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
