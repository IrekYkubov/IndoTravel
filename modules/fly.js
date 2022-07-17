const docEl = document.documentElement;
const fly = document.createElement('div');
const screenWidth = window.screen.width;
if (screenWidth > 758) {
  fly.style.cssText = `
    position: fixed;
    width: 50px;
    height: 50px;
    right: 0;
    bottom: 0;
    pointer-events: none;
    background: url('img/airplane.svg') center/contain no-repeat;
  `;
  document.body.append(fly);

  const calcPositionFly = () => {
    const maxHeight = docEl.clientHeight - fly.clientHeight;
    const maxScroll = docEl.scrollHeight - docEl.clientHeight;
    const procentScroll = (window.scrollY * 100) / maxScroll;
    const bottom = maxHeight * (procentScroll / 100);
    fly.style.transform = `translateY(-${bottom}px)`;
  };
  window.addEventListener('scroll', () => {
    requestAnimationFrame(calcPositionFly);
  });
  calcPositionFly();
}


