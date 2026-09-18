<template>
  <article class="experience-entry">
    <component
      :is="experience.link ? 'a' : 'div'"
      :href="experience.link"
      class="experience-logo-link"
      :aria-label="experience.link ? experience.company + ' website' : undefined"
    >
      <img :src="experience.logo" class="experience-logo" :alt="experience.company + ' logo'" width="128" height="128" loading="lazy">
    </component>
    <div class="experience-details">
      <div class="experience-heading">
        <h3>
          <a v-if="experience.link" :href="experience.link" class="experience-company">{{ experience.company }}</a>
          <span v-else class="experience-company">{{ experience.company }}</span>
        </h3>
        <p class="experience-dates">{{ experience.dates }}</p>
      </div>
      <p class="experience-role">{{ experience.role }}</p>
      <p v-if="experience.mentors?.length" class="experience-mentor">
        {{ experience.mentors.length === 1 ? 'Mentor' : 'Mentors' }}:
        <template v-for="(mentor, index) in experience.mentors" :key="mentor.name">
          <span v-if="index > 0">, </span>
          <a v-if="mentor.link" :href="mentor.link" class="mentor-link">{{ mentor.name }}</a>
          <span v-else>{{ mentor.name }}</span>
        </template>
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { ExperienceData } from '../experiences';

defineProps<{ experience: ExperienceData }>();
</script>

<style scoped>
.experience-entry {
  display: flex;
  align-items: center;
  gap: 28px;
  width: min(620px, 100%);
  margin-left: auto;
  margin-right: 110px;
  padding: 0 0 20px;
  color: #000;
}

.experience-logo-link {
  flex: 0 0 128px;
}

.experience-logo {
  display: block;
  width: 128px;
  height: 128px;
  object-fit: contain;
}

.experience-details {
  flex: 1;
  min-width: 0;
}

.experience-heading {
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 8px 24px;
}

.experience-heading h3 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
}

.experience-company {
  color: #000;
  text-decoration: none;
}

.experience-company:hover,
.experience-company:focus-visible {
  text-decoration: underline;
}

.experience-dates {
  margin: 0;
  font-size: 22px;
  color: #555;
}

.experience-role,
.experience-mentor {
  margin: 4px 0 0;
  font-size: 22px;
  line-height: 1.5;
}


.experience-entry + .experience-entry {
  margin-top: 24px;
}

.mentor-link {
  color: #660874;
  text-decoration: none;
  font-weight: 400;
}

.mentor-link:hover {
  text-decoration: underline;
}

@media (max-width: 960px) {
  .experience-entry {
    margin-right: 0;
  }
}

@media (max-width: 600px) {
  .experience-entry {
    align-items: flex-start;
    gap: 18px;
    width: auto;
    margin: 0;
    padding: 8px 4px 20px;
  }

  .experience-logo-link {
    flex-basis: 72px;
  }

  .experience-logo {
    width: 72px;
    height: 72px;
  }

  .experience-heading h3 {
    font-size: 23px;
  }

  .experience-dates,
  .experience-role,
  .experience-mentor {
    font-size: 16px;
  }

}
</style>
