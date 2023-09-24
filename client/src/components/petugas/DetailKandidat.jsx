import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";

import SideBar from "./SideBar";

const DetailKandidat = () => {
  const [preloader, setPreloader] = useState(true);
  setTimeout(() => {
    setPreloader(false);
    document.querySelector(".preloader").style.zIndex = "-9999";
  }, 1500);

  const location = useLocation();
  const kandidat = location.state.kandidat;
  const data = kandidat.nikValidasi.length;
  const DaftarPemilih = location.state.fetchDaftarPemilih;
  const DaerahPemilihan = location.state.fetchDaerahPemilihan;

  const perolehanSuaraPerDapil = (kodeDapil) => {
    let total = 0;

    const nikValidasi = kandidat.nikValidasi;
    for (let j = 0; j < nikValidasi.length; j++) {
      for (let k = 0; k < DaftarPemilih.length; k++) {
        if (
          nikValidasi[j] === DaftarPemilih[k].nik &&
          kodeDapil === DaftarPemilih[k].kodeDapil &&
          DaftarPemilih[k].status
        ) {
          total += 1;
        }
      }
    }
    return total;
  };

  return (
    <>
      <div className="preloader d-flex justify-content-center">
        <PropagateLoader color="#4e8975" loading={preloader} size={20} />
      </div>
      <div className="DetailKandidat">
        <div className="container-fluid bg-body-tertiary min-vh-100">
          <div className="row">
            <SideBar />
            <div className="col-2"></div>
            <div className="col-10 p-0">
              <nav class="navbar bg-body-tertiary shadow">
                <span class="navbar-text text-dark ps-3">
                  <i>
                    <b>Petugas/Daftar Kandidat/</b> Detail Kandidat
                  </i>
                </span>
              </nav>
              <div className="p-4">
                <div className="card shadow p-2 mb-3">
                  <div className="row">
                    <div className="col-4 d-flex align-items-center justify-content-center">
                      <img
                        className="rounded float-start bg-body-tertiary shadow"
                        src="/img/3d/poto-kandidat.png"
                        alt="poto-kandidat"
                      />
                    </div>
                    <div className="col-8 ps-0">
                      <div className="row  pt-3">
                        <div className="col-3 mb-2">Nama</div>
                        <div className="col-9 mb-2">: {kandidat.nama}</div>
                        <div className="col-3 mb-2">Nomor Urut</div>
                        <div className="col-9 mb-2">: {kandidat.norut}</div>
                        <div className="col-3 mb-2">Perolehan Suara</div>
                        <div className="col-9 mb-2">
                          : {kandidat.perolehanSuara}
                        </div>
                        <div className="col-3">Visi :</div>
                        <div className="col-12 mb-2 pe-5 text-justify">
                          {kandidat.visi}
                        </div>
                        <div className="col-3">Misi :</div>
                        <div className="col-12 mb-3 pe-5 text-justify">
                          {kandidat.misi}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row d-flex justify-content-center">
                  {DaerahPemilihan.map((dapil, i) => (
                    <div className="col-3" key={i}>
                      <div className="card shadow p-2 mb-3">
                        <div className="card-body">
                          <h6 className="text-center mb-4 mt-3">
                            {dapil.namaDapil}
                          </h6>
                          <p className="card-text">Perolehan Suara :</p>
                          {data > 0 ? (
                            <p className="fs-3 text-center">
                              {perolehanSuaraPerDapil(dapil.kodeDapil)}
                            </p>
                          ) : (
                            <p className="fs-3 text-center">0</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailKandidat;
