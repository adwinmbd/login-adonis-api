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
            <div class="field">
              <label class="label">Email</label>

              <div class="control">
                <input v-model="email" class="input" type="email" name="email" required>
              </div>
            </div>

            <div class="control">
              <button
                type="submit"
                class="button is-primary is-fullwidth is-capitalized"
              >
                Send password reset link
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
      email: '',
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
      try {
        const response = await this.$axios.post('/password/email', {
          email: this.email
        })
        const data = response.data

        if (data.status === 'error') {
          this.status = 'error'
          this.message = data.message
          this.type = 'is-danger'
          this.email = ''
        } else {
          this.status = 'success'
          this.message = data.message
          this.type = 'is-success'
          this.email = ''
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
