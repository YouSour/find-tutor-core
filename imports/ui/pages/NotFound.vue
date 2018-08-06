<template>
  <div class="not-found">
    <div class="banner">
      <img src="/images/404.gif" />
    </div>
    <div class="hero">
      Error 404 !
    </div>
    <div>
      This is not the page you are looking for.
      <router-link :to="{name:'home'}">Return home</router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  margin-top: 84px;
  text-align: center;
}
.not-found .hero {
  font-size: 2.5em;
  color: #666;
  margin: 12px;
}
.not-found .banner img {
  max-width: 20%;
  border-radius: 5px;
}
.router-link-active {
  color: #13b8da !important;
}
</style>
