import React, { useEffect, useState } from "react";
import useEth from "../contexts/EthContext/useEth";
import PropagateLoader from "react-spinners/PropagateLoader";
import Swal from "sweetalert2";

import NavBar from "./NavBar";
import NotReadyLayout from "./layouts/NotReadyLayout";
import KandidatLayout from "./layouts/KandidatLayout";
import StatistikLayout from "./layouts/StatistikLayout";
import FooterLayout from "./layouts/FooterLayout";

// Quote Word Change
const arrayQuote = [
  '"Setiap suara yang Anda berikan memiliki kekuatan yang luar biasa untuk menciptakan perubahan yang positif. 😃"',
  '"Voting adalah hak istimewa yang harus dihargai dan digunakan dengan penuh tanggung jawab. 😊"',
  '"Berikan suara Anda, dan buatlah suara Anda terdengar di dalam proses demokrasi! 😄"',
  '"Dengan melakukan voting, Anda memiliki kesempatan unik untuk membentuk masa depan yang Anda impikan. 😁"',
  '"Jangan biarkan orang lain membuat keputusan atas nama Anda. Ambil tindakan dan berpartisipasilah dalam proses voting! 😎"',
  '"Voting adalah cara termudah dan paling efektif untuk menyuarakan pendapat Anda dan mempengaruhi perubahan yang Anda inginkan. 😊"',
  '"Ingatlah, setiap suara Anda memiliki nilai dan kekuatan yang tak terhingga dalam membentuk arah negara kita. 😃"',
  '"Dalam proses voting, setiap suara sangat penting dan berarti. Jadilah bagian dari perubahan dengan memberikan suara Anda! 😄"',
  '"Voting bukan hanya hak, tetapi juga tanggung jawab kita sebagai warga negara yang peduli terhadap masa depan bangsa. 😊"',
  '"Dengan melakukan voting, Anda memberikan mandat kepada para pemimpin yang akan mewakili dan menjalankan aspirasi Anda. 😁"',
];

setTimeout(() => {
  document.querySelector(".quote").innerHTML =
    arrayQuote[Math.floor(Math.random() * 10)];
}, 1);

const Home = () => {
  const [DaftarKandidat, setDaftarKandidat] = useState([]);
  const [DaerahPemilihan, setDaerahPemilihan] = useState([]);
  const [DaftarPemilih, setDaftarPemilih] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preloader, setPreloader] = useState(false);

  const {
    state: { contract, accounts },
  } = useEth();

  useEffect(() => {
    setPreloader(true);
    setTimeout(() => {
      setPreloader(false);
      document.querySelector(".preloader-blocking-display").style.zIndex =
        "-9999";
    }, 1500);
  }, []);

  const start = async () => {
    if (!accounts) {
      return Swal.fire({
        icon: "error",
        text: "Kamu Harus Login Ke Metamask Terlebih Dahulu, Kemudian Muat Ulang Website Ini 😅",
      });
    }

    setPreloader(true);
    setTimeout(() => {
      setPreloader(false);
      document.querySelector(".preloader").remove();
    }, 1500);
    document.querySelector(".preloader-blocking-display").remove();
    document.querySelector(".blocking-display").remove();
    const fetchDaftarKandidat = await contract.methods
      .cekKandidat()
      .call({ from: accounts[0] });
    const fetchDaftarPemilih = await contract.methods
      .cekPemilih()
      .call({ from: accounts[0] });
    setDaftarPemilih(fetchDaftarPemilih);
    const fetchDaerahPemilihan = await contract.methods
      .cekDaerahPemilihan()
      .call({ from: accounts[0] });
    setDaerahPemilihan(fetchDaerahPemilihan);
    if (fetchDaftarKandidat.length > 1) {
      setDaftarKandidat(fetchDaftarKandidat);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="Home">
        <div className="preloader-blocking-display d-flex justify-content-center">
          <PropagateLoader color="#4e8975" loading={preloader} size={20} />
        </div>
        <div className="blocking-display">
          <div className="container text-center content">
            <div className="row">
              <div className="col-7">
                <h4 className="title">
                  Aplikasi E-Voting Berbasis Website Blockchain
                </h4>
                <div className="align-items-center mt-3">
                  <button
                    type="button"
                    className="btn bg-yellow shadow text-bold"
                    onClick={start}
                  >
                    Ayo Mulai
                  </button>
                </div>
                <div className="quote mt-3"></div>
              </div>
              <div className="col">
                <img
                  src="/img/3d/casual-life-students.png"
                  alt="casual-life-students"
                />
              </div>
            </div>
          </div>
          <svg
            className="slice-one"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#4e8975"
              fillOpacity="1"
              d="M0,288L80,277.3C160,267,320,245,480,197.3C640,149,800,75,960,64C1120,53,1280,107,1360,133.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
          <svg
            className="slice-two"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#e7bc75"
              fillOpacity="1"
              d="M0,160L60,176C120,192,240,224,360,224C480,224,600,192,720,186.7C840,181,960,203,1080,213.3C1200,224,1320,224,1380,224L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div className="preloader d-flex justify-content-center">
          <PropagateLoader color="#4e8975" loading={preloader} size={20} />
        </div>
        <NavBar />
        {loading ? (
          <NotReadyLayout />
        ) : (
          <>
            <KandidatLayout
              DaftarKandidat={DaftarKandidat}
              DaftarPemilih={DaftarPemilih}
              DaerahPemilihan={DaerahPemilihan}
            />
            <StatistikLayout DaftarKandidat={DaftarKandidat} />
            <FooterLayout />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
