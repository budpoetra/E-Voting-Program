import React, { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import { useNavigate, useLocation } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";

import SideBar from "./SideBar";

const DaftarKandidat = () => {
  const [preloader, setPreloader] = useState(true);
  setTimeout(() => {
    setPreloader(false);
    document.querySelector(".preloader").style.zIndex = "-9999";
  }, 1500);

  const {
    state: { contract, accounts },
  } = useEth();

  const location = useLocation();
  const DaftarKandidat = location.state.fetchDaftarKandidat;

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = DaftarKandidat.slice(firstIndex, lastIndex);
  const npage = Math.ceil(DaftarKandidat.length / recordsPerPage);
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

  const navigate = useNavigate();
  const detailKandidat = async (kandidat) => {
    const fetchDaftarPemilih = await contract.methods
      .cekPemilih()
      .call({ from: accounts[0] });
    const fetchDaerahPemilihan = await contract.methods
      .cekDaerahPemilihan()
      .call({ from: accounts[0] });
    navigate("/petugas/daftar-kandidat/detail", {
      state: { kandidat, fetchDaftarPemilih, fetchDaerahPemilihan },
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
      <div className="DaftarKandidat">
        <div className="container-fluid bg-body-tertiary min-vh-100">
          <div className="row">
            <SideBar />
            <div className="col-2"></div>
            <div className="col-10 p-0">
              <nav class="navbar bg-body-tertiary shadow">
                <span class="navbar-text text-dark ps-3">
                  <i>
                    <b>Petugas/</b> Daftar Kandidat
                  </i>
                </span>
              </nav>
              <div className="p-4">
                <div className="row mt-3">
                  <div className="col-12">
                    <div className="card shadow p-2">
                      <h5 className="text-center mb-4 mt-3">
                        Tabel Daftar Kandidat
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
                                  placeholder="Cari kandidat berdasarkan nama kandidat..."
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
                                <th scope="col">Nama Kandidat</th>
                                <th scope="col">Nomor Urut</th>
                                <th scope="col">Perolehan Suara</th>
                                <th scope="col">Aksi</th>
                              </tr>
                            </thead>
                            <tbody>
                              {DaftarKandidat.length === 0 ? (
                                <tr className="text-center">
                                  <td colSpan={5}>
                                    Data Petugas Belum Tersedia
                                  </td>
                                </tr>
                              ) : (
                                records
                                  .filter((kandidat) => {
                                    return search.toLocaleLowerCase() === ""
                                      ? kandidat
                                      : kandidat.nama
                                          .toLocaleLowerCase()
                                          .includes(search);
                                  })
                                  .map((kandidat, i) => (
                                    <tr key={i}>
                                      <th scope="row" className="text-center">
                                        {i + 1}
                                      </th>
                                      <td>{kandidat.nama}</td>
                                      <td className="text-center">
                                        {kandidat.norut}
                                      </td>
                                      <td className="text-center">
                                        {kandidat.perolehanSuara}
                                      </td>
                                      <td className="text-center">
                                        <button
                                          type="button"
                                          class="btn btn-info ms-1"
                                          onClick={() =>
                                            detailKandidat(kandidat)
                                          }
                                        >
                                          <i class="bi bi-person-fill-exclamation pe-2"></i>
                                          Detail
                                        </button>
                                      </td>
                                    </tr>
                                  ))
                              )}
                            </tbody>
                          </table>
                          <p className="fs-6 table-footer">
                            Total Kandidat : {DaftarKandidat.length}
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

export default DaftarKandidat;
