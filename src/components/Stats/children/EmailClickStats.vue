<template functional>
<div class="modal-box">
  <div class="modal-box__header">
    Email Clicks
  </div>

  <div class="modal-box__body">
    {{ $parent.stats.emailClicks }}
  </div>
</div>
</template>


<style lang="scss" scoped>
  .modal-box {
    width: 100%;

    .modal-box__body {
      text-align: center;
      font-size: 20px;
    }
  }
</style>