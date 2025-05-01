<template>
  <div id="pop">
    <header> <!-- 팝업의 헤더 -->
      <h2> 🔎 장소를 검색해주세요</h2>
    </header>
    <article id ="place_list">
  
    </article>
    <footer>
      <button id = "close_btn"> 닫기❌ </button>
    </footer>
  </div>
</template>
  
<script>
  export default {
    name: 'Search_',
    props: {
      days: String,
      date: String,
    }
  }
</script>
  
<style scoped>
#pop {
  width: 330px;
  height: 95%;
  background-color: white;
  border: 3px solid skyblue;
  border-radius: 10px;
}
  
/* header {
  width: 100%;
  height: 20%;
} */
  
#place_list {
  width: 100%;
  height: 70%;
} 
  
footer {
  display: flex;
  justify-content: flex-start; /* 좌측 정렬 */
  padding: 10px; /* 여백 추가 */
}
  
#close_btn {
  background-color: none; /* 버튼 배경색 */
  border: none; /* 테두리 제거 */
  padding: 8px 12px; /* 패딩 추가 */
  cursor: pointer; /* 커서 변경 */
}
</style>