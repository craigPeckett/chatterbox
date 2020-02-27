<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title class="primary">Messages</v-card-title>
        <v-card-text>
          <v-list dense>
            <v-list-item v-for="(message, index) in messages" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ message.name }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  message.content
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["messages"])
};
</script>
