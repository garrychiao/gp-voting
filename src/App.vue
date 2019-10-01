<template>
  <div id="app" 
    v-loading.fullscreen.lock="domLoading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(245, 245, 245, 0.9)">
    <el-row>
      <!-- header img -->
      <el-col :xs="24" :sm="24" :md="12" class="header-img">
        <img src="@/assets/img/gp-logo.png" alt="" class="logo">
        <img src="@/assets/img/cart.png" alt="" class="cart-icon">
        <p class="NotoSansCJKtc-Bold">超市減塑 誰當先鋒</p>
      </el-col>
      <!-- header title -->
      <el-col :xs="24" :md="12" class="header-title">
        <el-row v-if="!voted">
          <el-col :xs="{span: 5, offset: 2}" :sm="{span: 4, offset: 5}" :md="{span: 1, offset: 5}">
            <p class="title-Q Apercu-Bold">Q</p>
          </el-col>
          <el-col :xs="{span: 17, offset: 0}" :sm="{span: 14, offset: 0}" :md="{span: 12, offset: 3}">
            <p class="title NotoSansCJKtc-Regular">臺灣<span class="Apercu-BoldItalic">9</span>大連鎖零售業中，<br>你最想先看到哪家<span class="NotoSansCJKtc-Medium">達成減塑</span>？</p>
          </el-col>
        </el-row>
        <el-row v-if="!voted">
          <el-col :xs="{span: 24, offset: 0}" :sm="{span: 24, offset: 0}" :xl="{span: 12, offset: 6}">
            <p class="sub-title NotoSansCJKtc-Regular">｜ <span class="NotoSansCJKtc-Bold" v-if="!mobile">點擊</span><span class="NotoSansCJKtc-Bold" v-if="mobile">長按3秒 </span>品牌方塊，即可投票  ｜ </p>
          </el-col>
        </el-row>
        <el-row v-if="voted">
          <el-col :xs="{span: 24, offset: 0}" :sm="{span: 18, offset: 3}" :xl="{span: 18, offset: 3}" class="voted-title">
            <p class="NotoSansCJKtc-Regular">臺灣<span class="Apercu-BoldItalic">9</span>大連鎖零售業票選排行</p>
            <el-button round @click="resultShow = true" v-if="!mobile">
              看實際票數
            </el-button>
            <el-button round @click="resultShowMobile = true" v-if="mobile">
              票選排行
            </el-button>
          </el-col>
        </el-row>
      </el-col>

      <!-- block section -->
      <transition name="fade">
        <el-col :xs="24" :md="12" class="block-section-container" v-if="!resultShowMobile">
          <el-row class="block-section" v-loading="loading">
            <el-col :xs="12" :sm="12" :md="8" v-for="(item, index) in marts" :key="index">
              <SelectBlock v-if="!voted" :mobile="mobile" :targetMart="item" v-on:checkSendVote="checkSendVote"></SelectBlock>
            </el-col>
            <el-col :xs="12" :sm="12" :md="8" v-for="item in statistics" :key="item.Name">
              <SelectedBlock v-if="voted" :rank="item.rank" :mobile="mobile" :targetMart="item.Name" :selected="(item.Name == votedTarget.Name)"></SelectedBlock>
            </el-col>
            <el-col :xs="12" :sm="12" v-if="mobile">
              <BlankBlock></BlankBlock>
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
      </transition>
      <!-- mobile result -->
      <transition name="fade">
        <el-col :xs="24" :md="12" class="result-dialog-mobile" v-if="resultShowMobile">
          <div class="result-dialog-content">
            <el-row v-for="item in statistics" :key="item.Name">
              <el-col :span="8">
                <p>{{item.Name}}</p>
              </el-col>
              <el-col :span="16">
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
                <el-button round  @click="resultShowMobile = false">
                  返回
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </transition>
    </el-row>
      <!-- footer -->
    <el-row class="footer">
      <el-col :xs="24" v-if="mobile">
        <el-row>
          <el-col :xs="24">
            <p class="NotoSansCJKtc-Regular copyright">© 2019 Greenpeace</p>
          </el-col>
          <el-col :xs="15">
            <p class="NotoSansCJKtc-Regular">綠色和平致力於為地球發生，我們的存在是因為脆弱的地球需要改變、需要行動。</p>
          </el-col>
          <el-col :xs="20">
            <p class="NotoSansCJKtc-Medium">但保護地球的使命不能僅靠綠色和平來完成，「您」就是改變世界的力量！</p>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="{span: 5, offset: 0}" :md="{span: 6, offset: 2}" :xl="{span: 6, offset: 3}">
        <el-row :gutter="15">
          <el-col :xs="4" :sm="8" :md="5">
            <el-button class="NotoSansCJKtc-Regular" round 
              @click="openLink('https://www.greenpeace.org/taiwan/')">
              主頁
            </el-button>
          </el-col>
          <el-col :xs="8" :sm="8">
            <el-button class="NotoSansCJKtc-Regular" round
              @click="openLink('http://act.greenpeace.org/page/45804/donate/1')">
              捐助支持
            </el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="12" :sm="12">
            <el-button class="NotoSansCJKtc-Regular" round 
              @click="openLink('https://www.greenpeace.org/taiwan/policies/privacy-and-cookies')">
              隱私政策與個人資料收集聲明
            </el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :sm="11" v-if="!mobile">
        <p class="NotoSansCJKtc-Regular">綠色和平致力於為地球發生，我們的存在是因為脆弱的地球需要改變、需要行動。<br>但保護地球的使命不能僅靠綠色和平來完成，「您」就是改變世界的力量！</p>
      </el-col>
      <el-col :sm="4" :xl="3" v-if="!mobile">
        <p class="NotoSansCJKtc-Regular copyright">© 2019 Greenpeace</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue';
import config from '@/config/config';
import axios from 'axios';
import SelectBlock from './components/SelectBlock.vue';
import BlankBlock from './components/BlankBlock.vue';
import SelectedBlock from './components/SelectedBlock.vue';
import Swal from 'sweetalert2'


export default {
  name: 'app',
  components: {
    SelectBlock,
    SelectedBlock,
    BlankBlock,
  },
  data () {
    return {
      domLoading: true,
      resultShow: false,
      resultShowMobile: false,
      mobile: false,
      voted: false,
      loading: false,
      votedTarget: {},
      ip: '',
      fingerprint: '',
      fpComponents: [],
      fpOptions: {
        fonts: {
          extendedJsFonts: true
        },
        excludes: {
          userAgent: true
        }
      },
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
    // await this.fetchFingerprint();
    this.getData();
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
        this.domLoading = false;

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
    // async fetchFingerprint(){
    //   let components = await Fingerprint2.getPromise(this.fpOptions);
    //   let values = components.map(function (component) { return component.value })
    //   console.log(values)
    //   let murmur = Fingerprint2.x64hash128(values.join(''), 31)
    //   console.log(murmur)
    //   this.ip = murmur;
    // },
    checkSendVote (mart) {
      // if (!this.mobile) {
      //   this.sendVote(mart)
      // }
      this.sendVote(mart);
    },
    async sendVote(mart) {
      this.loading = true;
      let data = new FormData();
      data.append('Name', mart);
      data.append('IP', this.ip);
      
      try {

        let postRef = await axios.post(config.script, data);
        let postRes = postRef.data;
        // console.log(postRes);
        await this.getData();
        this.loading = false;
        let res = await Swal.fire({
          type: 'success',
          title: '投票成功',
          text: '未來綠色和平會將投票結果和您的聲音傳達給企業! 請密切關注綠色和平臉書粉絲團，並邀請朋友參與投票',
          confirmButtonColor: 'rgb(235, 144, 98)',
          customClass: 'NotoSansCJKtc-Regular',
        })
        if (res.value) {
          this.share();
        }
        
      } catch (err) {
        console.log(err);
        this.loading = false;
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
      if (window.innerWidth < 992) {
        this.mobile = true
      } else {
        this.mobile = false
      }
    },
    share() {
      let title = '超市減塑，誰當先鋒 | 綠色和平'
      let text = '立即投票，讓你最支持的零售商，實踐減塑！'
      let url = window.location.href
      // let url = 'https://garrychiao.github.io/gp-voting/';

      if (navigator.share) {
        navigator.share({
            title,
            text,
            url,
        }).then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else {
        // console.log(url)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "pop", "width=600, height=400, scrollbars=no");
      }
    },
    openLink (link) {
      // console.log(link)
      window.open(
        link,
        '_blank'
      )
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
  position: relative;
  .logo{
    position: absolute;
    top: 50px;
    left: 50px;
    width: 30%;
    max-width: 260px;
  }
  .cart-icon {
    position: absolute;
    top: 100px;
    left: 50px;
    width: 40px;
  }
  p {
    margin: 0;
    position: absolute;
    font-size: 2rem;
    color: white;
    letter-spacing: 7pt;
    top: 90px;
    left: 110px;
  }
}
.header-title {
  background-color: var(--main-color);
  height: 25vh;
  color: white;
  padding: 20px 40px;
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
    margin: 0;
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

@media (min-width: 992px) and (max-width: 1919px) {
  .header-img {
    .logo{
      top: 40px;
      left: 40px;
      width: 30%;
      max-width: 260px;
    }
    .cart-icon {
      top: 80px;
      left: 40px;
      width: 25px;
    }
    p {
      top: 75px;
      left: 80px;
    }
  }
  .header-title {
    padding: 10px 20px;
    .title {
      margin-top: 30px;
    }
  }
  .result-dialog {
    .result-dialog-content{ 
      padding: 30px 30px 10px 30px;
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
    padding: 20px 10px !important; 
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
  .copyright {
    text-align: right;
  }
}
//
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
// mobile
@media (max-width: 991px) {
  .header-img {
    background-image: url('./assets/img/banner.png');
    height: 35vh;
    .logo{
      top: unset;
      bottom: 50px;
      left: 30px;
      width: 30%;
      max-width: 200px;
    }
    .cart-icon {
      top: unset;
      bottom: 20px;
      left: 30px;
      width: 25px;
    }
    p {
      top: unset;
      font-size: 1.8rem;
      letter-spacing: 3.5pt;
      bottom: 15px;
      left: 70px;
    }
  }  
  .header-title {
    height: auto;
    padding: 20px;
    .title-Q {
      margin-top: unset;
      font-size: 5rem;
    }
    .title {
      font-size: 1.2rem;
      margin-top: 16px;
      letter-spacing: 1.75pt;
    }
    .sub-title {
      margin-top: 20px;
      font-size: 1rem;
      letter-spacing: 1.75pt;
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
  .result-dialog-mobile {
    .result-dialog-content{ 
      background-color: rgb(245, 245, 245);
      padding: 30px 30px 10px 30px;
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
          padding: 10px 15px;
          font-size: 1rem;
          background-color: var(--main-color);
          color: white;
          letter-spacing: 1.75pt;
        }
      }
    }
  }
  .footer {
    background-image: url('./assets/img/footer.png');
    background-size: cover;
    background-position: center;
    height: auto;
    padding: 10px 25px 30px 25px; 
    .el-row {
      position: relative;
    }
    .copyright {
      text-align: right;
      letter-spacing: 1.25pt;
    }
    .el-button {
      padding: 10px;
      margin-top: 20px;
      background-color: transparent;
      letter-spacing: 2pt;
      color: white;
      border: 1px solid white;
      font-size: 1rem;
    }
    p {
      font-size: 1rem;
      margin-top: 0;
      margin-bottom: 20px;
      color: white;
    }
  }
}
</style>
