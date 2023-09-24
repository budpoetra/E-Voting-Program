import React, { useState } from "react";
import { useEth } from "../contexts/EthContext";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Swal from "sweetalert2";
import PropagateLoader from "react-spinners/PropagateLoader";

const web3 = new Web3();

const Login = () => {
  const [preloader, setPreloader] = useState(true);
  setTimeout(() => {
    setPreloader(false);
    document.querySelector(".preloader-blocking-display").style.zIndex =
      "-9999";
  }, 500);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {
    state: { contract, accounts },
  } = useEth();

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
    if (username === "" || password === "") {
      return Swal.fire({
        icon: "warning",
        text: "Data Belum Lengkap, Mohon Isi Semua Form 😅",
      });
    }

    const fetchDataAdmin = await contract.methods
      .cekAdmin()
      .call({ from: accounts[0] });
    const fetchDaftarPetugas = await contract.methods
      .cekPetugas()
      .call({ from: accounts[0] });
    const fetchDaftarKandidat = await contract.methods
      .cekKandidat()
      .call({ from: accounts[0] });
    const fetchDaftarPemilih = await contract.methods
      .cekPemilih()
      .call({ from: accounts[0] });
    const fetchDaerahPemilihan = await contract.methods
      .cekDaerahPemilihan()
      .call({ from: accounts[0] });

    for (let i = 0; i < fetchDaftarPetugas.length; i++) {
      if (fetchDaftarPetugas[i].username === username) {
        if (fetchDaftarPetugas[i].password === web3.utils.keccak256(password)) {
          if (fetchDaftarPetugas[i].metamaskPetugas !== accounts[0]) {
            return Swal.fire({
              icon: "warning",
              text: "Akun Metamask Yang Anda Gunakan Tidak Sesuai Dengan Akun Anda. Silahkan Loginkan Ulang Akun Metamask Anda 😅",
            });
          } else {
            sessionStorage.setItem("user-login", username);
            navigate("/petugas/dashboard", {
              state: {
                fetchDaftarKandidat,
                fetchDaftarPemilih,
                fetchDaerahPemilihan,
              },
            });
          }
        } else {
          return Swal.fire({
            icon: "error",
            text: "Password Yang Anda Masukkan Salah 😅",
          });
        }
      }
    }

    if (fetchDataAdmin.username === web3.utils.keccak256(username)) {
      if (fetchDataAdmin.password === web3.utils.keccak256(password)) {
        sessionStorage.setItem("user-login", username);
        if (fetchDataAdmin.metamaskAdmin !== accounts[0]) {
          return Swal.fire({
            icon: "warning",
            text: "Akun Metamask Yang Anda Gunakan Tidak Sesuai Dengan Akun Anda. Silahkan Loginkan Ulang Akun Metamask Anda 😅",
          });
        } else {
          navigate("/administrator/dashboard", {
            state: {
              fetchDataAdmin,
              fetchDaftarKandidat,
              fetchDaftarPemilih,
              fetchDaerahPemilihan,
            },
          });
        }
      } else {
        return Swal.fire({
          icon: "error",
          text: "Password Yang Anda Masukkan Salah 😅",
        });
      }
    }
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
      <div className="Login mt-5">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-4">
              <div className="form-login shadow">
                <h5 className="text-center mb-5">Login Admin atau Petugas</h5>
                <br />
                <div class="mb-3">
                  <label for="username" class="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    class="form-control shadow"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">
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
                  <button type="submit" class="btn btn-light" onClick={Login}>
                    Login
                  </button>
                </div>
                <br />
                <br />
                <br />
                <br />
                <img
                  className="slice-up"
                  src="/img/3d/casual-life-young-people-students-1.png"
                  alt="casual-life-young-people-students-1"
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
            fill="#4e8975"
            fillOpacity="0.5"
            d="M0,64L30,90.7C60,117,120,171,180,165.3C240,160,300,96,360,85.3C420,75,480,117,540,122.7C600,128,660,96,720,90.7C780,85,840,107,900,112C960,117,1020,107,1080,117.3C1140,128,1200,160,1260,149.3C1320,139,1380,85,1410,58.7L1440,32L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          ></path>
        </svg>
      </div>
    </>
  );
};

export default Login;
