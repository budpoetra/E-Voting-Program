import React from "react";

const KandidatLayout = (props) => {
  const DaftarKandidat = props.DaftarKandidat;
  const DaftarPemilih = props.DaftarPemilih;
  const DaerahPemilihan = props.DaerahPemilihan;

  const perolehanSuaraPerDapil = (kodeDapil, norut) => {
    let total = 0;

    for (let i = 0; i < DaftarKandidat.length; i++) {
      if (norut === DaftarKandidat[i].norut) {
        const nikValidasi = DaftarKandidat[i].nikValidasi;
        for (let j = 0; j < nikValidasi.length; j++) {
          for (let k = 0; k < DaftarPemilih.length; k++) {
            if (
              nikValidasi[j] === DaftarPemilih[k].nik &&
              kodeDapil === DaftarPemilih[k].kodeDapil &&
              DaftarPemilih[k].status
            ) {
              total += 1;
            }
          }
        }
      }
    }
    return total;
  };

  return (
    <div className="KandidatLayout mt-4">
      <div className="container">
        <h5 className="text-center mb-4">
          Daftar{" "}
          <span className="badge bg-yellow text-black fs-5">
            Kandidat Pemilihan
          </span>
        </h5>
        <div className="row justify-content-md-center">
          {DaftarKandidat.map((kandidat, i) => (
            <div className="col-3 mb-5" key={i}>
              <div className="card shadow mb-3">
                <div className="card-body">
                  <img
                    className="card-img-top mt-2 bg-body-tertiary border"
                    src="/img/3d/poto-kandidat.png"
                    alt="poto-kandidat"
                    height={200}
                  />
                  <h5 className="card-title">
                    <div className="row text-center shadow-sm">
                      <div className="col-8 fs-6 border p-2">
                        {kandidat.nama}
                      </div>
                      <div className="col-4 fs-2 border">{kandidat.norut}</div>
                    </div>
                  </h5>
                  <p className="card-text m-0">Perolehan Suara :</p>
                  <p className="fs-1 text-center m-0">
                    {kandidat.perolehanSuara}
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  {DaerahPemilihan.map((dapil, j) => (
                    <li className="list-group-item text-dapil" key={j}>
                      {kandidat.nikValidasi.length > 0 ? (
                        <div className="row">
                          <div className="col-8">
                            Perolehan Suara di {dapil.namaDapil} :
                          </div>
                          <div className="col-4 text-center">
                            {perolehanSuaraPerDapil(
                              dapil.kodeDapil,
                              kandidat.norut
                            )}{" "}
                            Suara
                          </div>
                        </div>
                      ) : (
                        <div className="row">
                          <div className="col-8">
                            Perolehan Suara di {dapil.namaDapil} :
                          </div>
                          <div className="col-4 text-center">0 Suara</div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <svg
        className="slice-two"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#eae3dc"
          fillOpacity="1"
          d="M0,192L40,181.3C80,171,160,149,240,160C320,171,400,213,480,208C560,203,640,149,720,144C800,139,880,181,960,202.7C1040,224,1120,224,1200,192C1280,160,1360,96,1400,64L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default KandidatLayout;
