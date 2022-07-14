import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";


import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";
import IndexAdmin from "./Components/Admin/index.component";
import EditUser from "./Components/Admin/edit.component";
import View from "./Components/Admin/view.component";
import Header from "./Components/header.component"
import Filter from "./Components/Admin/filter.component";
import IndexUser from "./Components/User/index.component";

function App() {
  return (<Router>
    <Header/>

    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Routes>
            <Route path="/" element={<IndexUser/>}></Route>
            <Route path="/product/edit/:id" element={<EditUser />} />
            <Route path='/admin/view/:id' element={<View />} />
            <Route path='/admin' element={<IndexAdmin />} />
            <Route path='/admin/filter' element={<Filter/>}></Route>
            <Route path='/type/:id' element={<IndexUser/>}></Route>
          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>);
}

export default App;