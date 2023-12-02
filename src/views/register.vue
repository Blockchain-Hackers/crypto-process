<template>
  <div>
    <div class="tw-relative tw-min-h-[100dvh]">
      <div
        class="tw-grid tw-items-start md:tw-grid-cols-2 tw-gap-14 sm:tw-gap-4
        tw-max-w-7xl tw-mx-auto lg:tw-absolute tw-inset-0 tw-p-6 sm:tw-p-10 tw-z-10">
        <div class="">
          <h1 class="tw-text-5xl sm:tw-text-6xl tw-font-bold">
            <span class="tw-relative tw-z-10">Join us in automating your work using</span>
            <span
              class="before:tw-block before:tw-absolute before:-tw-inset-1 before:-tw-skew-y-3
              before:tw-bg-white tw-border-2 tw-border-black tw-relative tw-inline-block">
              <span class="tw-relative tw-text-primary">Crypto Process.</span>
            </span>
          </h1>
        </div>        

        <div class="tw-bg-white sm:tw-p-6 sm:tw-border">
          <div>
            <h2 class="tw-text-3xl tw-font-bold">Create an account</h2>
            <form @submit.prevent="handleRegister" class="tw-mt-4 tw-text-xl">
              <label class="tw-relative tw-block">
                <span class="tw-absolute tw-text-base tw-pl-3 tw-pt-1">Enter your email</span>
                <input
                  v-model="form.email"
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  :required="true"
                  class="tw-w-full tw-bg-gray-100 tw-p-3 tw-pt-7 tw-rounded-md tw-outline-black">
              </label>

              <div class="tw-mt-4 tw-flex tw-gap-4">
                <label class="tw-relative tw-w-full">
                  <span class="tw-absolute tw-text-base tw-pl-3 tw-pt-1">Enter firstname</span>
                  <input
                    v-model="form.firstname"
                    type="text"
                    name="firstname"
                    placeholder="Arya"
                    :required="true"
                    class="tw-w-full tw-bg-gray-100 tw-p-3 tw-pt-7 tw-rounded-md tw-outline-black">
                </label>
                <label class="tw-relative tw-w-full">
                  <span class="tw-absolute tw-text-base tw-pl-3 tw-pt-1">Enter lastname</span>
                  <input
                    v-model="form.lastname"
                    type="text"
                    name="lastname"
                    placeholder="Stark"
                    :required="true"
                    class="tw-w-full tw-bg-gray-100 tw-p-3 tw-pt-7 tw-rounded-md tw-outline-black">
                </label>
              </div>

              <label class="tw-relative tw-mt-4 tw-flex tw-items-center">
                <span class="tw-absolute tw-top-0 tw-text-base tw-pl-3 tw-pt-1">Create password</span>
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="******"
                  :required="true"
                  class="tw-w-full tw-bg-gray-100 tw-p-3 tw-pt-7 tw-rounded-md tw-outline-black">
                  <v-icon
                    @click="()=>showPassword=!showPassword"
                    :class="[showPassword ? '!tw-text-black' : '!tw-text-gray-300']"
                    class="!tw-absolute !tw-right-0 !tw-mx-3 tw-bg-gray-100 !tw-rounded-2xl">
                    {{ showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline' }}
                  </v-icon>
              </label>

              <button
                class="tw-w-full tw-bg-primary tw-text-white tw-py-4 tw-mt-10
                tw-rounded-md tw-font-medium hover:tw-ring-4 tw-ring-primary/30
                transition-all tw-duration-300"
                :disabled="registering">
                <template v-if="!registering">
                  Join us
                </template>
                <v-progress-circular
                  v-else
                  indeterminate
                  color="white"
                  size="20" width="2">
                </v-progress-circular>
              </button>
              <p class="tw-mt-2 tw-text-sm">
                Already own an account? <router-link to="/login" class="tw-text-primary tw-font-bold">Login</router-link>
              </p>
            </form>
          </div>
        </div>

      </div>
    </div>

    <v-snackbar
      v-model="snackbar.show">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// useHead({
//   title: 'Process - Login',
// })

const form = ref({
  email: '',
  password: '',
  firstname: '',
  lastname: '',
})
const showPassword = ref(false)

const snackbar = ref({
  show: false,
  text: ''
})

const router = useRouter()
const registering = ref(false)
const handleRegister = () => {
  registering.value = true

  setTimeout(() => {
    registering.value = false
    router.push('/dashboard')
  }, 2000)
}
</script>