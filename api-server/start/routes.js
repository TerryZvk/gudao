'use strict'

const Route = use('Route')

Route.group(() => {
    Route.resource('/categories', 'CategoryController')
    Route.resource('/posts', 'PostController')
}).prefix('/admin/api')