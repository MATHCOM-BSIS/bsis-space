import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import "./index.css"

import ReactDOM from "react-dom";
import { NavLink, BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from "./pages/Home";
import Form from "./pages/Form"
import Timetable from "./pages/Timetable"
import Search from "./pages/Search"
import Meal from "./pages/Meal"

const rootElement = document.getElementById("root");
ReactDOM.render(
  <>
    <header>
      <p><a href="/#">BSIS-SPACE 🚀</a></p>
    </header>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/Form" element={<Form />}></Route>
        <Route exact path="/Search" element={<Search />}></Route>
        <Route exact path="/Timetable" element={<Timetable />}></Route>
        <Route exact path="/Meal" element={<Meal />}></Route>
      </Routes>
    </BrowserRouter>
  </>,
  rootElement
);

serviceWorkerRegistration.register();