import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from "./pages/Home";
import Form from "./pages/Form"

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <div class="banner">
      <img src="https://i.ibb.co/w4t0Hfg/bamboo.png"></img>
      <p>대나무<span>숲</span></p>
    </div>
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/Form" element={<Form />}></Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);