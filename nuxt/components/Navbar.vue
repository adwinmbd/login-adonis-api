<template>
  <nav class="navbar is-light">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">
          Nuxt Auth
        </nuxt-link>

        <button class="button navbar-burger" @click="toggle">
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="navmenu" class="navbar-menu">
        <div class="navbar-end">
          <div v-if="$auth.loggedIn" class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">{{ $auth.loggedIn.username }}</a>
            <div class="navbar-dropdown">
              <div v-if="$auth.user.is_admin">
                <nuxt-link class="navbar-item" to="/admin">
                  Dashboard
                </nuxt-link>
              </div>
              <div v-else>
                <nuxt-link class="navbar-item" to="/user">
                  Home
                </nuxt-link>
              </div>
              <hr class="navbar-divider">
              <a class="navbar-item" @click="logout">Logout</a>
            </div>
          </div>
          <template v-else>
            <nuxt-link class="navbar-item" to="/register">
              Register
            </nuxt-link>
            <nuxt-link class="navbar-item" to="/login">
              Log In
            </nuxt-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  /*
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  */
  name: 'NavBar',
  methods: {
    async logout () {
      await this.$auth.logout()
    },
    toggle () {
      const nav = document.getElementById('navmenu')
      nav.classList.toggle('is-active')
    }
  }
}
</script>
