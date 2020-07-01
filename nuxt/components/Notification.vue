<template>
  <!--
  <div class="notification is-danger">
    {{ message }}
  </div>
  -->
  <b-notification :type="variant" aria-close-label="Close notification">
    {{ message }}
    <b>&rArr;</b>
  </b-notification>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    message: { type: String, default: '' },
    variant: { type: String, default: '' }
  }
}
</script>
