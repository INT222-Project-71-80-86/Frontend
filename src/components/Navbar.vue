<template>
  <nav class="sticky top-0 pl-6 pr-6 border-b shadow-md mb-4 bg-white w-screen">
    <div class="flex justify-between items-center">
      <router-link to="/">
        <h1 class="pr-6 border-r-2 text-2xl font-bold text-black">NPN SHOP</h1>
      </router-link>
      <div class="flex justify-between flex-grow">
        <div class="flex justify-between ml-6 items-center">
          <div class="space-x-10 pr-6 font-bold">
            <router-link to="/Showproducts">
              <span class="text-md font-bold hover:text-green-500">PRODUCTS</span>
            </router-link>
            <dd-nav />
          </div>
        </div>
        <div class="md:flex space-x-6 hidden">
          <div class="p-8">
            <div class="bg-white flex items-center rounded-full shadow-sm -mt-3 border">
              <input
                class="rounded-l-full w-full px-6 py-3 text-gray-700 leading-tight focus:outline-none"
                id="search"
                type="text"
                placeholder="Search"
                v-model="searchProduct"
              />

              <div>
                <button
                  class="bg-blue-500 text-white rounded-full mr-3 hover:bg-blue-400 focus:outline-none w-10 h-10 flex items-center justify-center"
                >
                  <router-link
                    :to="{ name: 'showproducts', params: { searchProduct: searchProduct } }"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                      />
                    </svg>
                  </router-link>
                </button>
              </div>
            </div>
          </div>
          <!-- dropdown button account -->
          <div class="md-flex dropdown mt-4">
            <button
              class="dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                class="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </button>
            <ul
              class="dropdown-menu dropdown-menu-dark p-2 transition ease-out duration-500 m-2 -mt-3"
              aria-labelledby="dropdownMenuButton1"
            >
              <router-link to="/">
                <li>
                  <a class="text-white dropdown-item font-semibold" href="#">Register</a>
                </li>
              </router-link>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <router-link to="/Login">
                <li>
                  <a class="text-white dropdown-item font-semibold" href="#">Login</a>
                </li>
              </router-link>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <router-link to="/Cart">
                <li>
                  <a class="text-white dropdown-item font-semibold" href="#">Cart</a>
                </li>
              </router-link>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <router-link to="/Addproduct">
                <li>
                  <a class="text-white dropdown-item font-semibold" href="#">Addproduct</a>
                </li>
              </router-link>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <router-link to="/About">
                <li>
                  <a class="text-white dropdown-item font-semibold" href="#">About</a>
                </li>
              </router-link>
            </ul>
          </div>
          <!-- end dropdown button account -->
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Navbar',
  data(){
    return {
      searchProduct:""
    }
  }
}
</script>
    
