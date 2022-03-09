<template>
  <v-container fluid grid-list-md class="mt-5">
    <v-layout row wrap>
      <v-flex
        xs12
        sm6
        class="inherit"
        v-for="card in cards"
        :key="card.title"
      >
        <v-card 
          class="mx-auto" 
        >
          <v-img
            :src="card.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title v-text="card.title"></v-card-title>
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      cards: [
        { title: 'Encontrá tu sala más cercana', src: 'https://cdn.pixabay.com/photo/2016/11/22/19/15/hand-1850120_960_720.jpg', flex: 12 },
        { title: 'Estudios de grabación', src: 'https://cdn.pixabay.com/photo/2017/11/02/20/31/guitars-2912447_960_720.jpg', flex: 12 },
        { title: 'Salas de ensayo', src: 'https://cdn.pixabay.com/photo/2016/03/28/09/36/music-1285165_960_720.jpg', flex: 12 },
      ],
    }),
  }
</script>

<style scoped>
.inherit{
  padding: inherit;
}
</style>