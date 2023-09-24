import React from "react";
import { useNavigate } from "react-router-dom";
import useEth from "../../contexts/EthContext/useEth";
import Swal from "sweetalert2";

const SideBar = () => {
  const {
    state: { contract, accounts },
  } = useEth();

  const navigate = useNavigate();

  const linkToDashboard = async () => {
    const fetchDaftarKandidat = await contract.methods
      .cekKandidat()
      .call({ from: accounts[0] });
    const fetchDaftarPemilih = await contract.methods
      .cekPemilih()
      .call({ from: accounts[0] });
    const fetchDaerahPemilihan = await contract.methods
      .cekDaerahPemilihan()
      .call({ from: accounts[0] });
    navigate("/petugas/dashboard", {
      state: {
        fetchDaftarKandidat,
        fetchDaftarPemilih,
        fetchDaerahPemilihan,
      },
    });
  };
  const linkToDaftarKandidat = async () => {
    const fetchDaftarKandidat = await contract.methods
      .cekKandidat()
      .call({ from: accounts[0] });
    navigate("/petugas/daftar-kandidat", {
      state: { fetchDaftarKandidat },
    });
  };
  const linkToDaftarPetugas = async () => {
    const fetchDaftarPetugas = await contract.methods
      .cekPetugas()
      .call({ from: accounts[0] });
    const fetchDaerahPemilihan = await contract.methods
      .cekDaerahPemilihan()
      .call({ from: accounts[0] });
    navigate("/petugas/daftar-petugas", {
      state: { fetchDaftarPetugas, fetchDaerahPemilihan },
    });
  };
  const linkToDaftarPemilih = async () => {
    const fetchDaftarPemilih = await contract.methods
      .cekPemilih()
      .call({ from: accounts[0] });
    navigate("/petugas/daftar-pemilih", {
      state: { fetchDaftarPemilih },
    });
  };
  const linkToInfoAkun = async () => {
    const fetchDaftarPetugas = await contract.methods
      .cekPetugas()
      .call({ from: accounts[0] });
    const fetchDaerahPemilihan = await contract.methods
      .cekDaerahPemilihan()
      .call({ from: accounts[0] });
    const userLogin = sessionStorage.getItem("user-login");
    let DaftarPetugas;
    for (let i = 0; i < fetchDaftarPetugas.length; i++) {
      if (fetchDaftarPetugas[i].username === userLogin) {
        DaftarPetugas = fetchDaftarPetugas[i];
      }
    }
    navigate("/petugas/info-akun", {
      state: { DaftarPetugas, fetchDaerahPemilihan },
    });
  };
  const linkToUbahPassword = async () => {
    navigate("/petugas/ubah-password");
  };
  const logout = async () => {
    Swal.fire({
      icon: "question",
      text: "Ingin Keluar Dari Sistem ?",
      showCancelButton: true,
      confirmButtonText: "Ya",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          text: "Terima Kasih Atas Kerja Kerasnya",
        }).then(() => {
          sessionStorage.clear();
          navigate("/login");
        });
      }
    });
  };

  return (
    <div className="col-2 vh-100 position-fixed shadow">
      <div className="SideBar">
        <div className="pt-3 ps-5">
          <img
            src="/img/logo/e-voting-logo-removebg.png"
            alt="E-Voting"
            width="40"
            height="40"
          />
          <span className="fs-6">
            <b>E-Voting</b>
          </span>
        </div>
        <hr className="text-dark shadow" />
        <div className="row">
          <div className="col-12 list-sidebar" onClick={linkToDashboard}>
            <div className="py-2 ps-2">
              <i className="fs-5 me-3">
                <i className="bi bi-speedometer"></i>
              </i>
              Dashboard
            </div>
          </div>
          <hr className="text-dark shadow" />
          <div className="col-12 list-sidebar" onClick={linkToDaftarKandidat}>
            <div className="py-2 ps-2">
              <i className="fs-5 me-3">
                <i className="bi bi-person-lines-fill"></i>
              </i>
              Daftar Kandidat
            </div>
          </div>
          <hr className="text-dark shadow" />
          <div className="col-12 list-sidebar" onClick={linkToDaftarPetugas}>
            <div className="py-2 ps-2">
              <i className="fs-5 me-3">
                <i className="bi bi-people-fill"></i>
              </i>
              Daftar Petugas
            </div>
          </div>
          <hr className="text-dark shadow" />
          <div className="col-12 list-sidebar" onClick={linkToDaftarPemilih}>
            <div className="py-2 ps-2">
              <i className="fs-5 me-3">
                <i className="bi bi-person-vcard-fill"></i>
              </i>
              Daftar Pemilih
            </div>
          </div>
          <hr className="text-dark shadow" />
          <div className="col-12 list-sidebar" onClick={linkToInfoAkun}>
            <div className="py-2 ps-2">
              <i className="fs-5 me-3">
                <i className="bi bi-person-fill-exclamation"></i>
              </i>
              Info Akun
            </div>
          </div>
          <hr className="text-dark shadow" />
          <div className="col-12 list-sidebar" onClick={linkToUbahPassword}>
            <div className="py-2 ps-2">
              <i className="fs-5 me-3">
                <i className="bi bi-exclamation-triangle-fill"></i>
              </i>
              Ubah Password
            </div>
          </div>
          <hr className="text-dark shadow" />
          <div className="col-12 list-sidebar" onClick={logout}>
            <div className="py-2 ps-2">
              <i className="fs-5 me-3">
                <i className="bi bi-door-open-fill"></i>
              </i>
              Logout
            </div>
          </div>
          <hr className="text-dark shadow" />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
