<template>
  <div id="app">
    <header id="web_title"> <!-- 타이틀 보여주기 -->
      <RouterLink class="home_link" to="/"> Trendy Trip✈️ </RouterLink>
    </header>

    <div id="view_section">
      <HomePage></HomePage> <!--초기 사용자 화면 -->

      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-family: 'Pretendard SemiBold', sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}

#web_title {
  height: 10vh;
  width: 100%;
  padding-left: 30px;
  display: flex;
  align-items: center;
  font-family: 'Pretendard SemiBold', sans-serif;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.home_link {
  font-size: 20px;
  color: black;
  text-decoration: none;
}

/* 아래 전체 영역을 user_section이 채움 */
#view_section {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;  /* 수평 중앙 */
  align-items: center;      /* 수직 중앙 */
  background-color: rgb(238, 248, 250);
  overflow: hidden;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>