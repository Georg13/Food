function timer(id, deadLine) {
    // Timer
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
   
    setClock(id, deadLine);
}

export default timer;