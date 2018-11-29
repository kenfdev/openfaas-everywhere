import statsQuery from '@/graphql/stats.gql'

export const name = 'stats'

export const state = () => ({
  selectedYear: '',
  loading: {
    'Node.js': false,
    Go: false,
    Ruby: false,
    Python: false,
    'C#': false,
    PHP: false
  },
  nodejs: {},
  go: {},
  ruby: {},
  python: {},
  csharp: {},
  php: {}
})

export const actionTypes = {
  FETCH_ALL_STATS: 'FETCH_ALL_STATS',
  FETCH_STATS_BY_LANG: 'FETCH_STATS_BY_LANG',
  CHANGE_SELECTED_YEAR: 'CHANGE_SELECTED_YEAR'
}

const mutationTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_LOADING_ALL: 'SET_LOADING_ALL',
  SET_STATS: 'SET_STATS',
  SET_SELECTED_YEAR: 'SET_SELECTED_YEAR'
}

function prettyStats(stats) {
  const { language, count, logoUrl } = stats

  return {
    language,
    count: count ? count.toLocaleString() : '-',
    logoUrl: logoUrl || 'https://bulma.io/images/placeholders/128x128.png'
  }
}

const colors = {
  'Node.js': '#3C7D2E',
  Go: '#58C7D5',
  Ruby: '#980005',
  Python: '#F4C433',
  'C#': '#8250C5',
  PHP: '#5F619D'
}

export const getters = {
  selectedYear(state) {
    return state.selectedYear
  },
  loading: state => language => {
    return state.loading[language]
  },
  topLangs(state) {
    const { nodejs, go, ruby, python, csharp, php } = state

    return [nodejs, go, ruby, python, csharp, php].sort(
      (a, b) => b.count - a.count
    )
  },
  chart(_state, getters) {
    const stats = getters.topLangs.reduce(
      (obj, langStat) => {
        obj.labels.push(langStat.language)
        obj.data.push(langStat.count)
        obj.backgroundColor.push(colors[langStat.language])
        obj.total += langStat.count
        return obj
      },
      { data: [], labels: [], backgroundColor: [], total: 0 }
    )
    return {
      data: {
        datasets: [
          {
            data: stats.data,
            backgroundColor: stats.backgroundColor
          }
        ],
        labels: stats.labels
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  stats(_state, getters) {
    return getters.topLangs.map(prettyStats)
  }
}

export const actions = {
  async [actionTypes.FETCH_ALL_STATS]({ state, commit }) {
    let client

    if (process.server) {
      client = this.app.apolloProvider.clients.ssr
    } else {
      client = this.app.apolloProvider.defaultClient
    }

    let selectedYear = null
    if (state.selectedYear) {
      selectedYear = parseInt(state.selectedYear, 10)
    }

    commit(mutationTypes.SET_LOADING_ALL, true)
    const result = await client.query({
      query: statsQuery.AllStats,
      variables: { year: selectedYear }
    })
    commit(mutationTypes.SET_LOADING_ALL, false)

    commit(mutationTypes.SET_STATS, result.data)
  },
  async [actionTypes.FETCH_STATS_BY_LANG]({ state, commit }, lang) {
    let client = this.app.apolloProvider.defaultClient

    let query
    switch (lang) {
      case 'Node.js':
        query = statsQuery.NodeStats
        break
      case 'Go':
        query = statsQuery.GoStats
        break
      case 'Ruby':
        query = statsQuery.RubyStats
        break
      case 'Python':
        query = statsQuery.PythonStats
        break
      case 'C#':
        query = statsQuery.CSharpStats
        break
      case 'PHP':
        query = statsQuery.PHPStats
        break
      default:
        // do nothing
        return
    }

    let selectedYear = null
    if (state.selectedYear) {
      selectedYear = parseInt(state.selectedYear, 10)
    }
    commit(mutationTypes.SET_LOADING, { lang, loading: true })
    const result = await client.query({
      fetchPolicy: 'network-only',
      query,
      variables: {
        year: selectedYear
      }
    })
    commit(mutationTypes.SET_LOADING, { lang, loading: false })

    commit(mutationTypes.SET_STATS, result.data)
  },
  [actionTypes.CHANGE_SELECTED_YEAR]({ dispatch, commit }, year) {
    commit(mutationTypes.SET_SELECTED_YEAR, year)
    dispatch(actionTypes.FETCH_ALL_STATS)
  }
}

export const mutations = {
  [mutationTypes.SET_STATS](state, stats) {
    Object.keys(stats).forEach(key => {
      const { language, count, logoUrl } = stats[key]
      state[key] = {
        language,
        count,
        logoUrl
      }
    })
  },
  [mutationTypes.SET_LOADING](state, { lang, loading }) {
    state.loading = { ...state.loading, [lang]: loading }
  },
  [mutationTypes.SET_LOADING_ALL](state, loading) {
    state.loading['Node.js'] = loading
    state.loading.Go = loading
    state.loading.Ruby = loading
    state.loading.Python = loading
    state.loading['C#'] = loading
    state.loading.PHP = loading
  },
  [mutationTypes.SET_SELECTED_YEAR](state, year) {
    state.selectedYear = year
  }
}
