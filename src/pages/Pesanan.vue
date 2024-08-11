<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md" flat bordered>
        <q-breadcrumbs
          separator="---"
          class="text-blue-10"
          active-color="secondary"
        >
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Pesanan" icon="extension" />
          <q-breadcrumbs-el label="Data Pesanan" icon="person" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg">
        <div class="row col-12 q-mt-md">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col-12 q-pa-sm">
                <q-table
                  :table-style="
                    'counter-reset: cssRowCounter ' +
                    (pagination.page - 1) * pagination.rowsPerPage +
                    ';'
                  "
                  title="Master Data Customers"
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
                      <div class="q-table__title">Master Data Pesanan</div>
                      <p class="text-caption">
                        Data Pesanan yang di lakukan di dalam sistem
                      </p>
                    </div>

                    <q-space />

                    <q-btn
                      flat
                      round
                      color="primary"
                      icon="search"
                      @click="visibles = !visibles"
                      size="md"
                      class="q-mr-sm"
                    />
                    <q-slide-transition>
                      <div v-show="visibles">
                        <q-input
                          outlined
                          debounce="300"
                          placeholder="Placeholder"
                          style="width: 300px"
                          color="primary"
                          v-model="filter"
                          dense
                        />
                      </div>
                    </q-slide-transition>
                  </template>

                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td class="text-center"
                        ><span class="rowNumber"></span
                      ></q-td>
                      <q-td key="userName" :props="props">
                        {{ props.row.user.userName }}
                      </q-td>
                      <q-td key="date" :props="props">
                        {{ props.row.date }}
                      </q-td>
                      <q-td key="status" :props="props">
                        <q-select
                          v-model="props.row.status"
                          :options="statusOptions"
                          dense
                          outlined
                          @update:model-value="
                            updateStatus(props.row._id, props.row.status)
                          "
                        />
                      </q-td>
                      <q-td key="detail" :props="props">
                        <q-btn
                          @click="showDetail(props.row.detailTransaksi)"
                          outline
                          color="primary"
                          label="detail"
                          size="sm"
                          class="q-ml-sm"
                        />
                      </q-td>
                      <q-td key="grandTotal" :props="props">
                        {{ this.$formatPrice(props.row.grandTotal) }}
                      </q-td>
                      <q-td key="catatan" :props="props">
                        {{ props.row.catatan }}
                      </q-td>
                      <q-td key="bukti" :props="props">
                        <div v-if="props.row.bukti == null" style="color: grey">
                          Belum Upload Bukti Transaksi
                        </div>
                        <div v-if="props.row.bukti != null">
                          <q-item clickable v-ripple>
                            <q-item-section>
                              <q-avatar rounded size="100px">
                                <q-img
                                  :src="`${$imgUrl}/gambar-barang/${props.row.bukti}`"
                                  @click="tampil(props.row.bukti)"
                                />
                              </q-avatar>
                              <q-dialog ref="dialog">
                                <q-card class="my-card">
                                  <q-img
                                    :src="`${$imgUrl}/gambar-barang/${fotoDiri}`"
                                    style="width: 100%; height: 100%"
                                  />
                                </q-card>
                              </q-dialog>
                            </q-item-section>
                          </q-item>
                        </div>
                      </q-td>
                      <q-td key="alasan" :props="props">
                        <div v-if="props.row.alasan == null">
                          Tidak Ada Retur  
                        </div>
                        <div v-else>
                          {{ props.row.alasan }}
                        </div>                        
                      </q-td>
                      <q-td key="fotoretur" :props="props">
                        <div v-if="props.row.fotoretur == null" style="color: grey">
                          Belum Upload fotoretur Transaksi
                        </div>
                        <div v-if="props.row.fotoretur != null">
                          <q-item clickable v-ripple>
                            <q-item-section>
                              <q-avatar rounded size="100px">
                                <q-img
                                  :src="`${$imgUrl}/gambar-barang/${props.row.fotoretur}`"
                                  @click="tampil(props.row.fotoretur)"
                                />
                              </q-avatar>
                              <q-dialog ref="dialog">
                                <q-card class="my-card">
                                  <q-img
                                    :src="`${$imgUrl}/gambar-barang/${fotoDiri}`"
                                    style="width: 100%; height: 100%"
                                  />
                                </q-card>
                              </q-dialog>
                            </q-item-section>
                          </q-item>
                        </div>
                      </q-td>
                      <q-td key="aksi" :props="props">
                        <q-btn
                          round
                          outline
                          color="green"
                          size="sm"
                          icon="check"
                          @click="this.accept(props.row._id, props.row.status)"
                          class="q-ml-sm"
                          no-caps
                        />
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
        <q-dialog v-model="detail.visible">
          <q-card>
            <q-card-section>
              <div class="text-h6">#Data Pembelian</div>
            </q-card-section>

            <q-separator />

            <q-card-section style="max-height: 50vh" class="scroll">
              <q-table
                :rows="detail.rows"
                row-key="name"
                flat
                :columns="detail.columns"
                :hide-pagination="true"
              >
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td class="text-center"
                      ><span class="rowNumber"></span
                    ></q-td>
                    <q-td key="namaBarang" :props="props">
                      {{ props.row.barang.namaBarang }}
                    </q-td>
                    <q-td key="harga" :props="props">
                      {{ props.row.barang.harga }}
                    </q-td>
                    <q-td key="kategori" :props="props">
                      {{ props.row.barang.kategori }}
                    </q-td>
                    <q-td key="gambar" :props="props">
                      <q-item clickable v-ripple>
                        <q-item-section>
                          <q-avatar rounded size="100px">
                            <q-img
                              :src="`${$imgUrl}/gambar-barang/${props.row.barang.gambar}`"
                              @click="tampil(props.row.barang.gambar)"
                            />
                          </q-avatar>
                          <q-dialog ref="dialog">
                            <q-card class="my-card">
                              <q-img
                                :src="`${$imgUrl}/gambar-barang/${fotoDiri}`"
                                style="width: 100%; height: 100%"
                              />
                            </q-card>
                          </q-dialog>
                        </q-item-section>
                      </q-item>
                    </q-td>
                    <q-td key="subTotal" :props="props">
                      {{ props.row.subTotal }}
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn flat label="Ok" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  name: "PageIndex",
  data() {
    return {
      visibles: false,
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
        { name: "no", label: "No", field: "no" },
        {
          name: "userName",
          required: true,
          label: "Username",
          align: "left",
          field: "username",
          sortable: true,
        },
        {
          name: "date",
          required: true,
          label: "Tanggal Pesanan",
          align: "left",
          field: "date",
          sortable: true,
        },
        {
          name: "status",
          required: true,
          label: "Status Pesanan",
          align: "left",
          field: "status",
          sortable: true,
        },
        {
          name: "detail",
          required: true,
          label: "Detail Barang",
          align: "left",
          field: "detail",
          sortable: true,
        },
        {
          name: "grandTotal",
          required: true,
          label: "Total",
          align: "left",
          field: "grandTotal",
          sortable: true,
        },
        {
          name: "catatan",
          required: true,
          label: "Catatan",
          align: "left",
          field: "catatan",
          sortable: true,
        },
        {
          name: "bukti",
          required: true,
          label: "Bukti Transaksi",
          align: "left",
          field: "bukti",
          sortable: true,
        },
        {
          name: "alasan",
          required: true,
          label: "Alasan Retur",
          align: "left",
          field: "alasan",
          sortable: true,
        },
          {
          name: "fotoretur",
          required: true,
          label: "Foto Retur",
          align: "left",
          field: "fotoretur",
          sortable: true,
        },
        { name: "aksi", label: "Actions", field: "aksi", align: "center" },
      ],
      rows: [],
      detail: {
        visible: false,
        pelanggan: null,
        grandTotal: null,
        columns: [
          { name: "no", label: "No", field: "no" },
          {
            name: "namaBarang",
            required: true,
            label: "Nama Produk",
            align: "left",
            field: "namaBarang",
            sortable: true,
          },
          {
            name: "harga",
            required: true,
            label: "Harga",
            align: "left",
            field: "harga",
            sortable: true,
          },
          {
            name: "kategori",
            required: true,
            label: "Kategori",
            align: "left",
            field: "kategori",
            sortable: true,
          },
          {
            name: "gambar",
            required: true,
            label: "Gambar",
            align: "left",
            field: "gambar",
            sortable: true,
          },
          {
            name: "subTotal",
            required: true,
            label: "subTotal",
            align: "left",
            field: "subTotal",
            sortable: true,
          },
        ],
        rows: [],
      },
      statusOptions: [
        { label: "Selesai", value: "Selesai" },
        { label: "Diterima", value: "Diterima" },
        { label: "Ditolak", value: "Ditolak" },
        { label: "Dalam Proses", value: "Dalam Proses" },
        { label: "Retur", value: "Retur" },
      ],
    };
  },
  created() {
    this.getCustomer();
  },
  methods: {
    getCustomer() {
      try {
        this.$api.get("transaksi/get-all-transaksi").then((res) => {
          if (res.data.status !== true) {
            this.$showNotif(res.data.message, "negative");
          } else {
            // this.$showNotif(res.data.message, 'positive')
            const data = res.data.data;
            this.rows = data;
            console.log(this.rows);
            console.log(data[0]);
          }
        });
      } catch (e) {
        this.$showNotif("Terjadi kesalahan !", "negative");
      }
    },
    tampil(id) {
      this.$refs.dialog.show((this.fotoDiri = id));
    },
    accept(id, status) {
      this.$q
        .dialog({
          title: "Peringatan",
          message: "Apakah Anda yakin?",
          color: "green",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          try {
            this.$api
              .put("/transaksi/updateWeb/" + id, {
                status,
              })
              .then((res) => {
                console.log({ res });
                if (res.data.status !== true) {
                  this.$q.notify({
                    message: "Status Gagal",
                    color: "red",
                  });
                } else {
                  this.$q.notify({
                    message: "Status Berhasil",
                    color: "green",
                  });
                  this.getCustomer();
                }
              });
          } catch (e) {
            console.log(e);
            this.$showNotif("Terjadi kesalahan!", "negative");
          }
        });
    },
    reject(id) {
      this.$q
        .dialog({
          title: "Peringatan",
          message: "Apakah Anda Setuju untuk menolak transaksi?",
          color: "red",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          try {
            this.$api
              .put("/transaksi/updateWeb/" + id, {
                status: "Ditolak",
              })
              .then((res) => {
                if (res.data.status !== true) {
                  this.$q.notify({
                    message: "Status Gagal",
                    color: "red",
                  });
                } else {
                  this.$q.notify({
                    message: "Status Berhasil ",
                    color: "green",
                  });
                  this.getCustomer();
                }
              });
          } catch (e) {
            console.log(e);
            this.$showNotif("Terjadi kesalahan !", "negative");
          }
        });
    },
    showDetail(detailTransaksi) {
      // console.log(detailTransaksi)
      const newData = detailTransaksi.map((r) => {
        return {
          barang: r.barang,
          subTotal: r.subtotal,
        };
      });
      this.detail.visible = true;
      this.detail.rows = newData;
      console.log(newData);
    },
  },
};
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
