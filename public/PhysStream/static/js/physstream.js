import { icon, speedMarkup, bindSpeed } from './player-ui.js';
const viewers = new Set();
const poster = src => src.replace(/\.mp4(?=\?|$)/, '.jpg');
const clip = (label, src, options = {}) => ({ label, src, ...options });

// Only the visible case owns video elements. Thumbnails never download videos.
class CaseViewer {
  constructor(id, cases, layout = 'comparison') {
    this.root = document.getElementById(id);
    this.cases = cases;
    this.layout = layout;
    this.index = 0;
    this.version = 0;
    this.playing = false;
    this.rate = 1;
    this.pending = null;
    this.root.innerHTML = `
      <div class="case-description"${layout === 'comparison' ? ' hidden' : ''}><h3></h3><p></p></div>
      <div class="media-grid ${layout}"></div>
      <div class="toolbar-scroll">
        <div class="viewer-controls${cases.length < 2 ? ' solo-controls' : ''}">
          <div class="transport-buttons">
            <button type="button" class="playback-button primary toggle" aria-label="Play all videos in this case" title="Play / pause">${icon('play')}</button>
            <button type="button" class="playback-button replay" aria-label="Restart all videos from the beginning" title="Restart">${icon('restart')}</button>
          </div>
          <div class="case-navigation"${cases.length < 2 ? ' hidden' : ''}>
            <button type="button" class="case-arrow previous" aria-label="Previous case">${icon('next')}</button>
            <div class="thumbnails" aria-label="Choose a case" style="--slots:${Math.min(4, cases.length)};--strip-width:${Math.min(4, cases.length) * 120 + (Math.min(4, cases.length) - 1) * 5}px"></div>
            <button type="button" class="case-arrow next" aria-label="Next case">${icon('next')}</button>
          </div>
          ${speedMarkup('Playback speed')}
        </div>
      </div>
      <div class="viewer-status" role="status"></div>
      <span class="sr-only case-counter" aria-live="polite"></span>`;
    this.grid = this.root.querySelector('.media-grid');
    this.toggle = this.root.querySelector('.toggle');
    this.progress = 0;
    this.status = this.root.querySelector('.viewer-status');
    this.root.querySelector('.previous').onclick = () => this.show(this.index - 1);
    this.root.querySelector('.next').onclick = () => this.show(this.index + 1);
    this.toggle.onclick = () => this.playing || this.pending ? this.pause() : this.play();
    this.root.querySelector('.replay').onclick = () => { this.pause(); this.seekTo(0); this.play(); };
    bindSpeed(this.root, rate => {
      this.rate = rate;
      this.videos.forEach(v => { v.playbackRate = this.rate; });
    });
    this.root.addEventListener('keydown', event => {
      if (event.target.closest('input, select, .speed-switch')) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault(); this.show(this.index + (event.key === 'ArrowLeft' ? -1 : 1));
      }
    });
    let pointerStart;
    this.grid.addEventListener('touchstart', e => { pointerStart = e.touches[0].clientX; }, { passive: true });
    this.grid.addEventListener('touchend', e => {
      const delta = e.changedTouches[0].clientX - pointerStart;
      if (Math.abs(delta) > 60) this.show(this.index + (delta < 0 ? 1 : -1));
    }, { passive: true });
    this.thumbs = cases.map((item, i) => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'thumbnail';
      button.setAttribute('aria-label', `Case ${i + 1}: ${item.title}`);
      const img = document.createElement('img');
      img.src = item.thumbnail || poster(item.media.find(m => m.src)?.src || '');
      img.alt = ''; img.loading = 'eager';
      button.append(img); button.onclick = () => this.show(i);
      this.root.querySelector('.thumbnails').append(button); return button;
    });
    viewers.add(this);
    this.show(0);
    new ResizeObserver(() => this.centerThumbnail(false)).observe(this.root.querySelector('.thumbnails'));
    new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) this.pause();
    }, { threshold: 0 }).observe(this.root);
  }

  show(index) {
    const nextIndex = Math.max(0, Math.min(index, this.cases.length - 1));
    if (this.videos && nextIndex === this.index) return;
    this.pause();
    this.version++;
    const version = this.version;
    this.videos?.forEach(v => { v.removeAttribute('src'); v.load(); });
    this.index = nextIndex;
    const item = this.cases[this.index];
    this.root.querySelector('.case-counter').textContent = `Case ${this.index + 1} of ${this.cases.length}: ${item.title}`;
    this.root.querySelector('.previous').disabled = this.index === 0;
    this.root.querySelector('.next').disabled = this.index === this.cases.length - 1;
    const heading = this.root.querySelector('.case-description h3');
    heading.replaceChildren();
    if (item.emphasis) {
      const [before, after] = item.title.split(item.emphasis);
      const strong = document.createElement('strong'); strong.textContent = item.emphasis;
      heading.append(before, strong, after || '');
    } else heading.textContent = item.title;
    if (item.sceneName) {
      const scene = document.createElement('span'); scene.className = 'scene-name'; scene.textContent = item.sceneName;
      heading.append(' · ', scene);
    }
    this.root.querySelector('.case-description p').textContent = item.subtitle || '';
    this.grid.replaceChildren(); this.videos = []; this.progress = 0; this.status.textContent = '';
    item.media.forEach(media => {
      const figure = document.createElement('figure');
      figure.className = `media-card${media.ours ? ' ours' : ''}${media.wide ? ' wide' : ''}`;
      const caption = document.createElement('figcaption'); caption.textContent = media.label;
      let element;
      if (!media.src) {
        element = document.createElement('div'); element.className = 'missing-media'; element.textContent = 'Result unavailable';
      } else if (media.image) {
        element = document.createElement('img'); element.src = media.src; element.alt = media.label; element.loading = 'lazy';
      } else {
        element = document.createElement('video');
        element.src = media.src; element.poster = poster(media.src);
        element.preload = 'none'; element.muted = true; element.playsInline = true;
        element.playbackRate = this.rate; element.setAttribute('aria-label', media.label);
        element.addEventListener('loadedmetadata', () => { if (version === this.version) this.updateTime(); });
        element.addEventListener('error', () => {
          if (version !== this.version || !element.getAttribute('src')) return;
          this.pause(); this.status.textContent = `${media.label} could not be loaded. Use the play button to retry.`;
        });
        this.videos.push(element);
      }
      figure.append(element);
      if (this.layout === 'comparison') figure.append(caption);
      this.grid.append(figure);
    });
    this.thumbs.forEach((thumb, i) => thumb.setAttribute('aria-current', String(i === this.index)));
    this.centerThumbnail(this.version > 1);
    this.updateTime();
  }

  centerThumbnail(animate) {
    const strip = this.root.querySelector('.thumbnails');
    const active = this.thumbs[this.index];
    // Four visible cases: keep the selected case in slot three, clamped at the ends.
    const target = active.offsetLeft - this.thumbs[Math.min(2, this.thumbs.length - 1)].offsetLeft;
    strip.scrollTo({
      left: Math.max(0, Math.min(target, strip.scrollWidth - strip.clientWidth)),
      behavior: animate && !matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'instant',
    });
  }

  setPlayLabel(label) {
    const names = { 'Play': 'play', 'Pause': 'pause', 'Cancel': 'stop' };
    this.toggle.innerHTML = icon(names[label]);
    this.toggle.setAttribute('aria-label', `${label} all videos in this case`);
  }

  pause() {
    this.pending?.abort(); this.pending = null;
    this.playing = false;
    cancelAnimationFrame(this.animation);
    this.videos?.forEach(v => v.pause());
    if (this.toggle) this.setPlayLabel('Play');
  }

  ready(video, signal) {
    if (video.readyState >= 3) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const finish = error => {
        clearTimeout(timer); video.removeEventListener('canplay', success); video.removeEventListener('error', failure);
        signal.removeEventListener('abort', abort); error ? reject(error) : resolve();
      };
      const success = () => finish();
      const failure = () => finish(new Error('A video could not be loaded. Use the play button to retry.'));
      const abort = () => finish(new DOMException('Playback cancelled', 'AbortError'));
      const timer = setTimeout(() => finish(new Error('The videos are taking longer to load. Use the play button to retry.')), 30000);
      video.addEventListener('canplay', success, { once: true }); video.addEventListener('error', failure, { once: true });
      signal.addEventListener('abort', abort, { once: true });
      video.preload = 'auto'; video.load();
    });
  }

  async play() {
    // A new panel becomes the active player; an offscreen case cannot keep running.
    viewers.forEach(viewer => { if (viewer !== this) viewer.pause(); });
    this.pause();
    const controller = new AbortController(); this.pending = controller;
    const version = this.version;
    const videos = [...this.videos];
    const progress = this.progress;
    this.setPlayLabel('Pause'); this.status.textContent = '';
    try {
      await Promise.all(videos.map(v => this.ready(v, controller.signal)));
      if (controller.signal.aborted || version !== this.version) return;
      this.seekTo(progress >= .995 ? 0 : progress);
      videos.forEach(video => { video.playbackRate = this.rate * video.duration / videos[0].duration; });
      await Promise.all(videos.map(v => v.play()));
      if (controller.signal.aborted || version !== this.version) { videos.forEach(v => v.pause()); return; }
      this.pending = null; this.playing = true; this.status.textContent = '';
      this.setPlayLabel('Pause');
      const tick = () => {
        if (!this.playing) return;
        const master = videos[0];
        if (master.ended) { this.pause(); this.seekTo(1); return; }
        // Correct drift, especially after one of the videos briefly buffers.
        const p = master.currentTime / master.duration;
        for (const video of videos.slice(1)) {
          const desired = p * video.duration;
          video.playbackRate = this.rate * video.duration / master.duration;
          if (Math.abs(video.currentTime - desired) > .10 && !video.seeking) video.currentTime = desired;
        }
        this.updateTime(); this.animation = requestAnimationFrame(tick);
      };
      this.animation = requestAnimationFrame(tick);
    } catch (error) {
      if (controller.signal.aborted || version !== this.version) return;
      this.pause(); this.status.textContent = error.message || 'Playback could not start. Please try again.';
    }
  }

  seekTo(progress) {
    this.videos.forEach(v => { if (Number.isFinite(v.duration)) v.currentTime = progress * Math.max(0, v.duration - .001); });
    this.progress = progress;
  }

  updateTime() {
    const master = this.videos?.[0];
    if (Number.isFinite(master?.duration) && master.duration) this.progress = master.currentTime / master.duration;
  }
}

const controls = [
  { scene: 'desk', sceneName: 'Desk', title: 'Different numbers and sequences of interactions', emphasis: 'numbers and sequences', subtitle: 'A tabletop scene with three different interaction sequences.', labels: ['Sequence 1', 'Sequence 2', 'Sequence 3'] },
  { scene: 'vase', sceneName: 'Vase', title: 'Different scales of velocity increment', emphasis: 'scales', subtitle: 'Change the strength of the input to change the resulting motion.', labels: ['Lower velocity increment', 'Medium velocity increment', 'Higher velocity increment'] },
  { scene: 'ancient', sceneName: 'Zig-zag', title: 'Mid-generation interventions', emphasis: 'Mid-generation', subtitle: 'Redirect a dish to interact with objects across the table.', labels: ['Interaction sequence 1', 'Interaction sequence 2', 'Interaction sequence 3'] },
  { scene: 'frog', sceneName: 'Origami Frog', title: 'Mid-generation interventions', emphasis: 'Mid-generation', subtitle: 'Guide an origami frog across successive wooden stumps.', labels: ['Interaction sequence 1', 'Interaction sequence 2', 'Interaction sequence 3'] },
].map(item => ({ ...item, media: item.labels.map((label, i) => clip(label, `assets/control/${item.scene}-${i}.mp4`)) }));
new CaseViewer('control-viewer', controls, 'triple');

try {
  const response = await fetch('static/js/cases.json', { cache: 'no-cache' });
  if (!response.ok) throw new Error('Case list unavailable');
  const cases = await response.json();
  new CaseViewer('comparison-viewer', cases.map(item => ({
    title: item.title, thumbnail: item.input, subtitle: 'Input & PhysStream above · Baselines below',
    media: [
      clip('Input + interaction', item.videos.control), clip('PhysStream (Ours)', item.videos.ours, { ours: true }),
      clip('Tora', item.videos.tora), clip('FlashMotion', item.videos.flashmotion),
      clip('DragStream', item.videos.dragstream), clip('RealWonder', item.videos.realwonder),
    ],
  })));
} catch {
  document.getElementById('comparison-viewer').innerHTML = '<p class="loading-message">Results could not be loaded. Please refresh the page.</p>';
}

const longCases = [
  ['Teacup random walk', 'teacup-10s.mp4'],
].map(([title, file]) => ({ title, subtitle: 'A teacup follows random pushes across the tabletop until it falls off the edge.', media: [clip('Control visualization  |  PhysStream', `assets/long/${file}`, { wide: true })] }));
new CaseViewer('long-viewer', longCases, 'single');

document.addEventListener('visibilitychange', () => { if (document.hidden) viewers.forEach(viewer => viewer.pause()); });
const pipeline = document.querySelector('.pipeline-shell iframe');
const pipelineCommand = (action, value) => pipeline.contentWindow?.postMessage({ type: 'pipeline-command', action, value }, location.origin);
document.getElementById('pipeline-play').onclick = () => pipelineCommand('toggle');
document.getElementById('pipeline-restart').onclick = () => pipelineCommand('restart');
const pipelineControls = document.querySelector('.pipeline-controls');
pipelineControls.querySelector('.pipeline-speed-slot').innerHTML = speedMarkup('Pipeline animation speed');
bindSpeed(pipelineControls, rate => pipelineCommand('speed', rate));
document.getElementById('pipeline-play').innerHTML = icon('play');
document.getElementById('pipeline-restart').innerHTML = icon('restart');
pipeline.addEventListener('load', () => pipelineCommand('state'));
window.addEventListener('message', event => {
  if (event.source !== pipeline.contentWindow || event.origin !== location.origin || event.data?.type !== 'pipeline-state') return;
  const button = document.getElementById('pipeline-play');
  button.innerHTML = icon(event.data.paused ? 'play' : 'pause');
  button.setAttribute('aria-label', event.data.paused ? 'Play pipeline animation' : 'Pause pipeline animation');
});
new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting) pipeline.contentWindow?.postMessage('pause-pipeline', location.origin);
}).observe(pipeline);
