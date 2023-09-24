// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract EvotingContract {
    struct Admin {
        address metamaskAdmin;
        bytes32 username;
        bytes32 password;
        bool statusPemilihan;
    }

    struct Kandidat {
        uint norut;
        string nama;
        string visi;
        string misi;
        uint perolehanSuara;
        bytes32[] nikValidasi;
    }

    struct Petugas {
        address metamaskPetugas;
        string username;
        bytes32 password;
        string kodeDapil;
    }

    struct Pemilih {
        address metamaskPemilih;
        bytes32 nik;
        bytes32 password;
        string kodeDapil;
        bool status;
    }

    struct Dapil {
        string kodeDapil;
        string namaDapil;
    }

    Admin public Administrator;
    Kandidat[] public DaftarKandidat;
    Petugas[] public DaftarPetugas;
    Pemilih[] public DaftarPemilih;
    Dapil[] public DaerahPemilihan;

    constructor() {
        Administrator = Admin({
            username : keccak256(bytes("Administrator")),
            password : keccak256(bytes("Administrator")),
            metamaskAdmin : msg.sender,
            statusPemilihan : false
        });
        DaerahPemilihan.push(Dapil({
            kodeDapil: "DAPIL-001",
            namaDapil: "Daerah Pemilihan"
        }));
    }

// Admin
    function cekAdmin() public view returns (Admin memory) {
        return Administrator;
    }

    function ubahPasswordAdmin(bytes32 newPassword) public {
        Administrator.password = newPassword;
    }

    function setPemilihan(bool status) public {
        Administrator.statusPemilihan = status;
    }

// Kandidat
    function tambahKandidat(uint norutKandidat, string memory namaKandidat, string memory visiKandidat, string memory misiKandidat) public {
        DaftarKandidat.push(Kandidat({
            norut: norutKandidat,
            nama: namaKandidat,
            visi: visiKandidat,
            misi: misiKandidat,
            perolehanSuara: 0,
            nikValidasi: new bytes32[](0)
        }));
    }

    function ubahKandidat(uint norutKandidat, string memory namaKandidat, string memory visiKandidat, string memory misiKandidat) public {
        for (uint i = 0; i < DaftarKandidat.length; i++) {
            if (DaftarKandidat[i].norut == norutKandidat) {
                DaftarKandidat[i].nama = namaKandidat;
                DaftarKandidat[i].visi = visiKandidat;
                DaftarKandidat[i].misi = misiKandidat;
            }
        }
    }

    function cekKandidat() public view returns (Kandidat[] memory) {
        return DaftarKandidat;
    }

// Petugas
    function tambahPetugas(address metamaskPetugas, string memory usernamePetugas, bytes32 passwordPetugas, string memory kodeDapil) public {
        DaftarPetugas.push(Petugas({
            metamaskPetugas: metamaskPetugas,
            username: usernamePetugas,
            password: passwordPetugas,
            kodeDapil: kodeDapil
        }));
    }

    function ubahPetugas(string memory usernamePetugas, string memory dapil) public {
        for (uint i = 0; i < DaftarPetugas.length; i++) {
            if (keccak256(bytes(DaftarPetugas[i].username)) == keccak256(bytes(usernamePetugas))) {
                DaftarPetugas[i].kodeDapil = dapil;
            }
        }
    }

    function ubahPasswordPetugas(string memory usernamePetugas, bytes32 passwordPetugas) public {
        for (uint i = 0; i < DaftarPetugas.length; i++) {
            if (keccak256(bytes(DaftarPetugas[i].username)) == keccak256(bytes(usernamePetugas))) {
                DaftarPetugas[i].password = passwordPetugas;
            }
        }
    }

    function cekPetugas() public view returns (Petugas[] memory) {
        return DaftarPetugas;
    }

// Pemilih
    function tambahPemilih(address metamaskPemilih, bytes32 nik, bytes32 passwordPemilih, string memory kodeDapil) public {
        DaftarPemilih.push(Pemilih({
            metamaskPemilih: metamaskPemilih,
            nik: nik,
            password: passwordPemilih,
            kodeDapil: kodeDapil,
            status: false
        }));
    }

    function cekPemilih() public view returns (Pemilih[] memory) {
        return DaftarPemilih;
    }


// Daerah Pemilihan
    function cekDaerahPemilihan() public view returns (Dapil[] memory) {
        return DaerahPemilihan;
    }

    function tambahDaerahPemilihan(string memory kode, string memory nama) public {
        DaerahPemilihan.push(Dapil({
            kodeDapil: kode,
            namaDapil: nama
        }));
    }

    function ubahDaerahPemilihan(string memory kode, string memory dapil) public {
        for (uint i = 0; i < DaerahPemilihan.length; i++) {
            if (keccak256(bytes(DaerahPemilihan[i].kodeDapil)) == keccak256(bytes(kode))) {
                DaerahPemilihan[i].namaDapil = dapil;
            }
        }
    }

// Proses Pemilihan
    function pemilihan(uint ballot, bytes32 nik) public {
        for (uint i = 0; i < DaftarPemilih.length; i++) {
            if (DaftarPemilih[i].nik == nik) {
                DaftarKandidat[ballot].perolehanSuara += 1;
                DaftarKandidat[ballot].nikValidasi.push(nik);
                DaftarPemilih[i].status = true;
            }
        }
    }
}