<template>
  <view class="container">
    <view class="form-card">
      <view class="form-item">
        <text class="label">清洁项目</text>
        <input
          v-model="name"
          class="input"
          placeholder="请输入清洁项目名称"
          placeholder-class="placeholder"
        />
      </view>

      <view class="form-item">
        <text class="label">清洁时间</text>
        <picker mode="datetime" :value="cleanedAt" @change="onTimeChange">
          <view class="time-picker">
            <text :class="cleanedAt ? 'time-text' : 'placeholder'">
              {{ cleanedAt ? formatTime(cleanedAt) : '请选择时间' }}
            </text>
            <text class="arrow">▼</text>
          </view>
        </picker>
      </view>

      <view class="actions">
        <button class="submit-btn" @click="handleSubmit">保存记录</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { insertRecord, type CleaningRecord } from '@/utils/database'

const name = ref('')
const cleanedAt = ref('')

function formatTime(dateStr: string): string {
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

function onTimeChange(e: any) {
  cleanedAt.value = e.detail.value
}

function handleSubmit() {
  if (!name.value.trim()) {
    uni.showToast({ title: '请输入清洁项目', icon: 'none' })
    return
  }
  if (!cleanedAt.value) {
    uni.showToast({ title: '请选择清洁时间', icon: 'none' })
    return
  }

  const now = new Date().toISOString()
  const record: Omit<CleaningRecord, 'id'> = {
    name: name.value.trim(),
    cleaned_at: cleanedAt.value,
    created_at: now
  }

  try {
    insertRecord(record)
    uni.showToast({ title: '保存成功', icon: 'success' })
    name.value = ''
    cleanedAt.value = ''
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  } catch (e) {
    uni.showToast({ title: '保存失败', icon: 'none' })
  }
}
</script>

<style scoped>
.container {
  padding: 16px;
}
.form-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.form-item {
  margin-bottom: 20px;
}
.label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}
.input {
  width: 100%;
  height: 44px;
  padding: 0 12px;
  border: 1px solid #eee;
  border-radius: 8px;
  font-size: 15px;
  box-sizing: border-box;
}
.placeholder {
  color: #bbb;
  font-size: 14px;
}
.time-picker {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  padding: 0 12px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fafafa;
}
.time-text {
  font-size: 15px;
  color: #333;
}
.arrow {
  font-size: 10px;
  color: #999;
}
.actions {
  margin-top: 24px;
}
.submit-btn {
  width: 100%;
  height: 46px;
  background: #00c48c;
  color: #fff;
  font-size: 16px;
  border-radius: 23px;
  border: none;
  line-height: 46px;
}
</style>
