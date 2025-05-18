<template>
  <div id="pop">
    <header>
      <h2 id="place_name"> 
        <a :href="'https://www.instagram.com/explore/search/keyword/?q=' + encodeURIComponent(place.name)" 
          target="_blank" 
          id="instagram_link" >
          <img src="@/assets/instagram.png" alt="Instagram" id="instagram_img" />
        </a>
        {{ place.name }}   
      </h2> 
      <span id="place_category"> {{ place.category }} </span>
      <p id="place_address"> {{ place.address }} </p>
      <p id="running time"> 영업시간: {{ place.open_time }} ~ {{ place.close_time }} </p>
      <p id="place_convenience" style="color: gray"> {{ place.convenience }}</p>
    </header>
    <article id ="review">
      
      <div class="image-slider" v-if="place.image_urls && place.image_urls.length">
        <div class="image-container">
          <img 
            v-for="(image, index) in place.image_urls" 
            :key="index" 
            :src="image" 
            :alt="`Image ${index + 1}`" 
            class="slider-image" 
          />
        </div>
      </div>
     </article> 
    <footer>
      <button id = "add_place" @click="addPlace"> 추가➕ </button>
      <button id = "close_btn" @click="$emit('close')"> 닫기❌ </button>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'PlacePop',
    props:{
      place: {
        type: Object,
        required: true
      }
    },
    methods: {
      addPlace() {
        this.$emit('open-add-place');
      }
    }
  }
</script>

<style scoped>
#pop {
  width: 350px;
  height: 70%;
  padding: 20px;
  background-color: white;
  border: 3px solid skyblue;
  border-radius: 10px;
  position: absolute;
}
  
header {
  flex: 0 0 20%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

header h2 {
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

#place_category {
  position: absolute;
  top: 0;
  right: 0;
  background-color: skyblue;
  color: white;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.9rem;
}

header p {
  margin: 0;
  padding: 0;
  line-height: 1;
}

article {
  flex: 1 0 auto;
  max-height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
} 

#instagram_link {
  display: inline-block;
  cursor: pointer;
}

#instagram_img {
  width: 40px;
  height: 40px;
  margin: 0;
}

.image-slider {
  width: 100%;
  height: 100%;
  overflow-x: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  scroll-behavior: smooth;
}

.image-container {
  display: flex;
  gap: 10px;
}

.slider-image {
  width: 250px;
  height: 450px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

footer {
  flex: 0 0 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

#add_place,
#close_btn {
  background-color: white;
  border: none;
  padding: 10px 10px 10px 10px;
  cursor: pointer;
}
</style>