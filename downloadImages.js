import axios from 'axios'
import data from './data.json' assert { type: "json" };
import { writeFileSync } from 'fs'
import { assert } from 'console'

async function downloadImages() {
  for (const apartment of data) {
    const url = apartment.image
    const res = await axios.get(url, { responseType: 'arraybuffer' })
    writeFileSync(`./images/${apartment.id}.jpg`, res.data)
    console.log(`Apartment ${apartment.id} saved`)
  }
}

downloadImages()