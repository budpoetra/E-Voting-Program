import React, { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Web3 from "web3";
import Swal from "sweetalert2";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useNavigate } from "react-router-dom";

import NavBar from "../NavBar";

const web3 = new Web3();

const LoginPemilih = () => {
  const [preloader, setPreloader] = useState(true);
  setTimeout(() => {
    setPreloader(false);
    document.querySelector(".preloader-blocking-display").style.zIndex =
      "-9999";
  }, 500);

  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");

  const {
    state: { contract, accounts },
  } = useEth();

  const navigate = useNavigate();

  const showHide = () => {
    const buttonShowHide = document.querySelector("#password").type;
    if (buttonShowHide === "password") {
      document.querySelector("#password").type = "text";
      document.querySelector(
        "#button-addon2"
      ).innerHTML = `<i class="bi bi-eye-slash"></i>`;
    } else {
      document.querySelector("#password").type = "password";
      document.querySelector(
        "#button-addon2"
      ).innerHTML = `<i class="bi bi-eye"></i>`;
    }
  };

  const Login = async () => {
    if (nik === "" || password === "") {
      return Swal.fire({
        icon: "warning",
        text: "Data Belum Lengkap, Mohon Isi Semua Form 😅",
      });
    }

    const fetchDaftarPemilih = await contract.methods
      .cekPemilih()
      .call({ from: accounts[0] });
    let index;
    for (let i = 0; i < fetchDaftarPemilih.length; i++) {
      if (fetchDaftarPemilih[i].nik === web3.utils.keccak256(nik)) {
        index = i;
      }
    }

    if (index === undefined) {
      return Swal.fire({
        icon: "error",
        text: "NIK Anda Belum Terdaftar 😅",
      });
    } else if (
      fetchDaftarPemilih[index].password !== web3.utils.keccak256(password)
    ) {
      return Swal.fire({
        icon: "error",
        text: "Password Yang Anda Masukkan Salah 😅",
      });
    } else if (fetchDaftarPemilih[index].status) {
      return Swal.fire({
        icon: "error",
        text: "Anda Sudah Melakukan Pemilihan, Hanya Dapat Melakukan 1x Pemilihan 😅",
      });
    } else if (fetchDaftarPemilih[index].metamaskPemilih !== accounts[0]) {
      return Swal.fire({
        icon: "warning",
        text: "Akun Metamask Yang Anda Gunakan Tidak Sesuai Dengan Akun Anda. Silahkan Loginkan Ulang Akun Metamask Anda 😅",
      });
    }

    const fetchDataAdmin = await contract.methods
      .cekAdmin()
      .call({ from: accounts[0] });
    if (!fetchDataAdmin.statusPemilihan) {
      for (let i = 0; i < fetchDaftarPemilih.length; i++) {
        if (fetchDaftarPemilih[i].status) {
          return Swal.fire({
            icon: "warning",
            text: "Proses Pemilihan Telah Selesai, Anda Tidak Dapat Melakukan Pemilihan Lagi 😅",
          });
        }
      }
      return Swal.fire({
        icon: "warning",
        text: "Proses Pemilihan Belum Dimulai, Mohon Bersabar 😅",
      });
    }

    const hashedNIK = web3.utils.keccak256(nik);

    const fetchDaftarKandidat = await contract.methods
      .cekKandidat()
      .call({ from: accounts[0] });
    navigate("/pemilihan", {
      state: {
        fetchDaftarKandidat,
        hashedNIK,
      },
    });
  };

  return (
    <>
      <div
        className="preloader-blocking-display d-flex justify-content-center"
        style={{ zIndex: 10 }}
      >
        <PropagateLoader color="#4e8975" loading={preloader} size={20} />
      </div>
      <NavBar />
      <div className="LoginPemilih mt-5">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-4">
              <div className="form-login-pemilih shadow">
                <h5 className="text-center mb-5">Login Pemilih</h5>
                <br />
                <div className="mb-3">
                  <label for="username" className="form-label">
                    NIK
                  </label>
                  <input
                    type="text"
                    name="nik"
                    id="username"
                    className="form-control shadow"
                    onChange={(e) => setNik(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="password" className="form-label">
                    Password
                  </label>
                  <div class="input-group mb-3">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      class="form-control"
                      aria-describedby="button-addon2"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      class="btn btn-light"
                      type="button"
                      id="button-addon2"
                      color="white"
                      onClick={showHide}
                    >
                      <i class="bi bi-eye"></i>
                    </button>
                  </div>
                </div>
                <br />
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-light"
                    onClick={Login}
                  >
                    Login
                  </button>
                </div>
                <br />
                <br />
                <br />
                <br />
                <img
                  className="slice-up-two"
                  src="/img/3d/casual-life-solleagues-discussing-team-project.png"
                  alt="casual-life-solleagues-discussing-team-project"
                />
              </div>
            </div>
          </div>
        </div>
        <svg
          className="slice-four"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#e7bc75"
            fillOpacity="0.5"
            d="M0,64L30,90.7C60,117,120,171,180,165.3C240,160,300,96,360,85.3C420,75,480,117,540,122.7C600,128,660,96,720,90.7C780,85,840,107,900,112C960,117,1020,107,1080,117.3C1140,128,1200,160,1260,149.3C1320,139,1380,85,1410,58.7L1440,32L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          ></path>
        </svg>
      </div>
    </>
  );
};

export default LoginPemilih;
