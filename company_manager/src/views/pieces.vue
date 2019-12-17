<template>
    <b-container>
    <div class="table">
        <b-row>
                    <b-col cols="3">id</b-col>
                    <b-col cols="3">Nom</b-col>
                    <b-col cols="3">Prix</b-col>
                </b-row>
        <div v-for="piece in pieces" v-bind:key="piece.id">
                <b-row>
                    <b-col cols="3">{{ piece.id }}</b-col>
                    <b-col cols="3">{{ piece.name }}</b-col>
                    <b-col cols="3">{{ piece.price }}</b-col>
                </b-row>
            </div>
    </div>
    </b-container>
</template>

<script>
export default {
    props: ['id']
}
</script>