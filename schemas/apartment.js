const paintingSchema = {
  class: 'Apartment',
  vectorizer: 'img2vec-neural',
  vectorIndexType: 'hnsw',
  moduleConfig: {
    'img2vec-neural': {
      imageFields: ['image']
    }
  },
  properties: [
    {
      name: 'external_id',
      dataType: ['number'],
    },
    {
      name: 'image',
      dataType: ['blob'],
    },
    {
      name: 'title',
      dataType: ['string'],
    },
    {
      name: 'price',
      dataType: ['number'],
    },
    {
      name: 'description',
      dataType: ['string'],
    },
    {
      name: 'address',
      dataType: ['string'],
    },
    {
      name: 'city',
      dataType: ['string'],
    }
  ]
}

export default paintingSchema