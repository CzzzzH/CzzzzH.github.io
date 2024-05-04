<template>
    <el-card :class="{ 'even-card': isEven }" class="box-card" shadow="hover" @click="showDetails = !showDetails">
        <div class="card-image" :style="{
            backgroundImage: `url(${categoryImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }">&nbsp;</div>
        <div slot="header" class="clearfix">
            <span slot="title">{{ category }}</span>
        </div>
    </el-card>
    <transition name="expand" mode="out-in" @enter="enter" @beforeLeave="beforeLeave">
        <el-card class="collapse-card" v-if="showDetails">
            <Project v-for="project in categoryProjects" :key="project.id" :project="project" />
        </el-card>
    </transition>
</template>
  
<script lang="ts">
import { defineComponent, ref, computed, watchEffect } from 'vue'
import Project from './Project.vue'
import projects from '../projects'

export default defineComponent({
    name: 'ProjectCard',
    components: {
        ref,
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
        }
    },
    methods: {
        enter(el: Element, done: () => void) {
            // from 0px to auto
            const htmlEl = el as HTMLElement
            htmlEl .style.height = '0px'
            htmlEl .style.opacity = '0.5'
            setTimeout(() => {
                htmlEl .style.height = el.scrollHeight + 'px'
                htmlEl .style.opacity = '1'
                done()
            }, 0)
        },
        beforeLeave(el: Element) {
            // from auto to 0
            const htmlEl = el as HTMLElement
            htmlEl .style.height = el.scrollHeight + 'px'
            htmlEl.style.opacity = '1'
            setTimeout(() => {
                htmlEl .style.height = '0px'
                htmlEl .style.opacity = '0'
            }, 0)
        }
    },
    setup(props) {
        const showDetails = ref(false);
        const categoryImage = ref('');

        // Get the projects that belong to this category
        const categoryProjects = computed(() => {
            return projects.filter((project: { category: string }) => project.category === props.category);
        });

        // Calculate whether the category id is even
        const isEven = computed(() => {
            return (props.categoryId % 2 !== 0);
        });

        watchEffect(async () => {
            const imageModule = await import(`@/assets/${props.category}.png`);
            categoryImage.value = imageModule.default;
        });

        // console.log(categoryProjects.value);

        return {
            showDetails,
            categoryProjects,
            isEven,
            categoryImage
        };
    }
})
</script>

<style scoped>
.box-card {
    position: relative;
    width: 1050px;
    height: 100px;
    margin-bottom: 5px;
    cursor: pointer;
    filter: grayscale(100%);
    transition: filter 0.5s;
    overflow: hidden;
    /* ensure inner contents do not spill out */
}

.box-card::before {
    /* the new ::before rules */
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    transition: opacity 0.5s ease;
    z-index: 1;
}

.box-card:hover {
    filter: grayscale(0);
}

.box-card:hover::before {
    opacity: 0.5;
}

.card-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 1050px;
    height: 100px;
    background-image: center / cover no-repeat;
    filter: blur(5px);
    z-index: 0;
    /* ensure the image stays behind the content and overlay */
}

.clearfix {
    position: relative;
    z-index: 2;
    /* ensure the text stays in front */
    font-size: 60px;
    font-family: 'Poppins', sans-serif;
    color: white;
    margin-top: -15px;
    padding-left: 300px;
    /* adjust as per your design */
}

.even-card .clearfix {
    padding-left: 470px;
}

.collapse-card {
    width: 1050px;
    margin-top: 1px;
    background-color: #fff;
    transition: height 0.3s ease, opacity 0.3s ease;
    overflow: hidden;
}
</style>