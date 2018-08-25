<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-clork></v-clork>
    <div class="btn" @click="triggerPing">{{ping}}</div>
  </div>
</template>
<script>
import { getPing } from '@/api/demo'
import VClork from '@/components/VClork'

export default {
  data: () => ({
    ping: 'ping'
  }),
  methods: {
    async triggerPing() {
      this.ping = await getPing()
    }
  },
  components: { VClork }
}
</script>
