import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import ReactDOM from "react-dom";
import { NavLink, BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from "./pages/Home";

const rootElement = document.getElementById("root");
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