<template>
  <section class="section">
    <div class="container">
      <h2 class="title">
        User Home
      </h2>

      <div class="content">
        <p>
          <strong>Username:</strong>
          {{ $auth.user.username }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ $auth.user.email }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  middleware: 'auth-user'
  /*
  computed: {
    ...mapGetters(['loggedInUser'])
  }
  */
}
</script>
