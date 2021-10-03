<template>

<nav-bar class="z-50"></nav-bar>
 <div class="h-screen flex justify-center items-center body" id="bodyAbout" >
    <div class=" text-white p-3 w-full md:w-1/2 lg:w-1/4 lg:h-2/4 rounded text-center py-8 hover:shadow-md cursor-pointer ml-10 mb-20 zoom"
         v-for="members in member" :key="members.id">

         <div class="container">
			<div class="avatar">
				<img :src="members.img" alt="Members picture" />
			</div>
			<div class="content">
				<h1>{{members.duty}}</h1>
				<p>—— {{members.fullname}} ——</p>
				<p>— {{members.studentcode}} —</p>
			</div>
		</div>
    </div>
</div> 


<footer-com />
</template>
<script>
  export default {
    name: 'about',
    data() {
      return{
      member: [{
                id:1,
                fullname:'Paksawat Rakthai',
                duty:'Front-End / Dev-op / Database',
                studentcode:'62130500071',
                img:'https://scontent.fkdt1-1.fna.fbcdn.net/v/t1.6435-9/90089361_2512863312361212_6000451341263044608_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=zq_GIfJLD9MAX-F8onO&_nc_ht=scontent.fkdt1-1.fna&oh=f121692c0d1212b4466a849742dc9b92&oe=617E6183'},
                {
                id:2,
                fullname:'Varot Tirakhuntorn',
                duty:'Back-End / Dev-op / Database',
                studentcode:'62130500080',
                img:'https://scontent.fkdt1-1.fna.fbcdn.net/v/t1.6435-9/67694126_2293753384007480_1202710230085926912_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=174925&_nc_eui2=AeHmYh1wIbfV4PeUYcT8bzlsWXzrTQIKTupZfOtNAgpO6klggnGyyCD0OxTLpAfHPZw0oJraLPgmjHR9fViIdvWM&_nc_ohc=O5t2mb5rDYcAX9aVLWl&tn=diNgUOlrg_wiu_IV&_nc_ht=scontent.fkdt1-1.fna&oh=7db1a7485970481db7f193bb9da7daa0&oe=61746FFC'},
                {
                id:3,
                fullname:'Wuttichai Arayasook',
                duty:'Front-End / Dev-op / Database',
                studentcode:'62130500086',
                img:'https://scontent.fkdt1-1.fna.fbcdn.net/v/t1.18169-9/19105912_1961574670743588_5869076407858633935_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=174925&_nc_ohc=-X00mlvYD2kAX-bfeQm&_nc_ht=scontent.fkdt1-1.fna&oh=421755a7ef11d3eb2fb2a73ae230f476&oe=617F166B'}]
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
body,
html {
	height: 100%;
	margin: 0;
	padding: 0;
	font-family: 'Helvetica', sans-serif;
	
}

#bodyAbout {
  background: rgb(26, 188, 156);
	background: -moz-linear-gradient(-45deg, rgba(26, 188, 156, 1) 0%, rgba(142, 68, 173, 1) 100%);
	background: -webkit-linear-gradient(-45deg, rgba(26, 188, 156, 1) 0%, rgba(142, 68, 173, 1) 100%);
	background: linear-gradient(135deg, rgba(26, 188, 156, 1) 0%, rgba(142, 68, 173, 1) 100%);
}

h1 {
	font-size: 20px;
	margin: 10px 0 0 0;
	font-weight: lighter;
	text-transform: uppercase;
	color: snow;
}

p {
	font-size: 18px;
	font-weight: light;
	color: snow;
}


@keyframes float {
	0% {
		box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
		transform: translatey(0px);
	}
	50% {
		box-shadow: 0 25px 15px 0px rgba(0,0,0,0.2);
		transform: translatey(-20px);
	}
	100% {
		box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
		transform: translatey(0px);
	}
}

.container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.avatar {
	width: 300px;
	height: 300px;
	box-sizing: border-box;
	border: 5px white solid;
	border-radius: 50%;
	overflow: hidden;
	box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
	transform: translatey(0px);
	animation: float 6s ease-in-out infinite;

}

.content {
	width: 100%;
	max-width: 600px;
	padding: 20px 40px;
	box-sizing: border-box;
	text-align: center;
}

.suppoprt-me {
	display: inline-block;
	position: fixed;
	bottom: 10px;
	left: 10px;
	width: 20vw;
	max-width: 250px;
	min-width: 200px;
	z-index: 9;

}
</style>