<template>
  <div class="admin-auth-page">
    <section class="flex container p-4 mx-auto">
      <form @submit.prevent="onSubmit">
        <AppControlInput v-model="email" type="email"
          >E-Mail Address</AppControlInput
        >
        <AppControlInput v-model="password" type="password"
          >Password</AppControlInput
        >
        <AppButton type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</AppButton>
        <AppButton
          @click="isLogin = !isLogin"
          type="button"
          btn-style="inverted"
          style="margin-left: 10px"
          >Switch to {{ isLogin ? 'Signup' : 'Login' }}</AppButton
        >
      </form>
    </section>
  </div>
</template>

<script>
import AppControlInput from '~/components/UI/AppControlInput'
import AppButton from '~/components/UI/AppButton'

export default {
  layout: 'admin',
  components: {
    AppControlInput,
    AppButton
  },
  data() {
    return {
      isLogin: true,
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch('authenticateUser', {
          isLogin: this.isLogin,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push('/admin')
        })
    }
  }
}
</script>

<style scoped>
.admin-auth-page {
  padding: 20px;
}

.auth-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 2px #ccc;
  width: 300px;
  margin: auto;
  padding: 10px;
  box-sizing: border-box;
}
</style>
