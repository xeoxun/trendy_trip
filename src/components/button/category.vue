<template>
    <div id="category_label">
        <button v-for="category in categoryList" :key="category.value" class="category_btn" @click="openHashtag(category.value)">
            {{ category.label }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'CategoryBtn',
    data() {
        return {
            categoryList: [  // 해시태그 카테고리 버튼
                {label: '관광명소', value: 'tour'},
                {label: '카페', value: 'cafe'},
                {label: '음식점', value: 'restaurant'},
                {label: '숙소', value: 'stay'}
            ],
            showHashtag: false
        }
    },
    methods: {
        openHashtag(category) {
            this.$emit('open-hashtag', category)
            this.showHashtag = !this.showHashtag;

            if (!this.showHashtag) {
                // 해시태그 창이 닫힐 때 해시태그 마커 제거
                this.clearMarkers();
                this.isShowRefreshButton = false;
                return;
            }

            if (this.map) {
                // 기존 좌표 출력
                const bounds = this.map.getBounds();
                const sw = bounds.getSW(); // 남서쪽
                const ne = bounds.getNE(); // 북동쪽

                const viewport = {
                    min_x: sw.lng(),
                    min_y: sw.lat(),
                    max_x: ne.lng(),
                    max_y: ne.lat()
                };

                const currentCategory = category; // 혹은 사용자 선택 값으로

                fetch("/api/users/maps/hashtage", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        category: currentCategory,
                        viewport: viewport
                    })
                })
                    .then((res) => {
                        if (!res.ok) throw new Error("서버 오류");
                        return res.json();
                    })
                    .then((data) => {
                        console.log("해시태그 결과:", data.tag);
                        this.displayHashtagMarkers(data.tag); // 결과 활용
                    })
                    .catch((err) => {
                        console.error("해시태그 요청 실패:", err);
                    });

                // 지도가 이동할 때마다 좌표를 추출하는 이벤트 리스너 추가
                this.map.addListener("bounds_changed", this.logMapBounds);
            }
        }
    }
}
</script>

<style scoped>
#category_label {
  position: absolute; /* 절대 위치로 설정 */
  top: 20px; /* 상단에서의 위치 */
  right: 20px; /* 오른쪽에서의 위치 */
  display: flex; /* Flexbox 사용 */
  flex-direction: row; /* 수평 정렬 */
  gap: 10px; /* 버튼 간의 간격 */
}

.category_btn {
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

.category_btn:hover {
  background-color: deepskyblue; /* 호버 시 색상 변경 */
}
</style>