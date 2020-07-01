<template>
  <section>
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <div class="loader" />
          <p>Please wait while we're logging you in...</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
// import { mapGetters } from 'vuex'
export default {
  middleware: 'guest',
  /*
  asyncData ({ query }) {
    // console.log(query.token)
    loginUser(query.token)
  },
  */
  data () {
    return {
      token: this.$route.query.token ? this.$route.query.token : null
      // token: {}
    }
  },
  mounted () {
    this.loginUser(this.token)
    /* console.log(this.$route.fullPath)
    const urlParams = new URLSearchParams(this.$route.fullPath)
    const token = urlParams.get('access_token')
    console.log(token)
    /* console.log(this.$route.params)
    console.log('the token is : ' + this.token) */
    /* this.$auth.setToken('local', 'Bearer ' + token)
    this.$auth.setStrategy('local')
    this.$auth
      .fetchUser()
      .then(() => {
        console.log('we in fetch')
        console.log(this.$auth)
        return this.$router.push('/pawas')
      })
      .catch((e) => {
        this.$auth.logout()
        return this.$router.push('/')
        // return this.$router.push(`/auth/${this.$route.query.origin ? this.$route.query.origin : 'register'}?error=1`);
      }) */
  },
  methods: {
    async loginUser (tokan) {
      /* console.log(this.$route.fullPath)
      const urlParams = new URLSearchParams(this.$route.fullPath)
      const chip = urlParams.get('access_token')
      console.log(chip) */

      console.log(tokan)
      this.$auth.setToken('local', 'Bearer ' + tokan)
      this.$auth.setStrategy('local')

      try {
        // const data = await this.$auth.fetchUser()
        // console.log(data.response)
        await this.$auth.fetchUser()
        console.log(this.$auth)
        return this.$router.push('/user')
      } catch (e) {
        console.log(e)
        this.$auth.logout()
        return this.$router.push('/')
      }
    },
    getToken () {
      console.log(this.token)
    }
  }
  /*
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  */
  /*
  mounted ({ $auth }) {
    console.log($auth.user)
  },
  */
  /*
  methods: {
    logout () {
      this.$auth.logout()
      console.log('logout clicked.')
    }
  } */
}
</script>
<style scoped>
.loader {
  margin: 20px auto;
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top: 8px solid #3b5998;
  border-bottom: 8px solid #3b5998;
  width: 60px;
  height: 60px;
  -webkit-animation: spin 1.2s linear infinite;
  animation: spin 1.2s linear infinite;
}
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
