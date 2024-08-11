<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Serifikasi" icon="emoji_events" />
          <q-breadcrumbs-el v-if="this.editMode" label="Edit Serifikasi" icon="edit" />
          <q-breadcrumbs-el v-else label="Tambah Pembangunan" icon="add" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg q-gutter-md">

        <div class="row col fit">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col q-pa-lg">
                <div class="col">
                  <div class="col-2 q-table__title">{{this.title}} Data Sertifikasi</div>
                  <p class="text-caption">Form {{this.title}} data Sertifikasi</p>
                </div>
                <q-form @submit="onSubmit" @reset="onReset">

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        readonly
                        filled
                        v-model="form.userName"
                        label="userName"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data userName']"
                      />
                    </div>
                    
                    <div class="col">
                      <q-input
                      readonly
                        filled
                        v-model="form.Sertifikat"
                        label="Sertifikat"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi Sertifikat']"
                      />
                    </div>
                  </div>

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                      readonly
                        filled
                        v-model="form.Nama"
                        label="Nama"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data Nama']"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        readonly
                        filled
                        v-model="form.Email"
                        label="Email"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data Email']"
                      />
                    </div>
                  </div>

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        readonly
                        filled
                        v-model="form.No_Handphone"
                        label="No_Handphone"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data No_Handphone']"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        readonly
                        filled
                        v-model="form.No_NPWP"
                        label="No_NPWP"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data No_NPWP']"
                      />
                    </div>
                  </div>
                  <div class="row q-mb-xl">
                    <div class="col">
                      Foto KTP
                      <div class="image-container" style="width: 50%; height: 100%">
                        <q-img :src="`${$imgUrl}/gambar-sertifikat/${this.image}`" class="responsive-image"/>
                      </div>
                    </div>
                    <div class="col">
                      Foto Produk
                    <div class="image-container" style="width: 50%; height: 100%">
                      <q-img :src="`${$imgUrl}/gambar-sertifikat/${this.image2}`" class="responsive-image"/>
                      </div>
                    </div>
                  </div>

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        readonly
                        filled
                        v-model="form.tgl"
                        label="Tanggal"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data tgl']"
                      />
                    </div>
                  </div>

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-file filled bottom-slots dense v-model="file" label="File Surat" >
                        <template v-slot:before>
                          <q-icon name="description" />
                        </template>
                      </q-file>
                    </div>
                  </div>

                  <div class="row q-gutter-sm" >
                    <div class="col">
                      <q-select
                        :options="opsi"
                        filled
                        v-model="form.status"
                        label="Status"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Status Tidak Boleh Kosong']"
                      />
                    </div>
                  </div>

                  <div class="q-mt-md">
                    <q-btn label="Submit" outline type="submit" color="green" style="width:150px" />
                    <q-btn label="Cancel" v-if="this.editMode" type="reset" color="red" outline class="q-ml-sm" style="width:150px" />
                    <q-btn label="Reset" v-else type="reset" color="red" outline class="q-ml-sm" style="width:150px" />
                  </div>
                </q-form>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script>
import Lottie from 'components/lottie'
import * as animationData from 'assets/add_product.json'


let listKategori = []
let listJenis = []

export default {
  name: 'PageIndex',
  components: {
    lottie: Lottie
  },
  props: {
    editMode: Boolean,
    title: String
  },
  data () {
    return {
      address: '',
      opsi: [
        "Dalam Proses",
        "Ditolak",
        "Diterima"
      ],
      map: null,
      file: null,
      image: null,
      form: {
       userName: null,
       Sertifikat: null,
       Nama: null,
       Email: null,
       No_Handphone: null,
       No_NPWP: null,
       foto_ktp: null,
       foto_produk: null,
       status: null,
       tgl: null,
       file: null,
      },
      oldImg: null,
      options: {
        options_kategori: [],
        options_status: [
          "On Going",
          "Selesai",
          "Pengajuan"
        ],
        options_jenis: []
      },
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 2
    }
  },
  created () {
    console.log("APA INI")
    if (this.editMode) {
      try {
        this.$api.get('sertifikasi/get-id/' + this.$route.params.id)
          .then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              
              console.log(res.data)
              const data = res.data.data
              this.form.userName = data.userName ,
              this.form.Sertifikat = data.Sertifikat ,
              this.form.Nama = data.Nama ,
              this.form.Email = data.Email ,
              this.form.No_Handphone = data.No_Handphone ,
              this.form.No_NPWP = data.No_NPWP ,
              this.form.foto_ktp = data.foto_ktp ,
              this.form.foto_produk = data.foto_produk ,
              this.form.status = data.status,
              this.form.tgl = data.tgl ,
              this.file = data.file,
              this.image = data.foto_ktp,
              this.image2 = data.foto_produk,
              console.log(this.form.foto_ktp)
            }
          })
      } catch (e) {
        console.log(e.message)
        this.$showNotif('Terjadi ke !', 'negative')
      }
    }
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim
    },
    downloadPDF(id) {
      try {
        this.$api.get('sertifikasi/get-id/' + id)
          .then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              const data = res.data.data
              this.file = data.file
              this.url = "http://localhost:4000/gambar-sertifikat/"+this.file
              console.log(this.url)
              const fileName = 'your-pdf-file.pdf';
              this.downloadFile(this.url, data.jenis_surat);
            }
          })
      } catch (e) {
        console.log(e.message)
        this.$showNotif('Terjadi ke !', 'negative')
      }
    },
    downloadFile(url, fileName) {
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    stop: function () {
      this.anim.stop()
    },
    play: function () {
      this.anim.play()
    },
    pause: function () {
      this.anim.pause()
    },
    onSpeedChange: function () {
      this.anim.setSpeed(this.animationSpeed)
    },
    getKategori () {
      this.$api.get('type/gettype/Kategori')
        .then(res => {
          const list = res.data.result
          listKategori = list.map(kategori => {
            return kategori.name
          })
        })
    },
    filterKategori (val, update) {
      if (val === '') {
        update(() => {
          this.options.options_kategori = listKategori
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.options.options_kategori = listKategori.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    getJenis () {
      this.$api.get('type/gettype/Jenis')
        .then(res => {
          const list = res.data.result
          listJenis = list.map(jenis => {
            return jenis.name
          })
        })
    },
    filterJenis (val, update) {
      if (val === '') {
        update(() => {
          this.options.options_jenis = listJenis
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.options.options_jenis = listJenis.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    
    
    onSubmit () {
      try {
        if (this.editMode) {
          const formData = new FormData()
          formData.append('file', this.file)
          formData.append('data', JSON.stringify({
              userName : this.form.userName ,
              Sertifikat : this.form.Sertifikat ,
              Nama : this.form.Nama ,
              Email : this.form.Email ,
              No_Handphone : this.form.No_Handphone ,
              No_NPWP : this.form.No_NPWP ,
              foto_ktp : this.image ,
              foto_produk : this.image2 ,
              status : this.form.status,
              tgl : this.form.tgl ,
              file : this.file,
          }))
          this.$api.put('sertifikasi/update/'+ this.$route.params.id, formData).then(res => {
            if (res.data.status !== true) {
              this.$q.notify({
                message: 'Data Tidak Boleh kosong',
                color: 'red'
              })
            } else {
              this.$q.notify({
                message: 'Berhasil Edit Data',
                color: 'green'
              })
              this.$router.push({ name: 'sertifikasi' })
            }
          })
        } else {
         const formData = new FormData()
         formData.append('gambar', this.form.image)
          formData.append('data', JSON.stringify({
            namaPembangunan: this.form.namaPembangunan,
            luas: this.form.luas,
            alamat: this.address,
            deskripsi: this.form.deskripsi,
            status: this.form.status_pengajuan,
          }))
          this.$api.post('pembangunan/input', formData).then(res => {
            console.log(res);
            if (res.data.status !== true) {
              this.$q.notify({
                message: 'Gagal Kirim Data',
                color: 'red'
              })
            } else {
              this.$q.notify({
                message: 'Berhasil Tambah Data',
                color: 'green'
              })
              this.$router.push({ name: 'pengaduan' })
            }
          })
        }
      } catch (e) {
        console.error(e)
        this.$showNotif('Terjadi kesalahan !', 'negative')
      }
    },
    onReset () {
      if (this.editMode) {
        this.$router.go(-1)
      } else {
        this.form.id_product = null
        this.form.name_produk = null
        this.form.kategori_product = null
        this.form.jenis_product = null
        this.form.hpp_product = null
        this.form.hargajual = null
        this.form.stok_produk = null
        this.form.keterangan = null
        this.form.image = null
      }
    }
  }
}
</script>

<style scoped>
.image-container {
  width: 100%;
  height: 400px; /* Atur tinggi sesuai kebutuhan Anda */
  position: relative;
}
.responsive-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Atur agar gambar menutupi seluruh kontainer */
}
</style>
