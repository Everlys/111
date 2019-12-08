<template>
<div class="body">
   <div class="wrap">
    <h2>M-TodoList</h2>
    <div class="wrap-input">
      <i-input clearable style="width: 308px" type="text" v-model.trim="msg" @keyup.enter = 'addTask()' placeholder="请添加任务..."></i-input>
      <i-button type="primary" shape="circle" @click="addTask()">添加任务</i-button>
    </div>
    <transition-group tag="ul">
      <li  v-for="(item,index) in list"  :key="item.listno">
        <p v-text="item.msg" @click="isFinished(index)" :class="{finish: item.isFinish}"></p>
        <i-button type="error" shape="circle" size="small" v-if="item.isFinish" @click="deleteitem(index)">删除任务</i-button>
      </li>     
    </transition-group> <Page :total="5"></Page>
  </div>
</div>
</div>
</template>

<script>
 import storage from './storage'
 export default {
    data(){
      return {
        list: [],
        msg: '',
        isFinish: false
      }
    },
    methods: {
      /*添加数据*/
      addTask() {
        this.list = this.list || [];
        if(this.msg){
          this.list.push({msg: this.msg, isFinish: this.isFinish});
          this.msg = '';
          storage.set('list',this.list);
        }
      },
      /*判断任务是否完成*/
      isFinished(index) {
        this.list[index].isFinish = !this.list[index].isFinish;
        storage.set('list',this.list);
      },
      /*删除数据*/
      deleteitem(index){
        this.list.splice(index, 1);//数组中添加/删除项目，然后返回被删除的项目
        storage.set('list',this.list);
      }
    },
    mounted: function () {
      /*取缓存*/
      this.list = storage.get('list');
    }
  }


</script>

<style>
.wrap{
margin: 50px auto;
width: 400px;
}
h2,.wrap-input{
text-align: center;
}
h2{
font-size: 45px;
margin-bottom: 20px
}
ul{
margin: 1.5rem .6rem;
}
p{
width: 60%;
}
li{
text-align: center;
margin-bottom: .6rem;
}
.finish{
text-decoration: line-through;
display: inline-block;
width: 78%;
}
.v-enter-active, .v-leave-active {
transition: all 1s;
}
.v-enter, .v-leave-to{
opacity: 0;
transform: translateX(-50px) ;
}
</style>
