import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import PropagateLoader from "react-spinners/PropagateLoader";

import SideBar from "./SideBar";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [preloader, setPreloader] = useState(true);
  setTimeout(() => {
    setPreloader(false);
    document.querySelector(".preloader").style.zIndex = "-9999";
  }, 1500);

  const location = useLocation();
  const DaftarKandidat = location.state.fetchDaftarKandidat;
  const DaftarPemilih = location.state.fetchDaftarPemilih;
  const DaerahPemilihan = location.state.fetchDaerahPemilihan;

  let kandidat;
  let perolehanSuara = 0;
  if (DaftarKandidat.length > 0) {
    for (let i = 0; i < DaftarKandidat.length; i++) {
      if (DaftarKandidat[i].perolehanSuara > perolehanSuara) {
        kandidat = DaftarKandidat[i];
        perolehanSuara = DaftarKandidat[i].perolehanSuara;
      }
    }
  }

  let pemilihTrue = 0;
  if (DaftarPemilih.length > 0) {
    for (let i = 0; i < DaftarPemilih.length; i++) {
      if (DaftarPemilih[i].status) {
        pemilihTrue += 1;
      }
    }
  }

  const totalPemilihPerDapil = (kodeDapil) => {
    let total = 0;
    for (let i = 0; i < DaftarPemilih.length; i++) {
      if (kodeDapil === DaftarPemilih[i].kodeDapil) {
        total += 1;
      }
    }
    return total;
  };

  const totalPemilihTruePerDapil = (kodeDapil) => {
    let total = 0;
    for (let i = 0; i < DaftarPemilih.length; i++) {
      if (kodeDapil === DaftarPemilih[i].kodeDapil && DaftarPemilih[i].status) {
        total += 1;
      }
    }
    return total;
  };

  return (
    <>
      <div className="preloader d-flex justify-content-center">
        <PropagateLoader color="#4e8975" loading={preloader} size={20} />
      </div>
      <div className="Dashboard">
        <div className="container-fluid bg-body-tertiary min-vh-100">
          <div className="row">
            <SideBar />
            <div className="col-2"></div>
            <div className="col-10 p-0">
              <nav class="navbar bg-body-tertiary shadow">
                <span class="navbar-text text-dark ps-3">
                  <i>
                    <b>Petugas/</b> Dashboard
                  </i>
                </span>
              </nav>
              <div className="p-4">
                <div className="row justify-content-center">
                  <div className="col-3 mb-3">
                    {DaftarKandidat.length > 0 ? (
                      kandidat === undefined ? (
                        <div className="card shadow">
                          <div className="card-body text-center">
                            <h5 className="card-title">Pemenang Pemilihan</h5>
                            <br className="m-5" />
                            <br className="m-5" />
                            <br className="m-5" />
                            <br className="m-5" />
                            <br className="m-5" />
                            <br className="m-5" />
                            <br className="m-5" />
                            <p className="card-text text-justify">
                              Belum Terdapat Pemenang Dalam Pemilihan Ini
                            </p>
                            <br className="m-5" />
                            <br className="m-5" />
                            <br className="m-5" />
                            <br className="m-5" />
                            <br className="m-5" />
                            <br className="m-5" />
                            <br className="m-5" />
                            <br className="m-5" />
                          </div>
                        </div>
                      ) : (
                        <div className="card shadow">
                          <div className="card-body mb-2">
                            <h5 className="card-title text-center mb-2">
                              Pemenang Pemilihan
                            </h5>
                            <img
                              className="card-img-top pt-3 ps-3 pe-3 bg-body-tertiary border mb-3"
                              src="/img/3d/poto-kandidat.png"
                              alt="poto-kandidat"
                            />
                            <p className="card- text-center text-bold">
                              {kandidat.nama}
                            </p>
                            <p className="card-text">Perolehan Suara :</p>
                            <p className="card-text fs-1 text-center">
                              {kandidat.perolehanSuara}
                            </p>
                            <hr className="bg-dark mb-2" />
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="card shadow">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-12 text-center">
                              <h5 className="card-title">Pemenang Pemilihan</h5>
                              <br className="m-5" />
                              <br className="m-5" />
                              <br className="m-5" />
                              <br className="m-5" />
                              <br className="m-5" />
                              <br className="m-5" />
                              <br className="m-5" />
                              <p className="card-text">
                                Belum Terdapat Kandidat Yang Berpartisipasi
                                Dalam Pemilihan
                              </p>
                              <br className="m-5" />
                              <br className="m-5" />
                              <br className="m-5" />
                              <br className="m-5" />
                              <br className="m-5" />
                              <br className="m-5" />
                              <br className="m-5" />
                              <br className="m-5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-4 mb-3">
                    {DaftarPemilih.length > 0 ? (
                      <div className="card shadow">
                        <div className="card-body text-center">
                          <h5 className="card-title">Data Pemilih</h5>
                        </div>
                        <br className="m-5" />
                        <br className="m-5" />
                        <br className="m-5" />
                        <br className="m-5" />
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">
                            <div className="row">
                              <div className="col-8 mb-1">
                                Jumlah Pemilih Yang Terdaftar
                              </div>
                              <div className="col-4">
                                {DaftarPemilih.length} Pemilih
                              </div>
                            </div>
                          </li>
                          <li className="list-group-item">
                            <div className="row">
                              <div className="col-8 mb-1">
                                Jumlah Pemilih Yang Telah Melalukan Pemilihan
                              </div>
                              <div className="col-4">{pemilihTrue} Pemilih</div>
                            </div>
                          </li>
                          <li className="list-group-item">
                            <div className="row">
                              <div className="col-8 mb-1">
                                Jumlah Pemilih Yang Belum Melakukan Pemilihan
                              </div>
                              <div className="col-4">
                                {DaftarPemilih.length - pemilihTrue} Pemilih
                              </div>
                            </div>
                          </li>
                        </ul>
                        <br className="m-5" />
                        <br className="m-5" />
                        <br className="m-5" />
                        <br className="m-5" />
                        <br className="m-5" />
                        <br className="m-5" />
                      </div>
                    ) : (
                      <div className="card shadow">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-12 text-center">
                              <h5 className="card-title">Data Pemilih</h5>
                              <br className="m-5" />
                              <br className="m-5" />
                              <br className="m-5" />
                              <br className="m-5" />
                              <br className="m-5" />
                              <br className="m-5" />
                              <br className="m-5" />
                              <p className="card-text">
                                Belum Terdapat Pemilih Yang Berpartisipasi Dalam
                                Pemilihan
                              </p>
                              <br className="m-5" />
                              <br className="m-5" />
                              <br className="m-5" />
                              <br className="m-5" />
                              <br className="m-5" />
                              <br className="m-5" />
                              <br className="m-5" />
                              <br className="m-5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-5 mb-3">
                    {DaftarPemilih.length > 0 ? (
                      <div className="card shadow p-3">
                        <Doughnut
                          data={{
                            labels: [
                              "Pemilih Yang Telah Melalukan Pemilihan",
                              "Pemilih Yang Belum Melalukan Pemilihan",
                            ],
                            datasets: [
                              {
                                label: "Jumlah Pemilih",
                                data: [
                                  pemilihTrue,
                                  DaftarPemilih.length - pemilihTrue,
                                ],
                                backgroundColor: ["#4e8975", "#e7bc75"],
                                hoverOffset: 10,
                              },
                            ],
                          }}
                        />
                      </div>
                    ) : (
                      <div className="card shadow p-3">
                        <Doughnut
                          data={{
                            labels: ["Default", " Graph"],
                            datasets: [
                              {
                                label: "Default Graph",
                                data: [1, 1],
                                backgroundColor: ["#4e8975", "#e7bc75"],
                                hoverOffset: 10,
                              },
                            ],
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {DaerahPemilihan.map((dapil, i) => (
                    <div className="col-4 mb-3" key={i}>
                      <div className="card shadow">
                        <div className="card-body text-center">
                          <h5 className="card-title">{dapil.namaDapil}</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                          {DaftarPemilih.length > 0 ? (
                            <div>
                              <li className="list-group-item">
                                <div className="row">
                                  <div className="col-8">Total Pemilih</div>
                                  <div className="col-4">
                                    {totalPemilihPerDapil(dapil.kodeDapil)}{" "}
                                    Pemilih
                                  </div>
                                </div>
                              </li>
                              <li className="list-group-item">
                                <div className="row">
                                  <div className="col-8">
                                    Total Pemilih Yang Telah Melakukan Pemilihan
                                  </div>
                                  <div className="col-4">
                                    {totalPemilihTruePerDapil(dapil.kodeDapil)}{" "}
                                    Pemilih
                                  </div>
                                </div>
                              </li>
                              <li className="list-group-item">
                                <div className="row">
                                  <div className="col-8">
                                    Total Pemilih Yang Belum Melakukan Pemilihan
                                  </div>
                                  <div className="col-4">
                                    {totalPemilihPerDapil(dapil.kodeDapil) -
                                      totalPemilihTruePerDapil(
                                        dapil.kodeDapil
                                      )}{" "}
                                    Pemilih
                                  </div>
                                </div>
                              </li>
                            </div>
                          ) : (
                            <li className="list-group-item">
                              Belum Terdapat Pemilih Yang Berpartisipasi Dalam
                              Pemilihan
                            </li>
                          )}
                        </ul>
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

export default Dashboard;
