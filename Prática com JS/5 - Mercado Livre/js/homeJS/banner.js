export function iniciarCarrossel(imagens, intervalo = 6000) {
  const banner = document.querySelector('.banner');

  imagens.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('slide');
    if (i === 0) img.classList.add('active');
    banner.appendChild(img);
  });

  const slides = banner.querySelectorAll('img');
  let index = 0;

  setInterval(() => {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
  }, intervalo);
}