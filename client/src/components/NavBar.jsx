import React from "react";
import { useNavigate } from "react-router-dom";
import useEth from "../contexts/EthContext/useEth";

const NavBar = () => {
  const {
    state: { contract, accounts },
  } = useEth();

  const navigate = useNavigate();
  const linkToLoginPemilih = () => {
    navigate("/login-pemilih");
  };
  const linkToTentangKandidat = async () => {
    const fetchDaftarKandidat = await contract.methods
      .cekKandidat()
      .call({ from: accounts[0] });
    navigate("/tentang-kandidat", {
      state: {
        fetchDaftarKandidat,
      },
    });
  };
  const linkToTentangAplikasi = () => {
    navigate("/tentang-aplikasi");
  };
  const linkToLogin = () => {
    navigate("/login");
  };

  return (
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
            <li className="nav-item">
              <a className="nav-link text-black" href="/">
                Home
              </a>
            </li>
            <li className="nav-item" onClick={linkToLoginPemilih}>
              <div className="nav-link text-black">Lakukan Pemilihan</div>
            </li>
            <li className="nav-item" onClick={linkToTentangKandidat}>
              <div className="nav-link text-black">Tentang Kandidat</div>
            </li>
            <li className="nav-item" onClick={linkToTentangAplikasi}>
              <div className="nav-link text-black">Tentang Aplikasi</div>
            </li>
            <li className="nav-item" onClick={linkToLogin}>
              <div className="nav-link text-black">Login</div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
