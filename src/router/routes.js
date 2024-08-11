/* eslint-disable */
const routes = [
  {
    path: "/dashboard",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "produk",
        component: () => import("pages/Produk.vue"),
      },
      {
        path: "",
        name: "kategori",
        component: () => import("pages/Kategori.vue"),
      },
      {
        path: "",
        name: "kategoriPelatihan",
        component: () => import("pages/PelatihanKategori.vue"),
      },
      {
        path: "",
        name: "user",
        component: () => import("pages/User.vue"),
      },
      {
        path: "",
        name: "pesanan",
        component: () => import("pages/Pesanan.vue"),
      },
      {
        path: "",
        name: "sertifikasi",
        component: () => import("pages/Sertifikasi.vue"),
      },
      {
        path: "",
        name: "add_produk",
        component: () => import("src/pages/product/form.vue"),
      },
      {
        path: "edit/:id",
        name: "edit_produk",
        component: () => import("src/pages/product/edit.vue"),
      },
      {
        path: "",
        name: "add_kategori",
        component: () => import("src/pages/kategori/form.vue"),
      },
      {
        path: "edit/:id",
        name: "edit_kategori",
        component: () => import("src/pages/kategori/edit.vue"),
      },
      {
        path: "",
        name: "add_kategoriKelas",
        component: () => import("src/pages/pelatihan_kategori/form.vue"),
      },
      {
        path: "edit_kategoriKelas/:id",
        name: "edit_kategoriKelas",
        component: () => import("src/pages/pelatihan_kategori/edit.vue"),
      },
      {
        path: "",
        name: "add_sertifikasi",
        component: () => import("src/pages/sertifikasi/form.vue"),
      },
      {
        path: "edit_sertifikasi/:id",
        name: "edit_sertifikasi",
        component: () => import("src/pages/sertifikasi/edit.vue"),
      },
      {
        path: "",
        name: "materi",
        component: () => import("src/pages/DetailPelatihan"),
      },
      {
        path: "",
        name: "add_materi",
        component: () => import("src/pages/detail_pelatihan/form.vue"),
      },
      {
        path: "edit_materi/:id",
        name: "edit_materi",
        component: () => import("src/pages/detail_pelatihan/edit.vue"),
      },
      {
        path: "",
        name: "tugas_pelatihan",
        component: () => import("src/pages/TugasPelatihan"),
      },
      {
        path: "",
        name: "jawaban_pelatihan",
        component: () => import("src/pages/JawabanPelatihan"),
      },
      {
        path: "edit_jawaban/:id",
        name: "edit_jawaban",
        component: () => import("src/pages/jawaban_pelatihan/edit.vue"),
      },
      {
        path: "",
        name: "add_tugas",
        component: () => import("src/pages/tugas_pelatihan/form.vue"),
      },
      {
        path: "edit_tugas/:id",
        name: "edit_tugas",
        component: () => import("src/pages/tugas_pelatihan/edit.vue"),
      },
    ],
  },
  {
    name: "LoginIn",
    path: "/",
    component: () => import("src/pages/access/Login.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
