import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";

import SideBar from "./SideBar";

const DaftaDaerahPemilihan = () => {
  const [preloader, setPreloader] = useState(true);
  setTimeout(() => {
    setPreloader(false);
    document.querySelector(".preloader").style.zIndex = "-9999";
  }, 1500);

  const location = useLocation();
  const DaftarPetugas = location.state.DaftarPetugas;
  const DaerahPemilihan = location.state.fetchDaerahPemilihan;

  const queryKodeDapil = (kodeDapil) => {
    for (let i = 0; i < DaerahPemilihan.length; i++) {
      if (DaerahPemilihan[i].kodeDapil === kodeDapil) {
        return DaerahPemilihan[i].namaDapil;
      }
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
      <div className="DaftaDaerahPemilihan">
        <div className="container-fluid bg-body-tertiary min-vh-100">
          <div className="row">
            <SideBar />
            <div className="col-2"></div>
            <div className="col-10 p-0">
              <nav class="navbar bg-body-tertiary shadow">
                <span class="navbar-text text-dark ps-3">
                  <i>
                    <b>Petugas/</b> Info Akun
                  </i>
                </span>
              </nav>
              <div className="p-4">
                <div className="row mt-3">
                  <div className="col-12">
                    <div className="card shadow p-2">
                      <div className="row">
                        <div className="col-12 text-center">
                          <h5 className="mb-4 mt-3">Info Akun Petugas</h5>
                        </div>
                        <div className="col-1"></div>
                        <div className="col-3">
                          <img
                            className="rounded float-start bg-body-tertiary shadow"
                            src="/img/3d/poto-petugas.png"
                            alt="poto-petugas"
                          />
                        </div>
                        <div className="col-7 pt-4">
                          <div className="row">
                            <div className="col-3 mb-2">Akun Metamask</div>
                            <div className="col-9">
                              : {DaftarPetugas.metamaskPetugas}
                            </div>
                            <div className="col-3 mb-2">Username</div>
                            <div className="col-9">
                              : {DaftarPetugas.username}
                            </div>
                            <div className="col-3 mb-2">Kode Dapil</div>
                            <div className="col-9">
                              : {DaftarPetugas.kodeDapil}
                            </div>
                            <div className="col-3 mb-2">Nama Dapil</div>
                            <div className="col-9">
                              : {queryKodeDapil(DaftarPetugas.kodeDapil)}
                            </div>
                          </div>
                        </div>
                        <div className="col-1"></div>
                        <div className="mb-5"></div>
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

export default DaftaDaerahPemilihan;
