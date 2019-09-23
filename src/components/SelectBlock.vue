<template>
  <div class="select-block" v-bind:style="{backgroundImage: `url(${target.imgUrl})`}">
    
  </div>
</template>

<script>
export default {
  name: 'SelectBlock',
  props: ['targetMart'],
  data() {
    return {
      target: {
        mart: '愛買',
        engMart: "a.Mart",
        imgUrl: require('@/assets/img/marts/a-mart.png')
      },
      marts: [
        {
          mart: '愛買',
          engMart: "a.Mart",
          imgUrl: require('@/assets/img/marts/a-mart.png')
        },
        {
          mart: '家樂福',
          engMart: "Carrefour",
          imgUrl: require('@/assets/img/marts/carrefour.png')
        },
        {
          mart: '全聯福利中心',
          engMart: "PX Mart",
          imgUrl: require('@/assets/img/marts/px-mart.png')
        },
        {
          mart: '好市多',
          engMart: "Costco",
          imgUrl: require('@/assets/img/marts/costco.png')
        },
        {
          mart: '全家',
          engMart: "FamilyMart",
          imgUrl: require('@/assets/img/marts/family.png')
        },
        {
          mart: '大潤發',
          engMart: "RT-Mart",
          imgUrl: require('@/assets/img/marts/rt-mart.png')
        },
        {
          mart: '7-ELEVEN',
          engMart: "7-ELEVEN",
          imgUrl: require('@/assets/img/marts/711.jpg')
        },
        {
          mart: '頂好',
          engMart: "Wellcome",
          imgUrl: require('@/assets/img/marts/wellcome.jpg')
        },
        {
          mart: '美廉社',
          engMart: "Simple Mart",
          imgUrl: require('@/assets/img/marts/a-mart.png')
        },
        
      ]
    }
  },
  created() {
    this.bindTarget();
  },
  methods: {
    bindTarget () {
      let target = this.marts.find((element) => {
        return element.mart === this.targetMart
      });
      if (target){
        this.target = target;
      }  
    }
  },
  watch: {
    targetMart: function () {
      this.bindTarget();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.select-block {
  height: 25vh;
  background-color: rgb(245, 245, 245);
  background-size: 30% auto;
  background-repeat: no-repeat;
  background-position: center center;
  margin: -1px;
  border: 1px solid black;
  cursor: pointer;
}
</style>
