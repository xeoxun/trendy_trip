<template>
  <div id="map_page">
    <nav id="side">
      <ul class="nav_list">
        <li v-for="sidebtn in navButtons" :key="sidebtn.id" :style="sidebtn.style">
          <button :id="sidebtn.id" @click="togglePopup(sidebtn.popupKey)">
            <span v-if="sidebtn.icon" v-html="sidebtn.icon"></span>
            <p v-else>{{ sidebtn.label }}</p>
          </button>
        </li>
      </ul>
    </nav>

    <div id="map" style="width: 100%; height: 100%;"> </div> <!-- 네이버 지도 -->

    <transition name="slide-popup">
      <CalPop v-if="isPopupVisible.calendar" class="popup-panel" :style="popupStyle"
        @close="togglePopup('calendar')" 
        @select-day="handleSelectDay" 
        @get-place-info="displayPlaceInfo"
        @open-remove-place="openRemovePlace"
      />
    </transition>
    <transition name="slide-popup">
      <SearchPop v-if="isPopupVisible.search" class="popup-panel" :style="popupStyle" @close="togglePopup('search')" @select-place="handleSelectPlace"/>
    </transition>
    <transition name="slide-popup">
      <SavePop v-if="isPopupVisible.save" class="popup-panel" :style="popupStyle" @close="togglePopup('save')" />
    </transition>

    <PlacePop v-if="isPopupVisible.placepop" :key="selectedPlace?.name" :place="selectedPlace" :style="currentPopupStyle"
      @close="handleClosePlace"
      @open-add-place="openAddPlace"
    />

    <AddPlacePop v-if="isPopupVisible.addPlace" :style="AddPlaceStyle" @close="isAddPlaceVisible = false"/>
    <RemovePlacePop v-if="isPopupVisible.removePlace" :style="RemovePlaceStyle" @close="isRemovePlaceVisible = false" />
    
    <CategoryBtn @open-hashtag="handleOpenHashtag"> </CategoryBtn>
    <HashtagButton v-if="showHashtag" class="hashtag-container" @select-hashtag="handleSelectHashtag"/>

    <button v-if="isShowRefreshButton" @click="logMapBounds" class="refresh-btn"> 🔄️ 화면 갱신 </button>
  </div>
</template>

<script>
import CalPop from '@/components/popup/calender.vue'  // 일정 표
import SearchPop from '@/components/popup/search.vue'  // 장소 검색
import SavePop from '@/components/popup/save_file.vue'  // 파일 저장
import PlacePop from '@/components/popup/place.vue'

import AddPlacePop from '@/components/addPlace.vue'
import RemovePlacePop from '@/components/removePlace.vue'

import HashtagButton from '@/components/button/hashtag.vue'
import CategoryBtn from '@/components/button/category.vue'

import moveData from "@/store/test_move.js" // 해시태그별 장소 출력
import placeData from "@/store/test_data.js"

export default {
  name: 'MainPage',
  components: {
    SearchPop, CalPop, SavePop, PlacePop, CategoryBtn,
    AddPlacePop, RemovePlacePop, 
    HashtagButton
  },
  data() {
    return {
      selectedPlace: null,
      isShowRefreshButton: false,
      isPopupVisible: {  // 팝업 표시
        calendar: false, 
        search: false,
        save: false,
        placepop: false,
        addPlace: false,
        remove:false
      },
      navButtons: [  // 사이드 버튼
        { id: 'logo', label: '✈️', style: { backgroundColor: 'skyblue', borderColor: 'skyblue' }, popupKey: null },
        { id: 'search_btn', label: '🔍', popupKey: 'search' },
        { id: 'calendar_btn', label: '📆', popupKey: 'calendar' },
        { id: 'save_btn', label: '💾', popupKey: 'save' }
      ],
      map: null,
      markers: [], // 지도에 표시할 일정 장소 마커들
      hash_markers: [], // 해시태그로 생성된 장소 마커
      selectedCoordinates: [], // 선택된 Day의 좌표 배열
      showHashtag: false, // 해시태그 출력
      selectedCategory: null  // 선택된 카테고리리
    };
  },
  methods: {
    togglePopup(popupKey) {
      if (!popupKey) return; // 예: 로고 버튼처럼 팝업 없으면 무시
      // 현재 누른 팝업 상태 반전
      const currentState = this.isPopupVisible[popupKey];
      // 모든 팝업 닫기
      Object.keys(this.isPopupVisible).forEach(key => {
        this.isPopupVisible[key] = false;
      });
      // 토글 상태 적용
      this.isPopupVisible[popupKey] = !currentState;
      this.popupStyle = {
          position: 'absolute',
          top: `20px`,
          left: `100px`,
          zIndex: 1000
        };
    },
    handleSelectPlace(place) {  // '장소 검색'에서 장소명명 선택 시, place.vue 컴포넌트 생성
      this.selectedPlace = place;
      this.isPopupVisible["placepop"] = true;

      if (this.selectedMarker) {
        this.selectedMarker.setMap(null);
      }

      // 선택된 장소의 마커 생성
      this.selectedMarker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(place.y_cord, place.x_cord), // y=위도, x=경도 순으로 넣기
        map: this.map,
      });

      // 지도 중심을 선택된 장소로 이동
      this.map.setCenter(new window.naver.maps.LatLng(place.y_cord, place.x_cord));
      this.map.setZoom(15); // 줌 레벨 조정 (필요에 따라 변경)

      this.placePopupStyle = {
          position: 'absolute',
          top: `30px`,
          left: `420px`, // 검색 팝업 오른쪽에 위치
          zIndex: 1000
        };

      this.currentPopupStyle = this.placePopupStyle;
    },
    handleClosePlace() {
      if (this.selectedMarker) {  // 마커가 있다면 삭제
        this.selectedMarker.setMap(null);
        this.selectedMarker = null;
      }
      this.selectedPlace = null; // 장소 팝업만 닫기
      this.isPopupVisible["placepop"] = false;
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
      this.isPopupVisible["placepop"] = true;

      this.placePopupStyle = {
        position: 'absolute',
        top: `30px`,
        left: `420px`, // 검색 팝업 오른쪽에 위치
        zIndex: 1000
      };

      this.currentPopupStyle = this.placePopupStyle;
    },
    handleOpenHashtag(category) {
      this.selectedCategory = category;
      this.showHashtag = true;
      console.log("선택된 카테고리:", category);
    },
    logMapBounds() {
      const bounds = this.map.getBounds();
      const sw = bounds.getSW();
      const ne = bounds.getNE();

      console.log("Top Left:", { lat: ne.lat(), lng: sw.lng() });
      console.log("Top Right:", { lat: ne.lat(), lng: ne.lng() });
      console.log("Bottom Left:", { lat: sw.lat(), lng: sw.lng() });
      console.log("Bottom Right:", { lat: sw.lat(), lng: ne.lng() });
    },
    openAddPlace() {
      this.isPopupVisible["addPlace"] = true;

      this.AddPlaceStyle = {
        position: 'absolute',
        top: '250px',
        left: '480px',
        zIndex: 1000
      };
    },
    openRemovePlace() {
      this.isPopupVisible["removePlace"] = true;

      this.RemovePlaceStyle = {
        position: 'absolute',
        top: '30px',
        left: '420px',
        zIndex: 1000
      };
    },
    handleSelectHashtag(selectedHashtag) {
      console.log("부모에서 선택된 해시태그:", selectedHashtag);

      // 맵이 로드되지 않은 경우 마커 생성 불가
      if (!this.map) {
        console.error("맵이 아직 로드되지 않았습니다.");
        return;
      }

      // 기존 마커 초기화
      this.clearMarkers();

      if (!selectedHashtag) {
        console.log("해시태그가 해제되어 마커를 제거합니다.");
        return;
      }

      // 해시태그로 필터링된 장소
      moveData[0].move.forEach((place, index) => {
        console.log(`마커 생성 ${index + 1}:`, place.name, place.x_cord, place.y_cord);

        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(place.y_cord, place.x_cord),
          map: this.map,
          title: place.name // 마커에 장소 이름 설정
        });

        window.naver.maps.Event.addListener(marker, 'click', () => {
          this.showPlacePopup(place, marker);
        });

        window.naver.maps.Event.addListener(this.map, 'idle', () => {
          this.isShowRefreshButton = true;
        });

        this.hash_markers.push(marker);
      });
    },
    clearMarkers() {
      // 기존 마커 모두 제거
      this.hash_markers.forEach(marker => marker.setMap(null));
      this.hash_markers = [];
    },
    showPlacePopup(place, marker) {   // 해시태그 마커 선택 시, 플레이스 정보 생성
      console.log("마커 클릭:", place);

      // test_data.js에서 일치하는 장소 찾기
      if (!placeData || placeData.length === 0) {
        console.error("placeData가 존재하지 않거나 비어있습니다.");
        return;
      }

      const matchedPlace = placeData.find(p => p.places.name === place.name)?.places;

      if (!matchedPlace) {
        console.warn("해당 장소 정보가 test_data.js에 없습니다.");
        return;
      }

      this.selectedPlace = matchedPlace; // 일치하는 장소 정보를 팝업에 전달
      this.isPlacePopupVisible = true;

      // 지도 중심을 마커 위치로 이동하고 줌인
      this.map.setCenter(marker.getPosition());
      this.map.setZoom(16);

      // 마커 팝업 스타일 (마커 좌표 기준)
      const markerPos = this.map.getProjection().fromCoordToOffset(marker.getPosition());

      this.markerPopupStyle = {
        position: 'absolute',
        top: `${markerPos.y - 250}px`,  // 마커 위에 팝업 위치
        left: `${markerPos.x + 150}px`,
        zIndex: 1000
      };

      this.currentPopupStyle = this.markerPopupStyle;

      this.map.addListener('dragstart', () => {
        this.isPlacePopupVisible = false;
      });
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

.refresh-btn {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 999px; /* 둥근 모서리 */
  padding: 10px 20px;

  font-size: 14px;
  font-weight: 500;
  color: #333;
  cursor: pointer;

  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: background-color 0.2s ease;
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