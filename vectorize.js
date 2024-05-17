import { readFileSync } from 'fs'
import client from './client.js'
import data from './data.json' assert { type: "json" };

function vectorize(apartment, image) {
  const b64 = Buffer.from(image).toString('base64')
  return client.data.creator()
    .withClassName('Apartment')
    .withProperties({
      image: b64,
      title: apartment.title,
      price: apartment.price,
      description: apartment.description,
      address: apartment.address,
      external_id: apartment.id,
      city: 'astana'
    })
    .do()
}

async function main() {
  for (const apartment of data) {
    const image = readFileSync(`./images/${apartment.id}.jpg`)
    await vectorize(apartment, image)
    console.log(`Apartment ${apartment.id} vectorized`)
  }
}

main()