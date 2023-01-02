<template>
  <div class="footerInfo">
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
.el-footer {
  padding: 0;
  .footerInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    height: 100px;
    background-color: rgb(58, 56, 56);
    span {
      color: rgb(130, 126, 126);
      font-size: 13px;
      line-height: 25px;
    }
  }
}
</style>