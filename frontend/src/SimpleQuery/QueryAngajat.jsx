import React, {useEffect, useState} from 'react';

import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from 'mdb-react-ui-kit';
import {Link, useNavigate} from "react-router-dom";
import Select from "react-select";
import axios from "axios";

export default function QueryAutoturism() {

    const [dataSetata, setData] = useState([]);
    const [oraSetata, setOra] = useState([]);

    const data = ["2022-04-02", "2022-05-26", "2022-05-27", "2022-05-28", "2022-12-31"];
    const ora = ["10:00:00", "12:00:00", "14:00:00", "15:00:00", "17:00:00"];

    const navigate = useNavigate();

    const handleData = (option) => {
        setData(option.value);
    }

    const handleOra = (option) => {
        setOra(option.value);
    }


    let oraList = ora.length > 0 && ora.map((item, i) => {
        return {label: item, value: item };
    }, this);

    let dataList = data.length > 0 && data.map((item2, i) => {
        return {label: item2, value: item2};
    }, this);


    const viewAngajat = (dataSetata, oraSetata) => {
        navigate('/angajatfirstpage', {state: {data: dataSetata, ora: oraSetata}})
    }

    return (
        <MDBContainer className="my-5">

            <MDBCard>
                <MDBRow className='g-0 align-items-center'>

                    <MDBCol md='12'>
                        <MDBCardBody className='d-flex flex-column'>
                            <h2 className="fw-normal my-2 pb-1" style={{letterSpacing: '1px'}}>Query Angajati</h2>
                        </MDBCardBody>
                    </MDBCol>

                    <MDBCol md='12'>
                        <MDBCardBody className='d-flex flex-column'>
                            <label htmlFor="name">Vedeti toti angajatii care lucreaza in data : </label>
                            <Select options={dataList} onChange={handleData}/>

                            <label htmlFor="name">Dupa ora : </label>
                            <Select options={oraList} onChange={handleOra}/>
                            <MDBBtn className="d-grid gap-2 d-md-inline-flex justify-content-md-start" color='dark'
                                    size='lg'
                                    onClick={() => viewAngajat(dataSetata, oraSetata)}
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
