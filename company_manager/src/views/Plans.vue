<template>
    <b-container>
        <div class="table">
            <b-row>
                    <b-col cols="3">id</b-col>
                    <b-col cols="3">Nom</b-col>
                    <b-col cols="3">Client</b-col>
                    <b-col cols="3">Accéder au plan</b-col>
                </b-row>
            <div v-for="plan in plans" v-bind:key="plan.id">
                <b-row>
                    <b-col cols="3">{{ plan.id }}</b-col>
                    <b-col cols="3">{{ plan.name }}</b-col>
                    <b-col cols="3">{{ plan.for }}</b-col>
                    <b-col cols="3">
                        <b-button variant="warning">Voir les plans</b-button>
                    </b-col>
                </b-row>
            </div>
        </div>
    </b-container>
</template>

<script>
export default {
    data(){
        return {
            plans: [
                {
                    id: 1,
                    name: "Reactor plan",
                    for: "Veolia",
                    pieces: [
                        {
                            id: 4,
                            name: "Cuve",
                            price: 2500,
                            manufacturer: "France Inox",
                        },
                        {
                            id: 5,
                            name: "Réacteur",
                            price: 1000000,
                            manufacturer: "CNF",
                        }
                    ]
                }
            ]
        }
    }
}
</script>