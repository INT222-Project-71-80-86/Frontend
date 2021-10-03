<template>
  <nav-bar></nav-bar>
  <div class="container mx-auto h-96 rounded-md flex items-center bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1560252719-59e35a3bbc6d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80');">
      <div class="sm:ml-20 text-gray-50 text-center sm:text-left">
        <h1 class="text-5xl font-bold mb-4">
          LOOK FOR GEAR ? <br />
          COME TO US.
        </h1>
        <p class="text-lg inline-block sm:block">The Largest Gaming Gears Shop in Thailand.</p>
      </div>
    </div>
      <main class="py-16 container mx-auto px-6 md:px-0">
    <section>
      <h1 class="text-3xl font-bold text-black mb-10">NPN SHOP | G A M I N G — G E A R S </h1>
      <div class="grid sm:grid-cols-2 gap-1 grid-cols-2">
      <button @click="pushCategory(2)"><div class="container mx-auto h-96 rounded-md flex items-center bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80');">
      </div></button>
      <button @click="pushCategory(6)"><div class="container mx-auto h-96 rounded-md flex items-center bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80');">
      </div></button>
      <button @click="pushCategory(1)"><div class="container mx-auto h-96 rounded-md flex items-center bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1613141411244-0e4ac259d217?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80');">
      </div></button>
      <button @click="pushCategory(3)"><div class="container mx-auto h-96 rounded-md flex items-center bg-cover" style="background-image: url('https://images.unsplash.com/photo-1420161900862-9a86fa1f5c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80');">
      </div></button>
      <button @click="pushCategory(5)"><div class="container mx-auto h-96 rounded-md flex items-center bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1565021324587-5fd009870e68?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80');">
      </div></button>
      <button @click="pushCategory(4)"><div class="container mx-auto h-96 rounded-md flex items-center bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1545454675-3531b543be5d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80');">
      </div></button>
        
        
      </div>
      <hr class="w-40 my-14 border-4 rounded-md sm:mx-0 mx-auto" />
    </section>
  </main>
  <footer-com />
</template>

<script>


export default {
  name: 'Home',
  methods: {
    pushCategory(catid){
      this.$router.push({ name: 'showproducts', params: {type: 'category' , value: catid}})
    }
  }
}
</script>

<style scoped>
.zoom {
  transition: transform 0.3s,
}
.zoom:hover {
  transform: scale(100000)
}
</style>