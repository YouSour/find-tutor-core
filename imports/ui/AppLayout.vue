<template>
  <div class="app-layout">
    <div class="page-wrapper">
      <!--Slide Bar Menu -->
      <app-slide-bar></app-slide-bar>
      <!-- PAGE CONTAINER-->
      <div class="page-container">
        <!-- HEADER-->
        <app-header></app-header>
        <!-- HEADER -->

        <!-- MAIN CONTENT-->
        <div class="main-content">
          <div class="section__content section__content--p10">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-12">
                  <router-view></router-view>
                </div>
              </div>
            </div>
            <app-footer></app-footer>
          </div>
        </div>
        <!-- END MAIN CONTENT-->
        <!-- END PAGE CONTAINER-->
      </div>
    </div>

  </div>
</template>

<script>
import AppSlideBar from "/imports/ui/AppSlideBar.vue";
import AppHeader from "/imports/ui/AppHeader.vue";
import AppFooter from "/imports/ui/AppFooter.vue";

export default {
  components: {
    AppSlideBar,
    AppHeader,
    AppFooter
  }
};
</script>
