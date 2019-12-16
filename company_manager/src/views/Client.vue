<template>
  <div>
    <b-button v-b-modal.Fiche_modal>Ajouter</b-button>
    <div class="table">
        <b-row>
                    <b-col cols="1">id</b-col>
                    <b-col cols="2">Nom de la société</b-col>
                    <b-col cols="1">Téléphone</b-col>
                    <b-col cols="2">Mail</b-col>
                    <b-col cols="2">Adresse</b-col>
                    <b-col cols="1">Code postal</b-col>
                    <b-col cols="1">Ville</b-col>
                    <b-col cols="2">Modifier</b-col>
                </b-row>
        <div v-for="client in clients" v-bind:key="client.id">
                <b-row>
                    <b-col cols="1">{{ client.ID_COMPAGNIE }}</b-col>
                    <b-col cols="2">{{ client.NOM }}</b-col>
                    <b-col cols="1">{{ client.TELEPHONE }}</b-col>
                    <b-col cols="2">{{ client.MAIL }}</b-col>
                    <b-col cols="2">{{ client.ADRESSE }}</b-col>
                    <b-col cols="1">{{ client.CODE }}</b-col>
                    <b-col cols="1">{{ client.VILLE }}</b-col>
                    <b-col cols="2">
                        <b-button variant="outline-primary" size="sm"  class="mr-2" v-b-modal.modal-1 @click="fillForm(client.ID_COMPAGNIE)">
                        Modifier
                        </b-button>
                        <b-button variant="danger" size="sm"  class="mr-2" @click="deleteClient(client.ID_COMPAGNIE)">
                        Supprimer
                        </b-button>
                    </b-col>
                </b-row>
            </div>
    </div>
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
                                v-model="form.tel"
                                type="text"
                                required
                                ></b-form-input>

                                <b-form-input
                                id="input-3"
                                v-model="form.mail"
                                type="text"
                                required
                                ></b-form-input>

                                <b-form-input
                                id="input-4"
                                v-model="form.adresse"
                                type="text"
                                required
                                ></b-form-input>

                                <b-form-input
                                id="input-4"
                                v-model="form.code"
                                type="text"
                                required
                                ></b-form-input>

                                <b-form-input
                                id="input-4"
                                v-model="form.ville"
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
  data(){
    return {
      action: null,
      clients: [],
      data: null,
      id: null,
      form: {
          nom: '',
          tel: '',
          mail: '',
          adresse: '',
          code: '',
          ville: ''
        },
    }
  },
  methods: {
        fillForm(id){
            this.id = id
            this.form.nom = this.clients[id-1].NOM
            this.form.tel = this.clients[id-1].TELEPHONE
            this.form.mail = this.clients[id-1].MAIL
            this.form.adresse = this.clients[id-1].ADRESSE
            this.form.code = this.clients[id-1].CODE
            this.form.ville = this.clients[id-1].VILLE

            this.action = 'Modify'
            this.$bvModal.show('Fiche_modal')
        },
      onSubmit(evt) {
          console.log(this.action)
        evt.preventDefault()
        if(this.action === "Modify"){
          axios.post('http://127.0.0.1:8000/Company/update', {
            id: this.id,
            name: this.form.nom,
            tel: this.form.tel,
            mail: this.form.mail,
            street: this.form.adresse,
            code: this.form.code,
            city: this.form.ville
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          this.action = null
        } else {
        axios.post('http://127.0.0.1:8000/Company/add', {
          name: this.form.nom,
          tel: this.form.tel,
          mail: this.form.mail,
          street: this.form.adresse,
          code: this.form.code,
          city: this.form.ville
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        }
      },
      deleteClient(id) {
        axios.post('http://127.0.0.1:8000/Company/delete', {
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
      .get('http://127.0.0.1:8000/Company/getAll')
      .then(response => {
        this.clients = response.data;
      })
  }
    
}
</script>