const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database connection
const dbPath = path.join(__dirname, 'gridsync.db');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Users table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE,
          wallet_address TEXT UNIQUE NOT NULL,
          user_type TEXT NOT NULL DEFAULT 'individual',
          meter_id TEXT UNIQUE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Meters table
      db.run(`
        CREATE TABLE IF NOT EXISTS meters (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          meter_id TEXT UNIQUE NOT NULL,
          balance_usd REAL DEFAULT 0.0,
          balance_watts REAL DEFAULT 0.0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Add new columns to existing users table if they don't exist
      db.run(`ALTER TABLE users ADD COLUMN email TEXT UNIQUE`, (err) => {
        if (err && !err.message.includes('duplicate column name')) {
          console.error('Error adding email column:', err);
        }
      });

      db.run(`ALTER TABLE users ADD COLUMN user_type TEXT NOT NULL DEFAULT 'individual'`, (err) => {
        if (err && !err.message.includes('duplicate column name')) {
          console.error('Error adding user_type column:', err);
        }
      });

      // Database initialized successfully
      console.log('Database initialized successfully');
      resolve();
    });
  });
};

// Helper function to run queries with promises
const runQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Helper function to run single row queries
const runQuerySingle = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Helper function to run insert/update/delete queries
const runQueryExecute = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, changes: this.changes });
      }
    });
  });
};

// Function to clear all data from the database
const clearAllData = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('DELETE FROM users', (err) => {
        if (err) {
          console.error('Error clearing users table:', err);
          reject(err);
          return;
        }
        
        db.run('DELETE FROM meters', (err) => {
          if (err) {
            console.error('Error clearing meters table:', err);
            reject(err);
            return;
          }
          
          console.log('All data cleared from database');
          resolve();
        });
      });
    });
  });
};

module.exports = {
  db,
  initDatabase,
  runQuery,
  runQuerySingle,
  runQueryExecute,
  clearAllData
}; 