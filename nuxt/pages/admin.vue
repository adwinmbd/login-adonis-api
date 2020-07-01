<template>
  <section class="section">
    <div class="container">
      <h2 class="title">
        Admin Home
      </h2>
      <div>
        <Notification v-if="message" :message="message" :variant="type" />
      </div>
      <div class="content">
        <p>
          <strong>Username:</strong>
          {{ $auth.user.username }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ $auth.user.email }}
        </p>
        <div class="control">
          <button type="button" class="button is-primary" @click="meseji">
            Secret
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import { mapGetters } from 'vuex'
import Notification from '@/components/Notification'
export default {
  middleware: 'auth-admin',
  components: {
    Notification
  },
  data () {
    return {
      message: '',
      type: ''
    }
  },
  methods: {
    async meseji () {
      this.message = ''
      this.type = ''
      try {
        const res = await this.$axios.get('admin/secret', {
          headers: { Authorization: `${this.$auth.getToken('local')}` }
        })
        this.message = res.data.message
        this.type = 'is-success'
      } catch (e) {
        console.log(e)
        // return { todos: [] };
      }
    }
  }
  /*
  computed: {
    ...mapGetters(['loggedInUser'])
  }
  */
}
</script>
