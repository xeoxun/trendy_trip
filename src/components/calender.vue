<template>
  <div id="pop">
    <header>
      <h2> {{ trip_area }}여행 </h2>
      <p> {{ startDay }} ~ {{ endDay }} </p>
      <p> 총 {{ tripday }}일 </p>
      <select v-model="selectedDay" @change="SelectedDay">
        <option v-for="n in tripday" :key="n" :value="n - 1"> Day {{ n }} </option>
      </select>
    </header>
    
    <article id="choose">
      <ul v-if="currentVisits.length > 0">
        <li v-for="visit in currentVisits" :key="visit.order">
          <strong class="visit_num">{{ visit.order }} </strong> <span @click="getplaceInfo(visit)"> {{ visit.place }} </span>
          <p> 이동시간: {{ visit.arrival_str }} ~  {{  visit.departure_str }}</p>
          <p> 체류시간: {{ visit.stay_duration }}</p>
          <hr style="border: 1px solid skyblue; width: 90%; margin-right: 30px;">
        </li>
      </ul>
      <p v-else>선택된 일차에 방문지가 없습니다.</p>
    </article>

    <footer>
      <button id="remove_btn" @click="removePlace"> 삭제⛔ </button>
      <button id="close_btn" @click="$emit('close')"> 닫기❌ </button>
    </footer>
  </div>
</template>

<script>
import { useDataStore } from '@/store/data'
import calendarData from '@/store/test_calendar.js'
import placesData from '@/store/test_data.js'

export default {
  name: 'CalPop',
  data() {
    return {
      selectedDay: 0, // 기본 Day 1 선택
    };
  },
  setup() {
    const data = useDataStore();

    return {
      trip_area: data.area,
      startDay: data.startDate,
      endDay: data.endDate,
      tripday: data.TripDays
    }
  },
  computed: {
    // 현재 선택된 day의 방문지 배열을 반환
    currentVisits() {
      // calendarData가 배열이고 각 원소에 visits 배열 있음
      if (!calendarData || !Array.isArray(calendarData)) return [];
      if (!calendarData[this.selectedDay]) return [];
      return calendarData[this.selectedDay].visits || [];
    }
  },
    mounted() {
    this.SelectedDay(); // 컴포넌트가 생성되면 Day 1의 방문 목록이 기본으로 표시됨
  },
  methods: {
    SelectedDay() {
      console.log(`선택된 옵션: Day ${this.selectedDay + 1}`);

      const visits = this.currentVisits;
      const coordinates = visits.map((visit) => ({
        x: visit.x_cord,
        y: visit.y_cord,
      }));

      // main.vue로 좌표 전달
      this.$emit("select-day", coordinates);
    },
    getplaceInfo(visit) {
      // placesData에서 name이 visit.place와 일치하는 데이터 찾기
      const matchedPlace = placesData.find(
        (place) => place.places.name === visit.place
      );

      if (matchedPlace) {
        // 부모 컴포넌트로 장소 정보 전달
        this.$emit("get-place-info", matchedPlace.places);
      } else {
        console.warn("일치하는 장소 정보를 찾을 수 없습니다.");
      }
    },
    removePlace() {
        this.$emit('open-remove-place');
    }
  }
};
</script>


<style scoped>
#pop {
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 300px;
  height: 90%;
  background-color: white;
  border: 3px solid skyblue;
  border-radius: 10px;
  position: absolute;
}

header {
  max-height: 30%;
  width: 100%;
  padding-left: 20px;
}

#choose {
  width: 100%;
  height: 70%;
  margin-top: 10px;
  overflow-y: auto; /* 스크롤 추가 */
}

select {
  padding: 10px;
  border-radius: 8px;
  border-color: skyblue;
  font-size: 14px;
}

.visit_num {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  background-color: skyblue;
  color: white;
  border-radius: 50%;
  font-size: 14px;
  margin-right: 8px;
}

.clickable {
  cursor: pointer;
  color: skyblue;
  text-decoration: underline;
}

ul {
  margin: 0;
  padding-left: 20px; /* 기본 들여쓰기 제거 */
}

li {
  list-style-type: none; /* 앞의 점 없애기 */
  margin-bottom: 8px; /* 아이템 간 간격 */
}

li p {
  margin:0;
  color: gray;
}

footer {
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#remove_btn,
#close_btn {
  padding: 10px 10px 10px 10px;
  background-color: white;
  border: none;
  cursor: pointer;
}
</style>
