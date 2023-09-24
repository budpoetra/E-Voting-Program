import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";

import SideBar from "./SideBar";
import ModalBox from "./ModalBox/ModalDapil";

const DaftaDaerahPemilihan = () => {
  const [preloader, setPreloader] = useState(true);
  setTimeout(() => {
    setPreloader(false);
    document.querySelector(".preloader").style.zIndex = "-9999";
  }, 1500);

  const [modal, setModal] = useState(false);
  const [jenisModal, setjenisModal] = useState("");
  const [data, setData] = useState({});

  const location = useLocation();
  const DaftarPetugas = location.state.fetchDaftarPetugas;
  const DaftarPemilih = location.state.fetchDaftarPemilih;
  const DaerahPemilihan = location.state.fetchDaerahPemilihan;

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = DaerahPemilihan.slice(firstIndex, lastIndex);
  const npage = Math.ceil(DaerahPemilihan.length / recordsPerPage);
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

  const tambahDaerahPemilihan = () => {
    setModal(!modal);
    setjenisModal("tambah-daerah-pemilihan");
    setData({ DaerahPemilihan });
  };
  const ubahDaerahPemilihan = (dapil) => {
    setModal(!modal);
    setjenisModal("ubah-daerah-pemilihan");
    setData({ DaerahPemilihan, dapil });
  };

  const queryJumlahPetugas = (kodeDapil) => {
    let totalPetugas = 0;
    for (let i = 0; i < DaftarPetugas.length; i++) {
      if (DaftarPetugas[i].kodeDapil === kodeDapil) {
        totalPetugas += 1;
      }
    }
    return totalPetugas;
  };

  const queryJumlahPemilih = (kodeDapil) => {
    let totalPemilih = 0;
    for (let i = 0; i < DaftarPemilih.length; i++) {
      if (DaftarPemilih[i].kodeDapil === kodeDapil) {
        totalPemilih += 1;
      }
    }
    return totalPemilih;
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
                    <b>Administrator/</b> Daftar Daerah Pemilihan
                  </i>
                </span>
              </nav>
              <div className="p-4">
                <button
                  type="button"
                  className="btn bg-green text-white shadow"
                  onClick={tambahDaerahPemilihan}
                >
                  <i class="bi bi-person-fill-add me-3"></i>Tambah Daerah
                </button>
                <div className="row mt-3">
                  <div className="col-12">
                    <div className="card shadow p-2">
                      <h5 className="text-center mb-4 mt-3">
                        Tabel Daftar Daerah Pemilihan
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
                                  placeholder="Cari daerah pemilihan berdasarkan nama..."
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
                                <th scope="col">Kode Daerah</th>
                                <th scope="col">Nama Daerah</th>
                                <th scope="col">Jumlah Petugas</th>
                                <th scope="col">Jumlah Pemilih</th>
                                <th scope="col">Aksi</th>
                              </tr>
                            </thead>
                            <tbody>
                              {records
                                .filter((dapil) => {
                                  return search.toLocaleLowerCase() === ""
                                    ? dapil
                                    : dapil.namaDapil
                                        .toLocaleLowerCase()
                                        .includes(search);
                                })
                                .map((dapil, i) => (
                                  <tr key={i}>
                                    <th scope="row" className="text-center">
                                      {i + 1}
                                    </th>
                                    <td className="text-center">
                                      {dapil.kodeDapil}
                                    </td>
                                    <td>{dapil.namaDapil}</td>
                                    <td className="text-center">
                                      {queryJumlahPetugas(dapil.kodeDapil)}
                                    </td>
                                    <td className="text-center">
                                      {queryJumlahPemilih(dapil.kodeDapil)}
                                    </td>
                                    <td className="text-center">
                                      <button
                                        type="button"
                                        class="btn btn-primary me-1"
                                        onClick={() =>
                                          ubahDaerahPemilihan(dapil)
                                        }
                                      >
                                        <i class="bi bi-person-fill-gear pe-2"></i>
                                        Ubah
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                          <p className="fs-6 table-footer">
                            Total Daerah Pemilihan : {DaerahPemilihan.length}
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
                {/* ModalBox Tambah Kandidat */}
                {modal ? (
                  <ModalBox
                    jenisModal={jenisModal}
                    data={data}
                    close={() => setModal(false)}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DaftaDaerahPemilihan;
