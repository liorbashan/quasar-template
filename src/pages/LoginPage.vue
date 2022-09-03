<template>
  <q-page class="bg-primary window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h4 text-white q-my-md">AdTech Configuration Manager</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input outlined v-model="email" type="email" label="email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input outlined v-model="password" type="password" label="password"
                ><template v-slot:prepend> <q-icon name="password" /> </template
              ></q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="accent" size="lg" class="full-width" label="Login" @click="doLogin()" />
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
import { useQuasar } from 'quasar';
import { useUserStore } from '../stores/user/user';
import { LoginData } from '../types/login-response.type';
import { login } from '../services/login-service';
import jwtDecode from 'jwt-decode';
import { IJwtPayload } from '../types/cm-jwt.interface';
import { useRouter } from 'vue-router';
import { IUser } from '../stores/user/user.interface';

const $q = useQuasar();
const storeUser = useUserStore();
const $router = useRouter();

const email = ref('');
const password = ref('');
const emailDomain = '888holdings.com';
const fullEmail = computed(() => `${email.value}@${emailDomain}`);

const authenticate = async (username, password): Promise<LoginData> => {
  const loginData: LoginData = await login(username, password).catch((err: Error) => {
    throw err;
  });
  return loginData;
};

const doLogin = async (): Promise<void> => {
  $q.loading.show();
  const loginData: LoginData | void = await authenticate(fullEmail.value, password.value).catch((err: Error) => {
    $q.loading.hide();
    $q.notify({
      type: 'negative',
      message: err.message,
      position: 'top',
    });
    throw err;
  });
  $q.loading.hide();
  if (loginData.access_token != null) {
    const userToken = loginData.access_token;
    localStorage.setItem('cm-token', userToken);
    const decoded: IJwtPayload = jwtDecode(userToken);
    const user:IUser = {
      email:decoded.email,
      name:decoded.name,
      roles:decoded.groups
    }
    storeUser.setUser(user);
    $q.notify({
      type: 'info',
      message: `<span>Wellcome back <em><strong >${decoded.name}</strong></em></span>`,
      position: 'top',
      html: true,
    });
    await $router.push('/');
  } else {
    $q.notify({
      type: 'negative',
      message: 'Login Failed.',
      position: 'top',
    });
  }
};
</script>

<style>
.q-card {
  width: 100%;
}
</style>
