<template>
  <div class="section">
    <div class="title">
      <p>몇일 일정의 여행을 계획하고 계신가요?</p>
      <h3>📆 여행 날짜를 선택해주세요</h3>
    </div>
    <div class="article_section">
      <VDatePicker v-model.range="range" mode="date" />
      <p>일수: {{ tripDays }}</p>
    </div>
    <footer>
      <button id="before_btn" @click="$emit('prev')">이전</button>
      <button id="next_btn" @click="saveDates">확인</button>
    </footer>
  </div>
</template>

<script>
import { useDataStore } from '@/store/data'
import { initSchedule } from '@/store/api'

export default {
  data() {
    return {
      range: {
        start: new Date(),
        end: new Date()
      }
    }
  },
  computed: {
    tripDays() {
      const start = new Date(this.range.start)
      const end = new Date(this.range.end)
      const diffTime = end - start
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1
      return diffDays > 0 ? diffDays : 0
    }
  },
  methods: {
    async saveDates() {
    const data = useDataStore()
    
    const formatDate = (date) => {
      return new Date(date).toISOString().slice(0, 10)
    }

    data.setStartDay(formatDate(this.range.start))
    data.setEndDate(formatDate(this.range.end))
    data.setTripDay(this.tripDays)

    this.$emit('next')

    const payload = {
        date: {
          user_id: '2',
          start_date: formatDate(this.range.start),
          end_date: formatDate(this.range.end)
        },
        start_end: {
          arrival: "제주공항",
          arrivaltime: "09:00",
          departure: "제주공항",
          departuretime: "18:00"
        },
        user: {
          start_time: "09:00",
          end_time: "18:00",
          travel_style: "편안한",
          meal_time_preferences: {
            breakfast: ["08:00"],
            lunch: ["12:30"],
            dinner: ["18:30"]
          }
        },
        places_by_day: {
          [formatDate(this.range.start)]: [{ name: "우무" }]
        }
      };

      console.log("보내는 payload ↓↓↓");
      console.log(JSON.stringify(payload, null, 2))

      try {
        await initSchedule(payload)
        alert('일정 저장 완료')
        this.$emit('next')
      } catch (e) {
        alert('일정 저장 실패')
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>
.section {
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
  
.title {
  flex: 0 0 20%;
  display: flex;
  padding: 30px;
  flex-direction: column;
}
  

.article_section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
}
  
footer {
  flex: 0 0 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  max-height: 10%;
}
  
#before_btn, #next_btn {
  padding: 10px 20px;
  border-radius: 20px;
  background-color: #dce9f5;
  border: none;
  cursor: pointer;
}
</style>