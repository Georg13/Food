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
            constructor(src, alt, title, descr, price, parentSelector, ...classes) {
                this.src = src;
                this.alt = alt;
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
                    <img src=${this.src} alt=${this.alt}>
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
        new MenuCard(
            "img/tabs/vegy.jpg",
            "vegy",
            'Меню "Фитнес"',
            'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
            9,
            ".menu .container",
            'menu__item', 'box'
        ).render();
    
        new MenuCard(
            "img/tabs/post.jpg",
            "post",
            'Меню "Постное"',
            'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
            14,
            ".menu .container"
        ).render();
    
        new MenuCard(
            "img/tabs/elite.jpg",
            "elite",
            'Меню “Премиум”',
            'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
            21,
            ".menu .container"
        ).render();

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
        postData(item);
    });

    // Когда сервер должен получать в формате JSON
    function postData(form){
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
            const formData = new FormData(form); 
            
            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });

            // создаем запрос при помощи fetch 
                /* Промис созданный fetch при ошибке в ответе сервера(пример server1.php - 404) не перейдет в reject и не будет выполнять
                .catch() так как, для него основная задча выполненны, т.е есть запрос на сервер и некий ответ, НО сработает если будет 
                не работать сервер или сайт офлайн. Единственное что поеменяется св-ва статус*/
            /*т.е  если fetch промис наткнется на ошибку HTTP запроса он не выкинет reject*/
            fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(object)
            }).then(data => data.text())
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
        /*
         data-close>×</div> - кт создается динамически не будет действовать, 
         тк его обработчики событии его не видят. см выше где прописывали код МОДАЛКИ
         для того что бы они реагировали нужно делегирование событии
        */

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
});