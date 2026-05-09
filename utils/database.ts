const DB_NAME = 'cleaning_record.db'
const DB_VERSION = 1

let db: SQLiteDB | null = null

export function getDatabase(): SQLiteDB {
  if (!db) {
    db = uni.sqliteDatabase()
  }
  return db
}

export function initDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    const database = getDatabase()
    database.executeSql(
      `CREATE TABLE IF NOT EXISTS cleaning_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        cleaned_at TEXT NOT NULL,
        created_at TEXT NOT NULL
      )`,
      (res: any) => {
        resolve()
      },
      (err: any) => {
        reject(err)
      }
    )
  })
}

export interface CleaningRecord {
  id?: number
  name: string
  cleaned_at: string
  created_at: string
}

export function insertRecord(record: Omit<CleaningRecord, 'id'>): Promise<void> {
  return new Promise((resolve, reject) => {
    const database = getDatabase()
    database.executeSql(
      `INSERT INTO cleaning_records (name, cleaned_at, created_at) VALUES (?, ?, ?)`,
      [record.name, record.cleaned_at, record.created_at],
      (res: any) => {
        resolve()
      },
      (err: any) => {
        reject(err)
      }
    )
  })
}

export function getAllRecords(): Promise<CleaningRecord[]> {
  return new Promise((resolve, reject) => {
    const database = getDatabase()
    database.executeSql(
      `SELECT * FROM cleaning_records ORDER BY cleaned_at DESC`,
      [],
      (res: any) => {
        resolve(res.rows || [])
      },
      (err: any) => {
        reject(err)
      }
    )
  })
}

export function getRecordsByDate(date: string): Promise<CleaningRecord[]> {
  return new Promise((resolve, reject) => {
    const database = getDatabase()
    database.executeSql(
      `SELECT * FROM cleaning_records WHERE cleaned_at LIKE ? ORDER BY cleaned_at DESC`,
      [`${date}%`],
      (res: any) => {
        resolve(res.rows || [])
      },
      (err: any) => {
        reject(err)
      }
    )
  })
}

export function deleteRecord(id: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const database = getDatabase()
    database.executeSql(
      `DELETE FROM cleaning_records WHERE id = ?`,
      [id],
      (res: any) => {
        resolve()
      },
      (err: any) => {
        reject(err)
      }
    )
  })
}

export function clearAllRecords(): Promise<void> {
  return new Promise((resolve, reject) => {
    const database = getDatabase()
    database.executeSql(
      `DELETE FROM cleaning_records`,
      [],
      (res: any) => {
        resolve()
      },
      (err: any) => {
        reject(err)
      }
    )
  })
}
