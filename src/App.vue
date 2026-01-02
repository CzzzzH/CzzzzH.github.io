<template>
  <div class="app">
    <!-- Header Navigation -->
    <header class="site-header">
      <nav class="header-nav">
        <a href="#biography" class="nav-link">Biography</a>
        <span class="nav-separator">/</span>
        <a href="#publications" class="nav-link">Publications</a>
        <span class="nav-separator">/</span>
        <a href="#projects" class="nav-link">Projects</a>
        <span class="nav-separator">/</span>
        <a href="#services" class="nav-link">Services</a>
      </nav>
    </header>

    <el-container direction="vertical" class="container">
      <el-main class="main">
        <div class="content">
          <section id="biography" class="hero">
            <div class="hero-left">
              <h1 class="name">Chuhao Chen</h1>
              <div class="action-row">
                <a href="mailto:morphling233@gmail.com" class="action-button">
                  <i class="fas fa-envelope"></i>
                  <span>Email</span>
                </a>
                <a href="https://github.com/CzzzzH" class="action-button" target="_blank" rel="noopener noreferrer">
                  <i class="fab fa-github"></i>
                  <span>GitHub</span>
                </a>
                <a href="https://www.semanticscholar.org/author/Chuhao-Chen/2366153083" class="action-button" target="_blank" rel="noopener noreferrer">
                  <i class="fas fa-graduation-cap"></i>
                  <span>Scholar</span>
                </a>
                <a href="https://www.linkedin.com/in/chuhao-chen-317832231/" class="action-button" target="_blank" rel="noopener noreferrer">
                  <i class="fab fa-linkedin-in"></i>
                  <span>LinkedIn</span>
                </a>
              </div>
              <div class="bio-panel">
                <p class="bio">
                  I currently work as a Research Assistant at
                  <a href="https://www.upenn.edu/" class="bio-link">University of Pennsylvania</a>, advised by
                  <a href="https://lingjie0206.github.io/" class="bio-link">Prof. Lingjie Liu</a>. Previously, I obtained my master degree in Computer Science at
                  <a href="https://ucsd.edu/" class="bio-link">UC San Diego</a>, where I had a pleasure time working with
                  <a href="https://cseweb.ucsd.edu/~tzli/" class="bio-link">Prof. Tzu-Mao Li</a>. I also interned in
                  <a href="https://cseweb.ucsd.edu/~haosu/" class="bio-link">SU Lab</a> at UCSD, working with <a href="https://cseweb.ucsd.edu/~haosu/" class="bio-link">Prof. Hao Su</a> and
                  <a href="https://cseweb.ucsd.edu/~mil070/" class="bio-link">Dr. Minghua Liu</a>. I obtained my bachelor degree in
                  Computer Science at <a href="https://www.tsinghua.edu.cn/en/" class="bio-link">Tsinghua University</a>, where I did research in
                  <a href="https://cg.cs.tsinghua.edu.cn/" class="bio-link">The Graphics and Geometric Computing Group</a>, advised by
                  <a href="https://cg.cs.tsinghua.edu.cn/#people.htm#shimin.htm" class="bio-link">Prof. Shi-Min Hu</a>.
                </p>
                <p class="bio">
                  My research focuses on various topics spanning <b>Computer Graphics</b>, <b>Computer Vision</b>, and <b>Machine Learning</b>. I am particularly interested in visual generation now, where I explore how prior and techniques from graphics can be leveraged to enhance modern visual foundation models. My long-term goal is to develop intelligent systems capable of generating visual contents with superior quality, realism, and controllability.
                </p>
              </div>
            </div>
            <div class="hero-right">
              <div class="photo-frame">
                <img class="photo" src="@/assets/avatar.png">
              </div>
            </div>
          </section> 
          <div id="publications">
            <SectionTitle 
                text="PUBLICATIONS" 
                :font-size="40"
                :cap-size="1.6"
                :box-size="105"
                :box-offset-x="45"
                :box-offset-y="48" 
                :image-width="450"
                :image-height="200"
                :image-x="300"
                :image-y="70" 
                image-src="/publications_icon.png"
            />    
            <Publication 
              v-for="pub in pubs" 
              :key="pub.id" 
              :publication="pub"
            />
          </div>
          <div id="projects">
            <SectionTitle 
                text="PROJECTS" 
              :font-size="40"
              :cap-size="1.6"
              :box-size="100"
              :box-offset-x="40"
              :box-offset-y="48" 
              :image-width="450"
              :image-height="300"
              :image-x="250"
              :image-y="70"
              :marginTop="80"
              :marginLeft="900"
              image-src="/projects_icon.png"
          />   
          <ProjectCard 
            category="Graphics" 
            :categoryId="0"
            :textX="60"
            :icon-size="450"
            :icon-x="460"
            :icon-y="50"
            icon-color-light="#fffda1"
            icon-color-dark="#ccc57a"

          />
          <ProjectCard 
            category="Vision" 
            :categoryId="1" 
            :textX="860"
            :icon-size="440"
            :icon-x="730"
            :icon-y="50"
            icon-color-light="#fcd7ed"
            icon-color-dark="#db91bc"
          />
          <ProjectCard 
            category="Game" 
            :categoryId="2"
            :textX="180"
            :icon-size="400"
            :icon-x="460"
            :icon-y="55"
            icon-color-light="#d7fcc2"
            icon-color-dark="#91a686"
          />
          <ProjectCard 
            category="Miscellaneous" 
            :categoryId="3"
            :textX="840"
            :icon-size="280"
            :icon-x="710"
            :icon-y="50"
            icon-color-light="#ccf5ff"
            icon-color-dark="#8fa5b8"
          />
          </div>
          <div id="services">
            <SectionTitle 
                text="SERVICES" 
              :font-size="40"
              :cap-size="1.6"
              :box-size="105"
              :box-offset-x="45"
              :box-offset-y="55" 
              :image-width="450"
              :image-height="400"
              :image-x="330"
              :image-y="150" 
              :marginTop="120"
              :marginBottom="100"
              :bgImageWidth="70"
              :bgImageHeight="70"
              image-src="/services_icon.png"
          /> 
          <Services :padding-left="30" />
          </div>
          <!-- ClustrMaps widget (hidden but script still loads for tracking) -->
          <div ref="clustrMapContainer" class="clustrmaps-hidden"></div>
        </div>
      </el-main>
    </el-container>

    <!-- Footer -->
    <footer class="site-footer">
      <p class="footer-text">Last Updated: Jan. 2026</p>
      <p class="footer-text">© 2026 Chuhao Chen</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import ProjectCard from './components/ProjectCard.vue'
import Publication from './components/Publication.vue'
import SectionTitle from './components/SectionTitle.vue'
import Services from './components/Services.vue'
import projects from './projects'
import publications from './publications'

export default defineComponent({
  name: 'App',
  components: {
    ProjectCard,
    Publication,
    SectionTitle,
    Services,
  },
  
  setup() {
    // Get a list of distinct categories
    const categories = [...new Set(projects.map((project: { category: any; }) => project.category))];
    const category_id = [...new Set(projects.map((project: {
[x: string]: any; id: number; category: string; title: string; image: string; description: string; buttons: ({ icon: string; text: string; videoSrc: string; link?: undefined; } | { icon: string; text: string; link: string; videoSrc?: undefined; })[]; 
}) => project.category_id))];
    const pubs = computed(() => {return publications;});

    const clustrMapContainer = ref<HTMLDivElement | null>(null)
    onMounted(() => {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.id = 'clustrmaps'
      script.src = '//cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=300&t=tt&d=THVTe2YB5KOZKR5GWWlFYej4NecUmnTKFe_CjsTVzLI&co=2d78ad&cmo=9b00ff&cmn=ff5353&ct=ffffff'

      // Append to body or specific container
      if (clustrMapContainer.value) {
        clustrMapContainer.value.appendChild(script)
      }
    })

    return {
      categories,
      category_id,
      pubs,
      clustrMapContainer,
    };
  }

  

})
</script>

<style scoped>

:global(html),
:global(body) {
  height: 100%;
  background: #ffffff;
  font-family: 'Source Sans 3', 'Helvetica Neue', Arial, sans-serif;
  color: #111827;
}

.app {
  min-height: 100vh;
  background-color: #ffffff;
}

/* Header Navigation */
.site-header {
  position: fixed; 
  top: 0;
  right: 0;
  padding: 20px 40px;
  z-index: 100;
  background: transparent;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-link {
  color: #000;
  text-decoration: none;
  font-size: 21px;
  font-family: 'Source Sans 3', 'Helvetica Neue', Arial, sans-serif;
  font-weight: 500;
  transition: text-decoration 0.2s ease;
}

.nav-link:hover {
  text-decoration: underline;
}

.nav-separator {
  color: #000;
  font-size: 16px;
  font-weight: 400;
}

/* Footer */
.site-footer {
  background: #000;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
}

.footer-text {
  margin: 0;
  color: #fff;
  font-size: 18px;
  font-family: 'Source Sans 3', 'Helvetica Neue', Arial, sans-serif;
  font-weight: 400;
}

/* Hide ClustrMaps widget but keep script for tracking */
.clustrmaps-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.container {
  min-height: 100vh;
}

.main {
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 48px 0px 56px;
}

.content {
  width: 100%;
  max-width: 1290px;
  padding: 32px 48px 64px;
  margin: 0 16px;
  background-color: #ffffff;
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 56px 0 24px;
}

.section-heading.right {
  justify-content: flex-end;
}

.hero {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 48px;
}

.hero-left {
  flex: 1 1 520px;
  min-width: 0;
}

.hero-right {
  flex: 0 0 320px;
  display: flex;
  justify-content: center;
}

.name {
  font-size: 60px;
  margin: 0 0 5px;
  font-weight: 700;
  letter-spacing: 0.2px;
  color: #000000;
}

.action-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}

.action-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 4px 16px;
  border: 0.5px solid #00000013;
  border-radius: 4px;
  text-decoration: none;
  color: #000000;
  background: #ffffff;
  font-weight: 600;
  letter-spacing: 0.2px;
  transition: all 0.2s ease;
}

.action-button:hover {
  background: #000000;
  color: #ffffff;
  box-shadow: 0 8px 20px rgba(15, 44, 58, 0.12);
}

.bio-panel {
  margin-top: 8px;
  border: none;
  border-radius: 12px;
  padding: 10px 0;
  background: #ffffff;
  min-height: 260px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.bio {
  font-size: 22px;
  font-weight: 400;
  line-height: 1.7;
  margin: 0;
}

.bio-link {
  color: #660874;
  text-decoration: none;
  font-weight: 400;
}

.bio-link:hover {
  text-decoration: underline;
}

.photo-frame {
  border: none;
  border-radius: 12px;
  padding-top: 40px;

  background: #ffffff;
  max-width: 320px;
  width: 100%;
}

.photo {
  width: 100%;
  aspect-ratio: 0.618 / 1;
  object-fit: cover;
  border-radius: 8px;
  /* Shift the image position within the frame */
  object-position: 48% 50%;
}

.section-title {
  font-size: 26px;
  margin: 48px 0 20px;
  font-weight: 600;
  color: #000000;
  letter-spacing: 0.3px;  
}

@media (max-width: 960px) {
  .main {
    padding: 32px 0 48px;
  }

  .content {
    padding: 24px 24px 56px;
  }

  .hero {
    gap: 24px;
  }

  .hero-left {
    flex: 1 1 100%;
  }

  .hero-right {
    flex: 1 1 100%;
  }

  .photo-frame {
    margin: 0 auto;
  }
}

@media (max-width: 600px) {
  .name {
    font-size: 36px;
  }

  .bio-panel {
    padding: 22px 20px;
  }

  .section-title {
    font-size: 22px;
  }
}
</style>
