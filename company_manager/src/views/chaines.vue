<template>
    <b-container>
        <div v-for="serie in series" class="serie" v-bind:key="serie.id">
            <div :class="serie.type">
                <div v-for="product in serie.product" v-bind:key="product.id" class="pieces">{{ product }}</div>
            </div>
        </div>
    </b-container>
</template>

<script>
export default {
    data (){
        return {
            series: [
                {
                    id: 1,
                    type: 'production',
                    product: [3, 4]
                },
                {
                    id: 2,
                    type: 'production',
                    product: [5]
                },
                {
                    id: 3,
                    type: 'Assemblage',
                    product: [1]
                }
            ]
        }
    }
}
</script>