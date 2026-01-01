<template>
  <div class="project-wrapper">
    <div class="project">
      <div class="project-image-container">
        <img class="project-image" :src="project.image" :alt="project.title" />
      </div>
      <div class="project-content">
        <p class="project-title">{{ project.title }}</p>
        <p class="project-description" v-html="project.description"></p>
        <div class="project-buttons">
          <button 
            v-for="(button, index) in project.buttons" 
            :key="index" 
            class="project-button"
            :disabled="button.disabled"
            @click="handleButtonClick(button)"
          >
            <i :class="button.icon"></i>
            <span class="button-text">{{ button.text }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Video Modal -->
  <div v-if="isVideoModalVisible" class="video-overlay" @click="handleClose">
    <div class="video-modal" @click.stop>
      <button class="close-button" @click="handleClose">&times;</button>
      <video controls autoplay muted playsinline :src="currentVideoSrc" class="video-player"></video>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Project',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const isVideoModalVisible = ref(false);
    const currentVideoSrc = ref('');

    const handleButtonClick = (button: { videoSrc: string; link: string | URL | undefined; }) => {
      if (button.videoSrc) {
        currentVideoSrc.value = button.videoSrc;
        isVideoModalVisible.value = true;
      } else if (button.link) {
        window.open(button.link, '_blank');
      }
    };

    const handleClose = () => {
      isVideoModalVisible.value = false;
      currentVideoSrc.value = '';
    };

    return {
      isVideoModalVisible,
      currentVideoSrc,
      handleButtonClick,
      handleClose,
    };
  }
})
</script>
  
<style scoped>
.project-wrapper {
  position: relative;
  margin-bottom: 20px;
}

.project {
  position: relative;
  display: flex;
  gap: 40px;
  padding: 20px;
  padding-bottom: 0px;
  align-items: flex-start;
}

.project-image-container {
  flex-shrink: 0;
}

.project-image {
  width: 320px;
  height: 240px;
  object-fit: cover;
  border-radius: 0px;
}

.project-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.project-title {
  margin: 0;
  font-size: 25px;
  font-family: 'Source Sans 3', 'Helvetica Neue', Arial, sans-serif;
  font-weight: 600;
  color: #000;
  line-height: 1.2;
  padding-bottom: 10px;
}

.project-description {
  margin: 0;
  font-size: 21px;
  font-family: 'Source Sans 3', 'Helvetica Neue', Arial, sans-serif;
  font-weight: 400;
  color: #000;
  line-height: 1.4;
  padding-bottom: 10px;
}

.project-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; 
}

.project-button {
  display: inline-flex;
  align-items: center;
  gap: 20px;
  padding: 5px 10px;
  border: 2px solid #00000013;
  border-radius: 4px;
  text-decoration: none;
  color: #000000;
  background: #ffffff;
  font-weight: 600; 
  font-size: 10px;
  font-family: 'Source Sans 3', 'Helvetica Neue', Arial, sans-serif;
  transition: all 0.2s ease;
  cursor: pointer;
}

.project-button:hover {
  color: #fff;
  background: #000;
  border-color: #000;
}

.project-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button-text {
  margin-left: -12px;
  font-size: 16px;
  font-weight: 800;
}

/* Video Modal */
.video-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.video-modal {
  position: relative;
  width: 90%;
  max-width: 900px;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.video-player {
  width: 100%;
  display: block;
}

@media (max-width: 768px) {
  .project {
    flex-direction: column;
  }
  
  .project-image {
    width: 100%;
    height: auto;
    aspect-ratio: 3 / 2;
  }
}
</style>
