<template functional>
<div class="container">
  <div class="forbidden-message absolute-center text-center">
    <p>This review invitation has already been used.</p>
  </div>
</div>
</template>


<style lang="scss" scoped>
.forbidden-message {
  width: 800px;

  p {
    font-size: 30px;
  }

  @media screen and (max-width: 800px) {
    width: 100%;

    p {
      font-size: 22px;
    }
  }
}

</style>