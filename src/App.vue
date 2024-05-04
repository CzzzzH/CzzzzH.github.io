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
              <p class="bio">I am a second-year Master student in Computer Science and Engineering Department of &nbsp<a
                  href="https://ucsd.edu/" class="bio-link">UC San Diego</a> , currently working with Prof.&nbsp <a
                  href="https://cseweb.ucsd.edu/~tzli/" class="bio-link"> Tzu-Mao Li</a> . Before coming to UCSD, I
                obtained my bachelor degree in Computer Science at &nbsp<a href="https://www.tsinghua.edu.cn/en/"
                  class="bio-link">Tsinghua University</a> , where I did research in &nbsp<a
                  href="https://cg.cs.tsinghua.edu.cn/" class="bio-link">The Graphics and Geometric Computing
                  Group</a> , advised by Prof.&nbsp<a href="https://cg.cs.tsinghua.edu.cn/#people.htm#shimin.htm"
                  class="bio-link"> Shi-Min Hu</a> .
              </p>
              <p class="bio">I am interested in various topics in Computer Graphics and Computer Vision. My main research
                interest focus on physically-based rendering, especially the topics of using learning-based methods to
                improve the rendering quality or accerlerate the rendering process. I am also interested in 3D vision
                topics of percepting and understanding 3D scenes with learning-based methods.</p>
            </el-col>
          </el-row>
          <h2 class="section-title">Research Projects</h2>
          <Publication v-for="pub in pubs" :key="pub.id" :publication="pub" />
          <h2 class="section-title">Other Projects  &nbsp(Click the cards to expand)</h2>
          <ProjectCard v-for="(category, index) in categories" :key="category" :category="category" :categoryId="index" />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
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
    return {
      categories,
      category_id,
      pubs
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

.name {
  font-size: 40px;
  margin-top: 30px;
  margin-bottom: 30px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
}

.bio {
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  line-height: 24px;
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
  font-family: 'Poppins', sans-serif;
  font-size: 26px;
  margin: 50px 10px 20px 0px;
}
</style>