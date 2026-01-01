export default [
    {
        id: 2,
        category: 'Graphics',
        title: 'Simulation of 3D fluid system',
        image: '/Graphics/mpm.png',
        description: 'A mini project that implements a 3D fluid system simulation with <b>Taichi</b>. <br/>' +
            'The designed system is based on MLS-MPM (moving least squares material point method). <br/>' +
            'We implemented three different materials: fluid, elastic and snow (a special elastic).',
        buttons: [
            {
                icon: 'fa-solid fa-circle-play fa-2x',
                text: 'Video',
                videoSrc: '/Graphics/mpm.mp4'
            },
            {
                icon: 'fab fa-github fa-2x',
                text: 'Code',
                link: 'https://github.com/CzzzzH/MLS-MPM'
            }
        ]
    },
    {
        id: 3,
        category: 'Graphics',
        title: 'Learning-based Monte Carlo Denoisers',
        image: '/Graphics/denoise.png',
        description: 'A project that implements several learning-based Monte Carlo denoisers including KPCN and SBMC. ' +
            'We provide a pipeline that makes it easy to compare different methods, which contains ' +
            '(1) Generation of a large dataset with simple ShapeNet models ' +
            '(2) Evaluating different denoising methods on this self-designed dataset',
        buttons: [
            {
                icon: 'fab fa-github fa-2x',
                text: 'Code',
                link: 'https://github.com/CzzzzH/Denoiser'
            }
        ]
    },
    {
        id: 4,
        category: 'Graphics',
        title: 'Photorealistic Renderer',
        image: '/Graphics/sppm.png',
        description: 'A toy physically-based renderer that implements Stochastic Progressive Photon Mapping (SPPM) algorithm.',
        buttons: [
            {
                icon: 'fab fa-github fa-2x',
                text: 'Code',
                link: 'https://github.com/CzzzzH/Photorealistic-Renderer'
            },
        ]
    },
    {
        id: 5,
        category: 'Vision',
        title: 'JDet',
        image: '/Vision/jdet.png',
        description: 'An object detection benchmark based on <b>Jittor</b>. <br/>' +
            'This benchmark mainly focus on aerial image object detection (oriented object detection). <br/>' +
            'I worked as one of the main contributors during the time at Tsinghua Univeristy.',
        buttons: [
            {
                icon: 'fab fa-github fa-2x',
                text: 'Code',
                link: 'https://github.com/Jittor/JDet'
            },
        ]
    },
    {
        id: 6,
        category: 'Game',
        title: 'TuneStory',
        image: '/Game/ts.png',
        description: 'A tiny Music Game developped by <b>Qt</b>. <br/>' +
            'The game is on PC platform and supports players to compose their own song charts.',
        buttons: [
            {
                icon: 'fa-solid fa-circle-play fa-2x',
                text: 'Video',
                videoSrc: '/Game/ts.mp4'
            },
            {
                icon: 'fab fa-github fa-2x',
                text: 'Code',
                link: 'https://github.com/CzzzzH/TuneStory'
            },
        ]
    },
    {
        id: 7,
        category: 'Game',
        title: 'CASAL',
        image: '/Game/casal.png',
        description: 'A Location-based VR puzzle game developped with <b>Unity3D</b>. <br/>' +
            'We designed several episodes containing 4 different interacting ways in the demo. <br/> ' +
            'The game can be played on either PC platform or HTC Vive platform through SteamVR. ',
        buttons: [
            {
                icon: 'fa-solid fa-circle-play fa-2x',
                text: 'Video',
                videoSrc: '/Game/casal.mp4'
            },
        ]
    },
    {
        id: 8,
        category: 'Game',
        title: 'Casual Game Arena',
        image: '/Game/cga.png',
        description: 'A TUI-based mini-game platform developped with the Brick library of <b>Haskell</b>. <br/>' + 
            'A toy project for me to learn Functional Programming as a beginner.',
        buttons: [
            {
                icon: 'fab fa-github fa-2x',
                text: 'Code',
                link: 'https://github.com/CzzzzH/CSE230-Project'
            },
        ]
    },
    {
        id: 9,
        category: 'Miscellaneous',
        title: 'Amazing Electric Car',
        image: '/Miscellaneous/car.png',
        description: 'An engineering project for the <b>22nd Electronic Design Competition of Tsinghua University</b>. <br/> ' + 
            'We designed a tiny electric car which drives itself directed by the black taps on the floor and finishes the tasks in the competition. ' +
            'I programmed the control system of the car including a complex state machine and a PID controller.',
        buttons: [
            {   
                icon: 'fab fa-github fa-2x',
                text: 'Code',
                link: 'https://github.com/CzzzzH/EDC22-TeamYosoro'
            },
        ]
    },
    {
        id: 10,
        category: 'Miscellaneous',
        title: 'ETS Helper',
        image: '/Miscellaneous/ets.png',
        description: 'A useful QQ chatbot used for querying GRE/TOEFL test seats in mainland China. <br/>' + 
            'The bot cracks the captcha with a small pre-trained neural network at its backend.',
        buttons: [
            {   
                icon: 'fab fa-github fa-2x',
                text: 'Code',
                link: 'https://github.com/CzzzzH/ETSHelper'
            },
        ]
    },
]