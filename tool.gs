function broadcast_msg(msg, forward_admin){
  if(forward_admin){
    for(var i=0; i<Admins_UID.length; i++){
      forward_msg(Admins_UID[i], forward_admin.from_chat, forward_admin.the_message_id)
    }
  }
  else{
    var SpreadSheet = SpreadsheetApp.openById(fans_info_spreadsheets_id);
    var Sheet = SpreadSheet.getSheetByName("fans list");
    var lastRow = Sheet.getLastRow();
    var start_row = 2
    for(start_row=2; start_row<=lastRow; start_row++){
      this_uid = getSheetVal("fans list", start_row, _getItemColInFansList("uid"))
      send_msg(this_uid, msg)
    }
  }
  return 0
}

function broadcast_photo(file_id, forward_admin){
  if(forward_admin){
    for(var i=0; i<Admins_UID.length; i++){
      forward_msg(Admins_UID[i], forward_admin.from_chat, forward_admin.the_message_id)
    }
  }
  else{
    var SpreadSheet = SpreadsheetApp.openById(fans_info_spreadsheets_id);
    var Sheet = SpreadSheet.getSheetByName("fans list");
    var lastRow = Sheet.getLastRow();
    var start_row = 2
    for(start_row=2; start_row<=lastRow; start_row++){
      this_uid = getSheetVal("fans list", start_row, _getItemColInFansList("uid"))
      send_photo(this_uid, file_id)
    }
  }
  return 0
}

function broadcast_sticker(file_id, forward_admin){
  if(forward_admin){
    for(var i=0; i<Admins_UID.length; i++){
      send_msg(Admins_UID[i], "來自 "+forward_admin.first_name+" 的貼圖")
      forward_msg(Admins_UID[i], forward_admin.from_chat, forward_admin.the_message_id)
    }
  }
  else{
    var SpreadSheet = SpreadsheetApp.openById(fans_info_spreadsheets_id);
    var Sheet = SpreadSheet.getSheetByName("fans list");
    var lastRow = Sheet.getLastRow();
    var start_row = 2
    for(start_row=2; start_row<=lastRow; start_row++){
      this_uid = getSheetVal("fans list", start_row, _getItemColInFansList("uid"))
      send_sticker(this_uid, file_id)
    }
  }
  return 0
}

function broadcast_voice(file_id, forward_admin){
  if(forward_admin){
    for(var i=0; i<Admins_UID.length; i++){
      forward_msg(Admins_UID[i], forward_admin.from_chat, forward_admin.the_message_id)
    }
  }
  else{
    var SpreadSheet = SpreadsheetApp.openById(fans_info_spreadsheets_id);
    var Sheet = SpreadSheet.getSheetByName("fans list");
    var lastRow = Sheet.getLastRow();
    var start_row = 2
    for(start_row=2; start_row<=lastRow; start_row++){
      this_uid = getSheetVal("fans list", start_row, _getItemColInFansList("uid"))
      send_voice(this_uid, file_id)
    }
  }
  return 0
}

function broadcast_video_note(file_id, forward_admin){
  if(forward_admin){
    for(var i=0; i<Admins_UID.length; i++){
      forward_msg(Admins_UID[i], forward_admin.from_chat, forward_admin.the_message_id)
    }
  }
  else{
    var SpreadSheet = SpreadsheetApp.openById(fans_info_spreadsheets_id);
    var Sheet = SpreadSheet.getSheetByName("fans list");
    var lastRow = Sheet.getLastRow();
    var start_row = 2
    for(start_row=2; start_row<=lastRow; start_row++){
      this_uid = getSheetVal("fans list", start_row, _getItemColInFansList("uid"))
      send_video_note(this_uid, file_id)
    }
  }
  return 0
}

function broadcast_document(file_id, forward_admin){
  if(forward_admin){
    for(var i=0; i<Admins_UID.length; i++){
      forward_msg(Admins_UID[i], forward_admin.from_chat, forward_admin.the_message_id)
    }
  }
  else{
    var SpreadSheet = SpreadsheetApp.openById(fans_info_spreadsheets_id);
    var Sheet = SpreadSheet.getSheetByName("fans list");
    var lastRow = Sheet.getLastRow();
    var start_row = 2
    for(start_row=2; start_row<=lastRow; start_row++){
      this_uid = getSheetVal("fans list", start_row, _getItemColInFansList("uid"))
      send_document(this_uid, file_id)
    }
  }
  return 0
}

function send_keyboard(uid, msg, keyboard_t){
  var keyboard_json = {
    keyboard: keyboard_t,
    resize_keyboard: true,
    one_time_keyboard: false
  }
  var payload = {
    method: "sendMessage",
    chat_id: String(uid),
    text: msg,
    reply_markup: JSON.stringify(keyboard_json)
  }
  var data = {
    method: "post",
    payload: payload
  }
  var res = retryFetch("https://api.telegram.org/bot"+tg_token+"/", data);
  if(!res){
    log.ERR("retryFetch() failed", "tools.send_keyboard")
    return undefined
  }
  return res
}

function send_msg(uid, msg){
  var payload = {
    method: "sendMessage",
    chat_id: String(uid),
    text: msg
  }
  var data = {
    method: "post",
    payload: payload
  }
  var res = retryFetch("https://api.telegram.org/bot"+tg_token+"/", data);
  if(!res){
    log.ERR("retryFetch() failed", "tools.send_msg")
    return undefined
  }
  return res
}

function send_photo(uid, file_id){
  var payload = {
    method: "sendPhoto",
    chat_id: String(uid),
    photo: file_id
  }
  var data = {
    method: "post",
    payload: payload
  }
  var res = retryFetch("https://api.telegram.org/bot"+tg_token+"/", data);
  if(!res){
    log.ERR("retryFetch() failed", "tools.send_photo")
    return undefined
  }
  return res
}

function send_sticker(uid, file_id){
  var payload = {
    method: "sendSticker",
    chat_id: String(uid),
    sticker: file_id
  }
  var data = {
    method: "post",
    payload: payload
  }
  var res = retryFetch("https://api.telegram.org/bot"+tg_token+"/", data);
  if(!res){
    log.ERR("retryFetch() failed", "tools.send_sticker")
    return undefined
  }
  return res
}

function send_voice(uid, file_id){
  var payload = {
    method: "sendVoice",
    chat_id: String(uid),
    voice: file_id
  }
  var data = {
    method: "post",
    payload: payload
  }
  var res = retryFetch("https://api.telegram.org/bot"+tg_token+"/", data);
  if(!res){
    log.ERR("retryFetch() failed", "tools.send_voice")
    return undefined
  }
  return res
}

function send_video_note(uid, file_id){
  var payload = {
    method: "sendVideoNote",
    chat_id: String(uid),
    video_note: file_id
  }
  var data = {
    method: "post",
    payload: payload
  }
  var res = retryFetch("https://api.telegram.org/bot"+tg_token+"/", data);
  if(!res){
    log.ERR("retryFetch() failed", "tools.send_video_note")
    return undefined
  }
  return res
}

function send_document(uid, file_id){
  var payload = {
    method: "sendDocument",
    chat_id: String(uid),
    document: file_id
  }
  var data = {
    method: "post",
    payload: payload
  }
  var res = retryFetch("https://api.telegram.org/bot"+tg_token+"/", data);
  if(!res){
    log.ERR("retryFetch() failed", "tools.send_document")
    return undefined
  }
  return res
}

function forward_msg(target_chat, from_chat, the_message_id){
  var payload = {
    method: "forwardMessage",
    chat_id: String(target_chat),
    from_chat_id: String(from_chat),
    message_id: the_message_id
  }
  var data = {
    method: "post",
    payload: payload
  }
  var res = retryFetch("https://api.telegram.org/bot"+tg_token+"/", data);
  if(!res){
    log.ERR("retryFetch() failed", "tools.forward_msg")
    return undefined
  }
  return res
}

function send_fans_number(uid){
  var SpreadSheet = SpreadsheetApp.openById(fans_info_spreadsheets_id);
  var Sheet = SpreadSheet.getSheetByName("fans list");
  var lastRow = Sheet.getLastRow();
  var keyboard = undefined
  if(Admins_UID.indexOf(uid) < 0){
    keyboard = keyboard_home
  }
  else{
    keyboard = keyboard_panel
  }
  send_keyboard(uid, "粉絲人數: "+String(lastRow-1), keyboard)
}

function delete_msg(uid, message){
  var sent_message_dict = JSON.parse(message.getContentText())
  var payload = {
    method: "deleteMessage",
    chat_id: String(uid),
    message_id: sent_message_dict.result.message_id,
    parse_mode: "HTML"
  }
  var data = {
    method: "post",
    payload: payload
  }
  var res = retryFetch("https://api.telegram.org/bot" + tg_token + "/", data);
  if(!res){
    log.ERR("retryFetch() failed", "tools.delete_msg")
    return undefined
  }
  return res
}

function fan_row(uid){
  var SpreadSheet = SpreadsheetApp.openById(fans_info_spreadsheets_id);
  var Sheet = SpreadSheet.getSheetByName("fans list");
  var lastRow = Sheet.getLastRow();
  var start_row = 2
  for(start_row=2; start_row<=lastRow; start_row++){
    this_uid = getSheetVal("fans list", start_row, _getItemColInFansList("uid"))
    if(this_uid == String(uid)){
      return start_row
    }
  }
  return undefined
}

function join(uid, row_t){
  var row = undefined
  if(row_t){
    row = row_t
  }
  else{
    row = fan_row(uid)
  }
  if(row){
    return 0
  }
  var SpreadSheet = SpreadsheetApp.openById(fans_info_spreadsheets_id);
  var Sheet = SpreadSheet.getSheetByName("fans list");
  var lastRow = Sheet.getLastRow();
  var msg = "開啟追隨"
  setSheetVal("fans list", lastRow+1, _getItemColInFansList("uid"), String(uid))
  send_msg(uid, msg)
  return 0
}

function leave(uid, row_t){
  var row = undefined
  if(row_t){
    row = row_t
  }
  else{
    row = fan_row(uid)
  }
  var SpreadSheet = SpreadsheetApp.openById(fans_info_spreadsheets_id);
  var Sheet = SpreadSheet.getSheetByName("fans list");
  if(row){
    var msg = "取消追隨"
    Sheet.deleteRow(row)
    send_msg(uid, msg)
  }
  return 0
}

function _getItemColInFansList(item){
  if(item == "uid"){
    return 1
  }
  var msg = "[error] Wrong column: "+item
  log.ERR(msg, "tools._getItemColInFansList")
  return -1
}

function get_timestamp(dayoffset){
  var datetime = new Date();
  if(dayoffset){
    datetime.setDate(datetime.getDate() + dayoffset);
  }
  var year = datetime.getFullYear();
  var month = datetime.getMonth()+1;
  var date = datetime.getDate();
  var hour = datetime.getHours();
  var minute = datetime.getMinutes();
  var second = datetime.getSeconds();
  var timestamp = year+"/"+month+"/"+date+" "+hour+":"+minute+":"+second;
  return timestamp;
}

function sleep(milliseconds) 
{ 
  var start = new Date().getTime(); 
  while(1)
    if ((new Date().getTime() - start) > milliseconds)
      break;
}

function retryFetch(url, option, retry_times){
  var max_times = 2
  var response = undefined
  if(retry_times){
    max_times = retry_times
  }
  var count = 0
  while(count < max_times){
    try{
      if(option){
        response = UrlFetchApp.fetch(url, option);
      }
      else{
        response = UrlFetchApp.fetch(url);
      }
      return response
    }
    catch (err){
      count++;
      sleep(500)
    }
  }
  log.ERR("網頁不可用: "+url, "tools.retryFetch")
  return undefined;
}

function getSheetVal(sheetName, row, col){
  var SpreadSheet = SpreadsheetApp.openById(fans_info_spreadsheets_id);
  var Sheet = SpreadSheet.getSheetByName(sheetName);
  return Sheet.getSheetValues(row, col, 1, 1)[0][0]
}

function setSheetVal(sheetName, row, col, val){
  var SpreadSheet = SpreadsheetApp.openById(fans_info_spreadsheets_id);
  var Sheet = SpreadSheet.getSheetByName(sheetName);
  Sheet.getRange(row, col).setValue(val)
  return 0
}

function crash_notification(err_msg){
  msg = "[crash] "+PROGRAM_NAME+" crashed. err: "+err_msg
  log.ERR(msg, "tools.crash_notification")
  for(var i=0; i<Admins_UID.length; i++){
    send_msg(Admins_UID[i], msg)
  }
  return 0
}

function setWebhook(){
  var botToken = tg_token
  response = UrlFetchApp.fetch("https://api.telegram.org/bot"+botToken+"/setWebhook?url="+this_gas_exec_url)
  log.DEBUG(response)
}

function deleteWebhook(){
  var botToken = tg_token
  response = UrlFetchApp.fetch("https://api.telegram.org/bot"+botToken+"/setWebhook?url=")
  log.DEBUG(response)
}