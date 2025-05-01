<template>
  <div class = "section">
    <div class="title">
      <p> 몇일 일정의 여행을 계획하고 계신가요? </p>
      <h3> 여행 날짜를 선택해주세요 </h3>
    </div>
    <div id="day_section">
      <VDatePicker v-model.range="range" mode="date" />
    </div>
    <footer>
      <button id="before_btn" @click="$emit('prev')">이전</button>
      <button id="next_btn" @click="$emit('next')">다음</button>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const range = ref({
  highlight: 'skyblue',
  start: new Date(),
  end: new Date(),
  span: null,
});
</script>

<style scoped>
.section {
  padding: 20px;
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
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
  
footer {
    flex: 0 0 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
}
  
#before_btn, #next_btn {
  padding: 10px 20px;
  border-radius: 20px;
  background-color: #dce9f5;
  border: none;
  cursor: pointer;
}
</style>