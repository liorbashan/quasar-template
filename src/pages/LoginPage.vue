<template>
  <q-page
    class="
      bg-primary
      window-height window-width
      row
      justify-center
      items-center
    "
  >
    <div class="column">
      <div class="row">
        <h5 class="text-h4 text-white q-my-md">Company & Co</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                outlined
                clearable
                v-model="email"
                type="email"
                label="email"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                outlined
                clearable
                v-model="password"
                type="password"
                label="password"
                ><template v-slot:prepend> <q-icon name="password" /> </template
              ></q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              unelevated
              color="accent"
              size="lg"
              class="full-width"
              label="Login"
            />
          </q-card-actions>
          <!-- <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">Not reigistered? Created an Account</p>
          </q-card-section> -->
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
const email = ref('');
const password = ref('');
const emailDomain = 'xxx.xxx';

const fullEmail = computed(() => `${email.value}@${emailDomain}`);
</script>

<style>
.q-card {
  width: 360px;
}
</style>
