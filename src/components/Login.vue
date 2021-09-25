<template>

    <nav-bar></nav-bar>
    <div class="flex justify-center h-screen">
        <form class="w-full md:w-1/3 bg-white rounded-lg border-t-2 border-b-2 border-green-500 shadow-md h-2/4">
            <div class="flex font-bold justify-center mt-6">
               <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-person-check-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
</svg>
            </div>
            <h2 class="text-3xl text-center text-gray-700 mb-4 mt-4">NPN MEMBER</h2>
            <div class="px-12 pb-10">
                <div class="w-full mb-2">
                    <div class="flex items-center">
                        <i class='ml-3 fill-current text-gray-400 text-xs z-10 fas fa-user'></i>
                        <input type='text' placeholder="Username"
                            class="-mx-6 px-8  w-full border rounded px-3 py-2 text-gray-700 focus:outline-none" />
                    </div>
                </div>
                <div class="w-full mb-2">
                    <div class="flex items-center">
                        <i class='ml-3 fill-current text-gray-400 text-xs z-10 fas fa-lock'></i>
                        <input type='text' placeholder="Password"
                            class="-mx-6 px-8 w-full border rounded px-3 py-2 text-gray-700 focus:outline-none" />
                    </div>
                </div>
                <a href="#" class="text-xs text-gray-500 float-left mb-4 -ml-2">Create Account?</a>
                <a href="#" class="text-xs text-gray-500 float-right mb-4">Forgot Password?</a> 
                <button type="submit"
                    class="w-full py-2 rounded-full bg-green-600 text-gray-100  focus:outline-none">Login</button>
            </div>
        </form>
    </div>

</template>
<script>

export default {
  name: "login",

}
</script>