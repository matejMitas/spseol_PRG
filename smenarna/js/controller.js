currencyApp.service("Rates", function(){

    var currency_table = {  
          "base":"CZK",
          "date":"2016-04-15",
          "rates":{  
            "AUD":0.054202,
            "BGN":0.07237,
            "BRL":0.14574,
            "CAD":0.053784,
            "CHF":0.040403,
            "CNY":0.27039,
            "DKK":0.27535,
            "GBP":0.029445,
            "HKD":0.32387,
            "HRK":0.27754,
            "HUF":11.491,
            "IDR":549.96,
            "ILS":0.15791,
            "INR":2.7805,
            "JPY":4.548,
            "KRW":47.923,
            "MXN":0.73238,
            "MYR":0.16313,
            "NOK":0.34429,
            "NZD":0.06044,
            "PHP":1.926,
            "PLN":0.15899,
            "RON":0.16551,
            "RUB":2.7757,
            "SEK":0.34006,
            "SGD":0.056725,
            "THB":1.4647,
            "TRY":0.11919,
            "USD":0.041754,
            "ZAR":0.60841,
            "EUR":0.037003
          }
    };

    this.getRate = function(code) {
        var rate;
        for (var prop in currency_table.rates) {
            if (code == prop) {
                rate = currency_table.rates[prop];
            }
        }
        return rate;
    }

    this.allRates = function() {
        var allRates = [];
        for (var prop in currency_table.rates) {
            allRates.push(prop)
        }
        return allRates;
    }

    return this;

});    