<template>
  <v-app>
    <!-- NAVIGATION DRAWER -->
    <v-navigation-drawer app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Chatterbox</v-list-item-title>
          <v-list-item-subtitle>Users</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item v-for="(user, index) in users" :key="index">
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ user }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- APP BAR -->
    <v-app-bar color="primary" app>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Chatterbox</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>

    <!-- DIALOG -->
    <v-dialog v-model="dialog" persistent max-width="310">
      <v-card>
        <v-card-title class="headline primary"
          >Welcome to Chatterbox!</v-card-title
        >
        <v-card-text class="mt-2 pb-0">
          Before we proceed lets start with your name?
          <v-text-field
            ref="name"
            v-model="name"
            :rules="[
              () => !!name || 'Name is required',
              () =>
                (!!name && name.length >= 3) ||
                'Name must be at least 3 characters'
            ]"
            label="Name"
            clearable
            filled
            color="white"
            class="mt-2"
            required
            maxlength="20"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn color="primary" block @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- FOOTER -->
    <v-footer class="primary" app inset>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="message"
              label="Message"
              clearable
              filled
              color="white"
              counter
              prepend-icon="mdi-message"
            >
              <template v-slot:append-outer>
                <v-btn @click="send">Send</v-btn>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import io from "socket.io-client";
import { mapState } from "vuex";

export default {
  data() {
    return {
      socket: io(),
      name: "",
      message: "",
      dialog: true,
      formHasErrors: false
    };
  },
  computed: mapState(["users"]),
  mounted() {
    this.socket.on("message", message => {
      this.$store.commit("addMessage", message);
      this.message = "";
    });
    this.socket.on("user", user => {
      this.$store.commit("addUser", user);
    });
  },
  methods: {
    send() {
      this.socket.emit("message", { name: this.name, content: this.message });
    },
    submit() {
      if (this.$refs.name.validate(true)) {
        this.dialog = false;
        this.socket.emit("user", this.name);
      }
    }
  }
};
</script>
