import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import React from 'react';
import './App.css';

import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";

import MeniuLogin from "./MeniuLogin/MeniuLogin";
import Form from "./Register/Form"
import FirstPage from "./FirstPage/FirstPage"
import Clienti from "./SecondPage/Clienti";
import Angajati from "./SecondPage/Angajati";
import Autoturisme from "./SecondPage/Autoturisme";
import Servicii from "./SecondPage/Servicii";
import Comenzi from "./SecondPage/Comenzi";
import Programari from "./SecondPage/Programari";
import {ToastContainer} from "react-toastify";
import AddProgramare from "./Add/AddProgramare";
import AddAutoturism from "./Add/AddAutoturism";
import UpdateServiciu from "./Update/UpdateServiciu";
import AddAngajat from "./Add/AddAngajat";
import UpdateComanda from "./Update/UpdateComanda";
import QueryAutoturism from "./SimpleQuery/QueryAutoturism";
import AutoturismFirstPage from "./SimpleQuery/AutoturismFirstPage";
import AutoturismSecondPage from "./SimpleQuery/AutoturismSecondPage";
import AutoturismThirdPage from "./SimpleQuery/AutoturismThirdPage";
import QueryAngajat from "./SimpleQuery/QueryAngajat";
import AngajatFirstPage from "./SimpleQuery/AngajatFirstPage";
import ProgramareFirstPage from "./SimpleQuery/ProgramareFirstPage";
import QueryProgramare from "./SimpleQuery/QueryProgramare";
import QueryComanda from "./SimpleQuery/QueryComanda";
import ComandaFirstPage from "./SimpleQuery/ComandaFirstPage";
import AutoturismFourthPage from "./SimpleQuery/AutoturismFourthPage";
import ComandaSecondPage from "./SimpleQuery/ComandaSecondPage";
import QueryClient from "./SimpleQuery/QueryClient";
import ClientFirstPage from "./SimpleQuery/ClientiFirstPage";
import QueryServiciu from "./SimpleQuery/QueryServiciu";
import ServiciiFirstPage from "./SimpleQuery/ServiciiFirstPage";
import ServiciuSecondPage from "./SimpleQuery/ServiciuSecondPage";

function App() {
    return (

    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MeniuLogin />} />
            <Route path="form/*" element={<Form />} />
            <Route path="firstpage/*" element={<FirstPage />} />
            <Route path="clienti/*" element={<Clienti />} />
            <Route path="angajati/*" element={<Angajati />} />
            <Route path="autoturisme/*" element={<Autoturisme />} />
            <Route path="servicii/*" element={<Servicii />} />
            <Route path="programari/*" element={<Programari />} />
            <Route path="comenzi/*" element={<Comenzi />} />
            <Route path="addprogramare/*" element={<AddProgramare />} />
            <Route path="addautoturism/*" element={<AddAutoturism />} />
            <Route path="updateserviciu/*" element={<UpdateServiciu />} />
            <Route path="addangajat/*" element={<AddAngajat />} />
            <Route path="updatecomanda/*" element={<UpdateComanda />} />
            <Route path="queryautoturism/*" element={<QueryAutoturism />} />
            <Route path="autoturismefirstpage/*" element={<AutoturismFirstPage />} />
            <Route path="autoturismesecondpage/*" element={<AutoturismSecondPage />} />
            <Route path="autoturismethirdpage/*" element={<AutoturismThirdPage />} />
            <Route path="queryangajat/*" element={<QueryAngajat/>} />
            <Route path="angajatfirstpage/*" element={<AngajatFirstPage/>} />
            <Route path="programarefirstpage/*" element={<ProgramareFirstPage/>} />
            <Route path="queryprogramare/*" element={<QueryProgramare/>} />
            <Route path="querycomanda/*" element={<QueryComanda/>} />
            <Route path="comandafirstpage/*" element={<ComandaFirstPage/>} />
            <Route path="autoturismfourthpage/*" element={<AutoturismFourthPage/>} />
            <Route path="comandasecondpage/*" element={<ComandaSecondPage/>} />
            <Route path="queryclient/*" element={<QueryClient/>} />
            <Route path="clientfirstpage/*" element={<ClientFirstPage/>} />
            <Route path="queryserviciu/*" element={<QueryServiciu/>} />
            <Route path="serviciifirstpage/*" element={<ServiciiFirstPage/>} />
            <Route path="serviciusecondpage/*" element={<ServiciuSecondPage/>} />
        </Routes>
        <ToastContainer/>
    </BrowserRouter>
    )

}

export default App;