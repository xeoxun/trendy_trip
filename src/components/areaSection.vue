<template>
  <div class="section">
    <div class="title">
      <p>이번 여행, 어디로 떠나볼까요?</p>
      <h3>가고 싶은 지역을 선택해주세요</h3>
    </div>
    <div id="area_section">
      <button class="area_btn" v-for="area in areas" :key="area">
        {{ area }} 
      </button>
    </div>
    <footer>
      <button id="next_btn" @click="next">다음</button>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      areas: [
        "서울", "경기\n인천", "충청", "강원",
        "경상", "전라", "제주", "부산",
        "대구", "광주", "대전", "세종"
      ],
    };
  },
};
</script>

<style scoped>
.section {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.title {
  flex: 0 0 20%;
  display: flex;
  padding: 30px;
  flex-direction: column;
  justify-content: center;
}

#area_section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.area_btn {
  width: 85px;
  height: 85px;
  border-radius: 50%;
  background-color: #dcf5f5; /* 기본 배경 색 */
  border: none;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.area_btn.selected {
  background-color: #3dbbff; /* 선택된 버튼 색 */
  color: white;
}

footer {
  flex: 0 0 10%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
}

#next_btn {
  padding: 10px 20px;
  border-radius: 20px;
  background-color: #dce9f5;
  border: none;
  cursor: pointer;
}
</style>