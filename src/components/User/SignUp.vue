<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-container>
              <v-form @submit.prevent="onSignup">
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
                    <v-text-field
                      v-model="confirmPassword"
                      :rules="[comparePasswords]"
                      id="confirmPassword"
                      label="Confirm Password"
                      name="confirmPassword"
                      required
                      type="password"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-btn type="submit">Sign up</v-btn>
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
      confirmPassword: "",
      password: "",
    };
  },
  computed: {
    comparePasswords() {
      return this.password === this.confirmPassword
        ? ""
        : "Passwords do not match!";
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    onSignup() {
      console.log(this.email, this.password, this.confirmPassword);
      this.$store.dispatch("signUserUp", {
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