<style lang="scss" scoped>

</style>
<template>
  <div>
    <div>--{{ cmv.test }}</div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Controller from '../../lib/Controller/Controller'

class Tt extends Controller {
  private ss = 4;
  protected tettt = 3;
  test = 1
}

const cm = Tt.useController()


export default defineComponent({
  data() {
    return {
      cm,
    }
  },
  computed:{
    cmv(){
      return cm.value
    }
  },
  created() {
    console.log(345, this.$data)
    cm.value.test = 2;
    this.cmv.test = 20;
    this.cmv.setResetCall(() => {
      this.cm = {...cm}
    })

  },
  mounted() {
    setTimeout(() => {
      this.cmv.reset()
      console.log('ttt', this.$data)
    }, 500)
  }
})
</script>

