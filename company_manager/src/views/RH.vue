<template>
  <div>
    <b-button v-b-modal.Fiche_modal>Ajouter</b-button>
    <b-container>
        <div class="table">

            <b-row>
                <b-col cols="2">Nom</b-col>
                <b-col cols="2">Prénom</b-col>
                <b-col cols="2">Fonction</b-col>
                <b-col cols="2">Mail</b-col>
                <b-col cols="4">Modifier</b-col>
            </b-row>
            <div v-for="item in items" v-bind:key="item.id" class="employees">
                <b-row>
                    <b-col cols="2">{{item.NOM}}</b-col>
                    <b-col cols="2">{{item.PRENOM}}</b-col>
                    <b-col cols="2">{{item.FONCTION}}</b-col>
                    <b-col cols="2">{{item.MAIL}}</b-col>
                    <b-col cols="4">
                        <b-button variant="outline-primary" size="sm"  class="mr-2" v-b-modal.modal-1 @click="fillForm(item)">
                        Modifier
                        </b-button>
                        <b-button variant="danger" size="sm"  class="mr-2" @click="deleteEmployee(item.ID_EMPLOYE)">
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
                                v-model="form.prenom"
                                type="text"
                                required
                                ></b-form-input>

                                <b-form-input
                                id="input-3"
                                v-model="form.fonction"
                                type="text"
                                required
                                ></b-form-input>

                                <b-form-input
                                id="input-4"
                                v-model="form.mail"
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
          prenom: '',
          fonction: '',
          mail: ''
        },
        items: []
      }
    },
    methods: {
        fillForm(item){
            this.id = item.ID_EMPLOYE
            
            this.form.nom = item.NOM
            this.form.prenom = item.PRENOM
            this.form.fonction = item.FONCTION
            this.form.mail = item.MAIL

            this.action = "Modify"

            this.$bvModal.show('Fiche_modal')
        },
      onSubmit(evt) {
        evt.preventDefault()
        if(this.action === "Modify"){
          axios.post('http://127.0.0.1:8000/Employees/update', {
            id: this.id,
            name: this.form.nom,
            firstname: this.form.prenom,
            function: this.form.fonction,
            mail: this.form.mail
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          this.action = null
        } else {
        axios.post('http://127.0.0.1:8000/Employees/add', {
          name: this.form.nom,
          firstname: this.form.prenom,
          function: this.form.fonction,
          mail: this.form.mail
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        }
        location.reload(true);
      },
      deleteEmployee(id) {
        axios.post('http://127.0.0.1:8000/Employees/delete', {
          id: id
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        location.reload(true);
      }
    },
  mounted () {
    axios
      .get('http://127.0.0.1:8000/Employees/getAll')
      .then(response => {
        this.items = response.data;
      })
  }
}
</script>