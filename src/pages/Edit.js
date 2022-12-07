import React, { useState, useEffect } from "react";
import { InputGroup, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import "../style/pages.css";
import Swal from 'sweetalert2'

// method untuk membaca sistem dan bisa di ubah melalui input
export default function Edit() {
  const param = useParams();
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [tahunTerbit, setTahunterbit] = useState("");

  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:8000/daftarBuku/" + param.id)
      .then((response) => {
        const newBook = response.data;
        setJudul(newBook.judul);
        setDeskripsi(newBook.deskripsi);
        setPengarang(newBook.pengarang);
        setTahunterbit(newBook.tahunTerbit);
      });
  }, []);

  const submitActionHandler = async (event) => {
    event.preventDefault();
    await
    Swal.fire({
      title: 'Yakin Untuk Mengedit',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yaa!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
        .put("http://localhost:8000/daftarBuku/" + param.id, {
          judul: judul,
          deskripsi: deskripsi,
          pengarang: pengarang,
          tahunTerbit: tahunTerbit,
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
      .then(() => {
        Swal.fire(
            'Good job!',
            'You clicked the button!',
            'success'
          )
        history.push("/");
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };
  
  return (
    <div className="edit mx-5">
      <Form onSubmit={submitActionHandler}>
        <div className="container my-5">
          <div className="name mb-3">
            <Form.Label>
              <strong>Judul</strong>
            </Form.Label>
            <InputGroup className="d-flex-gap-3">
              <Form.Control
                placeholder="Judul"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
              />
            </InputGroup>
          </div>
        

        <div className="place-of-birth mb-3">
          <Form.Label>
            <strong>Deskripsi</strong>
          </Form.Label>
          <InputGroup className="d-flex gap-3">
            <Form.Control
              placeholder="Deskripsi"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
            />
          </InputGroup>
        </div>

        <div className="place-of-birth mb-3">
          <Form.Label >
            <strong>Tahun Terbit</strong>
          </Form.Label>
          <InputGroup className="d-flex gap-3">
            <Form.Control
             type="date"
              placeholder="tahunTerbit"
              value={tahunTerbit}
              onChange={(e) => setTahunterbit(e.target.value)}
            />
          </InputGroup>
        </div>

        <div className="place-date mb-3">
          <Form.Label>
            <strong>Pengarang</strong>
          </Form.Label>
          <div className="d-flex gap-3">
            <InputGroup className="d-flex gap-3">
              <Form.Control
                type="text"
                value={pengarang}
                onChange={(e) => setPengarang(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>
        <div className="d-flex justify-content-end align-center mt-2">
          {/* type submit untuk sistem yang telah membaca method bahwa berupa edit */}
          <button className="buton btn" type="submit">
            Save
          </button>
        </div>
        </div>
      </Form>
    </div>
  );
}
