<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-primary">
        <q-btn flat @click="leftDrawerOpen = !leftDrawerOpen" round dense icon="menu" />
        <q-toolbar-title style="font-family:customfont" class="text-h5">RUMAH BUMN ({{ this.dataProfil.namaLengkap }})</q-toolbar-title>
          <q-btn-dropdown flat label="Administrator" icon="manage_accounts" left stretch>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Settings</div>
                <q-btn outline color="primary" label="Profile" clickable :to="{ name: 'profile' }" size="sm" icon="manage_accounts" left />
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <q-img src="~assets/bg-bumn.jpg"/>
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">{{ this.dataProfil.username }}</div>

                <q-btn
                  color="danger"
                  label="Logout"
                  flat
                  size="sm"
                  v-close-popup
                  @click="confirm = true"
                />

              </div>
            </div>

          </q-btn-dropdown>
        </q-toolbar>
    </q-header>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="sentiment_very_dissatisfied" text-color="primary" />
          <span class="q-ml-sm">Apakah anda yakin untuk keluar ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat @click="logout()" label="Logout" color="primary"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="300"
      >
        <q-scroll-area style="height: calc(100% - 1px); border-right: 1px solid #ddd">
          <div style="width: 100%;">
            <q-img src="~assets/bg-bumn.jpg"></q-img>
          </div>
          <q-list padding>
            <q-list class="rounded-borders">
            <q-item class="bg-blue text-white text-bold" style="text-align: center; margin-top: -10px; font-size: 20px;">E-Commerce</q-item>
            <q-item clickable :to="{ name: 'produk' }" v-ripple>
              <q-item-section avatar>
                <q-icon name="groups"  class="text-primary" />
              </q-item-section>

              <q-item-section  class="text-primary">
                Produk
              </q-item-section>
            </q-item>

            <q-item clickable :to="{ name: 'kategori' }" v-ripple>
              <q-item-section avatar>
                <q-icon name="category"  class="text-primary" />
              </q-item-section>

              <q-item-section  class="text-primary">
                Kategori Produk
              </q-item-section>
            </q-item>

            <q-item clickable :to="{ name: 'pesanan' }" v-ripple>
              <q-item-section avatar>
                <q-icon name="mail"  class="text-primary" />
              </q-item-section>

              <q-item-section  class="text-primary">
                Pesanan
              </q-item-section>
            </q-item>
            <q-item class="bg-blue text-white text-bold" style="text-align: center; margin-top: -10px; font-size: 20px;">Pelatihan</q-item>
            <q-item clickable :to="{ name: 'kategoriPelatihan' }" v-ripple>
              <q-item-section avatar>
                <q-icon name="library_books"  class="text-primary" />
              </q-item-section>

              <q-item-section  class="text-primary">
                Kategori Pelatihan
              </q-item-section>
            </q-item>
            <q-item clickable :to="{ name: 'materi' }" v-ripple>
              <q-item-section avatar>
                <q-icon name="book"  class="text-primary" />
              </q-item-section>

              <q-item-section  class="text-primary">
                Detail Pelatihan
              </q-item-section>
            </q-item>
            <q-item clickable :to="{ name: 'tugas_pelatihan' }" v-ripple>
              <q-item-section avatar>
                <q-icon name="task"  class="text-primary" />
              </q-item-section>

              <q-item-section  class="text-primary">
                Tugas Pelatihan
              </q-item-section>
            </q-item>
            <q-item clickable :to="{ name: 'jawaban_pelatihan' }" v-ripple>
              <q-item-section avatar>
                <q-icon name="task_alt"  class="text-primary" />
              </q-item-section>

              <q-item-section  class="text-primary">
                Jawaban Pelatihan
              </q-item-section>
            </q-item>
             <q-item class="bg-blue text-white text-bold" style="text-align: center; margin-top: -10px; font-size: 20px;">Sertifikasi</q-item>
            <q-item clickable :to="{ name: 'sertifikasi' }" v-ripple>
              <q-item-section avatar>
                <q-icon name="edit_note"  class="text-primary" />
              </q-item-section>

              <q-item-section  class="text-primary">
                Sertifikasi
              </q-item-section>
            </q-item>
            </q-list>
            <q-item clickable :to="{ name: 'user' }" v-ripple  class="text-primary">
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>

                <q-item-section>
                  User
                </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="statics/img/bg2.jpg" style="height: 150px;">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="statics/img/gapari.png">
            </q-avatar>
            <div claSs="text-weight-bold">{{ this.dataProfil.name }}</div>
            <div>{{ this.dataProfil.username }}</div>
          </div>
        </q-img>
      </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
/* eslint-disable */
import { LocalStorage } from 'quasar'
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      confirm: false,
      dataProfil: LocalStorage.getItem('user')
    }
  },
  methods: {
    logout () {
      LocalStorage.remove('user', { path: '/login' })
      this.$router.push({ name: 'LoginIn' })
    }
  }
}
</script>