import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";

import NavBar from "../NavBar";

const TentangKandidatLayout = () => {
  const [preloader, setPreloader] = useState(true);
  setTimeout(() => {
    setPreloader(false);
    document.querySelector(".preloader").style.zIndex = "-9999";
  }, 1500);

  const location = useLocation();
  const DaftarKandidat = location.state.fetchDaftarKandidat;

  return (
    <>
      <div
        className="preloader d-flex justify-content-center"
        style={{ zIndex: 10 }}
      >
        <PropagateLoader color="#4e8975" loading={preloader} size={20} />
      </div>
      <NavBar />
      <div className="TentangKandidatLayout">
        <div className="container">
          <h5 className="text-center mb-4 mt-4">
            Tentang{" "}
            <span className="badge bg-yellow text-black fs-5">Kandidat</span>
          </h5>
          <div id="tampil-kandidat">
            {DaftarKandidat.length > 0 ? (
              <div className="TampilKandidatLayout mt-5">
                {DaftarKandidat.map((kandidat, i) => (
                  <div className="row" key={i}>
                    <div className="col-1"></div>
                    <div className="col-3 d-flex align-items-center justify-content-center">
                      <img
                        className="rounded float-start bg-body-tertiary shadow"
                        src="/img/3d/poto-kandidat.png"
                        alt="poto-kandidat"
                      />
                    </div>
                    <div className="col-7 ps-0">
                      <div className="row  pt-3">
                        <div className="col-3 mb-2">Nama</div>
                        <div className="col-9 mb-2">: {kandidat.nama}</div>
                        <div className="col-3 mb-2">Nomor Urut</div>
                        <div className="col-9 mb-2">: {kandidat.norut}</div>
                        <div className="col-3 mb-2">Perolehan Suara</div>
                        <div className="col-9 mb-2">
                          : {kandidat.perolehanSuara}
                        </div>
                        <div className="col-3">Visi :</div>
                        <div className="col-12 mb-2 text-justify">
                          {kandidat.visi}
                        </div>
                        <div className="col-3">Misi :</div>
                        <div className="col-12 mb-3 text-justify">
                          {kandidat.misi}
                        </div>
                      </div>
                    </div>
                    <div className="col-1"></div>
                    <hr className="text-dark mt-4 mb-4" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="row mt-5">
                <div className="col-1"></div>
                <div className="col-6 pt-5">
                  <h1 className="text-head">Maaf🙏</h1>
                  <p className="text-justify pe-5">
                    Saat ini, sistem belum dapat menampilkan data kandidat
                    dikarenakan data yang kami terima masih belum lengkap dan
                    memerlukan beberapa informasi tambahan. Oleh karena itu,
                    Anda harus bersabar dan menunggu instruksi selanjutnya.
                    Terima kasih atas perhatian dan partisipasi Anda dalam hal
                    ini.
                  </p>
                </div>
                <div className="col">
                  <div className="background-shape-three shadow"></div>
                  <img
                    src="/img/3d/casual-life-young-man-with-tablet.png"
                    alt="casual-life-young-man-with-tablet"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TentangKandidatLayout;
