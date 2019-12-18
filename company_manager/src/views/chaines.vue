<template>
    <div>
    <b-button v-b-modal.Fiche_modal>Ajouter</b-button>
    <b-container>
        <div v-for="serie in series" class="serie" v-bind:key="serie.id">
            <b-row :class="serie.type">
                <b-col>Chaine n°{{ serie.ID_CHAINE }}</b-col>
                <b-col>Type: {{ serie.TYPE }}</b-col>
                <b-col>
                        <b-button @click="fillModal(serie.ID_CHAINE)">Ajouter</b-button>
                        <b-button variant="outline-primary" size="sm"  class="mr-2" v-b-modal.modal-1 @click="fillForm(serie.ID_CHAINE)">
                        Modifier
                        </b-button>
                        <b-button variant="danger" size="sm"  class="mr-2" @click="deleteSerie(serie.ID_CHAINE)">
                        Supprimer
                        </b-button>
                    </b-col>
            </b-row>
    
        </div>

            <b-row v-for="pieces in elements2" v-bind:key="pieces.id">
                <b-col cols="3" v-for="piece in pieces" v-bind:key="piece.id">La chaine n°{{piece.ID_CHAINE}} produit la pièce {{ piece.ID_PIECE }}</b-col>
            </b-row>
            <div>--------------------------</div>
            <b-row v-for="plans in elements" v-bind:key="plans.id">
                <b-col v-for="plan in plans" v-bind:key="plan.id">La chaine n°{{ plan.ID_CHAINE }} produit le plan {{ plan.ID_PLAN }} </b-col>
            </b-row>
    </b-container>

    <b-modal id="List_prod" title="Liste de production">
                            <b-form @submit="onSubmit">
                                    <b-form-select v-model="idProd" :options="List"></b-form-select>
                                <b-button type="submit" variant="primary">Submit</b-button>
                            </b-form>
                        </b-modal>

     <b-modal id="Fiche_modal" title="Modifier fiche salarié">
                            <b-form @submit="onSubmit">

                                <b-form-select v-model="type" :options="options"></b-form-select>

                                <b-button type="submit" variant="primary">Submit</b-button>
                            </b-form>
                        </b-modal>
    </div>
</template>

<script>
  import axios from 'axios';

export default {
    data (){
        return {
            id: null,
            index: 0,
            series: [],
            elements: [],
            elements2: [],
            data: [],
            type: null,
            idProd: null,
            action: null,
            options: ["Assemblage", "Production"],
            pieces: [],
            plans: [],
            List: []
        }
    },
    methods: {
        getProducts (id) {
            for (var i in this.series){
                if(this.series[i].ID_CHAINE === id){
                    if(this.elements[i] !== undefined){
                        return this.elements[i].id
                    } else {
                        return "Aucun"
                    }
                }
            }
        },
        fillForm(id){
            this.id = id
            
            for (var i in this.series){
                if(this.series[i].ID_CHAINE === id){
                    this.type = this.series[i].TYPE
                }
            }

            this.action = "Modify"

            this.$bvModal.show('Fiche_modal')
        },
        fillModal(id){
            this.id = id
            for (var i in this.series){
                if(this.series[i].ID_CHAINE === id){

                    if(this.series[i].TYPE === "Assemblage") {
                        this.List = this.plans
                    } else {
                        this.List = this.pieces
                    }

                    this.type = this.series[i].TYPE
                }
            }
            
            this.action = "AddProd"

            this.$bvModal.show('List_prod')
        },
        onSubmit(evt) {
        evt.preventDefault()
            if(this.action === "Modify"){
                axios.post('http://127.0.0.1:8000/Series/updateType', {
                    id: this.id,
                    type: this.type
                })
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error)
                });
                this.action = null
            } else if(this.action === "AddProd"){

                axios.post('http://127.0.0.1:8000/Series/addProduct', {
                    id_chaine: this.id,
                    id: this.idProd,
                    type: this.type
                })
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error)
                });
                this.action = null
            } else {
                axios.post('http://127.0.0.1:8000/Series/add', {
                    type: this.type
                })
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error)
                })
            }
            location.reload(true);
      },
      deleteSerie(id) {
          axios.post('http://127.0.0.1:8000/Series/delete', {
          id: id
        })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        })
        location.reload(true);
      }
    },
    mounted () {
    axios
      .get('http://127.0.0.1:8000/Plan/getAll')
      .then(response => {
        for(var i in response.data) {
            this.plans.push({
                value: response.data[i].ID_PLAN,
                text: response.data[i].DESIGNATION
            })
        }
      })
    axios
      .get('http://127.0.0.1:8000/Piece/getAll')
      .then(response => {
        for(var i in response.data) {
            this.pieces.push({
                value: response.data[i].ID_PIECE,
                text: response.data[i].NOM
            })
        }
      })

    axios
      .get('http://127.0.0.1:8000/Series/getAll')
      .then(response => {
        this.series = response.data;
        var that = this
        for(var index in this.series) {
            if(this.series[index].TYPE === "Assemblage"){
                axios.post('http://127.0.0.1:8000/Series/getElements', {
                    id: that.series[index].ID_CHAINE,
                    type: that.series[index].TYPE
                })
                .then(function (response) {
                        if (response.data[0] !== undefined) {

                        that.elements.push(response.data)
                            // that.elements.push({
                            //     id_chaine: response.data[0].ID_CHAINE,
                            //     id: response.data[0].ID_PLAN
                            // })
                        }
                })
                .catch(function (error) {
                    console.log(error);
            }); 
            }  else {
                axios.post('http://127.0.0.1:8000/Series/getElements', {
                    id: that.series[index].ID_CHAINE,
                    type: that.series[index].TYPE
                })
                .then(function (response) {
                    if (response.data[0] !== undefined) {
                        //console.log(response.data)
                        that.elements2.push(response.data)
                        // that.elements2.push({
                        //     id_chaine: response.data[0].ID_CHAINE,
                        //     id: response.data[0].ID_PIECE
                        // })
                    }
                })
                .catch(function (error) {
                    console.log(error);
            }); 
            }

        
        }
      })
  }
}
</script>