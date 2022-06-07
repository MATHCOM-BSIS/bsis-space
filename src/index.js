import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import "./index.css"

import ReactDOM from "react-dom";
import { NavLink, BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from "./pages/Home";
import Form from "./pages/Form"
import Timetable from "./pages/Timetable"

const rootElement = document.getElementById("root");
ReactDOM.render(
  <>
    <header>
      <p><a href="/#">Bulletin Board 🚀</a></p>
    </header>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/Form" element={<Form />}></Route>
        <Route exact path="/Timetable" element={<Timetable />}></Route>
      </Routes>
    </BrowserRouter>
  </>,
  rootElement
);

serviceWorkerRegistration.register();