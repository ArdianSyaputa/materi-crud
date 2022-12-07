import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2/dist/sweetalert2.js";

// method yang berfungsi get/menampilkan melalui db.json yang di buat
// ada method untuk delte data melalui id yang di baca oleh sistem
export default function Home() {
  const [buku, setBuku] = useState([]);

  const getAll = async () => {
    await axios
      .get("http://localhost:8000/daftarBuku")
      .then((res) => {
        setBuku(res.data);
      })
      .catch((error) => {
        alert("Terjadi keasalahan" + error);
      });
  };

  useEffect(() => {
    getAll();
  }, []);
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const deleteUser = async (id) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios.delete(" http://localhost:8000/daftarBuku/" + id);
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
    getAll();
  };

  return (
    <div className="container my-5">
      {buku.length !== 0 ? (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>No.</th>
                <th>Judul</th>
                <th>Deskripsi</th>
                <th>TahunTerbit</th>
                <th>Pengarang</th>
                {localStorage.getItem("id") !== null ? <th>Aksi</th> : <></>}
              </tr>
            </thead>
            <tbody>
              {buku.map((book, index) => {
                return (
                  <tr key={book.id}>
                    <td>{index + 1}</td>
                    <td>{book.judul}</td>
                    <td>{book.deskripsi}</td>
                    <td>{book.tahunTerbit}</td>
                    <td>{book.pengarang}</td>
                    {localStorage.getItem("id") !== null ? (
                      <>
                        {" "}
                        <td>
                          {/* on Click Agar button delete berfungsi */}
                          <Button
                            variant="danger"
                            className="mx-1"
                            onClick={() => deleteUser(book.id)}
                          >
                            Hapus
                          </Button>
                          {/* berfungsi untuk mengarahkan page edit */}
                          <a href={"/edit/" + book.id}>
                            <Button variant="warning" className="mx-1">
                              Ubah
                            </Button>
                          </a>
                        </td>
                      </>
                    ) : (
                      <></>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <h1>Belum Ada Data </h1>
        </>
      )}
    </div>
  );
}
