export interface CleaningRecord {
  id: number
  name: string
  cleaned_at: string
  created_at: string
}

const STORAGE_KEY = 'cleaning_records'

function getRecords(): CleaningRecord[] {
  const data = uni.getStorageSync(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

function saveRecords(records: CleaningRecord[]): void {
  uni.setStorageSync(STORAGE_KEY, JSON.stringify(records))
}

export function initDatabase(): void {
  // Storage is automatically initialized
}

export function insertRecord(record: Omit<CleaningRecord, 'id'>): void {
  const records = getRecords()
  const newRecord: CleaningRecord = {
    ...record,
    id: Date.now()
  }
  records.push(newRecord)
  saveRecords(records)
}

export function getAllRecords(): CleaningRecord[] {
  return getRecords().sort((a, b) =>
    new Date(b.cleaned_at).getTime() - new Date(a.cleaned_at).getTime()
  )
}

export function getRecordsByDate(date: string): CleaningRecord[] {
  return getRecords()
    .filter(r => r.cleaned_at.startsWith(date))
    .sort((a, b) =>
      new Date(b.cleaned_at).getTime() - new Date(a.cleaned_at).getTime()
    )
}

export function deleteRecord(id: number): void {
  const records = getRecords().filter(r => r.id !== id)
  saveRecords(records)
}

export function clearAllRecords(): void {
  saveRecords([])
}
