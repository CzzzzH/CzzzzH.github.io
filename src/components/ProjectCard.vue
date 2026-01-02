<template>
  <div 
    class="project-card-wrapper"
    :style="{
      marginTop: marginTop + 'px',
      marginBottom: marginBottom + 'px',
      marginLeft: marginLeft + 'px',
      marginRight: marginRight + 'px',
    }"
  >
    <!-- Main Card -->
    <div 
      class="project-card" 
      :style="{
        '--card-height': cardHeight + 'px',
        '--text-x': textX + 'px',
        '--text-y': textY + '%',
        '--icon-size': iconSize + 'px',
        '--icon-x': iconX + 'px',
        '--icon-y': iconY + '%',
        '--icon-color-light': iconColorLight,
        '--icon-color-dark': iconColorDark,
        '--icon-gray-light': iconGrayLight,
        '--icon-gray-dark': iconGrayDark,
      }"
    >
      <!-- Layer 0: Card background - clickable/hoverable area -->
      <div class="card-bg" @click="showDetails = !showDetails"></div>
      
      <!-- Layer 1: Dark icon (middle) -->
      <span 
        class="icon-layer icon-dark" 
        :style="{ maskImage: `url(${resolvedIconSrc})`, WebkitMaskImage: `url(${resolvedIconSrc})` }"
        aria-hidden="true"
      ></span>
      
      <!-- Layer 2: Light icon wrapper (top) - clips to card bounds -->
      <div class="icon-light-wrapper">
        <span 
          class="icon-layer icon-light" 
          :style="{ maskImage: `url(${resolvedIconSrc})`, WebkitMaskImage: `url(${resolvedIconSrc})` }"
          aria-hidden="true"
        ></span>
      </div>
      
      <!-- Layer 3: Text (topmost) - also clickable -->
      <span class="card-text" @click="showDetails = !showDetails">{{ category }}</span>
    </div>
    
    <!-- Collapsible Content -->
    <transition name="expand" mode="out-in" @enter="enter" @before-leave="beforeLeave">
      <div class="collapse-card" v-if="showDetails">
        <!-- Description textbox at the beginning -->
        <div 
          v-if="description && description.length > 0" 
          class="category-description"
          :style="{
            paddingLeft: descriptionPaddingLeft + 'px',
            paddingRight: descriptionPaddingRight + 'px',
            paddingTop: descriptionPaddingTop + 'px',
            paddingBottom: descriptionPaddingBottom + 'px',
          }"
        >
          <p v-for="(line, index) in description" :key="index" class="description-line" v-html="line"></p>
        </div>
        <Project v-for="project in categoryProjects" :key="project.id" :project="project" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import Project from './Project.vue'
import projects from '../projects'

export default defineComponent({
  name: 'ProjectCard',
  components: {
    Project
  },
  props: {
    category: {
      type: String,
      required: true
    },
    categoryId: {
      type: Number,
      required: true
    },
    // Card height in pixels
    cardHeight: {
      type: Number,
      default: 120
    },
    // Text horizontal position (pixels from left)
    textX: {
      type: Number,
      default: 80
    },
    // Text vertical position (percentage)
    textY: {
      type: Number,
      default: 50
    },
    // Icon source path (should be a silhouette PNG)
    iconSrc: {
      type: String,
      default: ''
    },
    // Icon size in pixels
    iconSize: {
      type: Number,
      default: 400
    },
    // Icon horizontal position (pixels from left)
    iconX: {
      type: Number,
      default: 400
    },
    // Icon vertical position (percentage)
    iconY: {
      type: Number,
      default: 50
    },
    // Light color for icon inside the card (on hover)
    iconColorLight: {
      type: String,
      default: '#FFFFFF'  
    },
    // Dark color for icon outside the card (on hover)
    iconColorDark: {
      type: String,
      default: '#000000'  
    },
    // Initial gray color for light part (before hover)
    iconGrayLight: {
      type: String,
      default: '#AAAAAA '
    },
    // Initial gray color for dark part (before hover)
    iconGrayDark: {
      type: String,
      default: '#777777'
    },
    // Margin top in pixels
    marginTop: {
      type: Number,
      default: 0
    },
    // Margin bottom in pixels
    marginBottom: {
      type: Number,
      default: 1
    },
    // Margin left in pixels
    marginLeft: {
      type: Number,
      default: 0
    },
    // Margin right in pixels
    marginRight: {
      type: Number,
      default: 0
    },
    // Description text (array of lines, supports HTML)
    description: {
      type: Array,
      default: () => ["\n\n"]
    },
    // Description padding left in pixels
    descriptionPaddingLeft: {
      type: Number,
      default: 40
    },
    // Description padding right in pixels
    descriptionPaddingRight: {
      type: Number,
      default: 40
    },
    // Description padding top in pixels
    descriptionPaddingTop: {
      type: Number,
      default: 0
    },
    // Description padding bottom in pixels
    descriptionPaddingBottom: {
      type: Number,
      default: 20
    }
  },
  methods: {
    enter(el: Element, done: () => void) {
      const htmlEl = el as HTMLElement
      htmlEl.style.height = '0px'
      htmlEl.style.opacity = '0.5'
      setTimeout(() => {
        htmlEl.style.height = el.scrollHeight + 'px'
        htmlEl.style.opacity = '1'
        done()
      }, 0)
    },
    beforeLeave(el: Element) {
      const htmlEl = el as HTMLElement
      htmlEl.style.height = el.scrollHeight + 'px'
      htmlEl.style.opacity = '1'
      setTimeout(() => {
        htmlEl.style.height = '0px'
        htmlEl.style.opacity = '0'
      }, 0)
    }
  },
  setup(props) {
    const showDetails = ref(false);

    // Get the projects that belong to this category
    const categoryProjects = computed(() => {
      return projects.filter((project: { category: string }) => project.category === props.category);
    });

    // Auto-generate icon path if not provided
    const resolvedIconSrc = computed(() => {
      if (props.iconSrc) return props.iconSrc;
      // Default naming convention: /category_icon.png (e.g., /graphics_icon.png)
      return `/${props.category.toLowerCase()}_icon.png`;
    });

    return {
      showDetails,
      categoryProjects,
      resolvedIconSrc,
    };
  }
})
</script>

<style scoped>
.project-card-wrapper {
  position: relative;
}

.project-card {
  position: relative;
  width: 100%;
  height: var(--card-height);
  overflow: visible; /* Allow icon to extend outside */
}

/* Layer 0: Card background - clickable/hoverable area */
.card-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0px;
  background: #2f2b23;
  z-index: 0;
  cursor: pointer;
}

/* Icon layers - using mask-image to colorize the PNG */
.icon-layer {
  position: absolute;
  left: var(--icon-x);
  top: var(--icon-y);
  transform: translate(-50%, -50%);
  width: var(--icon-size);
  height: var(--icon-size);
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  pointer-events: none; /* Icons don't intercept clicks */
}

/* Layer 1: Dark icon (middle) */
.icon-dark {
  background: var(--icon-gray-dark);
  z-index: 1;
  transition: background 0.4s ease;
}

/* Layer 2: Light icon wrapper - clips to card bounds */
.icon-light-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden; /* Clips the light icon to card bounds */
  z-index: 2;
  pointer-events: none; /* Allow clicks to pass through */
}

/* Light icon inside wrapper */
.icon-light {
  background: var(--icon-gray-light);
  transition: background 0.4s ease;
}

/* Layer 3: Text styling (topmost) */
.card-text {
  position: absolute;
  left: var(--text-x);
  top: var(--text-y);
  transform: translateY(-50%);
  font-size: 65px;
  font-family: 'Source Sans 3', 'Helvetica Neue', Arial, sans-serif;
  font-weight: 600;
  color: #fff;
  z-index: 3;
  letter-spacing: 0.02em;
  user-select: none; /* Disable text selection */
  cursor: pointer; /* Show pointer on hover */
}

/* Collapsible content */
.collapse-card {
  width: 100%;
  background-color: #fff;
  transition: height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
  border-radius: 0 0 8px 8px;
  padding-top: 20px; /* Padding before projects */
}

/* Category description textbox */
.category-description {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.description-line {
  margin: 0;
  font-size: 21px;
  font-family: 'Source Sans 3', 'Helvetica Neue', Arial, sans-serif;
  font-weight: 400;
  color: #000;
  line-height: 1.4;
}

/* Hover effect - icons transition from gray to color (when hovering card-bg or text) */
.project-card:has(.card-bg:hover, .card-text:hover) .icon-dark {
  background: var(--icon-color-dark);
}

.project-card:has(.card-bg:hover, .card-text:hover) .icon-light {
  background: var(--icon-color-light);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .card-text {
    font-size: 36px !important;
    left: 20px !important;
  }

  .icon-layer {
    width: calc(var(--icon-size) * 0.6) !important;
    height: calc(var(--icon-size) * 0.6) !important;
  }

  .category-description {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }

  .description-line {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .card-text {
    font-size: 28px !important;
    left: 15px !important;
  }

  .icon-layer {
    width: calc(var(--icon-size) * 0.4) !important;
    height: calc(var(--icon-size) * 0.4) !important;
  }

  .description-line {
    font-size: 14px;
  }
}
</style>
