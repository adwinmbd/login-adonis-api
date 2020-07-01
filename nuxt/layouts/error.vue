<template>
  <Layout>
    <section class>
      <p class="code">
        {{ error.statusCode }}
      </p>
      <p
        v-if="error.statusCode === 404"
        class="message"
        style="padding: 0.6rem;"
      >
        &nbsp;Page Not Found
      </p>
      <p v-else class="message" style="padding: 0.6rem;">
        &nbsp;An error occured
      </p>
    </section>
  </Layout>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: row;
  height: 75vh;
  align-items: center;
  justify-content: center;
}
.code {
  border-right: 0.1rem solid;
  font-size: 1.7rem;
  padding: 0 1rem 0 1rem;
  text-align: center;
}
.message {
  font-size: 1.1rem;
  text-align: center;
}
</style>
<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
