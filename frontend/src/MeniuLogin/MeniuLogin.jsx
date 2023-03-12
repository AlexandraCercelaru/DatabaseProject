import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import picture from './car-repair-logo.jpg'
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow
} from 'mdb-react-ui-kit';

export default function MeniuLogin() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const navigate = useNavigate();

    const handleLogin = (e) => {

        fetch("http://localhost:9999/clienti/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"},
            body: JSON.stringify({
                email: email,
                parola: password
            })
        })
            .then((response) => response.json())
            .then((json) => {
                alert(json.message);
                setEmail('');
                setPassword('');
                navigate('/firstpage');
            })
    }

    return (
        <MDBContainer className="my-5">

            <MDBCard>
                <MDBRow className='g-0 align-items-center'>

                    <MDBCol md='6'>
                        <MDBCardImage src={picture} alt="picture" className='rounded-start w-100'/>
                    </MDBCol>

                    <MDBCol md='6'>
                        <MDBCardBody className='d-flex flex-column'>

                            <div className='d-flex flex-row mt-2'>
                                <MDBIcon fas icon="fas fa-cogs fa-2x" style={{color: '#9494b8'}}/>
                                <span className="h4 fw-bold mb-0">DC Service Auto</span>
                            </div>

                            <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your
                                account</h5>

                            <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email'
                                      size="lg" value={email} onInput={handleEmail}/>
                            <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password'
                                      size="lg" value={password} onInput={handlePassword}/>

                            <MDBBtn className="mb-4 px-5" color='dark' size='lg'
                                    onClick={handleLogin}>Login</MDBBtn>
                            <Link className="mb-5 pb-lg-2 align-self-center" style={{color: '#393f81'}} to="/form">Register
                                here</Link>
                        </MDBCardBody>
                    </MDBCol>

                </MDBRow>
            </MDBCard>
        </MDBContainer>
    );
}
