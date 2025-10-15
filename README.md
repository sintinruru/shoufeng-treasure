# 壽豐尋寶巴 - 安裝教學 🗺️

## 📦 檔案清單

確認你有以下檔案：
- `index.html` - 主頁面
- `chat.html` - 聊天頁面  
- `style.css` - 樣式檔案
- `chat.js` - JavaScript 功能
- `README.md` - 本安裝說明

## 🚀 快速安裝指南（5 分鐘）

### Step 1：設定 API Key

1. 前往：https://makersuite.google.com/app/apikey
2. 用 Google 帳號登入
3. 點「Create API Key」
4. 複製你的 API Key（長得像 `AIzaSyXXXXXXXXXXXX`）
5. **重要**：打開 `chat.js` 檔案
6. 找到第 2 行：
   ```javascript
   const API_KEY = 'YOUR_API_KEY_HERE';
   ```
7. 把 `YOUR_API_KEY_HERE` 替換成你的真實 API Key：
   ```javascript
   const API_KEY = 'AIzaSyXXXXXXXXXXXX';  // 你的真實 Key
   ```
8. 儲存檔案

### Step 2：上傳到 GitHub Pages

#### 方法 A：使用 GitHub 網頁版（最簡單，推薦新手）

1. **登入 GitHub**
   - 前往：https://github.com
   - 用你的帳號登入

2. **建立新的 Repository（專案）**
   - 點右上角的「+」→「New repository」
   - Repository name：輸入 `shoufeng-treasure`
   - 選擇「Public」
   - ✅ 勾選「Add a README file」
   - 點「Create repository」

3. **上傳檔案**
   - 點「Add file」→「Upload files」
   - 把所有檔案拖曳到網頁上：
     - index.html
     - chat.html
     - style.css
     - chat.js
   - 在下方 Commit changes 輸入：「First commit」
   - 點「Commit changes」

4. **啟用 GitHub Pages**
   - 點上方的「Settings」（設定）
   - 左側選單找到「Pages」
   - 在「Source」選擇「main」分支
   - 點「Save」
   - 等待 30 秒-1 分鐘

5. **取得你的網址**
   - 回到「Pages」頁面
   - 會顯示：「Your site is live at https://你的帳號.github.io/shoufeng-treasure/」
   - 這就是你的網站網址了！🎉

#### 方法 B：使用 GitHub Desktop（適合要常更新的）

1. **下載 GitHub Desktop**
   - 前往：https://desktop.github.com
   - 下載並安裝

2. **建立 Repository**
   - 打開 GitHub Desktop
   - File → New Repository
   - Name：`shoufeng-treasure`
   - Local Path：選擇要存放的資料夾
   - 點「Create Repository」

3. **複製檔案**
   - 把所有檔案（index.html, chat.html, style.css, chat.js）
   - 複製到剛才建立的 `shoufeng-treasure` 資料夾

4. **上傳到 GitHub**
   - 在 GitHub Desktop 會看到檔案變更
   - 左下角輸入：「First commit」
   - 點「Commit to main」
   - 點「Publish repository」
   - 取消勾選「Keep this code private」
   - 點「Publish repository」

5. **啟用 GitHub Pages**
   - 點「Repository」→「View on GitHub」
   - 按照方法 A 的步驟 4-5 完成

## 🎨 測試你的網站

1. 打開瀏覽器
2. 前往你的網址：`https://你的帳號.github.io/shoufeng-treasure/`
3. 點擊「AI 旅遊助手」按鈕
4. 試著問：「推薦我半日遊路線」
5. 如果 AI 有回應，恭喜你成功了！🎉

## 🐛 常見問題

### Q1：網站顯示 404 Not Found
**A：** 等待 1-2 分鐘，GitHub Pages 需要一點時間部署

### Q2：AI 說「請先設定 API Key」
**A：** 
1. 檢查 chat.js 檔案
2. 確認 API Key 已經替換
3. 重新上傳 chat.js 檔案到 GitHub

### Q3：AI 回應「API 錯誤：400」
**A：** API Key 可能不正確
1. 重新到 https://makersuite.google.com/app/apikey 確認
2. 確保複製時沒有多餘空格
3. 重新設定到 chat.js

### Q4：完全沒反應
**A：** 按 F12 打開瀏覽器開發者工具，看 Console 有什麼錯誤訊息

### Q5：想修改內容怎麼辦？
**A：** 
1. 修改你電腦上的檔案
2. 到 GitHub 網頁
3. 點進要修改的檔案
4. 點鉛筆圖示「Edit」
5. 貼上新內容
6. 點「Commit changes」

## 🎯 自訂內容

### 修改景點資訊
編輯 `chat.js` 檔案中的 `shoufengData` 物件

### 修改顏色
編輯 `style.css` 檔案，搜尋 `#667eea` 和 `#764ba2` 替換成你喜歡的顏色

### 新增更多景點卡片
編輯 `index.html` 中的 `.spots-grid` 區塊

## 📱 手機測試

用手機瀏覽器打開你的網址，應該會自動調整成手機版面！

## 🔒 安全提醒

⚠️ **重要**：你的 API Key 會在網頁上看得到（因為是前端專案）

**比賽結束後記得**：
1. 到 https://makersuite.google.com/app/apikey
2. 刪除這個 API Key
3. 或是把整個 GitHub Repository 設為 Private

## 🆘 需要幫助？

如果遇到問題：
1. 檢查瀏覽器 Console（按 F12）
2. 確認所有檔案都上傳了
3. 確認 API Key 有正確設定
4. 等待幾分鐘讓 GitHub Pages 完成部署

## 🎉 完成！

恭喜你的「壽豐尋寶巴」網站上線了！

現在你可以：
- ✅ 分享網址給評審或朋友
- ✅ 用手機掃 QR Code 訪問
- ✅ 繼續開發更多功能

祝競賽順利！🏆
