<template>
  <home :loading="loading"
        :selected-year="selectedYear"
        :chart="chart"
        :stats="stats"
        @reload="reloadStat"
        @changeSelectedYear="onChangeSelectedYear" />
</template>

<script>
import Home from '@/components/templates/Home.vue'
import { mapGetters } from 'vuex'
import {
  name as statsNamespace,
  actionTypes as statsActions
} from '@/store/stats'

export default {
  components: {
    Home
  },
  computed: {
    ...mapGetters(statsNamespace, ['loading', 'stats', 'chart', 'selectedYear'])
  },
  async fetch({ store }) {
    return await store.dispatch(
      `${statsNamespace}/${statsActions.FETCH_ALL_STATS}`
    )
  },
  methods: {
    reloadStat(lang) {
      this.$store.dispatch(
        `${statsNamespace}/${statsActions.FETCH_STATS_BY_LANG}`,
        lang
      )
    },
    onChangeSelectedYear(year) {
      this.$store.dispatch(
        `${statsNamespace}/${statsActions.CHANGE_SELECTED_YEAR}`,
        year
      )
    }
  }
}
</script>

<style>
</style>
