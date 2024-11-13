document.addEventListener('mousemove', (e) => {
  const mousePosition = {
    x: e.clientX,
    y: e.clientY,
  };

  const mouseX = (1 / window.innerWidth) * mousePosition.x * 2 - 1,
    mouseY = (1 / window.innerHeight) * mousePosition.y * 2 - 1;

  document.body.style.setProperty('--mouse-x', mouseX.toString());
  document.body.style.setProperty('--mouse-y', mouseY.toString());
});
