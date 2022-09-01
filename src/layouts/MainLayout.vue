<template>
  <q-layout view="hHh LpR fFf">
    <main-header />
    <q-page-container>
      <router-view />
    </q-page-container>
    <main-footer />
  </q-layout>
</template>

<script setup lang="ts">
import MainHeader from '../components/MainHeader.vue';
import MainFooter from '../components/MainFooter.vue';
</script>
