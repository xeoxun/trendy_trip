<template>
  <div class = "section">
    <div class="title">
      <p> 이번 여행, 어디로 떠나볼까요? </p>
      <h3> 가고 싶은 지역을 선택해주세요 </h3>
    </div>
    <div id="area_section">
      <button id="area_btn"> 서울 </button>
      <button id="area_btn"> 경기 </button>
      <button id="area_btn"> 충청 </button>
      <button id="area_btn"> 강원 </button>
      <button id="area_btn"> 경상 </button>
      <button id="area_btn"> 전라 </button>
      <button id="area_btn"> 제주 </button>
      <button id="area_btn"> 인천 </button>
      <button id="area_btn"> 부산 </button>
      <button id="area_btn"> 대구 </button>
      <button id="area_btn"> 광주 </button>
      <button id="area_btn"> 대전 </button>
      <button id="area_btn"> 세종 </button>
    </div>
    <footer>
      <button id="next_btn" @click="$emit('next')"> 다음 </button>
    </footer>
  </div>
</template>


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
  justify-content: center;
}

#area_section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

#area_btn {
  width: 85px;
  height: 85px;
  border-radius: 50%;
  background-color: #dcf5f5; /* 아이보리 */
  border: none;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
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