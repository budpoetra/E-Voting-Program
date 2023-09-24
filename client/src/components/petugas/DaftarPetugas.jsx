import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";

import SideBar from "./SideBar";

const DaftarPetugas = () => {
  const [preloader, setPreloader] = useState(true);
  setTimeout(() => {
    setPreloader(false);
    document.querySelector(".preloader").style.zIndex = "-9999";
  }, 1500);

  const location = useLocation();
  const DaftarPetugas = location.state.fetchDaftarPetugas;
  const DaerahPemilihan = location.state.fetchDaerahPemilihan;

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = DaftarPetugas.slice(firstIndex, lastIndex);
  const npage = Math.ceil(DaftarPetugas.length / recordsPerPage);
  const number = [...Array(npage + 1).keys()].slice(1);
  const prevPage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };
  const changeCPage = (n) => {
    setCurrentPage(n);
  };
  const nextPage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

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
      <div className="DaftarPetugas">
        <div className="container-fluid bg-body-tertiary min-vh-100">
          <div className="row">
            <SideBar />
            <div className="col-2"></div>
            <div className="col-10 p-0">
              <nav class="navbar bg-body-tertiary shadow">
                <span class="navbar-text text-dark ps-3">
                  <i>
                    <b>Petugas/</b> Daftar Petugas
                  </i>
                </span>
              </nav>
              <div className="p-4">
                <div className="row mt-3">
                  <div className="col-12">
                    <div className="card shadow p-2">
                      <h5 className="text-center mb-4 mt-3">
                        Tabel Daftar Petugas
                      </h5>
                      <div className="DataTables">
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-5">
                              <div class="input-group mb-3">
                                <input
                                  id="search"
                                  type="text"
                                  className="form-control border-3"
                                  placeholder="Cari petugas berdasarkan username..."
                                  onChange={(e) => setSearch(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-6 d-flex justify-content-end pt-3 pb-3">
                              Tampilkan
                              <select
                                className="ms-2 me-2"
                                onChange={(e) =>
                                  setRecordsPerPage(e.target.value)
                                }
                              >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="50">50</option>
                              </select>
                              Data
                            </div>
                          </div>
                          <table className="table table-striped table-hover table-bordered table-responsive">
                            <thead>
                              <tr className="text-center">
                                <th scope="col">No</th>
                                <th scope="col">Username</th>
                                <th scope="col">Daerah Pemilihan</th>
                              </tr>
                            </thead>
                            <tbody>
                              {DaftarPetugas.length === 0 ? (
                                <tr className="text-center">
                                  <td colSpan={4}>
                                    Data Petugas Belum Tersedia
                                  </td>
                                </tr>
                              ) : (
                                records
                                  .filter((petugas) => {
                                    return search.toLocaleLowerCase() === ""
                                      ? petugas
                                      : petugas.username
                                          .toLocaleLowerCase()
                                          .includes(search);
                                  })
                                  .map((petugas, i) => (
                                    <tr key={i}>
                                      <th scope="row" className="text-center">
                                        {i + 1}
                                      </th>
                                      <td> {petugas.username} </td>
                                      <td className="text-center">
                                        {queryKodeDapil(petugas.kodeDapil)}
                                      </td>
                                    </tr>
                                  ))
                              )}
                            </tbody>
                          </table>
                          <p className="fs-6 table-footer">
                            Total Petugas : {DaftarPetugas.length}
                          </p>
                          <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                              <nav>
                                <ul className="pagination">
                                  <li
                                    className={`page-item ${
                                      currentPage === 1 ? "disabled" : ""
                                    }`}
                                  >
                                    <span
                                      className="page-link"
                                      onClick={prevPage}
                                    >
                                      Prev
                                    </span>
                                  </li>
                                  {number.map((n, i) => (
                                    <li className="page-item" key={i}>
                                      <span
                                        className={`page-link ${
                                          currentPage === n ? "active" : ""
                                        }`}
                                        onClick={() => changeCPage(n)}
                                      >
                                        {n}
                                      </span>
                                    </li>
                                  ))}
                                  <li
                                    className={`page-item ${
                                      currentPage === npage || npage === 0
                                        ? "disabled"
                                        : ""
                                    }`}
                                  >
                                    <span
                                      className="page-link"
                                      onClick={nextPage}
                                    >
                                      Next
                                    </span>
                                  </li>
                                </ul>
                              </nav>
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
        </div>
      </div>
    </>
  );
};

export default DaftarPetugas;
