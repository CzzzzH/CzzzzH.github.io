<template>
    <el-row class="project" :gutter="5">
        <el-col :span="6">
            <img class="project-image" :src="project.image" :alt="project.title" />
        </el-col>
        <el-col :span="18">
            <el-row class="project-title-row">
                <el-col :span="24">
                    <p class="project-title"><b>{{ project.title }}</b></p>
                </el-col>
            </el-row>
            <el-row class="project-description-row">
                <el-col :span="24">
                    <p class="project-description" v-html="project.description"></p>
                </el-col>
            </el-row>
            <el-row class="project-buttons-row">
                <el-col :span="24">
                    <span v-for="(button, index) in project.buttons" :key="index" class="button-container">
                        <el-button class="project-button" :plain="true" :disabled="button.disabled"
                            @click="handleButtonClick(button)">
                            <i :class="button.icon"></i>
                            &nbsp;&nbsp;<b class="button-text">{{ button.text }}</b>
                        </el-button>
                    </span>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
    <el-dialog v-model="isVideoModalVisible" :before-close="handleClose">
        <video controls autoplay muted playsinline :src="currentVideoSrc" class="video-player"></video>
    </el-dialog>
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
                console.log('Video source:', currentVideoSrc.value);
            } else if (button.link) {
                window.open(button.link, '_blank');
            }
        };

        const handleClose = () => {
            isVideoModalVisible.value = false;
            currentVideoSrc.value = ''; // Reset video source
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
.project {
    display: flex;
    padding: 20px;
}

.project-image {
    width: 200px;
    height: 200px;
}

.project-title {
    margin: 0px;
    font-size: 22px;
    font-family: 'Latos', sans-serif;
    font-weight: 400;
}

.project-description {
    margin: 0px;
    font-size: 16px;
    font-family: 'Latos', sans-serif;
    font-weight: 400;
}

.project-title-row {
    height: 20%;
}

.project-description-row {
    height: 60%;
}

.project-buttons-row {
    height: 20%;
}

.project-button {
    padding: 12px;
    color: rgba(0, 0, 0, 0.9);
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.3);
    border-radius: 14px;
    margin-right: 20px;
    font-size: 11px;
    /* replace with your desired font size */
}

.button-text {
    margin-top: 1px;
    font-size: 15px;
}

.project-button:hover {
    color: purple;
    border-color: purple;
}

.project-button:focus {
    color: purple;
    border-color: purple;
}

.video-player {
    width: 100%;
}
</style>