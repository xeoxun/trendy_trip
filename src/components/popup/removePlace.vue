<template>
  <div id="selectDayPlace"> 
    <h4> 어떤 일정을 삭제하실건가요? </h4>
    <select v-model="selectedDay" @change="updateVisits">
      <option v-for="n in tripDay" :key="n" :value="n - 1">Day {{ n }}</option>
    </select>
    
    <div class="radio-container" v-if="currentVisits.length">
      <div v-for="visit in currentVisits" :key="visit.order">
        <label>
          <input v-model="selectedPlace" type="radio" :value="visit.place" /> {{ visit.place }}
        </label>
      </div>
    </div>

    <div class="btn-container">
      <button id="close_btn" @click="$emit('close')">닫기❌</button>
      <button id="select_btn" @click="confirmSelection">확인</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import CalenderData from '@/store/test_calendar.js';

export default {
  name: 'removePlace',
  setup(props, { emit }) {
    const tripDay = ref(CalenderData.length);
    const selectedDay = ref(0);
    const selectedPlace = ref(null);
    const currentVisits = ref([]);

    const updateVisits = () => {
      currentVisits.value = CalenderData[selectedDay.value].visits;
    };

    onMounted(() => {
      updateVisits(); // 컴포넌트가 생성되면 Day 1의 방문 목록이 기본으로 표시됨
    });

    const confirmSelection = () => {
      if (selectedPlace.value) {
        console.log("선택된 장소:", selectedPlace.value);
        emit("close"); // 창 닫기
      } else {
        alert("삭제할 장소를 선택하세요.");
      }
    };

    return {
      tripDay,
      selectedDay,
      selectedPlace,
      currentVisits,
      updateVisits,
      confirmSelection
    };
  }
};
</script>

<style scoped>
#selectDayPlace {
  width: 250px;
  height: auto;
  padding: 20px;
  background-color: white;
  border: 3px solid skyblue;
  border-radius: 10px;
  position: absolute;
}

h4, h5 {
  margin: 0 0 10px 0;
}

.radio-container {
  margin: 10px 0;
}

.btn-container {
  flex: 0 0 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
}

#close_btn, #select_btn {
  background-color: white;
  border: none;
  cursor: pointer;
}
</style>
