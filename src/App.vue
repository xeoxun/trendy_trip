<template>
  <div id="app">
    <nav id="side">
      <ul class="nav_list">
        <li style="background-color: skyblue; border-color: skyblue;">
          <h1> ✈️ </h1>
        </li>
        <li id="side_btn">
          <button id="search_btn" @click="search_Popup($event)">
            <p> 🔍 </p>
          </button>
        </li>
        <li id="side_btn">
          <button id="calender_btn" @click="calendar_Popup($event)">
            <span> 📆 </span>
          </button>
        </li>
        <li id="side_btn">
          <button id="save_btn" @click="save_Popup($event)">
            <span> 💾 </span>
          </button>
        </li>
        <li id="side_btn">
          <button id="test_btn" @click="openUserWindow">
            <span> ❓ </span>
          </button>
        </li>
      </ul>
    </nav>
    <div id="map" style="width: 100%; height: 100%;"></div>

    <Cal_ v-if="isCalendarPopupVisible" :style="popupStyle" @close="calendar_Popup" />
    <Search_ v-if="isSearchPopupVisible" :style="popupStyle" @close="search_Popup" />
    <Save_ v-if="isSavePopupVisible" :style="popupStyle" @close="save_Popup" />

    <div id="category_btn">
      <button class="category-button" @click="handleRoundButtonClick">관광명소</button>
      <button class="category-button" @click="handleRoundButtonClick">카페</button>
      <button class="category-button" @click="handleRoundButtonClick">음식점</button>
    </div>
    
  </div>
</template>

<script>
import Cal_ from './components/calender.vue'
import Search_ from './components/search.vue'
// import Place_ from './components/place.vue'
import Save_ from './components/save_file.vue'

export default {
  name: 'App',
  components: {
    Search_,
    Cal_,
    Save_
  },
  data() {
    return {
      isCalendarPopupVisible: false, // 달력 팝업 상태 관리
      isSearchPopupVisible: false, // 검색 팝업 상태 관리
      isSavePopupVisible: false,
      popupStyle: {} // 팝업 스타일
    };
  },
  methods: {
    closePopups() {
      this.isCalendarPopupVisible = false;
      this.isSearchPopupVisible = false;
      this.isSavePopupVisible = false;
    },
    calendar_Popup() {
      if (this.isCalendarPopupVisible) {
        this.closePopups(); // 이미 열려있으면 닫기
      } else {
        this.closePopups(); // 다른 팝업 닫기
        this.isCalendarPopupVisible = true; // 달력 팝업 열기
        //const buttonRect = event.target.getBoundingClientRect();
        this.popupStyle = {
          position: 'absolute',
          top: `20px`,
          left: `100px`,
          zIndex: 1000
        };
      }
    },
    search_Popup() {
      if (this.isSearchPopupVisible) {
        this.closePopups(); // 이미 열려있으면 닫기
      } else {
        this.closePopups(); // 다른 팝업 닫기
        this.isSearchPopupVisible = true; // 검색 팝업 열기
        //const buttonRect = event.target.getBoundingClientRect();
        this.popupStyle = {
          position: 'absolute',
          top: `20px`,
          left: `100px`,
          zIndex: 1000
        };
      }
    },
    save_Popup() {
      if (this.isSavePopupVisible) {
        this.closePopups(); // 이미 열려있으면 닫기
      } else {
        this.closePopups(); // 다른 팝업 닫기
        this.isSavePopupVisible = true; // 검색 팝업 열기
        //const buttonRect = event.target.getBoundingClientRect();
        this.popupStyle = {
          position: 'absolute',
          top: `20px`,
          left: `100px`,
          zIndex: 1000
        };
      }
    },
    openUserWindow() {
      window.open('/user', '_blank', 'width=800,height=600');
    }
  },
  mounted() {
    // 네이버 지도 API 스크립트 로드
    const script = document.createElement("script");
    script.src = "https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=f0u1dydazz"; // 실제 NCP Client ID로 변경
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      // 네이버 지도 생성
      new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(33.4, 126.55), 
        zoom: 11,
      });
    };
  }
}
</script>

<style>
body {
  display: flex;
  margin: 0;
  height: 100vh; /* 전체 높이 설정 */
  font-family: 'Pretendard SemiBold', sans-serif
}

#app {
  display: flex;
  width: 100%; /* 전체 너비 설정 */
}

#side {
  width: 80px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border: 3px solid skyblue;
}

.nav_list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav_list li {
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 30px;
}

.nav_list li button {
  width: 100%;
  height: 100%;
  border: none;
  background: none;
  font-size: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

#category_btn {
  position: absolute; /* 절대 위치로 설정 */
  top: 20px; /* 상단에서의 위치 */
  right: 20px; /* 오른쪽에서의 위치 */
  display: flex; /* Flexbox 사용 */
  flex-direction: row; /* 수평 정렬 */
  gap: 10px; /* 버튼 간의 간격 */
}

.category-button {
  padding: 10px 15px; /* 패딩 */
  background-color: rgb(6, 111, 192); /* 배경색 */
  color: white; /* 글자색 */
  border: none; /* 테두리 제거 */
  border-radius: 5px; /* 모서리 둥글게 */
  cursor: pointer; /* 커서 변경 */
}

.category-button:hover {
  background-color: deepskyblue; /* 호버 시 색상 변경 */
}

main {
  flex-grow: 1; /* 남은 공간을 차지하도록 설정 */
  border: 3px solid skyblue; /* 윤곽선 설정 */
}
</style>
