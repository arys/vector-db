const axios = require('axios');
const fs = require('fs');
const parse = require('node-html-parser').parse
const { HttpsProxyAgent } = require('https-proxy-agent')

function getPage(page = 1) {
  console.log(`Getting page ${page}`)
  return axios.get(`https://krisha.kz/arenda/kvartiry/astana/?das[live.rooms]=2&rent-period-switch=%2Farenda%2Fkvartiry&page=${page}`, {
    proxy: false,
    httpsAgent: new HttpsProxyAgent('http://login:pass@host:port')
  })
  .then(response => response.data)
}

async function main() {
  const data = []
  for (let i = 0; i <= 50; i++) {
    const html = await getPage(i)
    const root = parse(html);
    root.querySelectorAll('.a-card__inc').forEach((element) => {
      const price = parseInt(element.querySelector('.a-card__price').text.trim().replace(/\D/g, ''), 10)
      const title = element.querySelector('.a-card__title').text.trim()
      const description = element.querySelector('.a-card__text-preview').text.trim()
      const address = element.querySelector('.a-card__subtitle').text.trim()
      const image = element.querySelector('.a-image__img')?.getAttribute('src')
      const id = parseInt(element.querySelector('.a-card__image').getAttribute('href').split('/').pop())
      data.push({
        id,
        price,
        title,
        description,
        address,
        image
      })
    });
    console.log('parsed so far', data.length)
  }
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2))
}

main()