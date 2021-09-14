<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <input type="text" @keyup.enter="addNewOption" v-model="newOption">
    <button class="button-standard" @click="addNewOption">add</button>
    <table>
        <tr>
            <CheckList
                typeList="To Do" :listToDo.sync="listToDo"
                v-on:save="save"
                v-on:remove="removeOption"
            />
        </tr>
        <hr />
        <tr>
            <CheckList typeList="Done" :listToDo.sync="listOfDone"/>
        </tr>
    </table>
  </div>
</template>

<script>
import CheckList from './CheckList.vue'

export default {
  name: 'Table',
  components: {
    CheckList
  },
  props: {
    title: {
        default: 'To do list',
        type: String
    },
  },
  data(){
      return {
        list: [],
        newOption: null,
      }
  },
  computed:{
      listOfDone(){
          return this.list.filter(option => option.done == true)
      },
      listToDo(){
          return this.list.filter(option => option.done == false)
      }
  },
  methods: {
      addNewOption(){
          let newOption = {
              toChange: false,
              name: this.newOption,
              done: false
          }
          this.list.push(newOption)
          this.newOption = null
      },
      removeOption(option){
          let indexToRemove = this.list.indexOf(option)
          this.list.splice(indexToRemove, 1)
      },
      save(index, option){
          this.list[index].toChange = false
          this.list[index].name = option.name
      },
  }
}
</script>


<style scoped>
div.container{
    margin: 50px;
}

table{
    margin: 25px auto;
    width: 50%;
}

hr{
    border-color:#f7f7f769;
    border-bottom: none;
    width: 100%;
    margin: 30px 0;
}

input{
    width: 250px;
    padding: 5px;
    border: none;
    box-shadow: 0px 0.2px 0px #6d6d6d;
}

input:focus{
    box-shadow: 0px 0.2px 0px;
    border: 0 none;
    outline: 0;
}

button{
    margin: 5px 10px;
    padding: 5px 10px;
    color: #F05226;
    background-color: #f7f7f7;
    border: 0.12pc solid #f7f7f7;
    border-radius: 2em;
    transition-duration: 0.6s;
}
button:hover{
    color: #f7f7f7;
    background-color: #F05226;
    border: 0.12pc solid #F05226;
}

table tr{
    width: 100%;
}
</style>
