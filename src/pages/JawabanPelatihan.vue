<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md" flat bordered>
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Data Jawaban Pelatihan" icon="person" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg">
        <div class="row col-12 q-mt-md">
          <q-card class="my-card col" flat bordered>
              <q-card-section horizontal>
                <q-card-section class="col-12 q-pa-sm">
                  <q-table
                    :table-style="'counter-reset: cssRowCounter ' + ((pagination.page - 1) * pagination.rowsPerPage) + ';'"
                    title="Master Data Jawaban Kelas"
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
                      <div class="q-table__title">Master Data Jawaban Pelatihan</div>
                      <p class="text-caption">Data Jawaban Pelatihan yang di lakukan di dalam sistem</p>
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
                    <q-td key="namaPelatihan" :props="props">
                      {{ props.row.namaPelatihan }}
                    </q-td>
                    <q-td key="jawabanUser" :props="props" class="horizontal-scroll" >
                      {{ props.row.jawabanUser }}
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
                    <q-td key="file" :props="props">
                      <div v-if="props.row.file == null" class="text-red">
                        File Kosong
                      </div>
                      <div v-else>
                          <q-btn label="File" color="green" size="sm" class="q-ml-sm" no-caps outline @click="downloadPDF(props.row._id)"/>
                      </div>
                    </q-td>
                      <q-btn label="Aksi" color="green" size="sm" :to="{ name:'edit_jawaban', params:{ id: props.row._id } }"  class="q-ml-sm" no-caps />
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
      card: ref(false),
      pagination: {
        rowsPerPage: 10,
      },
      options: [],
      namaCustomer: [],
      fotoDiri: null,
      visibles: false,
      filter: null,
      totalHutang: 0,
      totalLunas: 0,
      columns: [
          { name: 'no', label: 'No', field: 'no', align: 'center' },
          { name: 'userName', required: true, label: 'Nama User', align: 'left', field: 'userName', sortable: true },
          { name: 'namaPelatihan', required: true, label: 'Nama Pelatihan', align: 'left', field: 'namaPelatihan', sortable: true },
          { name: 'jawabanUser', required: true, label: 'Jawaban User', align: 'left', field: 'jawabanUser', sortable: true },
          { name: 'status', required: true, label: 'status', align: 'left', field: 'status', sortable: true },
          { name: 'file', required: true, label: 'file', align: 'left', field: 'file', sortable: true },
          { name: 'aksi', label: 'Actions', field: 'aksi', align: 'center' }
      ],
      rows: []
    }
  },
  created () {
    this.getCustomer()
  },
  methods: {
    downloadPDF(id) {
      try {
        this.$api.get('jawaban/getId/' + id)
          .then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              const data = res.data.data
              this.file = data.file
              this.url = "https://backendrumahbumn-production.up.railway.app/gambar-sertifikat/"+this.file
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
        this.$api.get('jawaban/get-all')
          .then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              // this.$showNotif(res.data.message, 'positive')
              const data = res.data.data
              this.rows = data
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
    delete (id) {
      this.$q.dialog({
        title: 'Peringatan',
        message: 'Apakah Anda Yakin ?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        try {
          this.$api.delete('/tugas/delete/' + id).then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              this.getCustomer()
              this.$showNotif(res.data.message, 'positive')
            }
          })
        } catch (e) {
          console.log(e)
          this.$showNotif('Terjadi kesalahan !', 'negative')
        }
      })
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
.horizontal-scroll input {
  white-space: nowrap;
  overflow-x: auto;
}
</style>
