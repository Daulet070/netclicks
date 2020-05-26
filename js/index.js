const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2'
const API_KEY = '1518c8d23d5c76c82acee36ddf42087e';

// Menu
console.log('Test: JS works!');
const leftMenu = document.querySelector('.left-menu'),
      hamdurger = document.querySelector('.hamburger'),
      tvShowsList = document.querySelector('.tv-shows__list'),
      modal = document.querySelector('.modal');

const DBService = class {
  
  getData = async (url) => {
    const res = await fetch(url);
    
    if (res.ok) {
      return res.json();
    } else {
      throw new Error (`Не удалось получить данные до адресу ${url}`)
    }
  }

  getTestData = () => {
    return this.getData('test.json')
  }
}

const renderCard = response => {
  tvShowsList.textContent = '';
  response.results.forEach((item) => {
    
    const {
      backdrop_path: backdrop,
      name: title,
      poster_pasth: poster,
      vote_average: vote
    } = item;
    
    const posterIMG = poster ? IMG_URL + poster : 'img/no-poster.jpg';
    const backdropIMG = '';
    const voteElem = '';

    const card = document.createElement('li');
    card.className = 'tv-shows__item';
    card.innerHTML = `
      <a href="#" class="tv-card">
        <span class="tv-card__vote">${vote}</span>
        <img class="tv-card__img"
            src="${posterIMG}"
            data-backdrop="${IMG_URL + backdrop}" alt="${title}">
        <h4 class="tv-card__head">${title}</h4>
      </a>`;
    tvShowsList.append(card)
    console.log(card);
  });

}
// new DBService
new DBService().getTestData().then(renderCard);

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

// Hover images

const changeImage = event => {
  const card = event.target.closest('.tv-card__item');
  
  if (card) {
    const img = card.querySelector('.tv-card__img');
    
    if (img.dataset.backdrop) {
      [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src];
    }
  }
};

// Open modal window

tvShowsList.addEventListener('click', event => {
  const target = event.target;
  const card = target.closest('.tv-card');

  if (card) {
    document.body.style.overflow = 'hidden';
    modal.classList.remove('hide');
  }
});

// Close modal window
modal.addEventListener('click', event => {
  const target = event.target;

  if (target.closest('.cross') ||
      target.classList.contains('modal')) {
    
    document.body.style.overflow = '';
    modal.classList.add('hide');
  }
});