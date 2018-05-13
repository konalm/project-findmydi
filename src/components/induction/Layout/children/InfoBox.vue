<template functional>
<div class="info-box">
  <div class="info-box__header">
    <i class="fa fa-info-circle"></i>
  </div> 

  <div class="info-box__body"> 

    <slot name="infoText"></slot>
  </div>
</div>
</template>



<style lang="scss" scoped>
@import '../../../../scss/variables.scss';

.info-box {
  width: 170px;
  position: absolute;
  top: 320px;
  right: 10%;

  @media screen and (max-width: 1200px) {
    right: 20px;
  }

  .info-box__header {
    color: $primary-color;
    font-size: 20px;
    padding-left: 10px;
  }

  .info-box__body {
    background: $primary-color;   
    color: white;
    padding: 7px;
    font-size: 12px;
    text-align: center;

    p {
      margin: 0;
    }
  }
}

.mobile {
  .info-box {
      position: static;
  }
}
</style>