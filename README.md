# Family 100 Buzzer (Offline Version) 🛎️

Aplikasi tombol rebutan (Buzzer) berbasis web sederhana untuk memeriahkan acara kuis Family 100, Lomba 17-an, atau acara kantor.

Aplikasi ini dirancang untuk dijalankan secara **OFFLINE** menggunakan jaringan Wi-Fi lokal (tanpa perlu internet), sehingga respons tombol sangat cepat (real-time) dan bebas delay.

---

## 📋 Fitur

- **Juri / Host Panel:** Membuat room, mereset tombol, dan melihat siapa yang memencet duluan
- **Player Button:** Tampilan tombol besar di HP peserta
- **Spectator View:** Tampilan layar lebar untuk proyektor/TV agar penonton bisa melihat status tombol
- **Suara Buzzer:** Efek suara otomatis saat tombol ditekan

---

## 🛠️ Persyaratan

Sebelum memulai, pastikan kamu memiliki:

1. **Laptop/PC** sebagai Server (Juri)
2. **Node.js** terinstal di Laptop — [Download di sini](https://nodejs.org/)
3. **Wi-Fi Router** atau **Hotspot HP** (Semua perangkat Juri & Pemain harus terhubung ke Wi-Fi yang sama)

---

## 🚀 Cara Instalasi

### 1. Download/Clone Repo ini
Jika kamu belum punya git, cukup download sebagai ZIP dan ekstrak.

### 2. Install Dependencies
Buka Terminal / Command Prompt, arahkan ke folder proyek ini, lalu jalankan:
```bash
npm install
```

*Perintah ini akan menginstal semua kebutuhan aplikasi seperti `socket.io`, dll.*

---

## ⚙️ Cara Menjalankan (Mode Offline)

### Langkah 1: Hubungkan ke Wi-Fi
Pastikan Laptop (Server) dan HP (Pemain) terhubung ke **Wi-Fi yang sama**. Jika tidak ada Wi-Fi, nyalakan **Mobile Hotspot** dari salah satu HP dan hubungkan laptop ke sana.

### Langkah 2: Cari IP Address Laptop
Kita butuh alamat IP laptop agar bisa dibuka di HP lain.

- **Windows:** Buka CMD → ketik `ipconfig` → Cari **IPv4 Address** (Contoh: `192.168.1.15`)
- **Mac/Linux:** Buka Terminal → ketik `ifconfig` → Cari alamat inet (Contoh: `192.168.1.15`)

### Langkah 3: Konfigurasi IP
1. Buat file baru bernama `.env` di folder utama proyek
2. Isi file tersebut dengan format berikut (ganti angkanya dengan IP kamu):
```env
BASE_URL=http://192.168.1.15:3000
PORT=3000
```

*Setting ini penting agar fitur "Salin Link" menghasilkan alamat yang benar, bukan localhost.*

### Langkah 4: Jalankan Server
Kembali ke terminal, jalankan:
```bash
npm start
```

Jika muncul pesan Firewall di Windows, klik **Allow Access** (centang Private & Public).

### Langkah 5: Cara Main

**Untuk Juri (Di Laptop):**
1. Buka browser dan akses: `http://localhost:3000/juri.html`
2. Klik "Buat Permainan Baru"

**Untuk Pemain (Di HP):**
- Juri bisa mengklik tombol "Salin" pada kolom "Undang Pemain", lalu kirim linknya via WhatsApp ke grup peserta
- Atau, peserta bisa mengetik manual di browser HP mereka: `http://192.168.1.15:3000` (Sesuaikan dengan IP di Langkah 2)

---

## ❓ Troubleshooting (Masalah Umum)

### Q: HP Pemain tidak bisa membuka link (Loading terus/Error)
**A:** 
- Cek Firewall di laptop. Matikan sementara Windows Firewall atau pastikan Node.js diizinkan akses ke Private Network
- Pastikan HP dan Laptop benar-benar di Wi-Fi yang sama. Jangan pakai data seluler di HP

### Q: Tombol "Salin Link" malah mengcopy "localhost", bukan IP
**A:** 
- Kamu belum membuat file `.env` atau belum mengisinya dengan `BASE_URL=http://[IP-KAMU]:3000`. Cek Langkah 3

### Q: Bagaimana cara reset tombol setelah ada yang memencet?
**A:** 
- Juri memiliki tombol "Reset Tombol Rebutan" yang akan muncul otomatis setelah ada pemain yang menekan tombol

---

## 📝 Lisensi

Project ini bersifat open-source dan bebas digunakan untuk keperluan non-komersial.

## 🤝 Kontribusi

Pull requests sangat diterima! Untuk perubahan besar, silakan buka issue terlebih dahulu untuk mendiskusikan perubahan yang ingin kamu lakukan.

---

**Selamat bermain! 🎉**
