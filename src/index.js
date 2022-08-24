import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import ReactDOM from "react-dom";
import { NavLink, BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from "./pages/Home";
import "./index.css";

const rootElement = document.getElementById("root");
const bodyEl = document.getElementsByTagName("body");

ReactDOM.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  </>,
  rootElement
);

serviceWorkerRegistration.register();