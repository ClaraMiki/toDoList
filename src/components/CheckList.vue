<template>
  <div class="container">
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
            <input 
                id="edit"
                type="text"
                v-if="option.toChange"
                v-model="option.name"
            >
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
  name: 'CheckList',
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
        indexToChange: null,
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
                method: this.saveOption,
                show: false
            },
        ],
      }
  },
  created() {
      this.verifyLenght()
  },
  watch:{
    listToDo(){
        this.verifyLenght()
    },
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
  methods: {
      verifyLenght(){
        this.countList = this.listToDo.length
        if (this.countList === 0){
            this.listToDo.push({name: 'Não há tarefas'})
            this.actions[0].show = false
            this.actions[1].show = false
        } else {
            this.actions[0].show = true
            this.actions[1].show = true
        }
      },
      editOption(option){
        this.indexToChange = this.listToDo.indexOf(option)
        this.listToDo[this.indexToChange].toChange = true
        this.actions[1].show = false
        this.actions[2].show = true
      },
      removeOption(option){
        this.$emit('remove', option)
      },
      saveOption(option){
        this.$emit('save', this.indexToChange, option)
        this.actions[1].show = true
        this.actions[2].show = false
      },
  },
}
</script>


<style scoped>
.container{
    width: 100%;
    margin: 0px;
}

p{
    text-align: initial;
    margin: 2px 2px 2px 15px;
}
p.done{
    text-decoration-line: line-through;
    text-decoration-color: white;
}

img{
    width: 14px;
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
    width: 20%;
}

button.actions{
    margin: 5px;
    padding: 5px 10px;
    color: #E3924B;
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
input#edit{
    margin-left: -25px;
    width: 80%;
}

input:focus{
    box-shadow: 0px 0.2px 0px;
    border: 0 none;
    outline: 0;
}

</style>
