import React, {useState} from 'react';

import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from 'mdb-react-ui-kit';
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {ButtonGroup} from "react-bootstrap";

export default function MeniuLogin() {

    return (
        <MDBContainer className="my-5">

            <MDBCard>
                <MDBRow className='g-0 align-items-center'>

                    <MDBCol md='12'>
                        <MDBCardBody className='d-flex flex-column'>
                            <h2 className="fw-normal my-2 pb-1" style={{letterSpacing: '1px'}}>Buna ziua</h2>
                        </MDBCardBody>
                    </MDBCol>

                    <MDBCol md='12'>
                        <MDBCardBody className='d-flex flex-column'>

                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Vezi Service
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="/clienti">Clienti</Dropdown.Item>
                                    <Dropdown.Item href="/programari">Programari</Dropdown.Item>
                                    <Dropdown.Item href="/angajati">Angajati</Dropdown.Item>
                                    <Dropdown.Item href="/autoturisme">Autoturisme</Dropdown.Item>
                                    <Dropdown.Item href="/servicii">Servicii</Dropdown.Item>
                                    <Dropdown.Item href="/comenzi">Comenzi</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <MDBBtn href={"form/"} className="mb-4 px-5" color='dark' size='lg'
                            >Adauga client</MDBBtn>
                            <MDBBtn href={"addangajat/"} className="mb-4 px-5" color='dark' size='lg'
                            >Adauga angajat</MDBBtn>
                            <MDBBtn href={"addprogramare/"} className="mb-4 px-5" color='dark' size='lg'
                            >Adauga programare</MDBBtn>

                        </MDBCardBody>
                    </MDBCol>

                </MDBRow>
            </MDBCard>
            <MDBBtn href={"/"} className="mb-4 px-5" color='dark' size='lg'
            >Iesire</MDBBtn>

        </MDBContainer>
    );
}
