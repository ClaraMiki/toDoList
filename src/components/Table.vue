<template>
  <div>
    <h1>{{ title }}</h1>
    <input type="text" @keyup.enter="addNewOption" v-model="newOption">
    <button class="button-standard" @click="addNewOption">+</button>
    <table>
        <tr>
            <BoxList
                typeList="To Do" :listToDo.sync="listToDo"
                v-on:save="save"
                v-on:remove="removeOption"
            />
        </tr>
        
        <tr>
            <BoxList typeList="Done" :listToDo.sync="listOfDone"/>
        </tr>
    </table>
  </div>
</template>

<script>
import BoxList from './BoxList.vue'

export default {
  name: 'Table',
  components: {
    BoxList
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
table{
    margin: auto;
    margin-top: 25px;
    width: 500px;
}

input{
    padding: 5px;
    border: 0px;
    border-bottom: 1px tomato;
    box-shadow: 0px 0.2px 0px;
}

input:focus{
    box-shadow: 0px 0.2px 0px;
    border: 0 none;
    outline: 0;
}

button{
    margin: 5px 10px;
    padding: 5px 10px;
    color: #323831;
    background-color: #f2f3ea;
    border: 0.12pc solid rgb(212, 212, 212);
    border-radius: 10%;
}

table tr{
    width: 100%;
}
</style>
