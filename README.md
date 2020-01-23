# telegram_company_example_bot
提供新加入 Telegram 的企業免費的機器人互動範本

很多企業剛加入 Telegram 會有以下幾種需求:
1. 純廣播訊息
2. 廣播訊息並希望得到粉絲留言回饋
3. 能廣播訊息，也能和粉絲互動的介面

需求 1 可以輕鬆使用 Telegram 內建的頻道達成。
需求 2 可以在頻道中加入類似 https://t.me/DiscussBot 並將它設為管理員，折衷達成。

而有需求 3 的使用者，這個份開放原始碼可以作為最輕鬆的入門範本。

流程:
1. 使用 https://t.me/BotFather 免費建立屬於貴單位的 Telegram bot
2. 建立一個 Google 文件
3. 建立一個 Google 試算表
4. 建立一個 Google Apps Script
5. 將本網站的檔案全部複製過去，
   並填上 author_setting.gs 和 logging.gs 需求的欄位。
6. 部屬您的 Google Apps Script 到網路上。
7. 到 tools.gs 手動執行一次 setWebhook()，即完成與 TG bot 的連結。
