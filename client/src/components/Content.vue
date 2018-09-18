<template>
    <div class="container">
      <div class="row">
        <!-- Sidebar Widgets Column -->
        <!-- Blog Entries Column -->
        <Widget></Widget>
        <router-view></router-view>
      </div>
      <!-- /.row -->

    </div>
</template>

<script>
import MainContent from '@/components/MainContent.vue'
import Widget from '@/components/Widget'
export default {
  name: 'contentweb',
  components: {
    MainContent,
    Widget
  }
}
</script>
