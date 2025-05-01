<template>
  <div class = "section">
    <div class="title">
      <p> 미리 계획한 여행 장소가 있나요? </p>
      <h3> 여행 장소를 입력해주세요 </h3>
    </div>
    <div id="time_section">

    </div>
    <footer>
      <button id="before_btn" @click="$emit('prev')"> 이전 </button> 
      <RouterLink class="ok_btn" to="/main"> 확인 </RouterLink>  
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
  
#time_section {
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
  
#before_btn{
  padding: 10px 20px;
  border-radius: 20px;
  background-color: #dce9f5;
  border: none;
  cursor: pointer;
}
  
.ok_btn {
  padding: 10px 20px;
  border-radius: 20px;
  background-color: #dce9f5;
  border: none;
  cursor: pointer;
  color: black;
  text-decoration: none;
}
</style>