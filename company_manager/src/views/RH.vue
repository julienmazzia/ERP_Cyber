<template>
  <div>
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
                    <b-col cols="2">{{item.name}}</b-col>
                    <b-col cols="2">{{item.firstname}}</b-col>
                    <b-col cols="2">{{item.fonction}}</b-col>
                    <b-col cols="2">{{item.mail}}</b-col>
                    <b-col cols="4">
                        <b-button variant="outline-primary" size="sm"  class="mr-2" v-b-modal.modal-1 @click="fillForm(item.id)">
                        Modifier
                        </b-button>
                        <b-button variant="danger" size="sm"  class="mr-2">
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
                            <p class="my-4">{{ items[0].Nom }}</p>
                        </b-modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
          form: {
          nom: '',
          prenom: '',
          fonction: '',
          mail: ''
        },
        items: [
          { id: 0, name: 'Doe', firstname: 'John', fonction: 'Anonyme', mail: 'john.doe@gmail.com' },
          { id: 1, name: 'Doe', firstname: 'jane', fonction: 'Anonyme', mail: 'jane.doe@gmail.com' }
        ]
      }
    },
    methods: {
        fillForm(id){
            this.form.nom = this.items[id].name
            this.form.prenom = this.items[id].firstname
            this.form.fonction = this.items[id].fonction
            this.form.mail = this.items[id].mail

            this.$bvModal.show('Fiche_modal')
        },
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      }
    }
  }
</script>