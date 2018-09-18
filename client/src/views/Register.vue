<template>
    <div class="container">
        <div class="register">
            <Register></Register>
        </div>
    </div>
</template>

<script>
import Register from '@/components/RegisterCp.vue'
export default {
  name: 'register',
  components: {
    Register
  }
}
</script>

<style scoped>
.register{
    min-height: 700px;
}
</style>
