import { readFileSync, writeFileSync } from 'fs'
import client from './client.js'

const test = Buffer.from(readFileSync('./search.webp')).toString('base64')
const resImages = await client.graphql.get()
  .withClassName('Apartment')
  .withFields(['image _additional {certainty}', 'price'])
  .withNearImage({ image: test })
  .withLimit(10)
  .do()
let index = 0

for (const apartment of resImages.data.Get.Apartment) {
  console.log(apartment.price, apartment._additional.certainty)
  writeFileSync(`./result-${index}.jpeg`, Buffer.from(apartment.image, 'base64'))
  index++
}