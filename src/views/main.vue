<template>
  <div id="map_page">
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
          <button id="test_btn" @click="place_Popup($event)">
            <span> ❓ </span>
          </button>
        </li>
      </ul>
    </nav>

    <div id="map" style="width: 100%; height: 100%;"></div>

    <!-- 팝업 슬라이딩 애니메이션 -->
    <transition name="slide-popup">
      <CalPop v-if="isCalendarPopupVisible" class="popup-panel" 
        @close="calendar_Popup" 
        @select-day="handleSelectDay" 
        @get-place-info="displayPlaceInfo"
        @open-remove-place="openRemovePlace"
        />
    </transition>
    <transition name="slide-popup">
      <SearchPop v-if="isSearchPopupVisible" class="popup-panel" @close="search_Popup" @select-place="handleSelectPlace"/>
    </transition>
    <transition name="slide-popup">
      <SavePop v-if="isSavePopupVisible" class="popup-panel" @close="save_Popup" />
    </transition>

    <PlacePop 
      v-if="isPlacePopupVisible"
      :key="selectedPlace?.name" 
      :place="selectedPlace"
      :style="popupStyle"
      @close="handleClosePlace"
      @open-add-place="openAddPlace"
    />

    <AddPlacePop v-if="isAddPlaceVisible" :style="AddPlaceStyle" @close="isAddPlaceVisible = false"/>
    <RemovePlacePop v-if="isRemovePlaceVisible" :style="RemovePlaceStyle" @close="isRemovePlaceVisible = false" />
    
    <div id="category_btn">
      <button class="category-button" @click="openHashtag"> 관광명소 </button>
      <button class="category-button" @click="openHashtag"> 카페 </button>
      <button class="category-button" @click="openHashtag"> 음식점 </button>
      <button class="category-button" @click="openHashtag"> 숙소 </button>
    </div>

    <HashtagButton v-if="showHashtag" class="hashtag-container" />
  </div>
</template>

<script>
import CalPop from '@/components/calender.vue'  // 일정 표
import SearchPop from '@/components/search.vue'  // 장소 검색
import SavePop from '@/components/save_file.vue'  // 파일 저장장
import PlacePop from '@/components/place.vue'

import AddPlacePop from '@/components/addPlace.vue'
import RemovePlacePop from '@/components/removePlace.vue'
import HashtagButton from '@/components/hashtag.vue';

export default {
  name: 'MainPage',
  components: {
    SearchPop,
    CalPop,
    SavePop,
    PlacePop,
    AddPlacePop,
    RemovePlacePop,
    HashtagButton
  },
  data() {
    return {
      selectedPlace: null,
      isCalendarPopupVisible: false, // 달력 팝업 상태 관리
      isSearchPopupVisible: false, // 검색 팝업 상태 관리
      isSavePopupVisible: false,
      isPlacePopupVisible: false,
      isAddPlaceVisible: false,
      isRemovePlaceVisible: false,
      map: null,
      markers: [], // 지도에 표시할 마커들
      selectedCoordinates: [], // 선택된 Day의 좌표 배열
      showHashtag: false // 해시태그 출력력
    };
  },
  methods: {
    closePopups() {
      this.isCalendarPopupVisible = false;
      this.isSearchPopupVisible = false;
      this.isSavePopupVisible = false;
      this.isPlacePopupVisible = false;
      this.isAddPlaceVisible = false;
      this.isRemovePlaceVisible =  false;
    },
    calendar_Popup() {
      if (this.isCalendarPopupVisible) {
        this.closePopups(); // 이미 열려있으면 닫기
      } else {
        this.closePopups(); // 다른 팝업 닫기
        this.isCalendarPopupVisible = true; // 달력 팝업 열기
        this.popupStyle = {
          position: 'absolute',
          top: `20px`,
          left: `110px`,
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
        this.popupStyle = {
          position: 'absolute',
          top: `20px`,
          left: `110px`,
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
        this.popupStyle = {
          position: 'absolute',
          top: `20px`,
          left: `110px`,
          zIndex: 1000
        };
      }
    },
    handleSelectPlace(place) {  // 장소 검색 선택 시, 플레이스 컴포넌트 생성성
      this.selectedPlace = place;
      this.isPlacePopupVisible = true;

      if (this.selectedMarker) {
        this.selectedMarker.setMap(null);
      }

      // 선택된 장소의 마커 생성
      this.selectedMarker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(place.y, place.x), // y=위도, x=경도 순으로 넣기
        map: this.map,
      });

      // 지도 중심을 선택된 장소로 이동
      this.map.setCenter(new window.naver.maps.LatLng(place.y, place.x));
      this.map.setZoom(13); // 줌 레벨 조정 (필요에 따라 변경)

      this.popupStyle = {
          position: 'absolute',
          top: `30px`,
          left: `420px`, // 검색 팝업 오른쪽에 위치
          zIndex: 1000
        };
    },
    handleClosePlace() {
      this.selectedPlace = null; // 장소 팝업만 닫기
      this.isPlacePopupVisible = false;
    },
    // SVG로 숫자 마커 아이콘 생성 함수
    createNumberMarkerIcon(number) {
      const svg = `
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" fill="skyblue" />
          <text x="20" y="26" font-size="18" font-family="Arial" fill="white" font-weight="bold" text-anchor="middle">${number}</text>
        </svg>
      `;
      return 'data:image/svg+xml;base64,' + btoa(svg);
    },
    handleSelectDay(coordinates) {
      console.log("선택된 Day의 장소 좌표:", coordinates);
      this.selectedCoordinates = coordinates;

      // 기존 마커들 지도에서 제거
      this.markers.forEach(marker => marker.setMap(null));
      this.markers = [];

      if (this.polyline) {
        this.polyline.setMap(null);
      }

      coordinates.forEach(({ x, y }, index) => {
        const iconUrl = this.createNumberMarkerIcon(index + 1)

        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(y, x), // y=위도, x=경도 순으로 넣기
          map: this.map,
          icon: {
            url: iconUrl,
            size: new window.naver.maps.Size(40, 40),
            origin: new window.naver.maps.Point(0, 0),
            anchor: new window.naver.maps.Point(20, 20), // 아이콘 중심점
          }
        });
        this.markers.push(marker);
      });

      const path = coordinates.map(({ x, y }) => new window.naver.maps.LatLng(y, x));

      // 폴리라인 생성
      this.polyline = new window.naver.maps.Polyline({
        map: this.map,
        path: path,
        strokeColor: 'skyblue',
        strokeOpacity: 0.8,
        strokeWeight: 2,
      }); 
    },
    displayPlaceInfo(place) {
      this.selectedPlace = place;
      this.isPlacePopupVisible = true;

      this.popupStyle = {
        position: 'absolute',
        top: `30px`,
        left: `420px`, // 검색 팝업 오른쪽에 위치
        zIndex: 1000
      };
    },
    openHashtag() {
      this.showHashtag = !this.showHashtag;

      if (this.map) {
        const bounds = this.map.getBounds();
        const sw = bounds.getSW();
        const ne = bounds.getNE();

        console.log("Top Left:", { lat: ne.lat(), lng: sw.lng() });
        console.log("Top Right:", { lat: ne.lat(), lng: ne.lng() });
        console.log("Bottom Left:", { lat: sw.lat(), lng: sw.lng() });
        console.log("Bottom Right:", { lat: sw.lat(), lng: ne.lng() });
      }
    },
    openAddPlace() {
      this.isAddPlaceVisible = true;

      this.AddPlaceStyle = {
        position: 'absolute',
        top: '250px',
        left: '480px',
        zIndex: 1000
      };
    },
    openRemovePlace() {
      this.isRemovePlaceVisible = true;

      this.RemovePlaceStyle = {
        position: 'absolute',
        top: '30px',
        left: '420px',
        zIndex: 1000
      };
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
      this.map = new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(33.4, 126.55), 
        zoom: 11
      });
    };
  }
};
</script>

<style>
body {
  display: flex;
  margin: 0;
  height: 100vh; /* 전체 높이 설정 */
  font-family: 'Pretendard SemiBold', sans-serif
}

#map_page {
  display: flex;
  width: 100%; /* 전체 너비 설정 */
  height: 100%;
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

#side_btn:focus {
  background-color:rgb(10, 124, 173);
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
  width: 80px; /* 너비 (원 크기) */
  height: 80px; /* 높이 (원 크기) */
  padding: 0; /* 패딩 제거 */
  background-color: rgba(73, 210, 255, 0.5); /* 배경색 */
  color: white; /* 글자색 */
  border: 2px solid white; /* 테두리 제거 */
  border-radius: 50%; /* 동그라미 모양 */
  cursor: pointer; /* 커서 변경 */
  display: flex; /* 내용 가운데 정렬 */
  align-items: center;
  justify-content: center;
  font-size: 16px; /* 글자 크기 */
  transition: background-color 0.2s ease;
}

.category-button:hover {
  background-color: deepskyblue; /* 호버 시 색상 변경 */
}

.hashtag-container {
  position: absolute;
  top: 120px;
  right: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  width: 250px;
  height: 250px;
  background-color: none;
  border-radius: 5px;
  overflow-y: auto;
  scrollbar-width: none;
  z-index: 300;
}

.popup-panel {
  position: absolute;
  top: 20px;
  left: 90px; /* 사이드바 바로 옆 */
  z-index: 1000;
  overflow: visible; 
}

/* transition 효과 */
.slide-popup-enter-active,
.slide-popup-leave-active {
  transition: all 0.3s ease;
}

.slide-popup-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.slide-popup-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.slide-popup-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.slide-popup-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

</style>