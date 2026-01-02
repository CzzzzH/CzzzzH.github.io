<template>
  <div 
    class="service"
    :style="{
      paddingLeft: paddingLeft + 'px',
    }"
  >
    <div class="service-item">
      <p class="service-title">Teaching Assistant:</p>
      <p class="service-content"><a href="https://neural-representation-2025.github.io" class="service-link">Neural Scene Representation & Neural Rendering</a> (Fall 2024, Fall 2025)</p>
      <p class="service-content"><a href="https://cis5800.github.io/" class="service-link">Machine Perception</a> (Spring 2025)</p>
    </div>
    <div class="service-item">
      <p class="service-title">Reviewer:</p>
      <p class="service-content">CVPR (2025, 2026), ICCV (2025), Pacific Graphics (2024)</p>
    </div>
    <div class="service-item">
      <p class="service-title">Talk:</p>
      <p class="service-content talk-entry">
        <span class="talk-date">[2025/11]</span>
        <span class="talk-topic">Generative Physics for Controllable & Physics-Grounded Video Generation</span>
        <span class="talk-place">(Brown University)</span>
      </p>
      <p class="service-content talk-entry">
        <span class="talk-date">[2024/03]</span>
        <span class="talk-topic">Metropolis Light Transport Denoising</span>
        <span class="talk-place">(SoCal Rendering Day @ University of California, Irvine)</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Service',
  props: {
    // Left padding for the whole service section
    paddingLeft: {
      type: Number,
      default: 20
    }
  }
})
</script>

<style scoped>
.service {
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.service-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
  width: 100%;
}

.service-title {
  margin: 0;
  font-size: 26px;
  font-family: 'Source Sans 3', 'Helvetica Neue', Arial, sans-serif;
  font-weight: 700;
  color: #000;
  line-height: 1.4;
}

.service-content {
  margin: 0;
  margin-left: 30px;
  font-size: 24px;
  font-family: 'Source Sans 3', 'Helvetica Neue', Arial, sans-serif;
  font-weight: 400;
  color: #000;
  line-height: 1.4;
}

.service-link {
  color: #660874;
  text-decoration: none;
  font-weight: 400;
  display: inline;
  pointer-events: auto;
}

.service-link:hover {
  text-decoration: underline;
}

/* Talk entry styling */
.talk-entry {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.talk-date {
  color: #4d1d00;
  font-weight: 500;
}

.talk-topic {
  color: #000000;
  font-weight: 400;
}

.talk-place {
  color: #4b4fc2;
  font-weight: 400;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .service {
    padding-left: 15px !important;
  }

  .service-title {
    font-size: 20px;
  }

  .service-content {
    font-size: 18px;
    margin-left: 20px;
  }

  .talk-entry {
    flex-direction: column;
    gap: 4px;
  }
}

@media (max-width: 480px) {
  .service {
    padding-left: 10px !important;
  }

  .service-title {
    font-size: 18px;
  }

  .service-content {
    font-size: 16px;
    margin-left: 15px;
  }
}
</style>

