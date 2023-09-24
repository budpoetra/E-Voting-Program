import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useEth from "../../../contexts/EthContext/useEth";
import Swal from "sweetalert2";

const ModalDapil = (props) => {
  const dapil = props.data.dapil;
  const DaerahPemilihan = props.data.DaerahPemilihan;
  const [nama, setNama] = useState("");

  const generateKodeDapil = () => {
    const jumlah = DaerahPemilihan.length + 1;
    const newKode = jumlah.toString().padStart(3, "0");
    return `DAPIL-${newKode}`;
  };

  const {
    state: { contract, accounts },
  } = useEth();

  const navigate = useNavigate();

  const tambahDaerahPemilihan = async () => {
    const kodeDapilBaru = document.querySelector("#kodeDapilBaru").value;

    if (nama === "") {
      return Swal.fire({
        icon: "warning",
        text: "Data Belum Lengkap, Mohon Isi Semua Form 😅",
      });
    }

    const fechtDataAdmin = await contract.methods
      .cekAdmin()
      .call({ from: accounts[0] });

    if (fechtDataAdmin[0] !== accounts[0]) {
      return Swal.fire({
        icon: "warning",
        text: "Akun MetaMask Yang Digunakan Tidak Terdaftar Sebagai Admin 😅",
      });
    }

    const fetchDaerahPemilihan = await contract.methods
      .cekDaerahPemilihan()
      .call({ from: accounts[0] });

    for (let i = 0; i < fetchDaerahPemilihan.length; i++) {
      if (
        fetchDaerahPemilihan[i].namaDapil.toLowerCase() === nama.toLowerCase()
      ) {
        return Swal.fire({
          icon: "warning",
          text: "Nama Daerah Pemilihan Sudah Terdaftar 😅",
        });
      }
    }

    const tambah = await contract.methods
      .tambahDaerahPemilihan(kodeDapilBaru, nama)
      .send({ from: accounts[0] });

    if (tambah.status) {
      Swal.fire({
        icon: "success",
        text: "Berhasil Menambahkan Daerah Pemilihan Baru 🫡",
      }).then(async () => {
        const fetchDaerahPemilihan = await contract.methods
          .cekDaerahPemilihan()
          .call({ from: accounts[0] });
        const fetchDaftarPemilih = await contract.methods
          .cekPemilih()
          .call({ from: accounts[0] });
        const fetchDaftarPetugas = await contract.methods
          .cekPetugas()
          .call({ from: accounts[0] });
        navigate("/administrator/daftar-daerah-pemilihan", {
          state: {
            fetchDaerahPemilihan,
            fetchDaftarPetugas,
            fetchDaftarPemilih,
          },
        });
        props.close();
      });
    }
  };

  const ubahDaerahPemilihan = async () => {
    if (nama === "") {
      return Swal.fire({
        icon: "warning",
        text: "Data Belum Lengkap, Mohon Isi Semua Form 😅",
      });
    }

    const fechtDataAdmin = await contract.methods
      .cekAdmin()
      .call({ from: accounts[0] });

    if (fechtDataAdmin.metamaskAdmin !== accounts[0]) {
      return Swal.fire({
        icon: "warning",
        text: "Akun MetaMask Yang Digunakan Tidak Terdaftar Sebagai Admin 😅",
      });
    }

    const fetchDaerahPemilihan = await contract.methods
      .cekDaerahPemilihan()
      .call({ from: accounts[0] });
    for (let i = 0; i < fetchDaerahPemilihan.length; i++) {
      if (
        fetchDaerahPemilihan[i].namaDapil.toLowerCase() === nama.toLowerCase()
      ) {
        return Swal.fire({
          icon: "warning",
          text: "Nama Daerah Pemilihan Sudah Terdaftar 😅",
        });
      }
    }

    const ubah = await contract.methods
      .ubahDaerahPemilihan(dapil.kodeDapil, nama)
      .send({ from: accounts[0] });

    if (ubah.status) {
      Swal.fire({
        icon: "success",
        text: "Berhasil Mengubah Nama Daerah Pemilihan 🫡",
      }).then(async () => {
        const fetchDaerahPemilihan = await contract.methods
          .cekDaerahPemilihan()
          .call({ from: accounts[0] });
        const fetchDaftarPemilih = await contract.methods
          .cekPemilih()
          .call({ from: accounts[0] });
        const fetchDaftarPetugas = await contract.methods
          .cekPetugas()
          .call({ from: accounts[0] });
        navigate("/administrator/daftar-daerah-pemilihan", {
          state: {
            fetchDaerahPemilihan,
            fetchDaftarPetugas,
            fetchDaftarPemilih,
          },
        });
        props.close();
      });
    }
  };

  if (props.jenisModal === "tambah-daerah-pemilihan") {
    return (
      <div
        className="modal fade show bg-modalbox"
        id="staticBackdropLive"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLiveLabel"
        aria-hidden="true"
        style={{ display: "block" }}
        role="dialog"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Tambah Daerah Pemilihan</h1>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-2 pt-2">Kode Daerah</div>
                <div className="col-10">
                  <input
                    id="kodeDapilBaru"
                    type="text"
                    class="form-control mb-3 border-3"
                    value={generateKodeDapil()}
                    readOnly
                  />
                </div>
                <div className="col-2 pt-2">Nama Daerah</div>
                <div className="col-10">
                  <input
                    type="text"
                    class="form-control mb-3 border-3"
                    onChange={(e) => setNama(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={props.close}
              >
                Close
              </button>
              <button
                type="button"
                className="btn bg-green text-white"
                onClick={tambahDaerahPemilihan}
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (props.jenisModal === "ubah-daerah-pemilihan") {
    return (
      <div
        className="modal fade show bg-modalbox"
        id="staticBackdropLive"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLiveLabel"
        aria-hidden="true"
        style={{ display: "block" }}
        role="dialog"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Ubah Daerah Pemilihan</h1>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-4 pt-2">Kode Daerah</div>
                <div className="col-8">
                  <input
                    type="text"
                    class="form-control mb-3 border-3"
                    value={dapil.kodeDapil}
                    readOnly
                  />
                </div>
                <div className="col-4 pt-2">Nama Daerah Lama</div>
                <div className="col-8">
                  <input
                    type="text"
                    class="form-control mb-3 border-3"
                    value={dapil.namaDapil}
                    readOnly
                  />
                </div>
                <div className="col-4 pt-2">Nama Daerah Baru</div>
                <div className="col-8">
                  <input
                    type="text"
                    class="form-control mb-3 border-3"
                    onChange={(e) => setNama(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={props.close}
              >
                Close
              </button>
              <button
                type="button"
                className="btn bg-green text-white"
                onClick={ubahDaerahPemilihan}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ModalDapil;
