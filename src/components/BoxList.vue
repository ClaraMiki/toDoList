<template>
  <div class="container">
    <h2>{{typeList}}</h2>
    <div v-for="option in listToDo" :key="option.name">
        <td class="col-standard checkbox">
            <input
                type="checkbox"
                :name="option.name"
                :id="option.name"
                v-model="option.done"
                v-if="countList > 0">
        </td>

        <td class="col-standard list">
            <input type="text" v-if="option.toChange" v-model="option.name">
            <p v-bind:class="{ done: option.done }" v-else>
                {{ option.name }}
            </p>
        </td>

        <td class="col-standard action">
            <button
                v-for="action in actionsToShow"
                :key="action.event"
                v-on:click="action.method(option)"
                class="button-standard actions"
                >
                {{ action.event }}
            </button>
        </td>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoxList',
  props:{
      typeList: {
          type: String,
          default: null,
          require: true
      },
      listToDo:{
          type: Array,
          default: function () {
            return []
          },
          require: true
      }
  },
  data(){
      return {
        newOption: null,
        countList: 0,
        actions: [
            {
                event: 'excluir',
                method: this.removeOption,
                show: true
            },
            {
                event: 'editar',
                method: this.editOption,
                show: true
            },
            {
                event: 'salvar',
                method: this.save,
                show: false
            },
        ],
      }
  },
  computed:{
      actionsToShow(){
          if (this.typeList !== 'Done') {
            let actionsToShow = this.actions.filter(action => action.show == true)
            return actionsToShow
          }
          return []
      }
  },
  watch:{
      listToDo(){
          this.countList = this.listToDo.length
          if (this.countList === 0){
              this.listToDo.push({name: 'Não há mais tarefas'})
              this.actions[0].show = false
              this.actions[1].show = false
          } else {
              this.actions[0].show = true
              this.actions[1].show = true
          }
      },
  },
  methods: {
      removeOption(option){
          let indexToRemove = this.listToDo.indexOf(option)
          this.listToDo.splice(indexToRemove, 1)

      },
      editOption(option){
          let indexToChange = this.listToDo.indexOf(option)
          this.listToDo[indexToChange].toChange = true
          this.actions[1].show = false
          this.actions[2].show = true
      },
      save(option){
          let indexToChange = this.listToDo.indexOf(option)
          this.listToDo[indexToChange].toChange = false
          this.actions[1].show = true
          this.actions[2].show = false
      },
  }
}
</script>


<style scoped>
.container{
    width: 100%;
    margin: 0;
}

h2{
    text-align: initial;
    padding: 10px;
}

p{
    text-align: initial;
    margin: 2px 2px 2px 15px;
}
p.done{
    text-decoration-line: line-through;
    text-decoration-color: white;
}

.col-standard{
    padding: 0;
    border: none;
}
td.list{
    width: 65%;
}
td.checkbox{
    width: 5%;
}
td.action{
    width: 150px;
}

button.actions{
    margin: 5px;
    padding: 5px 10px;
    color: #818a78;
    text-decoration-line: underline;
    background-color: rgba(255, 255, 255, 0);
    border: none;
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

</style>
