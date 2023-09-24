import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useEth from "../../../contexts/EthContext/useEth";
import Swal from "sweetalert2";
import Web3 from "web3";

const web3 = new Web3();

const ModalBox = (props) => {
  const [akunMetamask, setAkunMetamask] = useState("");
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");

  const {
    state: { contract, accounts },
  } = useEth();

  const navigate = useNavigate();

  const tambahPemilih = async () => {
    if (
      akunMetamask === "" ||
      nik === "" ||
      password === "" ||
      konfirmasi === ""
    ) {
      return Swal.fire({
        icon: "warning",
        text: "Data Belum Lengkap, Mohon Isi Semua Form 😅",
      });
    }

    const validasiAngka = /^[0-9]+$/;
    if (nik.length !== 16 || !nik.match(validasiAngka)) {
      return Swal.fire({
        icon: "warning",
        text: "Format NIK Salah, Mohon Periksa Kembali 😅",
      });
    }

    const fechtDataAdmin = await contract.methods
      .cekAdmin()
      .call({ from: accounts[0] });
    if (fechtDataAdmin.metamaskAdmin === akunMetamask) {
      return Swal.fire({
        icon: "warning",
        text: "Akun Metamask Sudah Terdaftar 😅",
      });
    }

    const fetchDaftarPetugas = await contract.methods
      .cekPetugas()
      .call({ from: accounts[0] });

    for (let i = 0; i < fetchDaftarPetugas.length; i++) {
      if (fetchDaftarPetugas[i].metamaskPetugas === akunMetamask) {
        return Swal.fire({
          icon: "warning",
          text: "Akun Metamask Sudah Terdaftar 😅",
        });
      }
    }

    const hashedNik = web3.utils.keccak256(nik);

    const fetchDaftarPemilih = await contract.methods
      .cekPemilih()
      .call({ from: accounts[0] });

    for (let i = 0; i < fetchDaftarPemilih.length; i++) {
      if (fetchDaftarPemilih[i].metamaskPemilih === akunMetamask) {
        return Swal.fire({
          icon: "warning",
          text: "Akun Metamask Sudah Terdaftar 😅",
        });
      } else {
        if (fetchDaftarPemilih[i].nik === hashedNik) {
          return Swal.fire({
            icon: "warning",
            text: "NIK Sudah Terdaftar 😅",
          });
        }
      }
    }

    const hashPassword = web3.utils.keccak256(password);
    const hashKonfirmasi = web3.utils.keccak256(konfirmasi);

    if (hashPassword !== hashKonfirmasi) {
      return Swal.fire({
        icon: "warning",
        text: "Konfirmasi Tidak Sesuai Dengan Password 😅",
      });
    }

    let dapil;
    let metamask;
    const userLogin = sessionStorage.getItem("user-login");
    for (let i = 0; i < fetchDaftarPetugas.length; i++) {
      if (fetchDaftarPetugas[i].username === userLogin) {
        dapil = fetchDaftarPetugas[i].kodeDapil;
        metamask = fetchDaftarPetugas[i].metamaskPetugas;
      }
    }

    if (metamask !== accounts[0]) {
      return Swal.fire({
        icon: "warning",
        text: "Akun Metamask Yang Anda Gunakan Tidak Sesuai Dengan Akun Anda. Silahkan Loginkan Ulang Akun Metamask Anda 😅",
      });
    }

    const tambah = await contract.methods
      .tambahPemilih(akunMetamask, hashedNik, hashPassword, dapil)
      .send({ from: accounts[0] });

    if (tambah.status) {
      return Swal.fire({
        icon: "success",
        text: "Berhasil Menambahkan Pemilih Baru 🫡",
      }).then(async () => {
        const fetchDaftarPemilih = await contract.methods
          .cekPemilih()
          .call({ from: accounts[0] });
        navigate("/petugas/daftar-pemilih", {
          state: { fetchDaftarPemilih },
        });
        props.close();
      });
    }
  };

  if (props.jenisModal === "tambah-pemilih") {
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
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                <center>Tambah Pemilih</center>
              </h1>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-3 pt-2">Akun Metamask</div>
                <div className="col-9">
                  <input
                    type="text"
                    class="form-control mb-3 border-3"
                    onChange={(e) => setAkunMetamask(e.target.value)}
                  />
                </div>
                <div className="col-3 pt-2">NIK</div>
                <div className="col-9">
                  <input
                    type="text"
                    class="form-control mb-3 border-3"
                    onChange={(e) => setNik(e.target.value)}
                  />
                </div>
                <div className="col-3 pt-2">Password</div>
                <div className="col-9">
                  <input
                    type="password"
                    class="form-control mb-3 border-3"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="col-3 pt-2">Konfirmasi</div>
                <div className="col-9">
                  <input
                    type="password"
                    class="form-control mb-3 border-3"
                    onChange={(e) => setKonfirmasi(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={props.close}
              >
                Close
              </button>
              <button
                type="button"
                className="btn bg-green text-white"
                onClick={tambahPemilih}
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ModalBox;
