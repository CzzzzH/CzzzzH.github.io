<template>
  <span
    class="section-title-heading"
    :style="{
      '--cap': capSize + 'em',
      '--fs': fontSize + 'px',
      '--fw': fontWeight,
      '--ls': letterSpacing + 'em',
      '--box-size': boxSize + 'px',
      '--box-offset-x': boxOffsetX + 'px',
      '--box-offset-y': boxOffsetY + 'px',
      '--diamond-cx': diamondCx + 'px',
      '--diamond-cy': diamondCy + '%',
      '--diamond-half': (boxSize * Math.sqrt(2) / 2) + 'px',
      '--mt': marginTop + 'px',
      '--mb': marginBottom + 'px',
      '--ml': marginLeft + 'px',
      '--stroke': strokeWidth + 'px',
      '--img-width': imageWidth + 'px',
      '--img-height': imageHeight + 'px',
      '--img-x': imageX + 'px',
      '--img-y': imageY + '%',
      '--img-shift-x': imageShiftX + '%',
      '--img-shift-y': imageShiftY + '%',
      '--img-opacity': imageOpacity,
      '--bg-img-width': bgImageWidth + '%',
      '--bg-img-height': bgImageHeight + '%',
    }"
  >
    <!-- Independent image layer (behind text and diamond) -->
    <span v-if="imageSrc" class="bg-image-wrapper" aria-hidden="true">
      <img :src="imageSrc" class="bg-image" alt="" />
    </span>

    <!-- Base layer: all black text -->
    <span class="layer base" aria-hidden="true">
      <span class="cap">{{ cap }}</span><span class="rest">{{ rest }}</span>
    </span>

    <!-- Top layer: shows only the area covered by the black box (white text + black background) -->
    <span class="layer hl" aria-hidden="true">
      <span class="cap">{{ cap }}</span><span class="rest">{{ rest }}</span>
    </span>

    <!-- Accessible text (screen readers read this once) -->
    <span class="sr-only">{{ text }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  text: { type: String, default: "PUBLICATIONS" },
  // Overall font size in pixels
  fontSize: { type: Number, default: 120 },
  // Scale multiplier for the first letter (drop cap effect)
  capSize: { type: Number, default: 1.25 },
  // Font weight (100-900, max depends on font - Source Sans 3 supports up to 900)
  fontWeight: { type: Number, default: 900 },
  // Letter spacing in em units
  letterSpacing: { type: Number, default: 0.05 },
  // Size of the diamond box (width/height before rotation)
  boxSize: { type: Number, default: 150 },
  // Horizontal offset of the diamond center (pixels)
  boxOffsetX: { type: Number, default: 50 },
  // Vertical offset of the diamond center (percentage of height)
  boxOffsetY: { type: Number, default: 50 },
  // Margin top in pixels
  marginTop: { type: Number, default: 50 },
  // Margin bottom in pixels
  marginBottom: { type: Number, default: 100 },
  // Margin left in pixels
  marginLeft: { type: Number, default: 20 },
  // Text stroke width in pixels (makes text appear bolder)
  strokeWidth: { type: Number, default: 1.0 },
  // Image source for background layer (optional, independent from diamond)
  imageSrc: { type: String, default: '' },
  // Image width in pixels
  imageWidth: { type: Number, default: 300 },
  // Image height in pixels (for cropping)
  imageHeight: { type: Number, default: 200 },
  // Image X position (pixels from left)
  imageX: { type: Number, default: 300 },
  // Image Y position (percentage of container height)
  imageY: { type: Number, default: 50 },
  // Image content horizontal shift (0-100, which part of image to show)
  imageShiftX: { type: Number, default: 50 },
  // Image content vertical shift (0-100, which part of image to show)
  imageShiftY: { type: Number, default: 50 },
  // Image opacity (0-1, where 1 is fully opaque)
  imageOpacity: { type: Number, default: 0.3 },
  // Background image element width (percentage of wrapper)
  bgImageWidth: { type: Number, default: 100 },
  // Background image element height (percentage of wrapper)
  bgImageHeight: { type: Number, default: 100 },
});

const cap = computed(() => props.text.slice(0, 1));
const rest = computed(() => props.text.slice(1));

// Calculate diamond center position (matching the ::before positioning)
const diamondCx = computed(() => props.boxOffsetX);
const diamondCy = computed(() => props.boxOffsetY);
</script>

<style scoped>
.section-title-heading {
  position: relative;
  display: inline-block;
  font-family: 'Source Sans 3', 'Helvetica Neue', Arial, sans-serif;
  font-size: var(--fs);
  font-weight: var(--fw);
  letter-spacing: var(--ls);
  line-height: 1;
  /* Prevent jitter when layers overlap */
  white-space: nowrap;
  /* Allow diamond to extend outside the text bounds */
  overflow: visible;
  /* Margins */
  margin-top: var(--mt);
  margin-bottom: var(--mb);
  margin-left: var(--ml);
}

/* Independent background image wrapper (behind text, above diamond) */
.bg-image-wrapper {
  position: absolute;
  left: var(--img-x);
  top: var(--img-y);
  transform: translate(-50%, -50%);
  width: var(--img-width);
  height: var(--img-height);
  z-index: 0; /* Above the diamond, but text layers will be above this */
  overflow: hidden;
  border-radius: 4px;
  pointer-events: none; /* Don't block clicks on elements below */
}

/* Diamond background shape (black, shows when no image) */
.section-title-heading::before {
  content: "";
  position: absolute;
  /* Position the diamond center */
  left: var(--diamond-cx);
  top: var(--diamond-cy);
  transform: translate(-50%, -50%) rotate(45deg);
  /* Diamond size */
  width: var(--box-size);
  height: var(--box-size);
  background: #000;
  z-index: 1;
  pointer-events: none; /* Don't block clicks on elements below */
}

/* Background image */
.bg-image {
  width: var(--bg-img-width);
  height: var(--bg-img-height);
  object-fit: cover;
  opacity: var(--img-opacity);
  object-position: var(--img-shift-x) var(--img-shift-y);
}

.layer {
  display: inline-block;
}   

/* Base layer: all black text */
.base {
  position: relative; /* Makes the base layer take up space and expand the container */
  color: #000;
  z-index: 2; /* Above the diamond and image */
  -webkit-text-stroke: var(--stroke) #000;
}

/* Top layer: white text clipped to diamond shape */
.hl {
  position: absolute;
  left: 0;
  top: 0;
  color: #fff;
  z-index: 3; /* Above everything */
  -webkit-text-stroke: var(--stroke) #fff;
  /* Clip to diamond shape - polygon with 4 points (top, right, bottom, left) */
  clip-path: polygon(
    var(--diamond-cx) calc(var(--diamond-cy) - var(--diamond-half)),
    calc(var(--diamond-cx) + var(--diamond-half)) var(--diamond-cy),
    var(--diamond-cx) calc(var(--diamond-cy) + var(--diamond-half)),
    calc(var(--diamond-cx) - var(--diamond-half)) var(--diamond-cy)
  );
}

/* First letter larger (drop cap effect) */
.cap {
  font-size: var(--cap);
  display: inline-block;
  vertical-align: baseline;
}

/* Visually hidden but accessible */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .section-title-heading {
    font-size: calc(var(--fs) * 0.6) !important;
    margin-top: calc(var(--mt) * 0.6) !important;
    margin-bottom: calc(var(--mb) * 0.6) !important;
    margin-left: 10px !important;
  }

  .section-title-heading::before {
    width: calc(var(--box-size) * 0.6) !important;
    height: calc(var(--box-size) * 0.6) !important;
  }

  .bg-image-wrapper {
    width: calc(var(--img-width) * 0.5) !important;
    height: calc(var(--img-height) * 0.5) !important;
  }
}

@media (max-width: 480px) {
  .section-title-heading {
    font-size: calc(var(--fs) * 0.5) !important;
    margin-top: calc(var(--mt) * 0.4) !important;
    margin-bottom: calc(var(--mb) * 0.4) !important;
    margin-left: 5px !important;
  }

  .section-title-heading::before {
    width: calc(var(--box-size) * 0.5) !important;
    height: calc(var(--box-size) * 0.5) !important;
  }

  .bg-image-wrapper {
    display: none; /* Hide background image on very small screens */
  }
}
</style>

