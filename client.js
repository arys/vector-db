import weaviate from 'weaviate-ts-client'

const client = new weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
})

export default client