import client from './client.js'

await client.schema.classDeleter().withClassName('Apartment').do()