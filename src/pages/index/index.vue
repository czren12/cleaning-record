<template>
  <view class="container">
    <view class="header">
      <text class="title">清洁记录</text>
      <picker mode="date" :value="selectedDate" @change="onDateChange">
        <view class="date-picker">
          <text>{{ selectedDate || '全部日期' }}</text>
          <text class="arrow">▼</text>
        </view>
      </picker>
    </view>

    <view v-if="records.length === 0" class="empty">
      <text class="empty-text">暂无清洁记录</text>
      <text class="empty-hint">点击下方"添加"按钮记录</text>
    </view>

    <scroll-view v-else class="list" scroll-y>
      <view v-for="record in records" :key="record.id" class="record-card">
        <view class="record-info">
          <text class="record-name">{{ record.name }}</text>
          <text class="record-time">{{ formatTime(record.cleaned_at) }}</text>
        </view>
        <button class="delete-btn" @click="confirmDelete(record.id)">删除</button>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllRecords, getRecordsByDate, deleteRecord, type CleaningRecord } from '@/utils/database'

const records = ref<CleaningRecord[]>([])
const selectedDate = ref('')

function formatTime(dateStr: string): string {
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

function loadRecords() {
  if (selectedDate.value) {
    records.value = getRecordsByDate(selectedDate.value)
  } else {
    records.value = getAllRecords()
  }
}

function onDateChange(e: any) {
  const val = e.detail.value
  selectedDate.value = val
  loadRecords()
}

function confirmDelete(id: number) {
  uni.showModal({
    title: '确认删除',
    content: '确定要删除这条记录吗？',
    success: async (res) => {
      if (res.confirm) {
        await deleteRecord(id)
        loadRecords()
      }
    }
  })
}

onMounted(() => {
  loadRecords()
})

defineExpose({ loadRecords })
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #fff;
  border-bottom: 1px solid #eee;
}
.title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}
.date-picker {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  background: #f0f0f0;
  border-radius: 4px;
  font-size: 13px;
  color: #666;
}
.arrow {
  margin-left: 6px;
  font-size: 10px;
}
.list {
  flex: 1;
  padding: 12px;
}
.record-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}
.record-info {
  display: flex;
  flex-direction: column;
}
.record-name {
  font-size: 15px;
  color: #333;
  font-weight: 500;
}
.record-time {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}
.delete-btn {
  padding: 5px 12px;
  font-size: 12px;
  color: #fff;
  background: #ff6b6b;
  border-radius: 4px;
  border: none;
}
.empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.empty-text {
  font-size: 16px;
  color: #999;
}
.empty-hint {
  font-size: 13px;
  color: #ccc;
  margin-top: 8px;
}
</style>
