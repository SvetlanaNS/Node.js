require ('moment-precise-range-plugin');
const moment =require('moment');
const EventEmitter=require('events');
const [dateStringInFuture] =process.argv.slice(2);
const DATE_FORMAT_PATTERN='YYYY-MM-DD HH:mm:ss';

//@param dateString
//@returns {date}

const getDateFromDateString=(dateString)=>{
    const [hour ,day,month,year]=dateString.split('-');
    return new Date (Date.UTC(year,month-1,day,hour ) );//месяцы начинается с 0
};

//Функция выводит / завершает таймер
//@param {date} dateInFuture

const showRemainingTime=(dateInFuture)=>{
    const dateNow = new Date();

    if(dateNow>=dateInFuture){
        emmitter.emit('timerEnd');
    }else{
        const currentDateFormatted=moment(dateNow,DATE_FORMAT_PATTERN);
        const futureDateFormatted=moment(dateInFuture,DATE_FORMAT_PATTERN);
        const diff=moment.preciseDiff(currentDateFormatted,futureDateFormatted);

        console.clear();//отчищение консоли
        console.log(diff);
    }
};
//функция завершает таймер
//@param{number}timerId

const showTimerDone=(timerId) => {
    clearInterval(timerId);
    console.log('Таймер истек');
};
const emmitter = new EventEmitter();
const dateInFuture = getDateFromDateString(dateStringInFuture);
const timerId=setInterval(()=> {
    emmitter.emit('timerTick',dateInFuture);
},1000)

emmitter.on('timerTick',showRemainingTime);
emmitter.on('timerEnd',()=>{
  showTimerDone(timerId);  
});