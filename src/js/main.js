$(document).ready(function () {
   $('.slider').slick({
      dots: true,
      dotsClass: 'slider__dots',
      arrows: false
   })
});


let searchBtn = document.querySelector('.header__search');
let searchInput = document.querySelector('.header__find');

searchBtn.addEventListener('click', function () {
   searchInput.classList.toggle('header__find-active')
   
})


// Блок about

let aboutCaret = document.querySelectorAll('.about__icon');
let aboutHeader = document.querySelectorAll('.about__header');
let aboutDropdown = document.querySelectorAll('.about__dropdown');

for (let i = 0; i < aboutCaret.length; i++) {
   aboutDropdownToggle(aboutCaret[i], aboutHeader[i], aboutDropdown[i]);
}

function aboutDropdownToggle(caret, header, dropdown, item) {
   caret.addEventListener('click', function () {
      if (caret.classList.contains('about__icon_active')) {
         caret.classList.remove('about__icon_active');
         caret.innerText = '+'
         header.classList.remove('about__header_active');
         dropdown.classList.remove('about__dropdown_active');
      }
      else {
         for (let i = 0; i < aboutCaret.length; i++) {
            aboutCaret[i].classList.remove('about__icon_active');
            aboutCaret[i].innerText = '+';
            aboutHeader[i].classList.remove('about__header_active');
            aboutDropdown[i].classList.remove('about__dropdown_active');
         }
         caret.classList.add('about__icon_active');
         caret.innerText = '-'
         header.classList.add('about__header_active');
         dropdown.classList.add('about__dropdown_active');
      }

   })
}

// Блок Works

// Данные для карточек
let worksCards = [
   {
      image: 'works-1.png',
      type: 'web',
      title: 'Our Work Image 01',
      text: 'Lorem ipsum dolor sit amet, consectetur'
   },
   {
      image: 'works-2.png',
      type: 'photo',
      title: 'Our Work Image 02',
      text: 'Lorem ipsum dolor sit amet, consectetur'
   },
   {
      image: 'works-3.png',
      type: 'web',
      title: 'Our Work Image 03',
      text: 'Lorem ipsum dolor sit amet, consectetur'
   },
   {
      image: 'works-4.png',
      type: 'web',
      title: 'Our Work Image 04',
      text: 'Lorem ipsum dolor sit amet, consectetur'
   },
   {
      image: 'works-5.png',
      type: 'photo',
      title: 'Our Work Image 05',
      text: 'Lorem ipsum dolor sit amet, consectetur'
   },
   {
      image: 'works-6.png',
      type: 'photo',
      title: 'Our Work Image 06',
      text: 'Lorem ipsum dolor sit amet, consectetur'
   },
   {
      image: 'works-5.png',
      type: 'web',
      title: 'Our Work Image 07',
      text: 'Lorem ipsum dolor sit amet, consectetur'
   },
   {
      image: 'works-6.png',
      type: 'photo',
      title: 'Our Work Image 08',
      text: 'Lorem ipsum dolor sit amet, consectetur'
   },
   {
      image: 'works-4.png',
      type: 'print',
      title: 'Our Work Image 09',
      text: 'Lorem ipsum dolor sit amet, consectetur'
   },
   {
      image: 'works-3.png',
      type: 'photo',
      title: 'Our Work Image 10',
      text: 'Lorem ipsum dolor sit amet, consectetur'
   },
   {
      image: 'works-2.png',
      type: 'photo',
      title: 'Our Work Image 11',
      text: 'Lorem ipsum dolor sit amet, consectetur'
   },
   {
      image: 'works-1.png',
      type: 'graphic',
      title: 'Our Work Image 12',
      text: 'Lorem ipsum dolor sit amet, consectetur'
   },
   {
      image: 'works-2.png',
      type: 'web',
      title: 'Our Work Image 13',
      text: 'Lorem ipsum dolor sit amet, consectetur'
   },
   {
      image: 'works-3.png',
      type: 'graphic',
      title: 'Our Work Image 14',
      text: 'Lorem ipsum dolor sit amet, consectetur'
   },
   {
      image: 'works-4.png',
      type: 'print',
      title: 'Our Work Image 15',
      text: 'Lorem ipsum dolor sit amet, consectetur'
   },
   {
      image: 'works-5.png',
      type: 'graphic',
      title: 'Our Work Image 16',
      text: 'Lorem ipsum dolor sit amet, consectetur'
   },
   {
      image: 'works-6.png',
      type: 'print',
      title: 'Our Work Image 17',
      text: 'Lorem ipsum dolor sit amet, consectetur'
   },
   {
      image: 'works-6.png',
      type: 'print',
      title: 'Our Work Image 17',
      text: 'Lorem ipsum dolor sit amet, consectetur'
   },
   {
      image: 'works-6.png',
      type: 'print',
      title: 'Our Work Image 17',
      text: 'Lorem ipsum dolor sit amet, consectetur'
   },
   {
      image: 'works-1.png',
      type: 'graphic',
      title: 'Our Work Image 18',
      text: 'Lorem ipsum dolor sit amet, consectetur'
   }
]

// Шаблон карточки
let worksItemTemplate = document.querySelector('#works').content.querySelector('.works__item');

// Массив карточек
let cardsArray = [];

// Создаем и добавляем в массив все карточки
for (let i = 0; i < worksCards.length; i++) {
      let newWorksItem = worksItemTemplate.cloneNode(true);
      let image = newWorksItem.querySelector('.works__image');
      let title = newWorksItem.querySelector('.works__title');
      let text = newWorksItem.querySelector('.works__subtitle');
      image.src = '../img/works/' + worksCards[i].image;
      newWorksItem.setAttribute('data-type', worksCards[i].type);
      title.innerText = worksCards[i].title;
      text.innerText = worksCards[i].text; 
      cardsArray.push(newWorksItem);  
}

let worksScreen = document.querySelector('.works__items');

// Добавляем карточки в контейнер
for (let i = 0; i < cardsArray.length; i++) {
   worksScreen.appendChild(cardsArray[i]);
}



let links = document.querySelectorAll('.works__category');
let types = ['', 'photo', 'graphic', 'web', 'print'];
let amount = cardsArray.length;

let worksCard = document.querySelector('.works__item');
let widthOfCard;
let heightOfCard = parseInt(getComputedStyle(worksCard).height);
let margin = parseInt(getComputedStyle(worksCard).margin);;
let widthWithMargins;
let heightWithMargins;

let heightOfList = parseInt(getComputedStyle(document.querySelector('.works__items')).height);

let wrapper = document.querySelector('.works__wrap')



let edge;
let columns;
let rows;

if (heightOfList <= 500) {
   rows = 1;
}
else {
   rows = 2;
}

widthOfCard = parseInt(getComputedStyle(worksCard).width);
widthWithMargins = widthOfCard + margin * 2;
heightWithMargins = heightOfCard + margin * 2;
columns = (Math.floor(document.documentElement.clientWidth / (widthWithMargins + 60) > 3)) ? 3 : Math.floor(document.documentElement.clientWidth / (widthWithMargins + 40));
wrapper.style.width = widthWithMargins * columns + 'px'
edge = 0 - (Math.ceil(amount / rows) - columns) * widthWithMargins;
let position = 0;

window.addEventListener('resize', function () {
   heightOfList = parseInt(getComputedStyle(document.querySelector('.works__items')).height);
   if (heightOfList <= 500) {
      rows = 1;
   }
   else {
      rows = 2;
   }
   
   edge = 0 - (Math.ceil(amount / rows) - columns) * widthWithMargins;
   widthOfCard = parseInt(getComputedStyle(worksCard).width);
   widthWithMargins = widthOfCard + margin * 2;
   heightWithMargins = heightOfCard + margin * 2;
   columns = (Math.floor(document.documentElement.clientWidth / (widthWithMargins + 60) > 3)) ? 3 : Math.floor(document.documentElement.clientWidth / (widthWithMargins +40));
   wrapper.style.width = widthWithMargins * columns + 'px';
   position = 0;
   worksScreen.style.left = '0px';
})


// Обработчики для кнопок вперед и назад
let prev = document.querySelector('.works__arrow_left');
let next = document.querySelector('.works__arrow_right');


prev.addEventListener('click', function () {
   if (position === 0) {
      worksScreen.style.left = '100px';
      setTimeout(function () {
         worksScreen.style.left = '0px';
      }, 300)
      
   }
   else {
      position += widthWithMargins;
      worksScreen.style.left = position + 'px';
   }
})

next.addEventListener('click', function () {
   
   if (position <= edge) {
      
      worksScreen.style.left = edge - 100 + 'px';
      setTimeout(function () {
         worksScreen.style.left = edge + 'px';
      }, 300)
      
   }
   else {
      position -= widthWithMargins;
      worksScreen.style.left = position + 'px';
   }
}) 



// Обработчики для ссылок блока категорий

// Категория ALL 
links[0].addEventListener('click', function (e) {
   e.preventDefault();

   worksScreen.style.left = '0px';
   position = 0;
   amount = cardsArray.length;
   for (let j = 0; j < cardsArray.length; j++) {
      cardsArray[j].classList.remove('works__hidden');
   }
   edge = 0 - (Math.ceil(amount / rows) - columns) * widthWithMargins; ;
})

// Остальные категории
for (let i = 1; i < links.length; i++) {
   links[i].addEventListener('click', function (e) {
      e.preventDefault();

      worksScreen.style.left = '0px';
      position = 0;
      amount = cardsArray.length;

      for (let j = 0; j < cardsArray.length; j++) {
         cardsArray[j].classList.remove('works__hidden');

         if (worksCards[j].type != types[i]) {
            cardsArray[j].classList.add('works__hidden');
            amount--;
         }
      }
      if (amount > rows * 2) {
         edge = 0 - (Math.ceil(amount / rows) - columns) * widthWithMargins;
      }
      else
         edge = 0;
   })
}

