import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from "./pages/Home";
import Form from "./pages/Form"

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/Form" element={<Form />}></Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);