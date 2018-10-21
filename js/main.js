$(function () {
    const buyPriceContainer = $('.js-buy-price');
    const sellPriceContainer = $('.js-sell-price');
    const buyPercent = $('.js-buy-percent');
    const sellPercent = $('.js-sell-percent');
    const liveButton = $('.js-live');

    function getExchangeData() {
        let currentBuyPrice = parseFloat(buyPriceContainer.html());
        let currentSellPrice = parseFloat(sellPriceContainer.html());

        $.getJSON('https://blockchain.info/pl/ticker', function (data) {
            let buyNewPrice = data.PLN.buy.toFixed(3);
            let sellNewPrice = data.PLN.sell.toFixed(3);

            buyPriceContainer.html(buyNewPrice);
            sellPriceContainer.html(sellNewPrice);

            let roundedPercentBuy = ((buyNewPrice - currentBuyPrice) / buyNewPrice * 100).toFixed(2) + '%';
            let roundedPercentSell = ((sellNewPrice - currentSellPrice) / sellNewPrice * 100).toFixed(2) + '%';

            if (currentBuyPrice < parseFloat(buyNewPrice)) {
                buyPercent.removeClass().addClass('percent-item percent-up').html(roundedPercentBuy);
            } else if (currentBuyPrice > parseFloat(buyNewPrice)) {
                buyPercent.removeClass().addClass('percent-item percent-down').html(roundedPercentBuy);
            } else {
                buyPercent.removeClass().addClass('percent-item').html('=');
            }

            if (currentSellPrice < parseFloat(sellNewPrice)) {
                sellPercent.removeClass().addClass('percent-item percent-up').html(roundedPercentSell);
            } else if (currentSellPrice > parseFloat(sellNewPrice)) {
                sellPercent.removeClass().addClass('percent-item percent-down').html(roundedPercentSell);
            } else {
                sellPercent.removeClass().addClass('percent-item').html('=');
            }
        });
    }

    getExchangeData();

    let interval;

    clearInterval(interval);
    interval = setInterval(getExchangeData, 1000);

    liveButton.click(function () {

        if (liveButton.hasClass('live-disabled')) {
            clearInterval(interval);
            interval = setInterval(getExchangeData, 1000);
            liveButton.addClass('live-active').removeClass('live-disabled');
        } else {
            const select = $('#js-select');
            let selectValue = select.options[select.selectedIndex].value;
            let refreshing = selectValue * 1000;

            liveButton.removeClass('live-active').addClass('live-disabled');
            clearInterval(interval);
            interval = setInterval(getExchangeData, refreshing);
        }

    });

    $('.header__select').click(function () {
        const select = document.getElementById('js-select');
        let selectValue = select.options[select.selectedIndex].value;
        let refreshing = selectValue * 1000;

        liveButton.removeClass('live-active').addClass('live-disabled');
        clearInterval(interval);
        interval = setInterval(getExchangeData, refreshing);
    });

    function timer() {
        let timer = new Date();

        let day = timer.getDate();
        if (day < 10) day = '0' + day;
        let month = timer.getMonth() + 1;
        if (month < 10) month = '0' + month;
        let year = timer.getFullYear();

        let hours = timer.getHours();
        if (hours < 10) hours = '0' + hours;
        let minutes = timer.getMinutes();
        if (minutes < 10) minutes = '0' + minutes;
        let seconds = timer.getSeconds();
        if (seconds < 10) seconds = '0' + seconds;


        $('.js-timer').html(hours + ':' + minutes + ':' + seconds + ' / ' + day + '.' + month + '.' + year);
    }

    let timerInterval = setInterval(timer, 1000);
    timer();
});
