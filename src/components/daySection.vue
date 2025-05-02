<template>
  <div class = "section">
    <div class="title">
      <p> 몇일 일정의 여행을 계획하고 계신가요? </p>
      <h3> 여행 날짜를 선택해주세요 </h3>
    </div>
    <div id="day_section">
      <VDatePicker v-model.range="range" mode="date" />
      <p> 선택한 일정: {{ tripDays }}일 </p>
    </div>
    <footer>
      <button id="before_btn" @click="$emit('prev')">이전</button>
      <button id="next_btn" @click="$emit('next')">다음</button>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const range = ref({
  start: new Date(),
  end: new Date(),
});

const tripDays = computed(() => {  // 일수 계산
  const start = new Date(range.value.start);
  const end = new Date(range.value.end);
  const diffTime = end - start;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays > 0 ? diffDays : 0;
});
</script>

<style scoped>
.section {
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
  
.title {
  flex: 0 0 20%;
  display: flex;
  padding: 30px;
  flex-direction: column;
}
  

#day_section {
  display: flex;
  flex-direction: column;  /* flex-direction을 column으로 설정 */
  align-items: center;
}
  
footer {
  flex: 0 0 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}
  
#before_btn, #next_btn {
  padding: 10px 20px;
  border-radius: 20px;
  background-color: #dce9f5;
  border: none;
  cursor: pointer;
}
</style>