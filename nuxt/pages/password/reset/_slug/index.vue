<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">
            Reset Password
          </h2>
          <div>
            <Notification v-if="status" :message="message" :variant="type" />
          </div>
          <!--
            class="input {{ hasErrorFor('email') ? 'is-danger' : '' }}"
            {{ elIf('<span class="help is-danger">$self</span>',
              getErrorFor('email'), hasErrorFor('email')) }}
          -->
          <form method="post" @submit.prevent="reset">
            <input type="hidden" name="token" value>
            <div class="field">
              <label class="label">New Password</label>

              <div class="control">
                <input v-model="password" class="input" type="password" name="password" required>
              </div>
            </div>

            <div class="field">
              <label class="label">Confirm Password</label>

              <div class="control">
                <input
                  v-model="password_confirmation"
                  class="input"
                  type="password"
                  name="password_confirmation"
                  required
                >
              </div>
            </div>

            <div class="control">
              <button
                type="submit"
                class="button is-primary is-fullwidth is-capitalized"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped></style>
<script>
import Notification from '@/components/Notification'
export default {
  middleware: 'guest',
  components: {
    Notification
  },
  data () {
    return {
      password_confirmation: '',
      password: '',
      message: '',
      status: '',
      type: ''
    }
  },
  methods: {
    async reset () {
      this.status = ''
      this.message = ''
      this.type = ''
      let url = ''
      let chip = ''
      try {
        url = window.location.href
        chip = url.split('/').pop()
        console.log(chip)

        const response = await this.$axios.put('/password/reset', {
          password: this.password,
          password_confirmation: this.password_confirmation,
          token: chip
        })
        console.log(response)
        const data = response.data

        if (data.status === 'error') {
          console.log(data.message)
          this.status = 'error'
          this.message = data.message
          this.type = 'is-danger'
          this.password = ''
          this.password_confirmation = ''
        } else {
          console.log(data.message)
          this.status = 'success'
          this.message = data.message
          this.type = 'is-success'
          this.password = ''
          this.password_confirmation = ''
        }
      } catch (e) {
        this.status = 'error'
        this.message = e.response.data.message
        this.type = 'is-danger'
      }
    }
  }
}
</script>
