<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md" flat bordered>
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Sertifikasi" icon="extension" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg">

        <div class="row col-12 q-mt-md">
          <q-card class="my-card col" flat bordered>
              <q-card-section horizontal>
                <q-card-section class="col-12 q-pa-sm">
                  <q-table
                    :table-style="'counter-reset: cssRowCounter ' + ((pagination.page - 1) * pagination.rowsPerPage) + ';'"
                    title="Master Data Surat"
                    aria-label="Text"
                    class="text-h5"
                    :rows="rows"
                    flat
                    :columns="columns"
                    row-key="name"
                    :filter="filter"
                    :pagination="pagination"
                  >
                  <template v-slot:top>
                    <div class="col-md-4 col-lg-4 col-xs-12">
                      <div class="q-table__title">Master Data Sertifikasi</div>
                      <p class="text-caption">Data Sertifikasi</p>
                    </div>

                    <q-space />

                    <q-btn flat round color="primary" icon="search" @click="visibles = !visibles" size="md" class="q-mr-sm" />
                    <q-slide-transition>
                      <div v-show="visibles">
                        <q-input outlined debounce="300" placeholder="Placeholder" style="width:300px" color="primary" v-model="filter" dense />
                      </div>
                    </q-slide-transition>
                  </template>

                  <template v-slot:body="props">
                    <q-tr :props="props">
                     <q-td class="text-center"><span class="rowNumber"></span></q-td>
                      <q-td key="userName" :props="props">
                        {{ props.row.userName }}
                      </q-td>
                      <q-td key="Sertifikat" :props="props">
                        {{ props.row.Sertifikat }}
                      </q-td>
                      <q-td key="Nama" :props="props">
                        {{ props.row.Nama }}
                      </q-td>
                      <q-td key="Email" :props="props">
                        {{ props.row.Email }}
                      </q-td>
                      <q-td key="No_Handphone" :props="props">
                        {{ props.row.No_Handphone }}
                      </q-td>
                      <q-td key="No_NPWP" :props="props">
                        {{ props.row.No_NPWP }}
                      </q-td>
                      <q-td key="foto_produk" :props="props">
                        <q-item clickable v-ripple>
                          <q-item-section>
                            <q-avatar rounded size="100px">
                              <q-img :src="`${$imgUrl}/gambar-sertifikat/${props.row.foto_produk}`"/>
                            </q-avatar>
                          </q-item-section>
                        </q-item>
                      </q-td>
                      <q-td key="foto_ktp" :props="props">
                        <q-item clickable v-ripple>
                          <q-item-section>
                            <q-avatar rounded size="100px">
                              <q-img :src="`${$imgUrl}/gambar-sertifikat/${props.row.foto_ktp}`"/>
                            </q-avatar>
                          </q-item-section>
                        </q-item>
                      </q-td>
                      <q-td key="status" :props="props">
                        <div v-if="props.row.status == 'Dalam Proses'" class="text-orange">
                          {{ props.row.status }}
                        </div>
                        <div v-if="props.row.status == 'Diterima'" class="text-green">
                          {{ props.row.status }}
                        </div>
                        <div v-if="props.row.status == 'Ditolak'" class="text-red">
                          {{ props.row.status }}
                        </div>
                      </q-td>
                      <q-td key="tgl" :props="props">
                        {{ props.row.tgl }}
                      </q-td>
                      <q-td key="file" :props="props">
                        <div v-if="props.row.file.length == 0" class="text-red">
                          File Kosong
                        </div>
                        <div v-else>
                           <q-btn label="File" color="green" size="sm" class="q-ml-sm" no-caps outline @click="downloadPDF(props.row._id)"/>
                        </div>
                      </q-td>
                      <q-td key="aksi" :props="props">
                        <q-btn label="Aksi" color="green" size="sm" :to="{ name:'edit_sertifikasi', params:{ id: props.row._id } }"  class="q-ml-sm" no-caps />
                      </q-td>
                    </q-tr>
                  </template>

                </q-table>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
     
      </div>
    </div>
  </q-page>

</template>

<script>
import { ref } from 'vue'

export default {
  name: 'PageIndex',
  data () {
    return {
      file:null,
      nama: null,
      url:null,
      visibles: false,
      card: ref(false),
      pagination: {
        rowsPerPage: 10,
      },
      options: [],
      namaCustomer: [],
      fotoDiri: null,
      foto_produk: null,
      foto_ktp: null,
      visibles: false,
      filter: null,
      totalHutang: 0,
      totalLunas: 0,
      columns: [
          { name: 'no', label: 'No', field: 'no' },
          { name: 'userName', required: true, label: 'userName', align: 'left', field: 'userName', sortable: true },
          { name: 'Sertifikat', required: true, label: 'Sertifikat', align: 'left', field: 'Sertifikat', sortable: true },
          { name: 'Nama', required: true, label: 'Nama', align: 'left', field: 'Nama', sortable: true },
          { name: 'Email', required: true, label: 'Email', align: 'left', field: 'Email', sortable: true },
          { name: 'No_Handphone', required: true, label: 'No Handphone', align: 'left', field: 'No_Handphone', sortable: true },
          { name: 'No_NPWP', required: true, label: 'No_NPWP', align: 'left', field: 'No_NPWP', sortable: true },
          { name: 'foto_ktp', required: true, label: 'foto ktp', align: 'left', field: 'foto_ktp', sortable: true },
          { name: 'foto_produk', required: true, label: 'foto produk', align: 'left', field: 'foto_produk', sortable: true },
          { name: 'status', required: true, label: 'status', align: 'left', field: 'status', sortable: true },
          { name: 'tgl', required: true, label: 'Tanggal', align: 'left', field: 'tgl', sortable: true },
          { name: 'file', required: true, label: 'File Surat', align: 'left', field: 'file', sortable: true },
          { name: 'aksi', label: 'Aksi', field: 'aksi', align: 'center' }
      ],
      rows: [],
      detail: {
        visible: false,
        pelanggan: null,
        grandTotal: null,
        columns: [
          { name: 'no', label: 'No', field: 'no' },
          { name: 'userName', required: true, label: 'userName', align: 'left', field: 'userName', sortable: true },
          { name: 'Sertifikat', required: true, label: 'Sertifikat', align: 'left', field: 'Sertifikat', sortable: true },
          { name: 'Nama', required: true, label: 'Nama', align: 'left', field: 'Nama', sortable: true },
          { name: 'Email', required: true, label: 'Email', align: 'left', field: 'Email', sortable: true },
          { name: 'No_Handphone', required: true, label: 'No Handphone', align: 'left', field: 'No_Handphone', sortable: true },
          { name: 'No_NPWP', required: true, label: 'No_NPWP', align: 'left', field: 'No_NPWP', sortable: true },
          { name: 'foto_ktp', required: true, label: 'foto ktp', align: 'left', field: 'foto_ktp', sortable: true },
          { name: 'foto_produk', required: true, label: 'foto produk', align: 'left', field: 'foto_produk', sortable: true },
          { name: 'status', required: true, label: 'status', align: 'left', field: 'status', sortable: true },
          { name: 'tgl', required: true, label: 'Tanggal', align: 'left', field: 'tgl', sortable: true },
          { name: 'file', required: true, label: 'File Surat', align: 'left', field: 'file', sortable: true },
          { name: 'aksi', label: 'Aksi', field: 'aksi', align: 'center' }
        ],
        rows: []
      }
    }
  },
  created () {
    this.getCustomer()
  },
  methods: {
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
              console.log("INI FILE SETAN")
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
    getCustomer () {
      try {
        this.$api.get('sertifikasi/get-all')
          .then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              const data = res.data.data
              this.rows = data
              data.reverse()
              console.log(this.rows)
            }
          })
      } catch (e) {
        this.$showNotif('Terjadi kesalahan !', 'negative')
      }
    },
    tampil (id) {
      this.$refs.dialog.show(
        this.fotoDiri = id
      )
    },
    accept (id) {
      this.$q.dialog({
        title: 'Peringatan',
        message: 'Apakah Anda Setuju untuk menerima transaksi?',
        color: 'green',
        cancel: true,
        persistent: true
      }).onOk(() => {
        try {
          this.$api.put('/transaksi/updateWeb/' + id, {
           status: 'Selesai',
          }).then(res => {
            if (res.data.status !== true) {
              this.$q.notify({
                message: 'Status Gagal',
                color: 'red'
              })
            } else {
              this.$q.notify({
                message: 'Status Berhasil ',
                color: 'green'
              })
              this.getCustomer()
            }
          })
        } catch (e) {
          console.log(e)
          this.$showNotif('Terjadi kesalahan !', 'negative')
        }
      })
    },
    reject (id) {
      this.$q.dialog({
        title: 'Peringatan',
        message: 'Apakah Anda Setuju untuk menolak transaksi?',
        color: 'red',
        cancel: true,
        persistent: true
      }).onOk(() => {
        try {
          this.$api.put('/transaksi/updateWeb/' + id, {
           status: 'Ditolak',
          }).then(res => {
            if (res.data.status !== true) {
              this.$q.notify({
                message: 'Status Gagal',
                color: 'red'
              })
            } else {
              this.$q.notify({
                message: 'Status Berhasil ',
                color: 'green'
              })
              this.getCustomer()
            }
          })
        } catch (e) {
          console.log(e)
          this.$showNotif('Terjadi kesalahan !', 'negative')
        }
      })
    },
    showDetail (detailTransaksi) {
      // console.log(detailTransaksi)
      const newData = detailTransaksi.map(r => {
        return {
          barang: r.barang,
          subTotal: r.subtotal,
        }
      })
      this.detail.visible = true
      this.detail.rows = newData
      console.log(newData)
    }
  }
}
</script>

<style scoped>
.rowNumber::before {
  counter-increment: cssRowCounter;
  content: counter(cssRowCounter) ". ";
}
.my-card {
  width: 100%;
}
</style>
