<template>
 
  <router-view/>
  <the-cart-modal/>
</template>

<script>
import TheCartModal from './components/TheCartModal.vue'
export default {
  components: { TheCartModal },
}
</script>

