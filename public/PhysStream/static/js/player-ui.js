// Shared, scalable icons keep every player visually consistent.
function roundedTriangle(points, inset = 2.5) {
  const corners = points.map((point, i) => {
    const near = other => {
      const length = Math.hypot(other[0] - point[0], other[1] - point[1]);
      return point.map((value, axis) => value + (other[axis] - value) * inset / length);
    };
    return { point, before: near(points[(i + 2) % 3]), after: near(points[(i + 1) % 3]) };
  });
  return `<path d="M${corners[0].before} ${corners.map((c, i) => `Q${c.point} ${c.after} L${corners[(i + 1) % 3].before}`).join(' ')}Z" fill="currentColor"/>`;
}

export function icon(name) {
  const paths = {
    play: roundedTriangle([[9, 4], [35, 20], [9, 36]], 3.5),
    pause: '<rect x="10" y="5" width="7" height="30" rx="2" fill="currentColor"/><rect x="24" y="5" width="7" height="30" rx="2" fill="currentColor"/>',
    restart: '<path d="M20 8a13 13 0 1 1-13 13" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>' + roundedTriangle([[20, 1], [12, 8], [20, 15]], 1.5),
    speed: roundedTriangle([[5.55, 9], [22.55, 20], [5.55, 31]]) + roundedTriangle([[17.45, 9], [34.45, 20], [17.45, 31]]),
    next: roundedTriangle([[1, 1], [23, 17], [1, 33]], 2.8),
    stop: '<rect x="8" y="8" width="24" height="24" rx="3" fill="currentColor"/>',
  };
  return `<svg viewBox="${name === 'next' ? '0 0 24 34' : '0 0 40 40'}" aria-hidden="true" focusable="false">${paths[name]}</svg>`;
}

export function speedMarkup(label) {
  return `<div class="speed-control"><span class="speed-icon">${icon('speed')}</span>
    <button type="button" class="speed-switch" data-rate="1" aria-label="${label}: 1x" aria-pressed="true" title="Switch between 0.5x and 1x">
      <span class="speed-track" aria-hidden="true"><span class="speed-thumb"></span></span>
      <span class="speed-options" aria-hidden="true"><span>0.5x</span><span>1x</span></span>
    </button></div>`;
}

export function bindSpeed(root, onChange) {
  const button = root.querySelector('.speed-switch');
  const label = button.getAttribute('aria-label').replace(/: 1x$/, '');
  const setRate = rate => {
    button.dataset.rate = String(rate);
    button.setAttribute('aria-label', `${label}: ${rate}x`);
    button.setAttribute('aria-pressed', String(rate === 1));
    onChange(rate);
  };
  button.addEventListener('click', () => setRate(button.dataset.rate === '1' ? .5 : 1));
  button.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault(); event.stopPropagation();
    setRate(event.key === 'ArrowLeft' ? .5 : 1);
  });
}
