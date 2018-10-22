const request = require('request');
const tr = require('tor-request');
const URI = require('urijs');
const urls = require('./urls');
const rules = require('./rules');
const params = require('./params');

const CONFIG_TOR = true;
const NB_REQUEST = 80000;
const REFRESH_IP = 100;
const TIMEOUT = 2000;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function buildMaliciousURI(url) {
  const options = {};

  const rule = rules[getRandomInt(0, rules.length)];
  const param = params[getRandomInt(0, params.length)];

  if (rule.http_uri) {
    url.addQuery(param, rule.contents[getRandomInt(0, rule.contents.length)]);
  }

  options.timeout = TIMEOUT;
  options.maxRedirects = 1;
  options.followRedirect = false;
  options.followAllRedirects = false;
  options.strictSSL = false;
  options.headers = {'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13'};

  if (rule.http_header) {
    const header = rule.contents[getRandomInt(0, rule.contents.length)];
    options.headers = {[header.name]: header.value};
  }

  options.url = url.normalizeQuery().toString();

  return options;
}

function doRequest(options) {
  return new Promise(function(resolve, reject) {
    tr.request(options, function(error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

if (CONFIG_TOR) {
  tr.setTorAddress('localhost', 9150);
  tr.TorControlPort.port = 9051;
  // tor --hash-password TODO | more
  tr.TorControlPort.password = 'TODO';
}

async function main() {
  for (let j = 0; j < NB_REQUEST; j++) {
    const url = new URI(urls[getRandomInt(0, urls.length)]);
    const options = buildMaliciousURI(url);
    console.log('[' + j + '] request url:', options.url);

    if (CONFIG_TOR) {
      if ((j % REFRESH_IP) == 0) {
        console.log('newTorSession');
        tr.newTorSession(function(err) {
          if (err) {
            console.log('err = ' + err);
          }
        });
      }

      const res = await doRequest(options).catch((err) => console.log(err)); ;
    } else {
      request(options, function(error, response, body) {});
    }
  }
}

main();

