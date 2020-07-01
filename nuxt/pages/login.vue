<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">
            Welcome back!
          </h2>

          <div>
            <Notification v-if="error" :message="error" :variant="type" />
          </div>

          <form method="post" @submit.prevent="login">
            <div class="field">
              <label class="label">Email</label>

              <div class="control">
                <input v-model="email" type="email" class="input" name="email">
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>

              <div class="control">
                <input v-model="password" type="password" class="input" name="password">
              </div>
            </div>

            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">
                Log In
              </button>
            </div>
          </form>&nbsp;
          <div class="control">
            <button type="submit" class="button is-danger is-fullwidth" @click="google">
              Google
            </button>
          </div>

          <div class="has-text-centered" style="margin-top: 20px;">
            <p>
              Don't have an account?
              <nuxt-link to="/register">
                Register
              </nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Notification from '@/components/Notification'
export default {
  middleware: 'guest',
  components: {
    Notification
  },
  data () {
    return {
      email: '',
      password: '',
      error: '',
      type: ''
    }
  },
  methods: {
    async login () {
      this.error = ''
      this.type = ''
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        if (this.$auth.user.is_admin) {
          this.$router.push('/admin')
          console.log(this.$auth.user)
        } else {
          this.$router.push('/user')
        }
      } catch (e) {
        this.error = e.response.data.message
        this.type = 'is-danger'
      }
    },
    google () {
      window.location.href = `${process.env.apiURL}/auth/google`
    }
  }
}
</script>
