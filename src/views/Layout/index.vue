<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'

// 触发获取列表的action
import { useCounterStore } from '@/stores/category'
import { onMounted } from 'vue'

const categoryStore = useCounterStore()

onMounted( ()=>categoryStore.getCategory()  )
</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>
