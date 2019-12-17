<template>
  <div>
    <b-button v-b-modal.Fiche_modal>Ajouter</b-button>
    <b-container>
        <div class="table">

            <b-row>
                <b-col cols="2">ID</b-col>
                <b-col cols="2">Nom</b-col>
                <b-col cols="2">Prix</b-col>
                <b-col cols="4">Modifier</b-col>
            </b-row>
            <div v-for="item in items" v-bind:key="item.id" class="employees">
                <b-row>
                    <b-col cols="2">{{item.ID_PIECE}}</b-col>
                    <b-col cols="2">{{item.NOM}}</b-col>
                    <b-col cols="2">{{item.PRIX}}</b-col>
                    <b-col cols="4">
                        <b-button variant="outline-primary" size="sm"  class="mr-2" v-b-modal.modal-1 @click="fillForm(item.ID_PIECE)">
                        Modifier
                        </b-button>
                        <b-button variant="danger" size="sm"  class="mr-2" @click="deleteEmployee(item.ID_PIECE)">
                        Supprimer
                        </b-button>
                    </b-col>
                </b-row>
            </div>
        </div>
    </b-container>
    

                        <b-modal id="Fiche_modal" title="Modifier fiche salarié">
                            <b-form @submit="onSubmit">

                                <b-form-input
                                id="input-1"
                                v-model="form.nom"
                                type="text"
                                required
                                ></b-form-input>

                                <b-form-input
                                id="input-2"
                                v-model="form.prix"
                                type="text"
                                required
                                ></b-form-input>

                                <b-button type="submit" variant="primary">Submit</b-button>
                            </b-form>
                        </b-modal>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
          id: null,
          action: null,
          form: {
          nom: '',
          prix: ''
        },
        items: []
      }
    },
    methods: {
        fillForm(id){
            this.id = id
            
            this.form.nom = this.items[id-1].NOM
            this.form.prix = this.items[id-1].PRIX

            this.action = "Modify"

            this.$bvModal.show('Fiche_modal')
        },
      onSubmit(evt) {
        evt.preventDefault()
        if(this.action === "Modify"){
          axios.post('http://127.0.0.1:8000/Piece/update', {
            id: this.id,
            name: this.form.nom,
            cost: this.form.prix
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          this.action = null
        } else {
        axios.post('http://127.0.0.1:8000/Piece/add', {
          name: this.form.nom,
          cost: this.form.prix
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        }
      },
      deleteEmployee(id) {
        axios.post('http://127.0.0.1:8000/Piece/delete', {
          id: id
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
  mounted () {
    axios
      .get('http://127.0.0.1:8000/Piece/getAll')
      .then(response => {
        this.items = response.data;
      })
  }
}
</script>