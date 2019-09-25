<template>
  <div
    class="select-block"
    v-bind:style="{backgroundImage: `url(${target.imgUrl})`}"
    @click="checkSendVote"
    v-longclick="() => onLongPress()"
  >
    <div class="mart-info">
      <p class="NotoSansCJKtc-Bold">{{ target.mart }}</p>
      <p class="Apercu-Bold">{{ target.engMart }}</p>
    </div>
    <div class="confirm-layer">
      <el-button round class="NotoSansCJKtc-Regula">確定投票</el-button>
    </div>
  </div>
</template>

<script>
import config from "@/config/config";
import axios from "axios";
import { longClickDirective } from 'vue-long-click'
const longClickInstance = longClickDirective({delay: 3000, interval: 0})

export default {
  name: "SelectBlock",
  directives: {
    longclick: longClickInstance
  },
  props: ["targetMart", "ip", "mobile"],
  data() {
    return {
      target: {
        mart: "愛買",
        engMart: "a.Mart",
        imgUrl: require("@/assets/img/marts/a-mart.png")
      },
      marts: [
        {
          mart: "愛買",
          engMart: "a.mart",
          imgUrl: require("@/assets/img/marts/a-mart.png")
        },
        {
          mart: "家樂福",
          engMart: "Carrefour",
          imgUrl: require("@/assets/img/marts/carrefour.png")
        },
        {
          mart: "全聯福利中心",
          engMart: "PX Mart",
          imgUrl: require("@/assets/img/marts/px-mart.png")
        },
        {
          mart: "好市多",
          engMart: "Costco",
          imgUrl: require("@/assets/img/marts/costco.png")
        },
        {
          mart: "全家",
          engMart: "FamilyMart",
          imgUrl: require("@/assets/img/marts/family.png")
        },
        {
          mart: "大潤發",
          engMart: "RT-Mart",
          imgUrl: require("@/assets/img/marts/rt-mart.png")
        },
        {
          mart: "7-ELEVEN",
          engMart: "7-ELEVEN",
          imgUrl: require("@/assets/img/marts/711.png")
        },
        {
          mart: "頂好",
          engMart: "Wellcome",
          imgUrl: require("@/assets/img/marts/wellcome.png")
        },
        {
          mart: "美廉社",
          engMart: "Simple Mart",
          imgUrl: require("@/assets/img/marts/simple-mart.png")
        }
      ]
    };
  },
  created() {
    this.bindTarget();
    window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    checkSendVote() {
      if (!this.mobile) {
        this.$emit("checkSendVote", this.target.mart);
      }
    },
    bindTarget() {
      let target = this.marts.find(element => {
        return element.mart === this.targetMart;
      });
      if (target) {
        this.target = target;
      }
    },
    onLongPress() {
      this.$emit("checkSendVote", this.target.mart);
    }
  },
  watch: {
    targetMart: function() {
      this.bindTarget();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.select-block {
  height: 25vh;
  background-color: rgb(245, 245, 245);
  background-size: 60% auto;
  background-repeat: no-repeat;
  background-position: center center;
  margin: -1px;
  border: 1px solid black;
  cursor: pointer;
  position: relative;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
  .mart-info {
    position: absolute;
    left: 10%;
    bottom: 7%;
    p {
      margin: 0;
      letter-spacing: 2.25pt;
    }
    p:nth-child(1) {
      font-size: 1.1rem;
    }
    p:nth-child(2) {
      font-size: 0.6rem;
    }
  }
  .confirm-layer {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 25vh;
    background-color: rgba(255, 239, 167, 0.57);
    background-image: url("../assets/img/voted.png");
    background-repeat: no-repeat;
    background-position: right bottom;
    text-align: center;
    .el-button {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      background-color: var(--main-color);
      color: white;
      letter-spacing: 1.75pt;
    }
  }
  .confirm-layer:hover {
    opacity: 1;
  }
}
@media (max-width: 1919px) {
  .confirm-layer {
    background-size: 65px 65px;
    .el-button {
      font-size: 1rem;
      letter-spacing: 1.75pt;
    }
  }
}
</style>
