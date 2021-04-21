<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="标题" >
        <el-input v-model="model.title" />
      </el-form-item>
       <el-form-item label="内容" >
        <mavon-editor :ishljs = "true"  v-model="model.body"></mavon-editor>
      </el-form-item>
      <el-form-item label="文章分类" >
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
       <el-form-item >
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data(){
    return{
      model: {
        title: '',
        categories:[],
        body: ''
      },
      categories: []
    }
  },
  methods:{
    async save(){
      if(this.id){
        await this.$http.put(`/posts/${this.id}`, this.model)
          this.$router.push('/posts/list')
          this.$message({
            type:'success',
            message: '修改成功！'
          })
      }else{
        await this.$http.post('/posts', this.model)
        this.$router.push('/posts/list')
        this.$message({
          type:'success',
          message: '保存成功！'
        })
      }
     
    },
    async fetch(){
      const res = await this.$http.get(`/posts/${this.id}`)
      this.model = res.data
    },
    async fetchCategories(){
       const res = await this.$http.get(`/categories`)
      this.categories = res.data
    }
  },
  created(){
    this.fetchCategories()
    this.id && this.fetch()
  }

}
</script>
