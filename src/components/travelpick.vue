<template>
  <div class="container">
    <button @click="addContent">확인</button>
    <transition-group name="slide-fade" tag="div" class="content-area">
    </transition-group>
  </div>
</template>

<script>
export default {
    name: 'TravelPick',
    data() {
        return {
            contents: [],
            nextId: 1,
        };
    },
    methods: {
        addContent() {
            this.contents.push({
                id: this.nextId++,
                text: `새로운 콘텐츠 #${this.nextId - 1}가 생성되었습니다!`,
            });
            this.$nextTick(() => {
                // 필요시 스크롤 이동 등 추가 동작 가능
            });
        },
    },
};
</script>

<style scoped>
.container {
  width: 400px;
  margin: 0 auto;
  padding: 1rem;
}

button {
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.content-area {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 0.5rem;
}

/* 개별 콘텐츠 스타일 */
.content {
  background-color: #f0f0f0;
  border: 1px solid #bbb;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
}

/* transition-group 애니메이션 */
/* enter, leave 클래스 활용하여 위아래로 움직이는 효과 */

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
