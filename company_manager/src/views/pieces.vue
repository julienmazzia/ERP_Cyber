<template>
    <div>
        <b-button v-b-modal.Fiche_modal>Ajouter</b-button>
        <b-container>
            <div class="table">

                <b-row>
                    <b-col cols="2">ID assemblage</b-col>
                    <b-col cols="2">Désignation</b-col>
                    <b-col cols="2">Prix</b-col>
                    <b-col cols="4">Modifier</b-col>
                </b-row>
                <div v-for="item in items" v-bind:key="item.id" class="employees">
                    <b-row>
                        <b-col cols="2">{{item.NOM}}</b-col>
                        <b-col cols="2">{{item.PRIX}} €</b-col>
                        <b-col cols="4">
                            <b-button variant="danger" size="sm"  class="mr-2" @click="deleteEmployee(item.ID_COMPOSITION_PLAN)">
                            Supprimer
                            </b-button>
                        </b-col>
                    </b-row>
                </div>
                <b-row>
                    <b-col cols="2">Total</b-col>
                    <b-col cols="2">{{ getTotal() }} €</b-col>
                </b-row>
            </div>
        </b-container>
        <b-modal id="Fiche_modal" title="Modifier fiche salarié">
                            <b-form @submit="onSubmit">

                                <b-form-select v-model="piece" :options="options"></b-form-select>

                                <b-button type="submit" variant="primary">Submit</b-button>
                            </b-form>
                        </b-modal>
    </div>
</template>

<script>
    import axios from 'axios';

export default {
    props: ['id'],
    data() {
      return {
          piece: null,
          options: [],
        items: []
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        axios.post('http://127.0.0.1:8000/Plan/AssociateToPlan', {
          id_plan: this.id,
          id_piece: this.piece
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        location.reload(true);
      },
      deleteEmployee(id) {
        axios.post('http://127.0.0.1:8000/Plan/deleteAssocitation', {
          id: id
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        location.reload(true);
      },
      getTotal() {
          var total = 0
          for(var i in this.items) {
              total += this.items[i].PRIX
          }
          return total
      }
    },
  mounted () {
      axios
      .get('http://127.0.0.1:8000/Piece/getAll')
      .then(response => {
          for (var i in response.data){
              this.options.push({
                  value: response.data[i].ID_PIECE,
                  text: response.data[i].NOM
              })
          }
      })

    axios
      .post('http://127.0.0.1:8000/Plan/getAllPieceAssociated', {
          id: this.id
      })
      .then(response => {
        var PieceTable = response.data
        var that = this
        for(var i in PieceTable) {
            axios.post('http://127.0.0.1:8000/Piece/getPiece', {
                id: PieceTable[i].ID_PIECE
            })
            .then(function (response) {
                var data = {
                    ID_COMPOSITION_PLAN: PieceTable[i].ID_COMPOSITION_PLAN,
                    NOM: response.data[0].NOM,
                    PRIX: response.data[0].PRIX
                }
                that.items.push(data);
            })
            .catch(function (error) {
            console.log(error);
            });
        }
      })
  }
}
</script>