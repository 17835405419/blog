<template>
  <div class="about-box">
    <header class="header">
      <div class="header-title">
        <span class="header-title-main">The Road of Hope</span>
        <span class="header-title-sub">Right under your feet</span>
      </div>
      <div class="return-btn" @click="$router.push('/')">
        <i class="iconfont icon-fanhui"></i>
      </div>
    </header>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.about-box {
  box-sizing: border-box;
  padding: 20px;
  .header {
    height: 95vh;
    background: url("@/assets/aboutBgc.jpg") no-repeat;
    background-size: cover;
    clip-path: polygon(0 0, 100% 0, 100% 85vh, 0 100%);
    .header-title {
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      text-transform: uppercase; //字母大写
      text-align: center;
      font-weight: 600;
      backface-visibility: hidden; //隐藏背面可见性
      .header-title-main {
        display: block;
        font-size: 45px;
        letter-spacing: 8px;
        animation-name: moveLeft;
        animation-duration: 1s;
        animation-timing-function: ease-out;
      }
      .header-title-sub {
        display: block;
        font-size: 22px;
        letter-spacing: 8px;
        animation-name: moveRight;
        animation-duration: 1s;
        animation-timing-function: ease-out;
      }
    }
    .return-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      border: 1px solid #fff;
      width: 40px;
      height: 40px;
      background-color: #fff;
      position: absolute;
      top: 40px;
      right: 40px;
      color: #3d3d3d;
      cursor: pointer;
    }
    .return-btn:hover {
      color: #000;
      i {
        font-size: 18px;
      }
    }
  }
}

@keyframes moveLeft {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  80% {
    transform: translate(10px);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}
@keyframes moveRight {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  80% {
    transform: translate(-10px);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}
</style>