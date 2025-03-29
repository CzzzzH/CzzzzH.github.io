<template>
  <div class="app">
    <el-container direction="vertical" class="container">
      <el-main class="main">
        <div class="content">
          <el-row class="profile">
            <el-col :span="8" class="avatar-container">
              <img class="avatar" src="@/assets/avatar.png" alt="avatar">
              <div class="icons">
                <a href="mailto:chc091@ucsd.edu" class="icon-link">
                  <i class="fas fa-envelope fa-3x"></i>
                </a>
                <a href="https://github.com/CzzzzH" class="icon-link">
                  <i class="fab fa-github fa-3x"></i>
                </a>
                <a href="https://www.linkedin.com/in/chuhao-chen-317832231/" class="icon-link">
                  <i class="fab fa-linkedin fa-3x"></i>
                </a>
              </div>
            </el-col>
            <el-col :span="16" class="info">
              <p class="name"><b>Chuhao&nbspChen</b></p>
              <p class="bio">I am a research assistant & an incoming PhD student at &nbsp&nbsp<a href="https://www.upenn.edu/"
                  class="bio-link">University of Pennsylvania</a>&nbsp&nbsp, fortunately advised by Prof.&nbsp&nbsp&nbsp<a href="https://lingjie0206.github.io/"
                  class="bio-link">Lingjie Liu</a>&nbsp&nbsp. I obtained my master degree in Computer Science at &nbsp&nbsp<a
                  href="https://ucsd.edu/" class="bio-link">UC San Diego</a>&nbsp&nbsp, where I have a pleasure time working with Prof.&nbsp&nbsp&nbsp<a
                  href="https://cseweb.ucsd.edu/~tzli/" class="bio-link">Tzu-Mao Li&nbsp&nbsp</a>. I also interned in&nbsp&nbsp <a
                  href="https://cseweb.ucsd.edu/~haosu/" class="bio-link">SU Lab</a>&nbsp&nbsp&nbspwhen I was in UCSD. I obtained my bachelor degree in
                  Computer Science at &nbsp&nbsp<a href="https://www.tsinghua.edu.cn/en/" class="bio-link">Tsinghua University</a>&nbsp&nbsp, where I did research in &nbsp&nbsp<a
                  href="https://cg.cs.tsinghua.edu.cn/" class="bio-link">The Graphics and Geometric Computing
                  Group</a>&nbsp&nbsp, advised by Prof.&nbsp&nbsp <a href="https://cg.cs.tsinghua.edu.cn/#people.htm#shimin.htm"
                  class="bio-link">Shi-Min Hu</a>&nbsp&nbsp.
              </p>
              <p class="bio">I am interested in various topics in Computer Graphics and Computer Vision and Machine Learning. My main research
                interest focus on the intersection of graphics and AI, exploring how to use ML/DL methods to
                improve the physically-based rendering and simulation. I am also interested in 3D vision
                topics of percepting and understanding 3D scenes with learning-based methods.</p>
            </el-col>
          </el-row>
          <h2 class="section-title">Research Projects</h2>
          <Publication v-for="pub in pubs" :key="pub.id" :publication="pub" />
          <h2 class="section-title">Other Projects  &nbsp(Click the cards to expand)</h2>
          <ProjectCard v-for="(category, index) in categories" :key="category" :category="category" :categoryId="index" />
          <h2 class="section-title">Activities</h2>
          <el-row>
          <el-col :span="16" class="activities">
            <p class="bio"><b>Teaching Assistant:</b>&nbsp&nbsp&nbsp&nbsp<a href="https://neural-representation-2024.github.io" class="bio-link">CIS-7000</a>&nbsp&nbsp,&nbsp&nbsp<a href="https://cis5800.github.io/" class="bio-link">CIS-5800</a></p>
            <p class="bio"><b>Reviewer:</b>&nbsp&nbsp CVPR 2025, Pacific Graphics 2024 </p>
            <p class="bio"><b>Talk:</b>&nbsp&nbsp SoCal Rendering Day 2024 </p>
          </el-col>
          </el-row>
          <div ref="clustrMapContainer"></div>
          <!-- <script type='text/javascript' id='clustrmaps' src='//cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=300&t=tt&d=THVTe2YB5KOZKR5GWWlFYej4NecUmnTKFe_CjsTVzLI&co=2d78ad&cmo=9b00ff&cmn=ff5353&ct=ffffff'></script> -->
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import ProjectCard from './components/ProjectCard.vue'
import Publication from './components/Publication.vue'
import projects from './projects'
import publications from './publications'

export default defineComponent({
  name: 'App',
  components: {
    ProjectCard,
    Publication,
  },
  
  setup() {
    // Get a list of distinct categories
    const categories = [...new Set(projects.map((project: { category: any; }) => project.category))];
    const category_id = [...new Set(projects.map((project: {
[x: string]: any; id: number; category: string; title: string; image: string; description: string; buttons: ({ icon: string; text: string; videoSrc: string; link?: undefined; } | { icon: string; text: string; link: string; videoSrc?: undefined; })[]; 
}) => project.category_id))];
    const pubs = computed(() => {return publications;});

    const clustrMapContainer = ref(null)
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
      clustrMapContainer
    };
  }

  

})
</script>

<style scoped>
* {
  margin: -5px;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

.app {
  min-height: 100vh;
  background-color: #f9f9f9;
}

.container {
  min-height: 100vh;
}

.main {
  background-color: #696969;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  padding: 70px;
  height: auto;
  width: 1200px;
  background-color: #fff;
}

.avatar {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 50px;
}

.icons {
  display: flex;
  width: 60%;
  margin-left: 43px;
  margin-top: 33px;
}

.icon-link {
  color: black;
  transition: color 0.3s ease;
  margin: auto;
}

.icon-link:hover {
  color: purple;
}

.info {
  padding-top: 10px;
  padding-left: 50px;
  flex: 1;
}

.activities {
  padding-top: 10px;
  padding-left: 30px;
  flex: 1;
}

.name {
  font-size: 40px;
  margin-top: 30px;
  margin-bottom: 30px;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
}

.bio {
  font-size: 16px;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  line-height: 26px;
  margin-bottom: 20px;
}

.bio-link {
  color: purple;
  text-decoration: none;
}

.bio-link:hover {
  text-decoration: underline;
}

.section-title {
  font-family: 'Lato', sans-serif;
  font-size: 26px;
  margin: 50px 10px 20px 0px;
}
</style>
