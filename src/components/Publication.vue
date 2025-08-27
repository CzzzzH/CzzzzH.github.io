<template>
    <el-row class="publication" :gutter="5">
        <el-col :span="8">
            <img class="publication-image" :src="publication.image" :alt="publication.title" />
        </el-col>
        <el-col :span="14">
            <el-row class="publication-title-row">
                <el-col :span="22">
                    <p class="publication-title"><b>{{ publication.title }}</b></p>
                </el-col>
            </el-row>
            <el-row class="publication-authors-row">
                <el-col :span="22">
                    <p class="publication-authors" v-html="publication.authors"></p>
                </el-col>
            </el-row>
            <el-row class="publication-publisher-row">
                <el-col :span="24">
                    <p class="publication-publisher" v-html="publication.publisher"></p>
                </el-col>
            </el-row>
            <el-row class="publication-buttons-row">
                <el-col :span="24">
                    <span v-for="(button, index) in publication.buttons" :key="index" class="button-container">
                        <el-button class="publication-button" :plain="true" :disabled="button.disabled"
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
    name: 'publication',
    props: {
        publication: {
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

.publication {
    display: flex;
    padding: 20px;
}

.publication-image {
    width: 300px;
    height: 200px;
}

.publication-title {
    margin: 0px;
    font-size: 18px;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
}

.publication-authors {
    margin: 0px;
    margin-top: -25px;
    font-size: 16px;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
}

.publication-publisher {
    margin: 0px;
    margin-top: -5px;
    font-size: 16px;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
}

.publication-title-row {
    height: 40%;
}

.publication-authors-row {
    height: 15%;
}

.publication-publisher-row {
    height: 25%;
}

.project-buttons-row {
    height: 20%;
}

.publication-button {
    margin-top: -10px;
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

.publication-button:hover {
    color: purple;
    border-color: purple;
}

.publication-button:focus {
    color: purple;
    border-color: purple;
}

.video-player {
    width: 100%;
}
</style>

<style>
.highlight-pub{
    color: rgb(1, 31, 091);
    font-weight: bold;
}
</style>