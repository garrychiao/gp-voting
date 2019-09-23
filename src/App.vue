<template>
  <div id="app">
    <el-row>
      <!-- header img -->
      <el-col :xs="24" :sm="12" class="header-img">

      </el-col>
      <!-- header title -->
      <el-col :xs="24" :sm="12" class="header-title">
        <el-row>
          <el-col :xs="{span: 3, offset: 3}" :xl="{span: 1, offset: 5}">
            <p class="title-Q Apercu-Bold">Q</p>
          </el-col>
          <el-col :xs="{span: 3, offset: 3}" :xl="{span: 12, offset: 3}">
            <p class="title NotoSansCJKtc-Regular">臺灣<span class="Apercu-BoldItalic">9</span>大連鎖零售業中，<br>你最想先看到哪家<span class="NotoSansCJKtc-Medium">達成減塑</span>？</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="{span: 3, offset: 3}" :xl="{span: 12, offset: 6}">
            <p class="sub-title NotoSansCJKtc-Regular">｜ <span class="NotoSansCJKtc-Bold">點擊</span>品牌方塊，即可投票  ｜ </p>
          </el-col>
        </el-row>
      </el-col>

      <!-- block section -->
      <el-col :xs="24" :sm="12">
        <el-row class="block-section">
          <el-col :xs="12" :sm="8" v-for="(item, index) in marts" :key="index">
            <SelectBlock :targetMart="item"></SelectBlock>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SelectBlock from './components/SelectBlock.vue'

export default {
  name: 'app',
  components: {
    SelectBlock
  },
  data () {
    return {
      marts: [
        "愛買",
        "家樂福",
        "全聯福利中心",
        "好市多",
        "全家",
        "大潤發",
        "7-ELEVEN",
        "頂好",
        "美廉社",
      ]
    }
  },
  created() {
    this.marts = this.shuffle(this.marts);
    // console.log(this.marts)
  },
  methods: {
    shuffle(array) {
      let counter = array.length;
      // While there are elements in the array
      while (counter > 0) {
          // Pick a random index
          let index = Math.floor(Math.random() * counter);

          // Decrease counter by 1
          counter--;

          // And swap the last element with it
          let temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
      }

      return array;
    }

  }
}
</script>

<style lang="scss">
#app {
  font-family: NotoSansCJKtc-Regular,'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  letter-spacing: 2pt;
}
.header-img {
  background-image: url('./assets/img/web-banner.png');
  background-size: cover;
  height: 100vh;
}
.header-title {
  background-color: var(--main-color);
  height: 25vh;
  color: white;
  padding: 40px;
  .title-Q {
    margin: 0;
    font-size: 8rem;
  }
  .title {
    font-size: 1.5rem;
    margin-top: 40px;
    letter-spacing: 3.15pt;
  }
  .sub-title {
    font-size: 1.2rem;
    letter-spacing: 3.15pt;
    text-align:  center;
  }
}
.block-section {
  overflow: hidden;
}
</style>
