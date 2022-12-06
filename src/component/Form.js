// import axios from "axios";
// import React, { useState } from "react";
// import "../style/Form.css";

// export default function Form() {
//   const [judul, setJudul] = useState("");
//   const [pengarang, setPengarang] = useState("");
//   const [tahunTerbit, setTahunterbit] = useState("");
//   const [deskripsi, setDeskripsi] = useState("");

//   const addBuku = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post("http://localhost:8000/daftarBuku", {
//         judul: judul,
//         deskripsi: deskripsi,
//         pengarang: pengarang,
//         tahunTerbit: tahunTerbit,
//       });
//       window.location.reload();
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div>
//       <h1>Form Tambah Buku</h1>
//       <form onSubmit={addBuku}>
//         <div className="input">
//           <label htmlFor="judul">Judul:</label>
//           <input
//             type="text"
//             name="judul"
//             id="judul"
//             onChange={(e) => setJudul(e.target.value)}
//             required
//           />
//         </div>

//         <div className="input">
//           <label htmlFor="deskripsi">Deskripsi:</label>
//           <input
//             type="text"
//             name="deskripsi"
//             id="deskripsi"
//             onChange={(e) => setDeskripsi(e.target.value)}
//             required
//           />
//         </div>
//         <div className="input">
//           <label htmlFor="tahunTerbit">TahunTerbit:</label>
//           <input
//             type="date"
//             name="tahunTerbit"
//             id="tahunTerbit"
//             onChange={(e) => setTahunterbit(e.target.value)}
//           />
//         </div>

//         <div className="input">
//           <label htmlFor="pengarang">Pengarang:</label>
//           <input
//             type="text"
//             name="pengarang"
//             id="pengarang"
//             onChange={(e) => setPengarang(e.target.value)}
//             required
//           />
//         </div>
//         <br />
//         <button type="submit">Tambahkan</button>
//       </form>
//     </div>
//   );
// }
