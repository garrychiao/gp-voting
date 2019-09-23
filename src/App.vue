<template>
  <div id="app">
    <el-row>
      <!-- header img -->
      <el-col :xs="24" :sm="12" class="header-img">

      </el-col>
      <!-- header title -->
      <el-col :xs="24" :sm="12" class="header-title">
        <el-row v-if="!voted">
          <el-col :xs="{span: 3, offset: 3}" :sm="{span: 1, offset: 5}">
            <p class="title-Q Apercu-Bold">Q</p>
          </el-col>
          <el-col :xs="{span: 3, offset: 3}" :sm="{span: 12, offset: 3}">
            <p class="title NotoSansCJKtc-Regular">臺灣<span class="Apercu-BoldItalic">9</span>大連鎖零售業中，<br>你最想先看到哪家<span class="NotoSansCJKtc-Medium">達成減塑</span>？</p>
          </el-col>
        </el-row>
        <el-row v-if="!voted">
          <el-col :xs="{span: 3, offset: 3}" :xl="{span: 12, offset: 6}">
            <p class="sub-title NotoSansCJKtc-Regular">｜ <span class="NotoSansCJKtc-Bold">點擊</span>品牌方塊，即可投票  ｜ </p>
          </el-col>
        </el-row>
        <el-row v-if="voted">
          <el-col :xs="{span: 3, offset: 3}" :xl="{span: 12, offset: 6}" class="voted-title">
            <p class="NotoSansCJKtc-Regular">臺灣<span class="Apercu-BoldItalic">9</span>大連鎖零售業票選排行</p>
            <el-button round @click="resultShow = true">
              看實際票數
            </el-button>
          </el-col>
        </el-row>
      </el-col>

      <!-- block section -->
      <el-col :xs="24" :sm="12" class="block-section-container">
        <el-row class="block-section" v-loading="loading">
          <el-col :xs="12" :sm="8" v-for="(item, index) in marts" :key="index">
            <SelectBlock v-if="!voted" :mobile="mobile" :targetMart="item" v-on:checkSendVote="checkSendVote"></SelectBlock>
          </el-col>
          <el-col :xs="12" :sm="8" v-for="item in statistics" :key="item.Name">
            <SelectedBlock v-if="voted" :rank="item.rank" :mobile="mobile" :targetMart="item.Name" :selected="(item.Name == votedTarget.Name)"></SelectedBlock>
          </el-col>
        </el-row>
        <transition name="fade">
          <div class="result-dialog" v-if="resultShow">
            <div class="result-dialog-content">
              <el-row v-for="item in statistics" :key="item.Name">
                <el-col :span="6">
                  <p>{{item.Name}}</p>
                </el-col>
                <el-col :span="18">
                  <div class="percent-bar">
                    <div class="percent-bar-bar">
                      <div class="percent-bar-content" v-bind:style="{width: item.percent}"></div>
                      <div class="percent-bar-number">
                        <p>{{ item.Count }}</p>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row lass="result-info">
                <el-col :span="24">
                  <p>統計單位：人數</p>
                </el-col>
                <el-col :span="24" class="result-close">
                  <el-button round  @click="resultShow = false">
                    返回
                  </el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </transition>

      </el-col>
    </el-row>
      <!-- footer -->
    <el-row class="footer">
      <el-col :xs="24" v-if="mobile">
        
      </el-col>
      <el-col :xs="24" :sm="{span: 6, offset: 3}">
        <el-row :gutter="15">
          <el-col :xs="4" :sm="5">
            <el-button class="NotoSansCJKtc-Regular" round>
              主頁
            </el-button>
          </el-col>
          <el-col :xs="8" :sm="8">
            <el-button class="NotoSansCJKtc-Regular" round>
              捐助支持
            </el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="12" :sm="12">
            <el-button class="NotoSansCJKtc-Regular" round>
              隱私政策與個人資料收集聲明
            </el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :sm="11" v-if="!mobile">
        <p class="NotoSansCJKtc-Regular">綠色和平致力於為地球發生，我們的存在是因為脆弱的地球需要改變、需要行動。<br>但保護地球的使命不能僅靠綠色和平來完成，「您」就是改變世界的力量！</p>
      </el-col>
      <el-col :sm="3" v-if="!mobile">
        <p class="NotoSansCJKtc-Regular">© 2019 Greenpeace</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import config from '@/config/config';
import axios from 'axios';
import SelectBlock from './components/SelectBlock.vue';
import SelectedBlock from './components/SelectedBlock.vue';

export default {
  name: 'app',
  components: {
    SelectBlock,
    SelectedBlock
  },
  data () {
    return {
      resultShow: false,
      mobile: false,
      voted: false,
      loading: false,
      votedTarget: {},
      ip: '',
      statistics: {},
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
  async created () {
    this.loading = true;
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
    this.marts = this.shuffle(this.marts);
    await this.getIP();
    this.getData();
    // await this.getData();
    // console.log(this.marts)
  },
  methods: {
    async getData () {
    this.loading = true;
      try {
        let dataRef = await axios.get(`${config.script}?ip=${this.ip}`);
        let data = dataRef.data
        this.statistics = data.data;
      
        this.statistics.sort((a, b) => {
          return b.Count - a.Count
        });
        let rank = 1
        for (let i in this.statistics) {
          if (i > 0 && this.statistics[i].Count == this.statistics[i - 1].Count) {
            this.statistics[i].rank = this.statistics[i - 1].rank;
          } else {
            this.statistics[i].rank = rank;
          }
          rank++
          this.statistics[i].percent = this.statistics[i].Count / this.statistics[0].Count * 100 + '%';
        }
        console.log(this.statistics);

        if (data.target.Name) {
          this.votedTarget = data.target;
          // console.log(this.votedTarget);
          this.voted = true;
        }
        this.loading = false;

      } catch (err) {
        console.log(err);
      }
    },
    async getIP () {

      try {
        let dataRef = await axios.get('https://api.ipify.org?format=json');
        let data = dataRef.data;
        this.ip = data.ip
        // console.log(this.ip);
      } catch (err) {
        console.log(err);
      }
    },
    checkSendVote (mart) {
      if (!this.mobile) {
        this.sendVote(mart)
      }
    },
    async sendVote(mart) {

      let data = new FormData();
      data.append('Name', mart);
      data.append('IP', this.ip);
      
      try {

        let postRef = await axios.post(config.script, data);
        let postRes = postRef.data;
        console.log(postRes);

      } catch (err) {
        console.log(err);
      }
    },
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
    },
    handleResize() {
      if (window.innerWidth < 768) {
        this.mobile = true
      } else {
        this.mobile = false
      }
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
  .voted-title {
    font-size: 1.5rem;
    padding: 3% 0;
    letter-spacing: 3.15pt;
    text-align: center;
    .el-button {
      background-color: transparent;
      color: white;
      letter-spacing: 3.15pt;
    }
  }
}
.block-section-container {
  position: relative;
  .block-section {
    overflow: hidden;
  }
}

.result-dialog {
  position: absolute;
  top: 0;
  width: 100%;
  height: 75vh;
  background-color: rgba(122, 122, 122, 0.51);
  .result-dialog-content{ 
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    width: 60%;
    border-radius: 50pt;
    padding: 30px 50px;
    .el-row {
      padding: 10px;
    }
    p {
      margin: 5px 15px 0 0;
      text-align: right;
    }
    .percent-bar {
      width: 100%;
      position: relative;
      top: 50%;
      .percent-bar-bar {
        display: inline-flex;
        width: 100%;
        .percent-bar-content {
          height: 30px;
          background-color: rgb(251, 210, 73);
        }
        .percent-bar-number {
          width: 20%;
          text-align: left;
          font-size: 0.8rem;
        }
      }
    }
    .result-info {
      text-align: right;
    }
    .result-close {
      text-align: center;
      padding: 20px;
      .el-button {
        background-color: var(--main-color);
        color: white;
        letter-spacing: 2.15pt;
      }
    }
  }
}

@media (min-width: 768px) and (max-width: 1919px) {
  .header-title {
    padding: 20px;
    .title {
      margin-top: 30px;
    }
  }
  .result-dialog {
    .result-dialog-content{ 
      padding: 40px 40px 20px 40px;
      p {
        margin: 5px 15px 0 0;
        text-align: right;
      }
      .el-row {
        padding: 5px 0;
      }
      .percent-bar {
        width: 100%;
        position: relative;
        top: 50%;
        .percent-bar-bar {
          display: inline-flex;
          width: 100%;
          .percent-bar-content {
            height: 20px;
            background-color: rgb(251, 210, 73);
          }
          .percent-bar-number {
            width: 20%;
            text-align: left;
            font-size: 0.8rem;
          }
        }
      }
      .result-info {
        text-align: right;
      }
      .result-close {
        text-align: center;
        padding: 20px;
        .el-button {
          background-color: var(--main-color);
          color: white;
          letter-spacing: 2.15pt;
        }
      }
    }
  }
  .footer {
    .el-button {
      padding: 10px 15px;
    }
  }
}

.footer {
  background-color: var(--main-color);
  height: 25vh;
  padding: 50px 30px; 
  .el-row {
    position: relative;
  }
  .el-button {
    margin-top: 20px;
    background-color: transparent;
    letter-spacing: 2pt;
    color: white;
    border: 1px solid white;
    font-size: 1rem;
  }
  p {
    font-size: 0.8rem;
    margin-top: 40px;
    color: white;
  }
}
//
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
