'use strict'

const Post = use('App/Models/Post')

class PostController {
    async index({request}){
        return await Post.all()
    }

    async show({params}){
        return await Post.find(params.id)
    }
}

module.exports = PostController
