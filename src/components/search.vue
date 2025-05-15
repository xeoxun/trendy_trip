<template>
  <div id="pop">
    <header>
      <p> 어떤 관광명소를 찾고 계시나요?</p>
      <h3>🔎장소를 검색해주세요</h3>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="장소를 입력하세요"
        id="search_input"
      />
    </header>

    <article id="place_list" v-if="!selectedPlace">
      <ul>
        <li 
          v-for="(place, index) in filteredPlaces" 
          :key="index" 
          @click="selectPlace(place)">
          {{ place.places.name }}
        </li>
      </ul>
    </article>
    <footer>
      <button id="close_btn" @click="$emit('close')">닫기❌</button>
    </footer>
  </div>
</template>

<script>
import placesData from '@/store/test_data.js'

export default {
  name: 'SearchPop',

  data() {
    return {
      searchQuery: '',
      places: placesData,
      selectedPlace: null,  // 선택된 장소 저장 변수
    };
  },
  computed: {
    filteredPlaces() {
      if (!this.searchQuery) {
        return this.places;
      }
      return this.places.filter((place) =>
        place.name.includes(this.searchQuery)
      );
    },
  },
  methods: {
    selectPlace(place) {
      this.$emit('select-place', place.places);
    },
  },
};
</script>

<style scoped>
#pop {
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 300px;
  height: 90%;
  background-color: white;
  border: 3px solid skyblue;
  border-radius: 10px;
  position: absolute;
  overflow: hidden;
}

header {
  width: 100%;
  flex: 0 0 10%;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

#search_input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid skyblue;
  font-size: 16px;
}

#place_list {
  width: 100%;
  height: 70%;
  margin: 10px;
  overflow-y: auto;
}

#place_list ul {
  width: 100%;
  list-style: none;
  padding: 10px;
}

#place_list li {
  padding: 8px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.place-detail {
  padding: 10px;
  border-top: 1px solid #ddd;
}

.place-image {
  width: 100px;
  height: 100px;
  margin: 5px;
}

footer {
  flex: 0 0 10%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#close_btn {
  padding: 10px;
  border-radius: 20px;
  background-color: #dce9f5;
  border: none;
  cursor: pointer;
}
</style>
