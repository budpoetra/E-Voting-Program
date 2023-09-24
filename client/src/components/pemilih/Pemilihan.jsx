import React, { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import PropagateLoader from "react-spinners/PropagateLoader";

const Pemilihan = () => {
  const [preloader, setPreloader] = useState(true);
  setTimeout(() => {
    setPreloader(false);
    document.querySelector(".preloader").style.zIndex = "-9999";
  }, 1500);

  const location = useLocation();
  const DaftarKandidat = location.state.fetchDaftarKandidat;
  const hashedNIK = location.state.hashedNIK;
  const {
    state: { contract, accounts },
  } = useEth();

  const navigate = useNavigate();

  const pilih = async (kandidatNorut) => {
    Swal.fire({
      icon: "question",
      text: "Ingin Memilih Kandidat Tersebut ?",
      showCancelButton: true,
      confirmButtonText: "Ya",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let ballot;
        for (let i = 0; i < DaftarKandidat.length; i++) {
          if (DaftarKandidat[i].norut === kandidatNorut) {
            ballot = i;
          }
        }

        const pemilihan = await contract.methods
          .pemilihan(ballot, hashedNIK)
          .send({ from: accounts[0] });

        if (pemilihan.status) {
          Swal.fire({
            icon: "success",
            text: "Berhasil Melakukan Pemilihan, Terimakasih 🫡",
          }).then(() => {
            window.location.href = "/";
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "Gagal Melakukan Pemilihan",
          }).then(() => {
            window.location.href = "/";
          });
        }
      }
    });
  };

  const linkToHome = () => {
    Swal.fire({
      icon: "question",
      text: "Ingin Membatalkan Pemilihan ?",
      showCancelButton: true,
      confirmButtonText: "Ya",
    }).then(async (result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  return (
    <>
      <div
        className="preloader d-flex justify-content-center"
        style={{ zIndex: 10 }}
      >
        <PropagateLoader color="#4e8975" loading={preloader} size={20} />
      </div>
      <div className="NavBar">
        <nav className="navbar bg-body-tertiary shadow">
          <div className="container">
            <a className="navbar-brand" href="/">
              <img
                src="/img/logo/e-voting-logo-removebg.png"
                alt="E-Voting"
                width="35"
                height="35"
              />
              <span className="fs-6">
                <b>E-Voting</b>
              </span>
            </a>
            <ul className="nav justify-content-end">
              <li className="nav-item" onClick={linkToHome}>
                <div className="btn btn-danger shadow">Batalkan Pemilihan</div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="Pemilihan container mt-5">
        <div className="row justify-content-md-center">
          {DaftarKandidat.map((kandidat, i) => (
            <div className="col-3 mb-5" key={i}>
              <div className="card shadow mb-3">
                <img
                  className="card-img-top pt-3 ps-3 pe-3 bg-body-tertiary border"
                  src="/img/3d/poto-kandidat.png"
                  alt="poto-kandidat"
                  height="200"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <div className="row text-center shadow-sm">
                      <div className="col-8 fs-6 border p-2">
                        {kandidat.nama}
                      </div>
                      <div className="col-4 fs-2 border">{kandidat.norut}</div>
                    </div>
                  </h5>
                  <div className="card-text mt-3">
                    <div className="row text-center">
                      <div className="col-12">
                        <button
                          type="button"
                          class="btn bg-green shadow text-white"
                          onClick={() => pilih(kandidat.norut)}
                        >
                          Pilih
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Pemilihan;
