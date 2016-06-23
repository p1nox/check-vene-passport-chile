
var Promise = require('bluebird');
var requestP = require('request-promise');
var cheerio = require('cheerio');
var beep = require('beepbeep')
var config = require('./config');

var checkVenePassport = function() {

  requestP(config.url).then(function(html) {

    var $ = cheerio.load(html);
    $(config.selector).each(function(i, element){
      var $a = $(this),
          $img = $a.find('img');

      if ($img.attr('alt') === config.element_alt) {

        if ($a.attr('href') === config.last_pdf_href) {
          console.log('\nNo passport for you yet :\'(');
        }
        else {
          beep(5, 1000);
          console.log('\nNew passports arrived! :D');
        }

      }
    });

  });

};

console.log('Checking for passport');
console.log('Config: \n', config);
checkVenePassport();
setInterval(checkVenePassport, config.interval);
