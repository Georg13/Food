'use strict';
document.addEventListener('DOMContentLoaded', () => {
    console.log('I`m ready!');

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabcontainer');

    function hideTabContent(){
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item =>{
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', item => {
        
        let target = item.target;
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer

    const deadLine = '2022-01-10';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t /(1000 * 60 * 60 * 24)),
            hours = Math.floor((t /(1000 * 60 *60)) % 24),
            minutes = Math.floor(t /(1000 * 60) % 60),
            seconds = Math.floor((t /1000) % 60);

            return {
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
    }

    function getZero(num){
        if( num >=0 && num < 10){
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        
        let timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');
        
        updateClock();
        let timeInterval = setInterval(updateClock, 1000);

        function updateClock(){
        
            let t = getTimeRemaining(endtime);
    
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
    
        }
    }
   
    setClock('.timer', deadLine);

    // Modal
    
   const modalTrigger = document.querySelectorAll('[data-modal]'),
         modal = document.querySelector('.modal');


    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';

    //    clearInterval(modalTimerId);
    }
    
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    //    document.querySelector('.modal__dialog').classList.remove('show');
    }

    modalTrigger.forEach(item => {
        item.addEventListener('click', openModal);
        });
    
   
    // Закрытие модалки по клику на подложке(серому полю)
        modal.addEventListener('click', (e) => {
            // ДЕЛЕГИРОВАНИЕ !
            // если мы кликаем на подложку или крестик то закрываем модалку
            if( e.target === modal || e.target.getAttribute('data-close') == '') {
                closeModal();
            }
        });
    
    // Закрытие модалки при нажатии клавиши Esc 
        document.addEventListener('keydown', (e) => {
            if(e.code === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });
    

    // Вызов модалки через определенное время
    // const modalTimerId = setTimeout(openModal, 5000);

     // Вызов модалки при прокрутке до конца
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight-1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // Вывод блоков меню через класс

        class MenuCard {
            constructor(img, altimg, title, descr, price, parentSelector, ...classes) {
                this.img = img;
                this.altimg = altimg;
                this.title = title;
                this.descr = descr;
                this.price = price;
                this.classes = classes;
                this.parent = document.querySelector(parentSelector);
                // курс валюты
                this.transfer = 27;
                // конвертируем валюту для this.price при помощи changeToMany()
                this.changeToUAH(); 
            }
    
            // конвертация валюты
            changeToUAH() {
                this.price = this.price * this.transfer;
            }
            // формируем весртку
            render() {
                const element = document.createElement('div');
                console.log(this.classes);
                if (this.classes.length === 0) {
                    this.classes = "menu__item";
                    element.classList.add(this.classes);
                } else {
                    this.classes.forEach(className => element.classList.add(className));
                }
    
                element.innerHTML = `
                    <img src=${this.img} alt=${this.altimg}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                `;
                // помещаем созданный элемент в DOM элемент
                this.parent.append(element);
            }
        }

        // Функция вывода блоков с меню блюд 
        const getResource = async (url) => { // тут ниечего не отправляется, только получаем
            const res = await fetch(url); // говорим ждать выполнения операции 
            /* у fetch есть два св-ва 
            Мы можем увидеть HTTP-статус в свойствах ответа
            ok – логическое значение: будет true, если код HTTP-статуса в диапазоне 200-299.
            status – код статуса HTTP-запроса, например 200.
            */
           if (!res.ok) { // что-то пошло не так

            // Испольузуем объект ошибки new Error
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
           }
            // возвращаем преобразованный в json промис
            return await res.json(); // говорим ждать заверщения выполнения оп-ции а после вернуть ответ 
        };

        getResource('http://localhost:3000/menu')
            .then(data => { // полуаем уже данные в формате json
                            // {дустрктуризация объекта} ! 
                data.forEach(({img, altimg, title, descr, price}) => {
                                                                // туда куда пушим
                    new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
                });
            });

    // Forms
    const forms = document.querySelectorAll('form');

    // сообщения для посетителя
    const message = {
        loading: 'img/form/spinner.svg', // вставляем картинку загрузки
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    // Привязываем нашу функцию ко всем формам

    forms.forEach( item => {
        bindPostData(item);
    });

    // Постинг 

    /* !НО внутри АСИНХРОННЫЙ код и он не ждет друг-друга
    1) res = fetch( - тут только "обещание" еще нет ответа от сер-ра
    2) return res.json(); - уже пытается его обработать, ОШИБКА
    если это профукать то код будет работать неверно

        -РЕШЕНИЕ-
    Испульзуем парные операторы async и await
    Существует специальный синтаксис для работы с промисами, который называется «async/await»
    ! Они всегда используются вместе
    async говоим что асинхронный код
    async один простой смысл: эта функция всегда возвращает промис.
    
    await, которое можно использовать только внутри async-функций
    await заставит интерпретатор JavaScript ждать до тех пор, пока промис справа от await не выполнится. 
    После чего оно вернёт его результат, и выполнение кода продолжится.
    хотя await и заставляет JavaScript дожидаться выполнения промиса, это не отнимает ресурсов процессора!
    */

    const postData = async (url, data) => { // говорим что функция возвращает промис
        // получаем переменную res - промис
        const res = await fetch(url, { // говорим ждать выполнения операции 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data  // передаваемые данные
        });

        // возвращаем преобразованный в json промис
        return await res.json(); // говорим ждать заверщения выполнения оп-ции а после вернуть ответ 
    };

    // Когда сервер должен получать в формате JSON

    // привязка какойто постинг данных
    function bindPostData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            // Создаем блок в кт будет выводится ответ
            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading; 
            statusMessage.style.cssText = ` 
            display: block; 
            margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage);

            // FormData
            const formData = new FormData(form); // Конструктор FormData() создаёт новые объект FormData
        
        // Преобразим formData в json  
            /*
            У объекта есть метод .entries() - кт превращает объект
            в массив массивов 
                Пример:
                let x = {
                    "a": 2,
                    "b": "X"
                }
                console.log(Object.entries(x)); // [["a", 2], ["b", "X"]]
            
            Св-во объекта .fromEntries() превращает масств в обычный объект
            */
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            // 1- взяли formData кт собрала все данные с форм и рпевратили в массив
            // 2- преобразовали полученный массив в классический объект
            // 3- преобразовали классический объект в JSON

        /* 
        Лучше выносить функционал по общению с сервером в отдульную функцию
        */
            postData('http://localhost:3000/requests', json)
            .then(data => {
                //статус ЗАгрузки
                console.log(data); // выводим в консоль то шо вернул сервер
                showThanksModal(message.success);
                // Прячем сообщение после истечения опр. времени
                statusMessage.remove();
            }).catch(() => {
                // Отслежование ошибки (наприм Шото пошло не так)
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });                            
        });
    }

    // Делаем красивый вывод сообщении для Модалки

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        // сначала скрываем стилями
        prevModalDialog.classList.add('hide');
        openModal(); // открытие мод.окна

        // создаем эл-нт сообщение
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        // Помещаем в модалку
        document.querySelector('.modal').append(thanksModal);

        // Удаление сообщения через какоето время 

         setTimeout( () => {
            thanksModal.remove(); 
        //    prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
         }, 4000);
    }

    fetch('http://localhost:3000/menu') // обращаемся к db.json 
    // получаемы ответ обрабатываем 
        .then(data => data.json()) // превращаю в обычный js объект
        .then(res => console.log(res));
    

    //Slider
    // 1 Кол-во слайдеров
    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
        // стрелочки 
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
        // счетчик
          total = document.querySelector('#total'),
          current = document.querySelector('#current');
    
    let slideIndex = 1;

    slider.style.position = 'relative';
    /* Вариант 1   Простой слайдер 

    // инициализация слайдера
    showSlides(slideIndex);

    // Общее кол-во слайдов в счетчике
    if(slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    // Функция показа и скрытия слайдов
    function showSlides(n) {
        // Проверка граничных значении 
        //Реализация перескока на первый и последний слайд(полная прокрутка)
        if(n > slides.length) {
            slideIndex = 1;
        }

        if(n < 1) {
            slideIndex = slides.length;
        }

        // реализация слайдера
        // 1 Скрываем все слайды
        slides.forEach(item => item.style.display = 'none');
        // 2 Отображаем нужный
        slides[slideIndex - 1].style.display = 'block';

        // номер слайдера Счетчик
        if(slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    // Переключение слайдов
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    prev.addEventListener('click', () => {
        plusSlides(-1);
    });
    next.addEventListener('click', () => {
        plusSlides(1);
    });
    */

    // Вриант 2 Слайдре карусель
    /*  Правки в HTML
    Обернуть слайды еще одну обёртку 
        Было
        <div class="offer__slider-wrapper">
            <div class="offer__slide">
            </div>
            <div class="offer__slide">
            ...
        Стало
        <div class="offer__slider-wrapper">
            <div class="offer__slider-inner">
                <div class="offer__slide">
                </div>
                <div class="offer__slide">
            ...
    Суть 
    offer__slider-wrapper - окошка, за границами кт все скрыто
    offer__slider-inner - контент со слайдами кт выходит за граници окошка
    слайды будут выстроины в линию
    */
    // главная обёотка
    const slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    // поле со слайдерами 
          slidesField = document.querySelector('.offer__slider-inner'),
    // ширина окошка 
          width = window.getComputedStyle(slidesWrapper).width;
        /*
            Метод Window.getComputedStyle() возвращает объект, содержащий значения всех CSS-свойств элемента, 
            полученных после применения всех активных таблиц стилей, и завершения базовых вычислений значений, 
            которые они могут содержать. 
            Приходит объект, используем его св-во width
        */
    // Шаг прокрутки 
    let offset = 0;

    // 1 Устанавливаем ширину поля со слайдерами 
    slidesField.style.width = 100 * slides.length + '%';
    // style
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    // 2 Устанавливаем всем слайдам одинаковую ширину 
    slides.forEach(slide => {
        slide.style.width = width;
    });

    // Общее кол-во слайдов в счетчике
    if(slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    // Прокрутка слайдера
    next.addEventListener('click', () => {
        if(offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
            /* т.к приходящее значение width в рх, то избавляемся от них и переводи в ЧИСЛО
            +width.slice(0, width.length - 2)
            slice(a, b) - вырезает строку от a до b(включительно) Так избавляемся от рх
            +width - преобразует в число
            т.е Если offset равен полной длине то прокручиваем на начло
            */
        } else {
            // инача просто прокручиваем вперед
            offset += +width.slice(0, width.length - 2);
        }

        // реализация прокрутки
        slidesField.style.transform = `translateX(-${offset}px)`; 
        
        // Счетчик
        if (slideIndex == slides.length) {
            // если индекс равен бощемв кол-ву
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;            
        } else {
            current.textContent = slideIndex;
        }

        // выделяем активную кнопку dots
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if(offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            // инача просто прокручиваем вперед
            offset -= +width.slice(0, width.length - 2);
        }
        // реализация прокрутки 
        slidesField.style.transform = `translateX(-${offset}px)`;

         // Счетчик
         if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;            
        } else {
            current.textContent = slideIndex;
        }

        // выделяем активную кнопку dots
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

// Кнопки переключения слайдера (dots)

// 1 создаем обёртку для всех точек
const indicators = document.createElement('ol'),
      dots = [];

indicators.classList.add('carousel-list');
indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
`;
slider.append(indicators);

for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
    `;
    // выделяем начальную актив кнопку
    if (i == 0) {
        dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
}

    // добавляем функциональность dots
    dots.forEach(dot => {
        //вешаем на каждую кнопку обработчик события
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;            
            } else {
                current.textContent = slideIndex;
            }

            // выделяем активную кнопку dots
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
        });
    });
});