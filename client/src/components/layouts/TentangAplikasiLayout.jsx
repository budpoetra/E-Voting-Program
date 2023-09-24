import React, { useState } from "react";
import NavBar from "../NavBar";
import PropagateLoader from "react-spinners/PropagateLoader";

const TentangAplikasiLayout = () => {
  const [preloader, setPreloader] = useState(true);
  setTimeout(() => {
    setPreloader(false);
    document.querySelector(".preloader").style.zIndex = "-9999";
  }, 500);

  return (
    <>
      <div
        className="preloader d-flex justify-content-center"
        style={{ zIndex: 10 }}
      >
        <PropagateLoader color="#4e8975" loading={preloader} size={20} />
      </div>
      <NavBar />
      <div className="TentangAplikasiLayout mt-4">
        <div className="container">
          <h5 className="text-center mb-4 mt-3">
            Tentang{" "}
            <span className="badge bg-green text-white fs-5">Aplikasi</span>
          </h5>
          <div className="row">
            <div className="col-8">
              <p className="mt-5 pt-3 text-justify">
                <span className="badge bg-green text-white">E-Voting</span> (
                <i>Electronic Voting</i>) ataupun pemungutan suara elektronik
                (dalam bahasa Indonesia) merupakan proses pemungutan suara yang
                memungkinkan pemilih dapat menyalurkan suara secara{" "}
                <span className="badge bg-green text-white">
                  aman serta rahasia
                </span>{" "}
                melalui internet. E-Voting sendiri mempunyai penafsiran
                pemakaian teknologi komputer pada penerapan voting ataupun
                pemungutan suara.
              </p>
              <p className="text-justify">
                <span className="badge bg-green text-white">Blockchain</span>{" "}
                adalah daftar catatan atau blok yang terhubung satu sama lain
                dan dilindungi oleh metode{" "}
                <span className="badge bg-green text-white">kriptografi.</span>
                Blockchain pada dasarnya adalah database terdistribusi,
                dibagikan seperti buku besar yang menyimpan catatan aset dan
                transaksi pada{" "}
                <span className="badge bg-green text-white">
                  jaringan peer-to-peer.
                </span>
              </p>
              <p className="text-justify">
                <span className="badge bg-green text-white">
                  Decentralized application
                </span>{" "}
                (Aplikasi terdesentralisasi) adalah aplikasi komputer yang
                didesain untuk beroperasi di atas jaringan terdesentralisasi
                seperti{" "}
                <span className="badge bg-green text-white">blockchain,</span>
                yang tidak terpusat pada satu pihak atau entitas tertentu. Dalam
                jaringan terdesentralisasi, komputer atau node yang terhubung
                memproses dan memverifikasi transaksi atau aksi yang dilakukan
                oleh pengguna tanpa adanya satu entitas pusat yang mengontrol
                keseluruhan jaringan.
              </p>
              <p className="text-justify">
                Aplikasi{" "}
                <span className="badge bg-green text-white"> E-Voting</span> ini
                merupakan aplikasi terdesentralisasi yang dikembangkan
                menggunakan teknologi jaringan{" "}
                <span className="badge bg-green text-white">blockchain.</span>{" "}
                Hasil pemungutan suara akan disimpan dalam{" "}
                <span className="badge bg-green text-white">
                  database terdesentralisasi
                </span>{" "}
                dengan metode blockchain yang terenkripsi dan terdistribusi.
                Dengan menggunakan metode blockchain ini akan menciptakan
                aplikasi e-voting yang{" "}
                <span className="badge bg-green text-white">
                  transparency, dependability, eligibility, verifiability serta
                  anonymity.
                </span>
              </p>
            </div>
            <div className="col-4 text-center">
              <div className="background-shape-two shadow"></div>
              <img
                src="/img/3d/casual-life-man-with-speech-bubble.png"
                alt="casual-life-man-with-speech-bubble"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TentangAplikasiLayout;
