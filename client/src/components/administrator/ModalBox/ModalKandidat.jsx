import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useEth from "../../../contexts/EthContext/useEth";
import Swal from "sweetalert2";

const ModalKandidat = (props) => {
  const [nama, setNama] = useState(props.data.nama);
  const norut = props.data.norut;
  const [visi, setVisi] = useState(props.data.visi);
  const [misi, setMisi] = useState(props.data.misi);

  const {
    state: { contract, accounts },
  } = useEth();

  const navigate = useNavigate();

  const tambahKandidat = async () => {
    if (nama === undefined || visi === undefined || misi === undefined) {
      return Swal.fire({
        icon: "warning",
        text: "Data Belum Lengkap, Mohon Isi Semua Form 😅",
      });
    }

    const fechtDataAdmin = await contract.methods
      .cekAdmin()
      .call({ from: accounts[0] });

    if (fechtDataAdmin.metamaskAdmin !== accounts[0]) {
      return Swal.fire({
        icon: "warning",
        text: "Akun MetaMask Yang Digunakan Tidak Terdaftar Sebagai Admin 😅",
      });
    }

    const fetchDaftarKandidat = await contract.methods
      .cekKandidat()
      .call({ from: accounts[0] });

    for (let i = 0; i < fetchDaftarKandidat.length; i++) {
      if (fetchDaftarKandidat[i].norut === norut) {
        return Swal.fire({
          icon: "warning",
          text: "Nomor Urut Kandidat Sudah Terdaftar 😅",
        });
      }
    }

    const tambah = await contract.methods
      .tambahKandidat(norut, nama, visi, misi)
      .send({ from: accounts[0] });

    if (tambah.status) {
      Swal.fire({
        icon: "success",
        text: "Berhasil Menambahkan Kandidat Baru 🫡",
      }).then(async () => {
        const fetchDaftarKandidat = await contract.methods
          .cekKandidat()
          .call({ from: accounts[0] });
        navigate("/administrator/daftar-kandidat", {
          state: { fetchDaftarKandidat },
        });
        props.close();
      });
    }
  };

  const ubahKandidat = async () => {
    if (nama === "" || norut === "" || visi === "" || misi === "") {
      return Swal.fire({
        icon: "warning",
        text: "Data Belum Lengkap, Mohon Isi Semua Form 😅",
      });
    }

    const fechtDataAdmin = await contract.methods
      .cekAdmin()
      .call({ from: accounts[0] });

    if (fechtDataAdmin.metamaskAdmin !== accounts[0]) {
      return Swal.fire({
        icon: "warning",
        text: "Akun MetaMask Yang Digunakan Tidak Terdaftar Sebagai Admin 😅",
      });
    }

    const ubah = await contract.methods
      .ubahKandidat(norut, nama, visi, misi)
      .send({ from: accounts[0] });

    if (ubah.status) {
      Swal.fire({
        icon: "success",
        text: "Berhasil Mengubah Data Kandidat 🫡",
      }).then(async () => {
        const fetchDaftarKandidat = await contract.methods
          .cekKandidat()
          .call({ from: accounts[0] });
        navigate("/administrator/daftar-kandidat", {
          state: { fetchDaftarKandidat },
        });
        props.close();
      });
    }
  };

  if (props.jenisModal === "tambah-kandidat") {
    return (
      <div
        className="modal fade show bg-modalbox"
        id="staticBackdropLive"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLiveLabel"
        aria-hidden="true"
        style={{ display: "block" }}
        role="dialog"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Tambah Kandidat</h1>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-2 pt-2">Nomor Urut</div>
                <div className="col-10">
                  <input
                    type="number"
                    class="form-control mb-3 border-3"
                    value={norut}
                    readOnly
                  />
                </div>
                <div className="col-2 pt-2">Nama</div>
                <div className="col-10">
                  <input
                    type="text"
                    class="form-control mb-3 border-3"
                    onChange={(e) => setNama(e.target.value)}
                  />
                </div>
                <div className="col-2 pt-2">Visi</div>
                <div className="col-10">
                  <textarea
                    class="form-control mb-3 border-3"
                    rows="5"
                    onChange={(e) => setVisi(e.target.value)}
                  ></textarea>
                </div>
                <div className="col-2 pt-2">Misi</div>
                <div className="col-10">
                  <textarea
                    class="form-control mb-3 border-3"
                    rows="5"
                    onChange={(e) => setMisi(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={props.close}
              >
                Close
              </button>
              <button
                type="button"
                className="btn bg-green text-white"
                onClick={tambahKandidat}
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (props.jenisModal === "ubah-kandidat") {
    return (
      <div
        className="modal fade show bg-modalbox"
        id="staticBackdropLive"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLiveLabel"
        aria-hidden="true"
        style={{ display: "block" }}
        role="dialog"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                <center>Ubah Data Kandidat</center>
              </h1>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-2 pt-2">Nomor Urut</div>
                <div className="col-10">
                  <input
                    type="number"
                    class="form-control mb-3 border-3"
                    value={norut}
                    readOnly
                  />
                </div>
                <div className="col-2 pt-2">Nama</div>
                <div className="col-10">
                  <input
                    type="text"
                    class="form-control mb-3 border-3"
                    onChange={(e) => setNama(e.target.value)}
                    value={nama}
                  />
                </div>
                <div className="col-2 pt-2">Visi</div>
                <div className="col-10">
                  <textarea
                    class="form-control mb-3 border-3"
                    rows="5"
                    onChange={(e) => setVisi(e.target.value)}
                    value={visi}
                  ></textarea>
                </div>
                <div className="col-2 pt-2">Misi</div>
                <div className="col-10">
                  <textarea
                    class="form-control mb-3 border-3"
                    rows="5"
                    onChange={(e) => setMisi(e.target.value)}
                    value={misi}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={props.close}
              >
                Close
              </button>
              <button
                type="button"
                className="btn bg-green text-white"
                onClick={ubahKandidat}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ModalKandidat;
