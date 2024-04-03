<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld :envName="envName" :msg="msg" />
  </div>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component'
  import { EnvDTO } from '@/models/envDTO'
  import { fetchEnvName } from '@/services/env'
  import { fetchHelloMessage } from '@/services/hello'
  import HelloWorld from '@/components/HelloWorld.vue'

  @Options({
    components: {
      HelloWorld,
    },
  })
  export default class HomeView extends Vue {
    public envName: EnvDTO = { env: '<unknown>' }
    public msg = ''

    public created(): void {
      fetchEnvName()
        .then(response => {
          this.envName = response.data
        })
        .catch(err => {
          console.error(err)
        })
      fetchHelloMessage()
        .then(response => {
          this.msg = response.data
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
</script>
