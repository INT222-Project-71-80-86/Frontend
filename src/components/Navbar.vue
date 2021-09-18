<template>
    <nav class="p-6 sticky">
      <div class="flex justify-between items-center">
        <h1 class="pr-6 border-r-2 text-2xl font-bold text-gray-500">NPN SHOP</h1>
        <div class="flex justify-between flex-grow">
          <div class="flex justify-between ml-6 items-center">
              <div class="space-x-10 pr-6 border-r-2 font-bold">
              <span class="text-gray-500 text-md">something</span>
              <span class="text-gray-500 text-md">something</span>
              <span class="text-gray-500 text-md">something</span>
              <span class="text-gray-500 text-md">something</span>
              <span class="text-gray-500 text-md">something</span>
              <span class="text-gray-500 text-md">something</span>
              </div>
          </div>
          <div class="md:flex space-x-6 hidden">
              <div class="flex ml-6 items-grow">
                <span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-6 cursor-pointer text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input class="outline-none text-sm flex-grow bg-gray-100" type="text" placeholder="Search your gears here...." />
              </div>
            <router-link to="/"><span class="text-gray-500 text-md">Sign up</span></router-link>
            <router-link to="/"><span class="text-gray-500 text-md">Log in</span></router-link>
          </div>
        </div>
      </div>
    </nav>
</template>
<script>
    export default{
        name: 'Navbar'
    }
</script>
    
