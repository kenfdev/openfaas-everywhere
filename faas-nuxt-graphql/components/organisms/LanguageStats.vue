<template>
  <div class="box">
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img :src="stats.logoUrl"
               alt="Image">
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <table class="table">
            <thead></thead>
            <tbody>
              <tr>
                <th>Language</th>
                <td class="has-text-right">{{ stats.language }}</td>
              </tr>
              <tr>
                <th>Repositories</th>
                <td class="has-text-right">{{ stats.count }}</td>
              </tr>
            </tbody>
          </table>
          <async-button :loading="loading"
                        class="is-pulled-right"
                        @click="onReloadClick">
            <fa :icon="fas.faSyncAlt" />&nbsp;Reload
          </async-button>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item"
               aria-label="reply">
              <span class="icon is-small">
                <i class="fas fa-reply"
                   aria-hidden="true"></i>
              </span>
            </a>
            <a class="level-item"
               aria-label="retweet">
              <span class="icon is-small">
                <i class="fas fa-retweet"
                   aria-hidden="true"></i>
              </span>
            </a>
            <a class="level-item"
               aria-label="like">
              <span class="icon is-small">
                <i class="fas fa-heart"
                   aria-hidden="true"></i>
              </span>
            </a>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<script>
import { fas } from '@fortawesome/free-solid-svg-icons'

import AsyncButton from '@/components/molecules/AsyncButton'

export default {
  components: {
    AsyncButton
  },
  props: {
    loading: {
      type: Boolean,
      default: () => false
    },
    stats: {
      type: Object,
      default() {
        return {
          logoUrl: '',
          language: '',
          count: 0
        }
      }
    }
  },
  computed: {
    fas() {
      return fas
    }
  },
  methods: {
    onReloadClick() {
      this.$emit('reload')
    }
  }
}
</script>

<style>
</style>
