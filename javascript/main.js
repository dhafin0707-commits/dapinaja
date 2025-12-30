// ================= MASTER DATA =================
const masterBuku = [
  {
    id: 1,
    judul: "Bandung After Rain",
    harga: "Rp.300.000",
    stok: 1,
    gambar: "image/images/book1.jpeg",
    deskripsi:
      "Novel ini menggambarkan perasaan manusia yang rumit melalui sebuah pertemuan sederhana di kota Bandung. Dengan suasana hujan yang tenang dan melankolis, cerita menyoroti kenangan masa lalu, kesedihan yang belum usai, serta harapan akan awal baru dalam kehidupan.",
  },
  {
    id: 2,
    judul: "Dilan 1990",
    harga: "Rp.270.000",
    stok: 3,
    gambar: "image/images/book9.jpeg",
    deskripsi:
      "Novel ini menceritakan kisah cinta remaja antara Dilan dan Milea yang berlatar Bandung pada tahun 1990. Cerita disampaikan dengan sudut pandang Milea, menampilkan perjalanan hubungan yang penuh keunikan, perhatian sederhana, dan dinamika emosional khas masa remaja.",
  },
  {
    id: 3,
    judul: "Laut Bercerita",
    harga: "Rp.170.000",
    stok: 0,
    gambar: "image/images/book3.jpeg",
    deskripsi:
      "Novel ini mengangkat kisah perjuangan para aktivis mahasiswa pada masa Orde Baru. Cerita berfokus pada Laut dan teman-temannya yang mengalami penindasan negara, menggambarkan keberanian, persahabatan, kehilangan, serta penderitaan keluarga korban penghilangan paksa.",
  },
  {
    id: 4,
    judul: "Milea: Suara Dari Dilan",
    harga: "Rp.450.000",
    stok: 2,
    gambar: "image/images/book8.jpeg",
    deskripsi:
      "Buku ini merupakan lanjutan dari kisah Dilan dan Milea yang diceritakan dari sudut pandang Dilan. Novel ini memperlihatkan hubungan mereka secara lebih mendalam, termasuk konflik, perpisahan, dan perasaan yang tersisa meskipun hubungan tersebut telah berakhir.",
  },
  {
    id: 5,
    judul: "Ancika",
    harga: "Rp.220.000",
    stok: 4,
    gambar: "image/images/book7.jpeg",
    deskripsi:
      "Novel ini menceritakan fase kehidupan Dilan yang lebih dewasa dan hubungannya dengan Ancika. Cerita berfokus pada proses pendewasaan tokoh, perubahan cara memandang cinta, serta bagaimana masa lalu tetap memberi pengaruh dalam hubungan yang baru.",
  },
  {
    id: 6,
    judul: "Seporsi Mie Ayam Sebelum Besok MTK",
    harga: "Rp.110.000",
    stok: 6,
    gambar: "image/images/book6.jpeg",
    deskripsi:
      "Novel ini menggambarkan kehidupan remaja dengan permasalahan sederhana namun bermakna, seperti persahabatan, cinta pertama, dan tekanan akademik. Cerita disajikan dengan nuansa hangat dan realistis, menampilkan keseharian pelajar yang dekat dengan pengalaman pembaca.",
  },
];

// ================= ISI STOK KE CARD =================
document.querySelectorAll(".card").forEach((card) => {
  const id = card.getAttribute("data-id");
  const buku = masterBuku.find((b) => b.id == id);
  const bestSellerIds = [1, 2, 4];

  if (!buku) return;

  // stok teks
  card.querySelector(".stokJumlah").innerText =
    buku.stok > 0 ? buku.stok : "Habis";

  // badge stok
  const badge = card.querySelector(".badge-stok");

  if (buku.stok > 0) {
    badge.innerText = "Ready";
    badge.classList.add("stok-ada");
  } else {
    badge.innerText = "Habis";
    badge.classList.add("stok-habis");
    card.querySelector(".btnDetail").classList.add("disabled");
  }

  // ⭐ BEST SELLER
  if (bestSellerIds.includes(buku.id)) {
    card.querySelector(".badge-best").style.display = "block";
  }

  if (buku.stok > 0 && buku.stok <= 2) {
    card.querySelector(".badge-limited").style.display = "block";
  }
  if (buku.stok > 0 && buku.stok <= 3) {
    card.querySelector(".badge-limited").style.display = "block";
  }
});

// ================= EVENT DETAIL =================
document.querySelectorAll(".btnDetail").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".card");
    const id = card.getAttribute("data-id");
    const buku = masterBuku.find((b) => b.id == id);

    document.querySelector(".btnModal").click();
    document.querySelector(".modalTitle").innerText = buku.judul;
    document.querySelector(
      ".modalImage"
    ).innerHTML = `<img src="${buku.gambar}" class="img-modal">`;
    document.querySelector(".modalDeskripsi").innerText = buku.deskripsi;
    document.querySelector(".modalHarga").innerText = buku.harga;
    document.querySelector(".modalStok").innerText = "Stok: " + buku.stok;

    const btnBeli = document.querySelector(".btnBeli");

    if (buku.stok <= 0) {
      btnBeli.classList.add("disabled");
      btnBeli.innerText = "Stok Habis";
      btnBeli.removeAttribute("href");
      return;
    }

    const nohp = "628979146099";
    const pesan = `Halo Admin 👋

Saya mau beli buku berikut:
📘 ${buku.judul}
💰 ${buku.harga}
📦 Stok: ${buku.stok}`;

    btnBeli.classList.remove("disabled");
    btnBeli.innerText = "Beli Produk Ini";
    btnBeli.href =
      "https://wa.me/" + nohp + "?text=" + encodeURIComponent(pesan);
  });
});

// ================= WELCOME SCREEN =================
function masukProduk() {
  document.getElementById("welcomeScreen").style.display = "none";
}

function tutupWeb() {
  window.close();
}
const listBuku = document.getElementById("listBuku");
const cards = Array.from(listBuku.children);

// sort: best seller
cards.sort((a, b) => {
  const stokA = masterBuku.find(
    (x) => x.id == a.querySelector(".card").dataset.id
  ).stok;

  const stokB = masterBuku.find(
    (x) => x.id == b.querySelector(".card").dataset.id
  ).stok;

  return stokB - stokA;
});

// render ulang
cards.forEach((card) => listBuku.appendChild(card));
