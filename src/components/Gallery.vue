<template>
  <div class="gallery">
    <img class="gallery-image" src="@/assets/cat.jpg" alt="Gallery" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Gallery',
})
</script>

<style scoped>
.gallery {
  padding: 10px 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

.gallery-image {
  width: 92%;
  height: auto;
  display: block;
  border-radius: 4px;
}
</style>
