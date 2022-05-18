<template>
  <v-container>
    <v-row>
      <v-col>
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
                    <v-btn type="submit">Log In</v-btn>
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
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
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