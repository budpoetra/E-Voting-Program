import React from "react";

const NotReadyLayout = () => {
  return (
    <>
      <div className="NotReadyLayout">
        <div className="container">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-6">
              <h1 className="text-head">Maaf🙏</h1>
              <p className="text-justify pe-5">
                Saat ini, proses pemilihan belum dapat dilanjutkan karena data
                yang kami terima masih belum lengkap dan memerlukan beberapa
                informasi tambahan. Oleh karena itu, Anda harus bersabar dan
                menunggu instruksi selanjutnya. Kami menghargai kesabaran dan
                kerjasama Anda dalam hal ini, dan pastikan bahwa kami akan
                segera memberikan update lebih lanjut untuk melanjutkan proses
                pemilihan dengan lancar. Terima kasih atas perhatian dan
                partisipasi Anda dalam proses ini.
              </p>
            </div>
            <div className="col">
              <div className="background-shape shadow"></div>
              <img
                src="/img/3d/casual-life-young-man-sitting-with-laptop-and-waving.png"
                alt="casual-life-young-man-sitting-with-laptop-and-waving"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotReadyLayout;
