<template>
  <div 
    class="publication-wrapper"
    :style="{
      '--bg-color': bgColorValue,
      '--bg-opacity': bgOpacityValue,
      '--line-height': lineHeight + 'px',
    }"
  >
    <div class="publication-bg" v-if="hasBg"></div>
    <div class="publication-line" v-if="hasBg"></div>
    <div class="publication">
      <div class="publication-image-container">
        <img class="publication-image" :src="publication.image" :alt="publication.title" />
      </div>
      <div class="publication-content">
        <p class="publication-title">{{ publication.title }}</p>
        <p class="publication-authors" v-html="publication.authors"></p>
        <p class="publication-publisher" v-html="publication.publisher"></p>
        <div class="publication-buttons">
          <button 
            v-for="(button, index) in publication.buttons" 
            :key="index" 
            class="publication-button"
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
import { defineComponent, ref, computed } from 'vue'

// Fixed color presets
const BG_PRESETS = {
  yellow: { color: '#faf2cf', opacity: 0.3},
  purple: { color: '#eee3fa', opacity: 0.3},
} as const;

export default defineComponent({
  name: 'Publication',
  props: {
    publication: {
      type: Object,
      required: true
    },
    // Height of the bottom line in pixels
    lineHeight: {
      type: Number,
      default: 6
    }
  },
  setup(props) {
    // Get bgType from publication data
    const bgType = computed(() => props.publication.bgType || '');
    
    // Computed background values based on bgType
    const hasBg = computed(() => bgType.value === 'yellow' || bgType.value === 'purple');
    const bgColorValue = computed(() => {
      const preset = BG_PRESETS[bgType.value as keyof typeof BG_PRESETS];
      return preset ? preset.color : '';
    });
    const bgOpacityValue = computed(() => {
      const preset = BG_PRESETS[bgType.value as keyof typeof BG_PRESETS];
      return preset ? preset.opacity : 0;
    });
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
      hasBg,
      bgColorValue,
      bgOpacityValue,
      isVideoModalVisible,
      currentVideoSrc,
      handleButtonClick,
      handleClose,
    };
  }
})
</script>

<style scoped>
.publication-wrapper {
  position: relative;
  margin-bottom: 30px;
}

/* Main background area with transparency */
.publication-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: var(--line-height);
  background: var(--bg-color);
  opacity: var(--bg-opacity);
  z-index: 0;
}

/* Bottom line (fully opaque) */
.publication-line {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: var(--line-height);
  background: var(--bg-color);
  z-index: 0;
}

.publication {
  position: relative;
  display: flex;
  gap: 40px;
  padding: 20px;
  align-items: flex-start;
  z-index: 1;
}

.publication-image-container {
  flex-shrink: 0;
}

.publication-image {
  width: 320px;
  height: 240px;
  object-fit: cover;
  border-radius: 0px;
}

.publication-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.publication-title {
  margin: 0;
  font-size: 25px;
  font-family: 'Source Sans 3', 'Helvetica Neue', Arial, sans-serif;
  font-weight: 600;
  color: #000;
  line-height: 1.2;
  padding-bottom: 10px;
}

.publication-authors {
  margin: 0;
  font-size: 21px;
  font-family: 'Source Sans 3', 'Helvetica Neue', Arial, sans-serif;
  font-weight: 400;
  color: #000;
  line-height: 1.2;
  padding-bottom: 10px;
}

.publication-publisher {
  margin: 0;
  font-size: 23px;
  font-family: 'Source Sans 3', 'Helvetica Neue', Arial, sans-serif;
  font-weight: 400;
  color: #000;
  line-height: 1.2;
  padding-bottom: 10px;
}

.publication-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; 
}

.publication-button {
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

.publication-button:hover {
  color: #fff;
  background: #000;
  border-color: #000;
}

.publication-button:disabled {
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
  .publication {
    flex-direction: column;
  }
  
  .publication-image {
    width: 100%;
    height: auto;
    aspect-ratio: 3 / 2;
  }
}
</style>

<style>
.highlight-pub {
  color: rgb(190, 0, 0);
  font-weight: 700;
  font-size: 22px;
}
</style>
