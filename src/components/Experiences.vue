<template>
  <section id="experiences" aria-label="Experiences">
    <SectionTitle
      text="EXPERIENCES"
      :font-size="39"
      :cap-size="1.6"
      :box-size="105"
      :box-offset-x="45"
      :box-offset-y="48"
      :image-width="300"
      :image-height="200"
      :image-x="275"
      :image-y="65"
      :marginTop="119"
      :marginLeft="900"
      image-src="/experiences_icon.png"
    />
    <Experience
      v-for="experience in experiences"
      :key="experience.id"
      :experience="experience"
    />
  </section>
</template>

<script setup lang="ts">
import SectionTitle from './SectionTitle.vue';
import Experience from './Experience.vue';
import experiences from '../experiences';
</script>

<style scoped>
/* Briefcase: image-x/image-y above set its position; this is the extra vertical offset. */
#experiences :deep(.bg-image-wrapper) {
  margin-top: -40px;
}

@media (max-width: 768px) {
  #experiences :deep(.section-title-heading) {
    --diamond-half: 44.548px !important;
  }
}

@media (max-width: 480px) {
  #experiences :deep(.section-title-heading) {
    --diamond-half: 37.123px !important;
  }
}
</style>
