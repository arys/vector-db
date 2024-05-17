import axios from 'axios'
import fs from 'fs'
import { parse} from 'node-html-parser'
import { HttpsProxyAgent } from 'https-proxy-agent'

const PROXIES = []

function getPage(page = 1, proxy) {
  console.log(`Getting page ${page}`)
  return axios.get(`https://krisha.kz/arenda/kvartiry/astana/?das[live.rooms]=2&rent-period-switch=%2Farenda%2Fkvartiry&page=${page}`, {
    proxy: false,
    httpsAgent: proxy ? new HttpsProxyAgent(proxy) : undefined
  })
  .then(response => response.data)
}

async function main() {
  const data = []
  try {
    for (let i = 0; i <= 200; i++) {
      // one proxy per 50 pages
      const proxy = PROXIES[Math.floor(i / 50) % PROXIES.length]
      console.log(Math.floor(i / 50) % PROXIES.length, proxy)
      const html = await getPage(i, proxy)
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
  } catch (e) {
    console.error(e)
  }
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2))
}

main()