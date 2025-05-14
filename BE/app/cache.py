# cache.py

# 사용자별 임시 일정 저장소 (user_id -> date별 스케줄)
user_schedules: dict[str, dict] = {}

# 장소 정보 저장소 (날짜별 장소 목록)
place_cache: dict = {
    "places_by_day": {}
}
