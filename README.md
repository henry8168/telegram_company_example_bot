# Telegram Company Example Bot on Google Apps Script
提供新加入 Telegram 的企業免費的機器人互動範本  

很多從 Line 轉來 Telegram 的企業會有以下幾種需求:  
1. 純廣播訊息  
2. 廣播訊息並希望得到粉絲留言回饋  
3. 能廣播訊息，也能和粉絲互動的介面  
  
需求 1 可以輕鬆使用 Telegram 內建的頻道達成。  
需求 2 可以在頻道中加入類似 https://t.me/DiscussBot 的機器人，  
並將它設為管理員，折衷達成。  
  
而有需求 3 的使用者，這份開放原始碼可以作為最輕鬆的入門範本。  
  
提供的功能:  
1. 區分業主和粉絲的輸入，使業主能有屬於自己的主控台。  
2. 提供廣播文字、照片、貼圖、視訊檔案、音訊檔案、其他檔案的功能。  
  
尚不支援:  
1. 業主接收粉絲的訊息。  
  
流程:
1. 使用 https://t.me/BotFather 免費  
   建立屬於貴單位的 Telegram bot  
2. 建立一個 Google 文件  
3. 建立一個 Google 試算表(表命名為「fans list」，第一列第一行寫「uid」)  
4. 建立一個 Google Apps Script  
5. 將本網站的檔案全部複製過去，  
   並填上 author_setting.gs 和 logging.gs 和 keyboards.gs 需求的欄位。  
6. 部屬您的 Google Apps Script 到網路上。(任何人，甚至匿名使用者)  
7. 到 tools.gs 手動執行一次 setWebhook()，  
   即完成與 TG bot 的連結。  

Note: 此專案適合中小規模粉絲數的單位。  
      如果有超過萬人的粉絲量，建議租用或私架伺服器，  
      以應付龐大流量。  

現成的範例:  
https://t.me/company_example_bot  

我的實驗室：
https://t.me/HenryLab
