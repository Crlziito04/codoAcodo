document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('menuBurger');
  const menu = document.getElementById('listMenu');

  burger.addEventListener('click', () => {
    if (menu.classList.contains('inactive')) {
      menu.classList.remove('inactive');
      menu.classList.add('menu');
    } else {
      menu.classList.remove('menu');
      menu.classList.add('inactive');
    }
  });
});
