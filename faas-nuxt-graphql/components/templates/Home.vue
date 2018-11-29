<template>
  <section class="section">
    <div class="container">
      <div style="position: absolute">
        <span class="is-size-4">Year:</span>
        <app-select :options="years"
                    :value="selectedYear"
                    @input="onChangeSelectedYear" />
      </div>
      <div style="margin-bottom: 1em">
        <doughnut-chart :chart-data="chart.data"
                        :options="chart.options" />
      </div>
      <div class="columns is-multiline is-centered">
        <div v-for="stat in stats"
             :key="stat.language"
             class="column language-stats">
          <language-stats :stats="stat"
                          :loading="loading(stat.language)"
                          @reload="onReloadStat(stat.language)" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppSelect from '@/components/atoms/AppSelect'
import DoughnutChart from '@/components/atoms/DoughnutChart'
import LanguageStats from '@/components/organisms/LanguageStats'
export default {
  components: {
    AppSelect,
    DoughnutChart,
    LanguageStats
  },
  props: {
    selectedYear: {
      type: String,
      default: () => ''
    },
    loading: {
      type: Function,
      default: null
    },
    stats: {
      type: Array,
      default: () => []
    },
    chart: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    years() {
      const years = ['']
      for (let i = 2018; i > 2007; i--) {
        years.push(i.toString())
      }
      return years
    }
  },
  methods: {
    onReloadStat(stat) {
      this.$emit('reload', stat)
    },
    onChangeSelectedYear(year) {
      this.$emit('changeSelectedYear', year)
    }
  }
}
</script>

<style scoped>
@media only screen and (min-width: 769px) {
  .language-stats {
    min-width: 400px;
    max-width: 400px;
  }
}
</style>
