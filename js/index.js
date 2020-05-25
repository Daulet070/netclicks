// Menu
console.log('Test: JS works!');
const leftMenu = document.querySelector('.left-menu');
const hamdurger = document.querySelector('.hamburger');


// Open/Close menu
hamdurger.addEventListener('click', () => {
  
  leftMenu.classList.toggle('openMenu');
  hamdurger.classList.toggle('open');

});

document.addEventListener('click', event => {

  const target = event.target;

  if (!target.closest('.left-menu')) {
    leftMenu.classList.remove('openMenu');
    hamdurger.classList.remove('open');
  }

});

leftMenu.addEventListener('click', event => {
  
  const target = event.target;
  const dropdown = target.closest('.dropdown');
  
  if (dropdown) {
    dropdown.classList.toggle('active');
    leftMenu.classList.add('openMenu');
    hamdurger.classList.add('open');
  }

});