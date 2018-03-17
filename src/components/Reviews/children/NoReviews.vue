<template functional>
<div class="modal-box">
  <div class="modal-box__body">
    <div class="no-reviews-message">
      <p>You currently have <span class="highlight">no reviews.</span></p>
      <p class="subtext">
        To get reviews simply click the "Send Review Invitation" tag.
      </p>
  
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
@import "../../../scss/variables.scss";

.modal-box__body {
  padding-left: 20px;
  padding-right: 20px;
}

.no-reviews-message {
  text-align: center;
  font-size: 20px;

  span.highlight {
    color: $primary-color;
    text-decoration: underline;
    font-weight: 500;
  }

  p.subtext {
    font-size: 16px;
    color: rgb(120,120,120);
  }
}
</style>


