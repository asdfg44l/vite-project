<template>
  <div class="px-2">
    <div class="flex items-center my-2">
      <select v-model="globalLanguage" name="locales" class="form-control mr-1">
        <option
          v-for="locale in $i18n.availableLocales"
          :key="locale"
          :value="locale"
        >
          {{ $t(locale) }}
        </option>
      </select>
      <h3>[Layout] default version: {{ VERSION }}</h3>
      <p class="ml-5">
        {{ $format.numberOnly('0.2113', 3, 'ROUND_CEIL') }}
      </p>
    </div>

    <div class="flex gap-4">
      <template v-for="router in routerList" :key="router">
        <router-link v-slot="{ href, route, navigate }" :to="router" custom>
          <a class="btn btn-primary capitalize" :href="href" @click="navigate">
            {{ route.name }}
          </a>
        </router-link>
      </template>
    </div>
    <div class="mt-4">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useFormat } from '@/plugins/Format'

const routerList = [
  'veevalidate',
  'vuefinalmodal',
  'suspense',
  'svgIcon',
  'intersectionObserver',
  'webworker',
  'playground',
]
const $i18n = useI18n()
const globalLanguage = ref($i18n.locale)

const { numberOnly } = useFormat()

const VERSION = __APP_VERSION__
</script>
