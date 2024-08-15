<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Materi" icon="emoji_events" />
          <q-breadcrumbs-el v-if="this.editMode" label="Edit Materi" icon="edit" />
          <q-breadcrumbs-el v-else label="Tambah Materi" icon="add" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg q-gutter-md">

        <div class="row col fit">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col q-pa-lg">
                <div class="col">
                  <div class="col-2 q-table__title">{{this.title}} Data Detail Pelatihan Kelas</div>
                  <p class="text-caption">Form {{this.title}} data detail Pelatihan kelas.</p>
                </div>
                <q-form @submit="onSubmit" @reset="onReset">

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-select
                        filled
                        v-model="form.namaPelatihan"
                        label="Nama Pelatihan"
                        :options="LISTKATEGORI"
                        outlined
                        dense
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Pilih Nama Pelatihan']"
                      >
                      </q-select> 
                    </div>
                    
                    <div class="col">
                    <q-input
                        filled
                        v-model="form.judulMateri"
                        label="Judul Materi"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi Judul Materi']"
                      />
                    </div>
                  </div>

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.isiMateri"
                        label="Isi Materi"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi Isi Materi']"
                      />
                    </div>
                    
                    <div class="col">
                    <q-input
                        filled
                        v-model="form.linkYoutube"
                        label="Link Youtube"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi Link Youtube' ]"
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
      form: {
        namaPelatihan: null,
        judulMateri: null,
        isiMateri: null,
        linkYoutube: null,
      },
      LISTKATEGORI: [], // Define LISTKATEGORI as a reactive data property
      oldImg: null,
      options: {
        options_kategori: [],
        options_jenis: [],
      },
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 2
    }
  },
  created () {
    this.getData()
    if (this.editMode) {
      try {
        this.$api.get('materi/getId/' + this.$route.params.id)
          .then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              console.log(res.data)
              const data = res.data.data
              this.form.namaPelatihan = data.namaPelatihan
              this.form.judulMateri = data.judulMateri
              this.form.isiMateri = data.isiMateri
              this.form.linkYoutube = data.linkYoutube
            }
          })
      } catch (e) {
        console.log(e.message)
        this.$showNotif('Terjadi ke !', 'negative')
      }
    }
  },
  methods: {
    getData() {
      try {
        this.$api.get('/kategoriKelas/get-all')
          .then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              // this.$showNotif(res.data.message, 'positive')
              const list = res.data.data
            this.LISTKATEGORI = list.map(kategori => {
              console.log(kategori.namaPelatihan)
              return kategori.namaPelatihan
            })
            }
          })
      } catch (e) {
        this.$showNotif('Terjadi kesalahan !', 'negative')
      }
    
    },
    handleAnimation: function (anim) {
      this.anim = anim
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
          this.$api.put('materi/update/'+ this.$route.params.id, {
            namaPelatihan: this.form.namaPelatihan,
            judulMateri: this.form.judulMateri,
            isiMateri:  this.form.isiMateri,
            linkYoutube: this.form.linkYoutube,
          }).then(res => {
            if (res.data.status !== true) {
              // console.log(formData)
              this.$q.notify({
                message: 'Gagal Edit Data',
                color: 'red'
              })
            } else {
              this.$q.notify({
                message: 'Berhasil Edit Data',
                color: 'green'
              })
              this.$router.push({ name: 'materi' })
            }
          })
        } else {
          this.$api.post('materi/input', {
            namaPelatihan: this.form.namaPelatihan,
            judulMateri: this.form.judulMateri,
            isiMateri:  this.form.isiMateri,
            linkYoutube: this.form.linkYoutobe,
          }).then(res => {
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
              this.$router.push({ name: 'materi' })
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

</style>
