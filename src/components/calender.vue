<template>
  <div id="pop">
    <header> <!-- 팝업의 헤더 -->
      <h2> 🍊제주여행</h2>
      <h4 id = "day"> {{ days }} {{ date }} </h4>
    </header>
    <article id ="choose">

    </article>
    <footer>
      <button id = "close_btn"> 닫기❌ </button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Cal_',
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

#choose {
  width: 100%;
  height: 70%;
} 

footer {
  display: flex;
  justify-content: flex-start; /* 좌측 정렬 */
  padding: 10px; /* 여백 추가 */
}

#day {
  font-size: 70%;
}

#close_btn {
  background-color: none; /* 버튼 배경색 */
  border: none; /* 테두리 제거 */
  padding: 8px 12px; /* 패딩 추가 */
  cursor: pointer; /* 커서 변경 */
}
</style>