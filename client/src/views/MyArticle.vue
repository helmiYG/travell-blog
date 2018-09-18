<template>
  <div class="about">
     <div class="container">
        <div class="row">
          <MyWidget></MyWidget>
          <MyContent></MyContent>
        </div>
     </div>
  </div>
</template>

<script>
import MyContent from '@/components/MyContent'
import MyWidget from '@/components/MyWidget'
// import MyWidget from '@/components/MyWidget.vue'
export default {
  name: 'my-article',
  components: {
    MyContent,
    MyWidget
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .about {
    min-height: 600px;
  }
</style>