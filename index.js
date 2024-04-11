import express from 'express';
import client from './client.js'
import multer from 'multer';

const app = express();

const upload = multer().single('image')

app.post('/image-search', upload, async (req, res) => {
  const image = req.file.buffer.toString('base64')
  const resImages = await client.graphql.get()
    .withClassName('Apartment')
    .withFields(['price', 'external_id', 'title', 'description', 'address', 'city'])
    .withNearImage({ image })
    .withLimit(10)
    .do()
  const apartments = resImages.data.Get.Apartment
  res.json(
    apartments.map(apartment => ({
      ...apartment,
      image_url: `/images/${apartment.external_id}.jpg`,
    }))
  )
})

app.use('/images', express.static('images'))
app.use('/index', express.static('index.html'))

app.listen(3005, () => {
  console.log('Server started on http://localhost:3005')
})