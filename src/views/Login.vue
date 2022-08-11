<template>
  <v-row class="align-center justify-center" style="max-width: 700px">
    <v-col cols="12" sm="8" lg="8">
      <!-- Logo  -->
      <v-row>
        <v-col>
          <v-img
            :src="require('../assets/newtenberg.jpg')"
            contain
            height="250"
            transition="scale-transition"
          />
        </v-col>
      </v-row>
      <v-card elevation="2" :loading="loading">
        <v-row class="text-center caption pt-1">
          <v-col>
            Bienvenido/a a
            <span class="font-weight-bold">ALGUN SISTEMA</span> <br />
            Ingrese sus credenciales para continuar
          </v-col>
        </v-row>
        <v-card-text>
          <v-alert v-if="error" type="error" transition="fade">
            El usuario y/o la contraseña son incorrectos
          </v-alert>
          <!-- Fields -->
          <v-form ref="form" :model="form" :rules="rules" :disabled="loading">
            <v-text-field
              name="username"
              v-model="form.username"
              label="Usuario"
              required
              persistent-hint
              outlined
            />
            <v-text-field
              v-model="form.password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              @keyup.enter="onIngresar"
              @click:append="show = !show"
              label="Contraseña"
              required
              persistent-hint
              outlined
            />
            <v-btn
              color="primary"
              style="width: 100%"
              @click="onIngresar"
              :disabled="loading"
            >
              Ingresar
            </v-btn>
          </v-form>
        </v-card-text>
        <br />
      </v-card>
      <div class="caption text-center pt-2" v-show="footer">
        <span class="font-weight-regular">Tauguila Technologies</span> -
        Desarrollo integral de proyectos &copy; {{ new Date().getFullYear() }}
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { envDisplayFooter } from "@/core/utilities";
import { rulesLogin } from "@/rules";

export default {
  name: "Login",
  data: () => ({
    loading: false,
    error: false,
    form: {
      username: null,
      password: null
    },
    show: false,
    rules: rulesLogin,
    footer: envDisplayFooter() /**/,
  }),
  created() {},
  methods: {
    async onIngresar() {
      console.log("onIngresar()");

      if (this.$refs.form.validate()) {
        
        this.loading = true;
        try {
          console.log(this.form);
          const { username, password } = this.form;
          console.log(username);
          console.log(password);
          //debugger;
          // # Login
          const response = await this.$store.dispatch("login", {
            username,
            password,
          });

          // # Redirect to App
          this.$router.push({ name: "Home" });
        } catch (e) {
          console.log(e);
          this.error = true;
        } finally {
          this.loading = false;
        }
      }

      /*this.$refs.form.validate(async (valid) => {
        if (valid) {
          
        }
      });*/
    },
  },
};
</script>

<style>
</style>