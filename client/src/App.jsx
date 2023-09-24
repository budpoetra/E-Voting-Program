import { EthProvider } from "./contexts/EthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/";
import TentangAplikasiLayout from "./components/layouts/TentangAplikasiLayout";
import TentangKandidatLayout from "./components/layouts/TentangKandidatLayout";
import Login from "./components/Login";

import AdminDashboard from "./components/administrator/Dashboard";
import AdminDaftarKandidat from "./components/administrator/DaftarKandidat";
import AdminDetailKandidat from "./components/administrator/DetailKandidat";
import AdminDaftarPetugas from "./components/administrator/DaftarPetugas";
import AdminDaftarPemilih from "./components/administrator/DaftarPemilih";
import AdminDaftaDaerahPemilihan from "./components/administrator/DaftarDaerahPemilihan";
import AdminUbahPassword from "./components/administrator/UbahPassword";

import PetugasDashboard from "./components/petugas/Dashboard";
import PetugasDaftarKandidat from "./components/petugas/DaftarKandidat";
import PetugasDetailKandidat from "./components/petugas/DetailKandidat";
import PetugasDaftarPetugas from "./components/petugas/DaftarPetugas";
import PetugasDaftarPemilih from "./components/petugas/DaftarPemilih";
import PetugasInfoAkun from "./components/petugas/InfoAkun";
import PetugasUbahPassword from "./components/petugas/UbahPassword";

import LoginPemilih from "./components/pemilih/LoginPemilih";
import Pemilihan from "./components/pemilih/Pemilihan";

function App() {
  return (
    <EthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login-pemilih" element={<LoginPemilih />} />
          <Route path="/tentang-kandidat" element={<TentangKandidatLayout />} />
          <Route path="/tentang-aplikasi" element={<TentangAplikasiLayout />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Route */}
          <Route path="/administrator/dashboard" element={<AdminDashboard />} />
          <Route
            path="/administrator/daftar-kandidat"
            element={<AdminDaftarKandidat />}
          />
          <Route
            path="/administrator/daftar-kandidat/detail"
            element={<AdminDetailKandidat />}
          />
          <Route
            path="/administrator/daftar-petugas"
            element={<AdminDaftarPetugas />}
          />
          <Route
            path="/administrator/daftar-pemilih"
            element={<AdminDaftarPemilih />}
          />
          <Route
            path="/administrator/daftar-daerah-pemilihan"
            element={<AdminDaftaDaerahPemilihan />}
          />
          <Route
            path="/administrator/ubah-password"
            element={<AdminUbahPassword />}
          />

          {/* Petugas Route */}
          <Route path="/petugas/dashboard" element={<PetugasDashboard />} />
          <Route
            path="/petugas/daftar-kandidat"
            element={<PetugasDaftarKandidat />}
          />
          <Route
            path="/petugas/daftar-kandidat/detail"
            element={<PetugasDetailKandidat />}
          />
          <Route
            path="/petugas/daftar-petugas"
            element={<PetugasDaftarPetugas />}
          />
          <Route
            path="/petugas/daftar-pemilih"
            element={<PetugasDaftarPemilih />}
          />
          <Route path="/petugas/info-akun" element={<PetugasInfoAkun />} />
          <Route
            path="/petugas/ubah-password"
            element={<PetugasUbahPassword />}
          />

          {/* Pemilih */}
          <Route path="/pemilihan" element={<Pemilihan />} />
        </Routes>
      </BrowserRouter>
    </EthProvider>
  );
}

export default App;
