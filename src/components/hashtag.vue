<template>
  <div>
    <div class="button-container">
      <button 
        v-for="(tag, index) in hashtags" 
        :key="index" 
        :class="['hashtag-button', { 'selected': selectedHashtag === tag.hashtag_name }]"
        @click="handleClick(tag)">
        {{ tag.hashtag_name }}
      </button>
    </div>
  </div>
</template>

<script>
import hashtagData from '@/store/test_hashtag.js';

export default {
  name: 'HashtagButtons',
  data() {
    return {
      hashtags: hashtagData[1].tag, // test_hashtag.js 파일의 해시태그 데이터 사용
      selectedHashtag: null // 선택된 해시태그
    };
  },
  methods: {
    handleClick(tag) {
      if (this.selectedHashtag === tag.hashtag_name) {
        this.selectedHashtag = null; // 이미 선택된 상태라면 해제
      } else {
        this.selectedHashtag = tag.hashtag_name; // 선택 상태로 변경
      }
      console.log("선택된 해시태그:", this.selectedHashtag);
    }
  }
};
</script>

<style scoped>
.button-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
  justify-content: flex-end;
}

.hashtag-button {
  background-color: white;
  color: skyblue;
  border: 2px solid skyblue;
  border-radius: 15px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.hashtag-button:hover {
  background-color: deepskyblue;
  color: white;
}

/* 선택된 상태일 때 스타일 */
.hashtag-button.selected {
  background-color: deepskyblue;
  color: white;
  border-color: deepskyblue;
}
</style>
