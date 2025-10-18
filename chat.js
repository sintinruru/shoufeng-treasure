// ⚠️ 重要：請將下面的 YOUR_GROQ_API_KEY 替換成你的真實 Groq API Key
const API_KEY = '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';
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// 壽豐景點資料庫
const shoufengData = {
    spots: [
        {
            name: '鯉魚潭',
            description: '花蓮最大的內陸湖泊，湖光山色美不勝收',
            activities: '划船、騎自行車環潭、賞鳥',
            food: '活跳蝦、鹽烤魚',
            tips: '建議早上或傍晚來，光線最美'
        },
        {
            name: '花蓮糖廠（光復糖廠）',
            description: '日治時期保留的糖廠，現為觀光景點',
            activities: '品嚐冰淇淋、參觀日式建築、住宿體驗',
            food: '必吃的紅豆、芋頭冰淇淋',
            tips: '假日人多，建議平日來訪'
        },
        {
            name: '壽豐火車站',
            description: '保存完好的日式木造車站',
            activities: '拍照打卡、體驗懷舊氛圍',
            tips: '適合喜歡復古風格的遊客'
        },
        {
            name: '立川漁場',
            description: '知名的黃金蜆養殖場',
            activities: '摸蜆體驗、品嚐蜆料理',
            food: '黃金蜆、蜆精',
            tips: '可以體驗摸蜆，記得帶換洗衣物'
        },
        {
            name: '東華大學',
            description: '全台最美大學之一，校園廣闊',
            activities: '校園漫步、拍照',
            tips: '東湖和華湖是必訪景點'
        },
        {
            name: '豐田文史館',
            description: '了解日本移民村的歷史',
            activities: '參觀展覽、認識在地文化'
        }
    ],
    routes: {
        halfDay: '建議路線：鯉魚潭（2小時）→ 花蓮糖廠吃冰（1小時）→ 立川漁場（1.5小時）',
        fullDay: '建議路線：壽豐車站（30分鐘）→ 豐田文史館（1小時）→ 鯉魚潭（2小時）→ 午餐 → 立川漁場（1.5小時）→ 花蓮糖廠（1小時）',
        photo: '最適合拍照：鯉魚潭（湖景）、壽豐車站（復古風）、東華大學（校園美景）'
    }
};

// 建立系統提示詞
function createSystemPrompt() {
    return `你是「壽豐尋寶巴」的專屬 AI 旅遊助手，負責協助遊客規劃花蓮壽豐鄉的旅遊行程。

【你的角色】
- 親切、熱情的在地嚮導
- 用輕鬆、活潑的語氣對話
- 適時使用 emoji 讓對話更生動（但不要過度使用）

【壽豐景點資訊】
${JSON.stringify(shoufengData, null, 2)}

【回答原則】
1. 簡潔明瞭：回答控制在 100-150 字內
2. 具體實用：給出明確的建議和資訊
3. 在地特色：突出壽豐的獨特魅力
4. 友善互動：鼓勵遊客提問和探索

【回答格式】
- 推薦景點時：說明特色 + 為什麼推薦
- 路線規劃：給出具體順序和時間建議
- 美食推薦：結合景點一起介紹

現在請用這個角色來回答遊客的問題！`;
}

// 發送訊息函數
async function sendMessage() {
    const input = document.getElementById('userInput');
    const messagesDiv = document.getElementById('chatMessages');
    const sendBtn = document.getElementById('sendBtn');
    const userMessage = input.value.trim();
    
    if (!userMessage) return;
    
    // 檢查 API Key
    if (API_KEY === 'YOUR_GROQ_API_KEY') {
        alert('⚠️ 請先設定你的 Groq API Key！\n\n請編輯 chat.js 檔案，將 YOUR_GROQ_API_KEY 替換成你的真實 API Key。');
        return;
    }

    // 隱藏快速問題按鈕
    const quickQuestions = document.getElementById('quickQuestions');
    if (quickQuestions) {
        quickQuestions.style.display = 'none';
    }

    // 顯示用戶訊息
    addUserMessage(userMessage);
    input.value = '';
    sendBtn.disabled = true;

    // 顯示載入動畫
    const typingId = showTypingIndicator();

    try {
        // 呼叫 Groq API
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile', // Groq 最好的免費模型
                messages: [
                    {
                        role: 'system',
                        content: createSystemPrompt()
                    },
                    {
                        role: 'user',
                        content: userMessage
                    }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        // 移除載入動畫
        removeTypingIndicator(typingId);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('API 錯誤詳情:', errorData);
            throw new Error(`API 錯誤：${response.status}`);
        }

        const data = await response.json();
        console.log('API 回應:', data);
        
        // 顯示 AI 回應
        if (data.choices && data.choices[0] && data.choices[0].message) {
            const aiResponse = data.choices[0].message.content;
            addAIMessage(aiResponse);
        } else {
            addAIMessage('抱歉，我現在無法回答，請稍後再試 😅');
        }

    } catch (error) {
        console.error('錯誤:', error);
        removeTypingIndicator(typingId);
        
        let errorMessage = '哎呀！發生錯誤了 😢\n\n';
        if (error.message.includes('API 錯誤: 400')) {
            errorMessage += '請求格式錯誤。請檢查 API 設定。';
        } else if (error.message.includes('API 錯誤: 401')) {
            errorMessage += 'API Key 無效或已過期。\n請重新申請 Groq API Key。';
        } else if (error.message.includes('API 錯誤: 429')) {
            errorMessage += '請求太頻繁，請稍後再試。';
        } else if (error.message.includes('Failed to fetch')) {
            errorMessage += '網路連線有問題，請檢查網路設定。';
        } else {
            errorMessage += `錯誤訊息：${error.message}`;
        }
        
        addAIMessage(errorMessage);
    }

    sendBtn.disabled = false;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// 顯示用戶訊息
function addUserMessage(message) {
    const messagesDiv = document.getElementById('chatMessages');
    const time = getCurrentTime();
    
    const messageHTML = `
        <div class="message-group user-group">
            <div class="messages">
                <div class="message user-message">
                    <div class="message-content">${escapeHtml(message)}</div>
                    <span class="message-time">${time}</span>
                </div>
            </div>
        </div>
    `;
    
    messagesDiv.insertAdjacentHTML('beforeend', messageHTML);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// 顯示 AI 訊息
function addAIMessage(message) {
    const messagesDiv = document.getElementById('chatMessages');
    const time = getCurrentTime();
    
    // 將換行符號轉換為 <br>
    const formattedMessage = message.replace(/\n/g, '<br>');
    
    const messageHTML = `
        <div class="message-group ai-group">
            <div class="avatar-small">
                <i class="fas fa-robot"></i>
            </div>
            <div class="messages">
                <div class="message ai-message">
                    <div class="message-content">${formattedMessage}</div>
                    <span class="message-time">${time}</span>
                </div>
            </div>
        </div>
    `;
    
    messagesDiv.insertAdjacentHTML('beforeend', messageHTML);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// 顯示載入動畫
function showTypingIndicator() {
    const messagesDiv = document.getElementById('chatMessages');
    const id = 'typing-' + Date.now();
    
    const typingHTML = `
        <div class="message-group ai-group" id="${id}">
            <div class="avatar-small">
                <i class="fas fa-robot"></i>
            </div>
            <div class="messages">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        </div>
    `;
    
    messagesDiv.insertAdjacentHTML('beforeend', typingHTML);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    return id;
}

// 移除載入動畫
function removeTypingIndicator(id) {
    const element = document.getElementById(id);
    if (element) {
        element.remove();
    }
}

// 快速問題功能
function askQuickQuestion(question) {
    const input = document.getElementById('userInput');
    input.value = question;
    sendMessage();
}

// 獲取當前時間
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// HTML 跳脫函數（防止 XSS 攻擊）
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Enter 鍵發送訊息
document.getElementById('userInput')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// 頁面載入完成後的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('壽豐尋寶巴 AI 助手已準備就緒！');
    console.log('使用 Groq API (llama-3.3-70b-versatile)');
    
    // 自動聚焦輸入框
    const input = document.getElementById('userInput');
    if (input) {
        input.focus();
    }
});