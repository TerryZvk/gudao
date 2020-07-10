module.exports = (app) => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })
  
  router.post('/',async (req, res) => {
    const item = await req.Model.create(req.body)
    res.send(item)
  })

  router.get('/',async (req, res) => {
    let queryOptions = {}
    // if(req.Model.modelName === 'Article') queryOptions.populate = 'name'
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })

  router.put('/:id',async (req, res) => {
    const item = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(item)
  })

  router.get('/:id',async (req, res) => {
    const item = await req.Model.findById(req.params.id)
    res.send(item)
  })

  router.delete('/:id',async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })

  app.use('/admin/api/rest/:resource',async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

}