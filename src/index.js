import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import ReactDOM from "react-dom";
import { NavLink, BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from "./Components/Home";
import Write from './Components/Write'
import "./index.css";

const rootElement = document.getElementById("root");
const bodyEl = document.getElementsByTagName("body");

ReactDOM.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/Write" element={<Write />}></Route>
      </Routes>
    </BrowserRouter>
  </>,
  rootElement
);

serviceWorkerRegistration.register();