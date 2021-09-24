<template>
<div class="bg-white ">
<nav-bar class="bg-white"></nav-bar>
<div class="h-screen flex justify-center items-center body" style="background-image:url('https://images.unsplash.com/photo-1596447726719-bd49a6bdb10c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')">
    <div class="bg-gray-900 text-white p-3 w-full md:w-1/2 lg:w-1/4 lg:h-2/4 rounded text-center py-8 hover:shadow-md cursor-pointer ml-10 mb-20 zoom"
         v-for="members in member" :key="members.id">
         <div class="mt-14">
        <div class="flex justify-center mb-2"> <img class="rounded-full h-60 w-60 flex items-center justify-center" :src="members.img"> </div>
        <h1 class="text-3xl">{{ members.fullname }}</h1> <span class="text-lg">{{ members.studentcode }}</span><br/> <span class="text-xl">{{ members.duty }}</span>
        <div class="mt-3"> <a href=""><i class="fa fa-facebook mr-2"></i></a> <a href=""><i class="fa fa-linkedin mr-2"></i></a> <a href=""><i class="fa fa-google mr-2"></i></a> <a href=""><i class="fa fa-instagram mr-2"></i></a> </div>
    </div>
    </div>
</div>
</div>
</template>
<script>
  export default {
    name: 'about',
    data() {
      return{
      member: [{
                id:1,
                fullname:'Paksawat Rakthai',
                duty:'Front-End / Dev-op (Network) / Database',
                studentcode:'62130500071',
                img:'https://scontent.fkdt1-1.fna.fbcdn.net/v/t1.6435-9/90114101_2236652129976236_1601262712455692288_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=8bfeb9&_nc_eui2=AeEzjK4ZVfDQzCPXfTlrRrHHvI1VS_wz_pq8jVVL_DP-mpp3uHbVJPhXGq2aBfJVnLmPsi-ZvFhBxIylH8uSGFOP&_nc_ohc=IfG_0dRDZeIAX8nwK2r&_nc_ht=scontent.fkdt1-1.fna&oh=d1c26afcbeb17d804a9773d774a5c0d7&oe=6172A442'},
                {
                id:2,
                fullname:'Varot Tirakhuntorn',
                duty:'Back-End / Dev-op (ฺBackend) / Database',
                studentcode:'62130500080',
                img:'https://scontent.fkdt1-1.fna.fbcdn.net/v/t1.6435-9/67694126_2293753384007480_1202710230085926912_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=174925&_nc_eui2=AeHmYh1wIbfV4PeUYcT8bzlsWXzrTQIKTupZfOtNAgpO6klggnGyyCD0OxTLpAfHPZw0oJraLPgmjHR9fViIdvWM&_nc_ohc=O5t2mb5rDYcAX9aVLWl&tn=diNgUOlrg_wiu_IV&_nc_ht=scontent.fkdt1-1.fna&oh=7db1a7485970481db7f193bb9da7daa0&oe=61746FFC'},
                {
                id:3,
                fullname:'Wuttichai Arayasook',
                duty:'Front-End / Dev-ops (Frontend) / Database',
                studentcode:'62130500086',
                img:'https://scontent.fkdt1-1.fna.fbcdn.net/v/t1.18169-9/19225699_1960621444172244_5953648402952295508_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=174925&_nc_eui2=AeGnfP1eGIVHO1wBd7_DJFl1XmllbKRpSp9eaWVspGlKn4WV688gtIAWU4MHW2BVoudDqvqOZldGHS2qnIVgvrr6&_nc_ohc=iXgFTP3p5-0AX8rQiYJ&_nc_oc=AQm9vxUhI-aXESTYzuUudonJk5FayzJ3AEdPOvXtbFYh8p3PtveRPDUvjLMpY4jSSgA&_nc_ht=scontent.fkdt1-1.fna&oh=f8fc53e31ec7da61f413f04cf656135b&oe=6174FA07'}]
    }
    }
  }
</script>
<style scoped>
.zoom {
  transition: transform 0.3s,
}
.zoom:hover {
  transform: scale(1.15)
}
</style>