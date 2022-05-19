<template>
  <v-container>
    <v-row v-if="error">
      <v-col class="col-sm-6 offset-sm-3">
        <app-alert @dismissed="onDismissed" :text="error.message" />
      </v-col>
    </v-row>

    <v-row>
      <v-col class="col-sm-6 offset-sm-3">
        <v-card>
          <v-card-text>
            <v-container>
              <v-form @submit.prevent="onLogIn">
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="email"
                      id="email"
                      label="Email"
                      name="email"
                      required
                      type="email"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="password"
                      id="password"
                      label="Password"
                      name="password"
                      required
                      type="password"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-btn :disabled="loading" :loading="loading" type="submit">
                      Log In
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    onDismissed() {
      console.log("dismiss");
      this.$store.dispatch("clearError");
    },
    onLogIn() {
      this.$store.dispatch("logUserIn", {
        email: this.email,
        password: this.password,
      });
    },
  },
  watch: {
    user(value) {
      if (value) this.$router.push("/");
    },
  },
};
</script>