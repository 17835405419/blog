<template>
  <div class="footer-box">
    <span> COPYRIGHT 2017 个人博客. ALL RIGHTS RESERVED.</span>
    <span
      >本站只提供WEB服务,如有侵犯您的权益,请发送邮件至作者邮箱，我们会及时处理</span
    >
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.footer-box {
  height: 80px;
  background-color: @color-grey4;
  .layoutFlexCenter(column); //flex 居中
  span {
    color: @color-grey2;
    font-size: @fs-15;
    line-height: @fs-15;
  }
}
</style>