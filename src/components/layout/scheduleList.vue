<template>
    <v-timeline align="start" side="end">
        <v-timeline-item v-for="visit in visits" :key="visit.order" dot-color="blue" size="small">
            <div class="d-flex">
                <strong class="me-4"> {{ visit.order }} </strong>
                    <div @click="getplaceInfo(visit)" style="cursor: pointer;">
                    <strong> {{ visit.place }} </strong>
                    <div class="text-caption">
                        이동시간: {{ visit.arrival_str }} ~ {{ visit.departure_str }}<br>
                        체류시간: {{ visit.stay_duration }}
                    </div>
                </div>
            </div>
        </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {
  name: 'ScheduleList',
  props: {
    visits: {
      type: Array,
      required: true
    }
  }
}
</script>