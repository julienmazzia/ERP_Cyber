<template>
<div>
    <b-button v-b-modal.Fiche_modal>Ajouter</b-button>
    <b-container>
        <div class="table">
            <b-row>
                    <b-col cols="2">id</b-col>
                    <b-col cols="2">Nom</b-col>
                    <b-col cols="2">Client</b-col>
                    <b-col cols="2">Accéder au plan</b-col>
                    <b-col cols="3">Modifier</b-col>
                </b-row>
            <div v-for="plan in plans" v-bind:key="plan.id">
                <b-row>
                    <b-col cols="2">{{ plan.ID_PLAN }}</b-col>
                    <b-col cols="2">{{ plan.DESIGNATION }}</b-col>
                    <b-col cols="2">{{ plan.for }}</b-col>
                    <b-col cols="2">
                        <router-link :to="{ name: 'pieces', params: { id: plan.ID_PLAN } }">
                            <b-button variant="warning">Voir les pièces</b-button>
                        </router-link> 
                    </b-col>
                    <b-col cols="3">
                        <b-button variant="outline-primary" size="sm"  class="mr-2" v-b-modal.modal-1 @click="fillForm(plan.ID_PLAN)">
                        Modifier
                        </b-button>
                        <b-button variant="danger" size="sm"  class="mr-2" @click="deleteEmployee(plan.ID_PLAN)">
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
                                v-model="form.des"
                                type="text"
                                required
                                ></b-form-input>

                                <b-form-input
                                id="input-2"
                                v-model="form.id"
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
            plans: [],
            id: null,
          action: null,
          form: {
          des: '',
          id: ''
        }
      }
    },
    methods: {
        fillForm(id){
            this.id = id
            
            this.form.des = this.plans[id-1].DESIGNATION
            this.form.id = this.plans[id-1].ID_COMPAGNIE

            this.action = "Modify"

            this.$bvModal.show('Fiche_modal')
        },
      onSubmit(evt) {
        evt.preventDefault()
        if(this.action === "Modify"){
          axios.post('http://127.0.0.1:8000/Plan/update', {
            id: this.id,
            des: this.form.des,
            id_company: this.form.id
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          this.action = null
        } else {
        axios.post('http://127.0.0.1:8000/Plan/add', {
          des: this.form.des,
          id: this.form.id
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
        axios.post('http://127.0.0.1:8000/Plan/delete', {
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
      .get('http://127.0.0.1:8000/Plan/getAll')
      .then(response => {
          console.log(response)
        this.plans = response.data;
        console.log(this.plans)
      })
  }
}
</script>