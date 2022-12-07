import React, { useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useHistory } from "react-router-dom";
// method untuk menambahkan data ke db.json
export default function NavigationBar() {
  const [show, setShow] = useState(false);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tahunTerbit, setTahunTerbit] = useState("");
  const [pengarang, setPengarang] = useState("");

  // Method untuk menampilkan modal bootstrap dan menghilangkan setelah input data
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = useHistory()

  const addUser = async (e) => {
    e.preventDefault();
    Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success'
    )
    const data = {
      judul: judul,
      deskripsi: deskripsi,
      tahunTerbit: tahunTerbit,
      pengarang: pengarang,
    };

    await axios
      .post("http://localhost:8000/daftarBuku", data)
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              {localStorage.getItem("id") !== null ? (
                <>
                  <li className="nav-item">
                    <button className="btn" onClick={handleShow}>
                      Tambah Buku
                    </button>
                  </li>
                  <li className="nav-item float-right">
                    <a className="btn" onClick={logout}>
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <>
                <li className="nav-item float-right">
                  <a className="btn" href="/login">
                    login
                  </a>
                </li>
                </>
              )}
            </Nav>

            <img
              src="http://25.media.tumblr.com/c77c87c8340f40d57e891f0d507b93e7/tumblr_mw9hs5OBOW1r9a1iuo1_500.gif"
              alt=""
              style={{ width: 95 }}
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* di panggil agar bisa muncul dan hilang */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Buku</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method="POST" onSubmit={addUser}>
            <Form.Group className="mb-3">
              <Form.Label>Judul</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter judul"
                onChange={(e) => setJudul(e.target.value)}
                value={judul}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter deskripsi"
                onChange={(e) => setDeskripsi(e.target.value)}
                value={deskripsi}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tahun Terbit</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Tahunterbit"
                onChange={(e) => setTahunTerbit(e.target.value)}
                value={tahunTerbit}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pengarang</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pengarang"
                value={pengarang}
                onChange={(e) => setPengarang(e.target.value)}
                required
              />
            </Form.Group>
            {/* Untuk menghilangkan model */}
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            ||
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
