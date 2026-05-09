<script setup lang="ts">
import { onMounted } from 'vue'
import { initDatabase } from '@/utils/database'

onMounted(() => {
  initDatabase()
  console.log('App initialized')
})
</script>

<style>
page {
  background: #f5f5f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>
