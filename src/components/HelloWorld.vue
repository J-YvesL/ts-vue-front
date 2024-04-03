<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p :style="{ color: getHelloMessageColor() }"> {{ getEnvName() }} </p>
  </div>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component'
  import { useStore } from 'vuex'
  import { EnvDTO } from '@/models/envDTO'

  @Options({
    props: {
      envName: Object,
      msg: String,
    },
  })
  export default class HelloWorld extends Vue {
    private store = useStore()
    msg!: string
    envName!: EnvDTO

    public getHelloMessageColor(): string {
      return this.store.getters.getHelloMessageColor()
    }

    public getEnvName(): string {
      return this.envName?.env || '<unknown>'
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
