import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const StatistikLayout = (props) => {
  const DaftarKandidat = props.DaftarKandidat;

  return (
    <div className="StatistikLayout pb-5 mb-5">
      <div className="container">
        <h5 className="text-center mb-5">
          Statistik{" "}
          <span className="badge bg-yellow text-black fs-5">Pemilihan</span>
        </h5>
        <div className="row">
          <div className="col-6">
            <Bar
              data={{
                labels: DaftarKandidat.map((kandidat) => kandidat.nama),
                datasets: [
                  {
                    label: "Perolehan Suara",
                    data: DaftarKandidat.map(
                      (kandidat) => kandidat.perolehanSuara
                    ),
                    backgroundColor: "rgba(78, 137, 117, 1)",
                  },
                ],
              }}
            />
          </div>
          <div className="col-6 pt-3 ps-4 text-justify">
            <p>
              Diagram batang disamping mengilustrasikan perolehan suara{" "}
              {DaftarKandidat.length} kandidat, yaitu{" "}
              {DaftarKandidat.map((kandidat) => (
                <> {kandidat.nama}, </>
              ))}
              . Setiap kandidat direpresentasikan oleh sebuah batang vertikal,
              di mana panjang batang tersebut mencerminkan jumlah suara yang
              diperoleh oleh kandidat tersebut.
            </p>
            <ul>
              {DaftarKandidat.map((kandidat, i) => (
                <li>
                  {kandidat.nama}: Batang ke-{i + 1} pada diagram tersebut
                  mewakili kandidat {kandidat.nama}. Panjang batang tersebut
                  sekitar {kandidat.perolehanSuara} satuan. Ini berarti{" "}
                  {kandidat.nama} menerima {kandidat.perolehanSuara} suara dalam
                  pemilihan yang sedang berlangsung.
                </li>
              ))}
            </ul>
            <div className="text-end">
              <img
                src="/img/3d/business-woman-reading-a-book-to-a-boy.png"
                alt="business-woman-reading-a-book-to-a-boy"
                height={150}
              />
            </div>
          </div>
        </div>
      </div>
      <svg
        className="slice-three"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#eae3dc"
          fillOpacity="1"
          d="M0,160L40,160C80,160,160,160,240,144C320,128,400,96,480,85.3C560,75,640,85,720,117.3C800,149,880,203,960,213.3C1040,224,1120,192,1200,181.3C1280,171,1360,181,1400,186.7L1440,192L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
        ></path>
      </svg>
    </div>
  );
};

export default StatistikLayout;
