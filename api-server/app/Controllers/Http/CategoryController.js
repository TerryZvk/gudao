'use strict'

const Category = use('App/Models/Category')

class CategoryController {
    async index({request}){
        return await Category.all()
    }

    async show({params}){
        return await Category.find(params.id)
    }

    async store({request}){
        const model = new Category
        const data = request.only(['name'])
        model.fill(data)
        await model.save()
        return model
    }
    async update({request,params}){
        const model = await Category.find(params.id)
        const data = request.only(['name'])
        model.merge(data)
        await model.save()
        return model
    }

    async destroy({request,params}){
        const model = await Category.find(params.id)
        await model.delete()
        return {
            status: 'success'
        }
    }
}

module.exports = CategoryController
