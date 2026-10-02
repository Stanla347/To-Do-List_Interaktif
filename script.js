// 1. Seleksi Elemen Utama
const inputTugas = document.getElementById("TugasInput");
const btnTambah = document.getElementById("BtnTambah");
const daftarTugas = document.getElementById("DaftarTugas");

// Seleksi Elemen Statistik
const totalTugasEl = document.getElementById("TotalTugas");
const tugasSelesaiEl = document.getElementById("TugasSelesai");
const tugasBelumSelesaiEl = document.getElementById("TugasBelumSelesai");

// 2. Variabel Penampung Angka Statistik
let totalTugas = 0;
let tugasSelesai = 0;

// Fungsi untuk memperbarui tampilan angka statistik di layar secara otomatis
function perbaruiStatistik() {
    totalTugasEl.innerText = totalTugas;
    tugasSelesaiEl.innerText = tugasSelesai;
    tugasBelumSelesaiEl.innerText = totalTugas - tugasSelesai;
}

// 3. Fungsi Utama Logika Tambah Tugas
function tambahTugas() {
    // Mengambil teks dan menghapus spasi di awal/akhir
    const isiTeks = inputTugas.value.trim();

    // Validasi input kosong
    if (isiTeks === "") {
        alert("Peringatan: Catatan tugas tidak boleh kosong!");
        return; 
    }

    // Membuat elemen HTML <li> baru secara dinamis di memori
    const liBaru = document.createElement("li");
    liBaru.className = "NoteItem";
    
    // Mengisi struktur di dalam <li> dengan teks catatan dan tombol hapus
    liBaru.innerHTML = `<span class="TeksTugas">${isiTeks}</span> <button class="BtnHapus">Hapus</button>`;

    // --- FITUR CORET (TUGAS SELESAI) ---
    const elemenTeks = liBaru.querySelector(".TeksTugas");
    elemenTeks.addEventListener("click", function() {
        // Menggunakan toggle untuk mode saklar ON/OFF class "Completed"
        elemenTeks.classList.toggle("Completed");
        
        // Cek apakah sekarang elemen memiliki class "Completed" untuk update statistik
        if (elemenTeks.classList.contains("Completed")) {
            tugasSelesai++;
        } else {
            tugasSelesai--;
        }
        perbaruiStatistik();
    });

    // --- FITUR HAPUS ---
    const btnHapus = liBaru.querySelector(".BtnHapus");
    btnHapus.addEventListener("click", function() {
        // Jika tugas yang dihapus statusnya sudah selesai, kurangi counter tugas selesai
        if (elemenTeks.classList.contains("Completed")) {
            tugasSelesai--;
        }
        
        liBaru.remove(); // Hapus elemen dari layar DOM
        totalTugas--; // Kurangi total tugas
        perbaruiStatistik();
    });

    // Menempelkan elemen li yang baru dibuat ke dalam wadah ul
    daftarTugas.appendChild(liBaru);
    
    // Mengosongkan kembali isi kolom input agar siap diketik lagi
    inputTugas.value = "";

    // Tambah nilai total catatan dan perbarui layar statistik
    totalTugas++;
    perbaruiStatistik();
}

// 4. Event Listener Klik Tombol & Tombol "Enter"

// Merespons aksi klik pada tombol "+ Tambah"
btnTambah.addEventListener("click", function() {
    tambahTugas();
});

// Merespons aksi saat user mengetik dan melepas tombol "Enter" pada keyboard
inputTugas.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        tambahTugas();
    }
});