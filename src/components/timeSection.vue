<template>
  <div class="section">
    <div class="title">
      <p> 어디서부터 여행을 즐기실건가요? </p>
      <h3> 🏕️여행 장소를 입력해주세요 </h3>
    </div>
    <div class="article_section">
      <div id="start_info"> 
        <h3> ✈️ 출발 장소 및 시간 입력 </h3>
        <p> {{ startDay }} </p>
        <form id="start_input">
          <label>
            <input v-model="startPlace" type="radio" value="제주국제공항" /> 제주국제공항
          </label>
          <label>
            <input v-model="startPlace" type="radio" value="제주국제여객터미널" /> 제주국제여객터미널
          </label>
        </form> 
        <input v-model="startTime" type="time" id="start_time" />
      </div>

      <br>

      <div id="end_info">
        <h3> ✈️ 마지막 장소 및 시간 입력 </h3>
        <p> {{ endDay }} </p>
        <form id="end_input">
          <label>
            <input v-model="endPlace" type="radio" value="제주국제공항" /> 제주국제공항
          </label>
          <label>
            <input v-model="endPlace" type="radio" value="제주국제여객터미널" /> 제주국제여객터미널
          </label>
        </form> 
        <input v-model="endTime" type="time" id="end_time" />
      </div>
    </div>

    <footer>
      <button id="before_btn" @click="$emit('prev')"> 이전 </button> 
      <RouterLink id="ok_btn" to="/main" @click="saveData"> 확인 </RouterLink>  
    </footer>
  </div>
</template>

<script>
import { useDataStore } from '@/store/data'

export default {
  data() {
    return {
      startPlace: '',
      startTime: '',
      endPlace: '',
      endTime: ''
    };
  },
  setup() {
    const data = useDataStore();

    return {
      startDay: data.startDate,
      endDay: data.endDate,
    };
  },
  methods: {
    saveData() {
      const data = useDataStore();
      data.setUserPlan(this.startPlace, this.startTime, this.endPlace, this.endTime);
    }
  }
};
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
  display: flex;
  padding: 20px;
  max-height: 15%;
  flex-direction: column;
}

.article_section {
  flex: 0 0 70; 
  display: flex;
  flex-direction: column;
  max-height: 80%;
  padding: 30px;
  width: 100%;
  box-sizing: border-box;
}

.article_section p, h3 {
  margin: 0;
  padding: 0;
}

#start_input,
#start_time,
#end_input,
#end_time {
  width: 95%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid skyblue;
  border-radius: 5px;
  font-size: 16px;
}

footer {
  display: flex;
  max-height: 10%;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

#before_btn {
  padding: 10px 20px;
  border-radius: 20px;
  background-color: #dce9f5;
  border: none;
  cursor: pointer;
}

#ok_btn {
  padding: 10px 20px;
  border-radius: 20px;
  background-color: #dce9f5;
  border: none;
  cursor: pointer;
  color: black;
  text-decoration: none;
}
</style>