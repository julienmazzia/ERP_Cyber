<template>
    <b-container>
    <div class="table">
        <b-row>
                    <b-col cols="3">id</b-col>
                    <b-col cols="3">Nom de la société</b-col>
                    <b-col cols="3">Téléphone</b-col>
                    <b-col cols="3">Mail</b-col>
                    <b-col cols="3">Adresse</b-col>
                    <b-col cols="3">Code postal</b-col>
                    <b-col cols="3">Ville</b-col>
                </b-row>
        <div v-for="client in clients" v-bind:key="client.id">
                <b-row>
                    <b-col cols="3">{{ client.id }}</b-col>
                    <b-col cols="3">{{ client.name }}</b-col>
                    <b-col cols="3">{{ client.mail }}</b-col>
                    <b-col cols="3">{{ client.phone }} postal</b-col>
                    <b-col cols="3">{{ client.address }}</b-col>
                    <b-col cols="3">{{ client.code }}</b-col>
                    <b-col cols="3">{{ client.town }}</b-col>
                </b-row>
            </div>
    </div>
    </b-container>
</template>

<script>
export default {
  data(){
    return {
      clients: [
            {
              id: 1,
              name: 'Veolia',
              phone: '+3363782199',
              mail: 'veolia.group@veolia.fr',
              address: '5 rue de la marche',
              code: '56000',
              town: 'Paris'
            },
            {
              id: 2,
              name: 'EDF',
              phone: '+3363782159',
              mail: 'edf.group@edf.fr',
              address: '30 avenue de la mariniére',
              code: '34000',
              town: 'Tours'
            }
          ]
    }
  }
    
}
</script>