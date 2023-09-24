import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useEth from "../../../contexts/EthContext/useEth";
import Swal from "sweetalert2";
import Web3 from "web3";

const web3 = new Web3();

const ModalPetugas = (props) => {
  const [akunMetamask, setAkunMetamask] = useState(
    props.data.petugas.metamaskPetugas
  );
  const [username, setUsername] = useState(props.data.petugas.username);
  const [password, setPassword] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const DaerahPemilihan = props.data.DaerahPemilihan;
  const [dapil, setDapil] = useState(props.data.petugas.kodeDapil);

  const {
    state: { contract, accounts },
  } = useEth();

  const queryKodeDapil = (kodeDapil) => {
    for (let i = 0; i < DaerahPemilihan.length; i++) {
      if (DaerahPemilihan[i].kodeDapil === kodeDapil) {
        return DaerahPemilihan[i].namaDapil;
      }
    }
  };

  const navigate = useNavigate();

  const tambahPetugas = async () => {
    if (
      akunMetamask === undefined ||
      username === undefined ||
      password === "" ||
      konfirmasi === "" ||
      dapil === undefined
    ) {
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
    } else if (fechtDataAdmin.metamaskAdmin === akunMetamask) {
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
      } else {
        if (
          fetchDaftarPetugas[i].username.toLowerCase() ===
          username.toLowerCase()
        ) {
          return Swal.fire({
            icon: "warning",
            text: "Username Sudah Terdaftar 😅",
          });
        }
      }
    }

    const fetchDaftarPemilih = await contract.methods
      .cekPemilih()
      .call({ from: accounts[0] });
    for (let i = 0; i < fetchDaftarPemilih.length; i++) {
      if (fetchDaftarPemilih[i].metamaskPemilih === akunMetamask) {
        return Swal.fire({
          icon: "warning",
          text: "Akun Metamask Sudah Terdaftar 😅",
        });
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

    const tambah = await contract.methods
      .tambahPetugas(akunMetamask, username, hashPassword, dapil)
      .send({ from: accounts[0] });

    if (tambah.status) {
      return Swal.fire({
        icon: "success",
        text: "Berhasil Menambahkan Petugas Baru 🫡",
      }).then(async () => {
        const fetchDaftarPetugas = await contract.methods
          .cekPetugas()
          .call({ from: accounts[0] });
        navigate("/administrator/daftar-petugas", {
          state: { fetchDaftarPetugas, fetchDaerahPemilihan: DaerahPemilihan },
        });
        props.close();
      });
    }
  };

  const ubahPetugas = async () => {
    const fechtDataAdmin = await contract.methods
      .cekAdmin()
      .call({ from: accounts[0] });

    if (fechtDataAdmin.metamaskAdmin !== accounts[0]) {
      return Swal.fire({
        icon: "warning",
        text: "Akun MetaMask Yang Digunakan Tidak Terdaftar Sebagai Admin 😅",
      });
    }

    const fetchDaftarPetugas = await contract.methods
      .cekPetugas()
      .call({ from: accounts[0] });

    for (let i = 0; i < fetchDaftarPetugas.length; i++) {
      if (fetchDaftarPetugas[i].username === username) {
        if (dapil === fetchDaftarPetugas[i].kodeDapil) {
          return Swal.fire({
            icon: "warning",
            text: "Anda Tidak Melakukan Perubahan 😅",
          });
        }
      }
    }

    const ubah = await contract.methods
      .ubahPetugas(username, dapil)
      .send({ from: accounts[0] });

    if (ubah.status) {
      return Swal.fire({
        icon: "success",
        text: "Berhasil Mengubah Daerah Pemilihan Petugas 🫡",
      }).then(async () => {
        const fetchDaftarPetugas = await contract.methods
          .cekPetugas()
          .call({ from: accounts[0] });
        navigate("/administrator/daftar-petugas", {
          state: { fetchDaftarPetugas, fetchDaerahPemilihan: DaerahPemilihan },
        });
        props.close();
      });
    }
  };

  const resetPasswordPetugas = async () => {
    if (password === "" || konfirmasi === "") {
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

    const hashPassword = web3.utils.keccak256(password);
    const hashKonfirmasi = web3.utils.keccak256(konfirmasi);

    if (hashPassword !== hashKonfirmasi) {
      return Swal.fire({
        icon: "warning",
        text: "Konfirmasi Tidak Sesuai Dengan Password 😅",
      });
    }

    const reset = await contract.methods
      .ubahPasswordPetugas(username, hashPassword)
      .send({ from: accounts[0] });

    if (reset.status) {
      return Swal.fire({
        icon: "success",
        text: "Berhasil Mengganti Password Petugas 🫡",
      }).then(async () => {
        const fetchDaftarPetugas = await contract.methods
          .cekPetugas()
          .call({ from: accounts[0] });
        navigate("/administrator/daftar-petugas", {
          state: { fetchDaftarPetugas, fetchDaerahPemilihan: DaerahPemilihan },
        });
        props.close();
      });
    }
  };

  if (props.jenisModal === "tambah-petugas") {
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
                <center>Tambah Petugas</center>
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
                <div className="col-3 pt-2">Username</div>
                <div className="col-9">
                  <input
                    type="text"
                    class="form-control mb-3 border-3"
                    onChange={(e) => setUsername(e.target.value)}
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
                <div className="col-3 pt-2">Daerah Pemilihan</div>
                <div className="col-9">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setDapil(e.target.value)}
                  >
                    <option value="">Pilih Daerah Pemilihan</option>
                    {DaerahPemilihan.map((daerah, i) => (
                      <option key={i} value={daerah.kodeDapil}>
                        {daerah.namaDapil}
                      </option>
                    ))}
                  </select>
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
                onClick={tambahPetugas}
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (props.jenisModal === "ubah-petugas") {
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
                <center>Ubah Data Petugas</center>
              </h1>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-3 pt-2">Username</div>
                <div className="col-9">
                  <input
                    type="text"
                    class="form-control mb-3 border-3"
                    value={username}
                    readOnly
                  />
                </div>
                <div className="col-3 pt-2">Daerah Pemilihan</div>
                <div className="col-9">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setDapil(e.target.value)}
                    defaultValue={dapil}
                  >
                    <option value={dapil} disabled>
                      {queryKodeDapil(dapil)}
                    </option>
                    {DaerahPemilihan.map((daerah, i) => (
                      <option key={i} value={daerah.kodeDapil}>
                        {daerah.namaDapil}
                      </option>
                    ))}
                  </select>
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
                onClick={ubahPetugas}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (props.jenisModal === "reset-password-petugas") {
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
                <center>Resset Password Petugas</center>
              </h1>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-3 pt-2">Username</div>
                <div className="col-9">
                  <input
                    type="text"
                    class="form-control mb-3 border-3"
                    value={username}
                    readOnly
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
                onClick={resetPasswordPetugas}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ModalPetugas;
