<template>
  <v-alert @input="onClose" dismissible type="error">
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  name: "AppAlert",
  props: ["text"],
  methods: {
    onClose() {
      this.$emit("dismissed");
    },
  },
};
</script>