import React, { useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";
import useEth from "../../contexts/EthContext/useEth";
import Swal from "sweetalert2";
import Web3 from "web3";

const web3 = new Web3();

const UbahPassword = () => {
  const [preloader, setPreloader] = useState(true);
  setTimeout(() => {
    setPreloader(false);
    document.querySelector(".preloader").style.zIndex = "-9999";
  }, 1500);

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");

  const {
    state: { contract, accounts },
  } = useEth();

  const navigate = useNavigate();

  const update = async () => {
    if (oldPassword === "" || password === "" || konfirmasi === "") {
      return Swal.fire({
        icon: "warning",
        text: "Data Belum Lengkap, Mohon Isi Semua Form 😅",
      });
    }

    const hashOldPassword = web3.utils.keccak256(oldPassword);
    const hashPassword = web3.utils.keccak256(password);
    const hashKonfirmasi = web3.utils.keccak256(konfirmasi);

    const fetchDaftarPetugas = await contract.methods
      .cekPetugas()
      .call({ from: accounts[0] });
    let pass;
    let metamask;
    const userLogin = sessionStorage.getItem("user-login");
    for (let i = 0; i < fetchDaftarPetugas.length; i++) {
      if (fetchDaftarPetugas[i].username === userLogin) {
        pass = fetchDaftarPetugas[i].password;
        metamask = fetchDaftarPetugas[i].metamaskPetugas;
      }
    }

    if (hashOldPassword !== pass) {
      return Swal.fire({
        icon: "warning",
        text: "Password Lama Yang Anda Masukkan Salah 😅",
      });
    }
    if (metamask !== accounts[0]) {
      return Swal.fire({
        icon: "warning",
        text: "Akun Metamask Yang Anda Gunakan Tidak Sesuai Dengan Akun Anda. Silahkan Loginkan Ulang Akun Metamask Anda 😅",
      });
    }

    if (hashPassword !== hashKonfirmasi) {
      return Swal.fire({
        icon: "warning",
        text: "Konfirmasi Tidak Sesuai Dengan Password baru 😅",
      });
    }

    const update = await contract.methods
      .ubahPasswordPetugas(userLogin, hashPassword)
      .send({ from: accounts[0] });

    if (update.status) {
      Swal.fire({
        icon: "success",
        text: "Berhasil Merubah Password Admin. Silahkan Login Kembali 🫡",
      }).then(async () => {
        sessionStorage.clear();
        navigate("/login");
      });
    }
  };

  return (
    <>
      <div
        className="preloader d-flex justify-content-center"
        style={{ zIndex: 10 }}
      >
        <PropagateLoader color="#4e8975" loading={preloader} size={20} />
      </div>
      <div className="UbahPassword">
        <div className="container-fluid bg-body-tertiary min-vh-100">
          <div className="row">
            <SideBar />
            <div className="col-2"></div>
            <div className="col-10 p-0">
              <nav class="navbar bg-body-tertiary shadow">
                <span class="navbar-text text-dark ps-3">
                  <i>
                    <b>Petugas/</b> Ubah Password
                  </i>
                </span>
              </nav>
              <div className="p-4">
                <div className="row mt-3">
                  <div className="col-12">
                    <div className="card shadow">
                      <div className="row p-5">
                        <div className="col-12 mb-5"></div>
                        <div className="col-1"></div>
                        <div className="col-3 pt-2">Password Lama</div>
                        <div className="col-7">
                          <input
                            type="password"
                            class="form-control mb-3 border-3"
                            onChange={(e) => setOldPassword(e.target.value)}
                          />
                        </div>
                        <div className="col-1"></div>
                        <div className="col-1"></div>
                        <div className="col-3 pt-2">Password Baru</div>
                        <div className="col-7">
                          <input
                            type="password"
                            class="form-control mb-3 border-3"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="col-1"></div>
                        <div className="col-1"></div>
                        <div className="col-3 pt-2">Konfirmasi</div>
                        <div className="col-7">
                          <input
                            type="password"
                            class="form-control mb-3 border-3"
                            onChange={(e) => setKonfirmasi(e.target.value)}
                          />
                        </div>
                        <div className="col-1"></div>
                        <div className="col-12 mt-5 mb-5 d-flex justify-content-center">
                          <button
                            type="button"
                            className="btn bg-green text-white"
                            onClick={update}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UbahPassword;
