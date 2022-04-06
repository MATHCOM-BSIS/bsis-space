import "./index.css"

import ReactDOM from "react-dom";
import { NavLink, BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from "./pages/Home";
import Form from "./pages/Form"

const rootElement = document.getElementById("root");
ReactDOM.render(
  <>
    <header>
      <p>Bullein Board 🚀</p>
    </header>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/Form" element={<Form />}></Route>
      </Routes>
    </BrowserRouter>
  </>,
  rootElement
);