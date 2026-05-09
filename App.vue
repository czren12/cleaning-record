<script setup lang="ts">
import { onMounted } from 'vue'
import { initDatabase } from '@/utils/database'

onMounted(async () => {
  try {
    await initDatabase()
  } catch (e) {
    console.error('数据库初始化失败', e)
  }
})
</script>

<style>
/* 全局样式 */
page {
  background: #f5f5f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>
