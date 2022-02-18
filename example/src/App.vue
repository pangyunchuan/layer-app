<template>
  <Test></Test>
</template>

<script lang="ts" setup>
import Test from './Test.vue';
import {Controller,RequestModel} from 'layer-app'

interface Te {
  f1: string,
  f2: number
}

class Rm extends RequestModel<Te> {
  data = {
    f1: '',
    f2: 0
  }

  test() {
    console.log('called')
  }

  async test111() {
    // return this.setReq(this.newReq()).reqOne()
    return Rm.setReq(this.newReq().setGet('/apis/test')).reqOneOther<{ tt: any, tt1: string }, 'tt'>('tt',inst => {inst.test()})
  }

  static async tt() {
    // this.setReq(this.newReq().setGet('test')).reqOne().then(r => {
    //   // r.test()
    // })
    return this.setReq(this.newReq().setGet('/apis/test')).reqOne
    ( (inst) => {
      console.log(11)
      inst.test()
    })
    // return this.setReq(this.newReq()).reqOneOther<{data:any,test:string},'data'>('data')
    // console.log(33, this.newReq())
    // this.newReq()
    //
    //
    // this.newReq().setGet('apis/test').reqOneOther<{test:string,t1:number},'t1',Rm>(this,'t1').then(r=>{
    //   r.model.f1
    //   r.test
    //   console.log(r)
    // })
    // return this.newReq('demo').setGet('apis/test').reqOne(this)
  }
}

Rm.tt().then(r => {
  console.log(2)
  r.test()
  console.log('访问属性',r.f1,r.f2)
})

// Rm.tt().then(r => {
//   console.log(r, new Rm(), r.f1, r.f2)
// })


// console.log()
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
