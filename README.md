Halo Panitia WCC! Repository ini berisi source code frontend untuk aplikasi Food Rescue yang kami kembangkan. Frontend ini dibuat menggunakan Next.js, React, dan Tailwind CSS.

Berikut penjelasan singkat mengenai halaman-halaman utama, fungsinya, serta fitur yang sudah dan bisa dikembangkan ke depannya.

====================
Daftar Halaman Utama
====================

1. Landing Page
	Halaman utama yang berisi penjelasan singkat tentang Food Rescue, cara kerja, manfaat, dan tombol untuk login atau daftar.

2. Login & Register
	Untuk proses autentikasi pengguna, baik sebagai buyer maupun seller.

3. Dashboard Seller
	Seller bisa memantau performa toko, pesanan masuk, dan produk yang dimiliki.

4. Orders Seller
	Seller dapat melihat daftar pesanan yang masuk, mengubah status pesanan, dan membatalkan pesanan jika diperlukan.

5. Produk Seller
	Seller dapat melihat, menambah, mengedit, dan menghapus produk yang dijual.

6. Analytics Seller
	Seller bisa melihat statistik penjualan dan performa toko secara visual.

7. Store Seller
	Seller dapat mengatur profil toko, alamat, dan informasi lainnya.

8. Settings Seller
	Seller dapat mengatur preferensi akun dan pengaturan lainnya.

9. Buyer Profile
	Buyer dapat melihat profil, pesanan yang pernah dilakukan, statistik, dan produk favorit.

10. Menu
	 Menampilkan daftar makanan yang tersedia untuk dibeli oleh buyer.

11. Food Details
	 Menampilkan detail makanan, galeri gambar, countdown timer, dan rekomendasi makanan lain.

12. Order
	 Proses pemesanan makanan oleh buyer.

====================
Fitur yang Sudah dan Bisa Dikembangkan
====================

- Notifikasi real-time untuk pesanan baru
- Chat antara buyer dan seller
- Sistem rating dan ulasan produk
- Integrasi pembayaran online
- Fitur filter dan pencarian produk yang lebih lengkap
- Dashboard analytics yang lebih detail
- Manajemen stok otomatis
- Fitur promosi atau diskon khusus

====================
Panduan Instalasi dan Menjalankan Project
====================

1. Extract folder ini
2. Jalankan npm install --legacy-peer-deps untuk menginstall semua dependency
3. Buat file .env.local di root folder, lalu isi variabel NEXT_PUBLIC_API_URL= https://food-rescue-be.vercel.app/api
4. Jalankan projek dengan npm run dev

Jika ada kendala saat instalasi atau menjalankan project, pastikan environment variable sudah benar dan backend sudah berjalan.

Semoga penjelasan singkat ini bisa membantu panitia dalam melakukan review kode frontend kami. Terima kasih!
