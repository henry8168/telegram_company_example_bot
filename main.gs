function doPost(e){
  var update = JSON.parse(e.postData.contents);
  var rcv_message = update.message
  var rcv_chat = undefined
  var rcv_from = undefined
  if(rcv_message){
    rcv_from = rcv_message.from
    if(rcv_message.chat){
      rcv_chat = rcv_message.chat
    }
  }
  if(rcv_chat.id < 0){
    send_msg(rcv_chat.id, "收到了來自群組的訊息，沒動作。")
  }
  else if(rcv_message.text == fans_number_bt.text){
    send_fans_number(rcv_from.id)
  }
  else if(Admins_UID.indexOf(rcv_from.id) >= 0){
    // 管理員區域
    send_keyboard(rcv_from.id, "[管理員控制台]", keyboard_admins)
    if(rcv_message.text){
      broadcast_msg(rcv_message.text)
      send_keyboard(rcv_from.id, "已廣播作者文字訊息", keyboard_admins)
    }
    else if(rcv_message.photo){
      send_keyboard(rcv_from.id, "收到作者照片", keyboard_admins)
      var photo = rcv_message.photo[rcv_message.photo.length-1]
      if(photo){
        broadcast_photo(photo.file_id)
        send_keyboard(rcv_from.id, "已廣播作者照片", keyboard_admins)
      }
    }
    else if(rcv_message.sticker){
      if(rcv_message.sticker.is_animated){
        send_keyboard(rcv_from.id, "收到作者動態貼圖", keyboard_admins)
      }
      else{
        send_keyboard(rcv_from.id, "收到作者靜態貼圖", keyboard_admins)
      }
      broadcast_sticker(rcv_message.sticker.file_id)
      send_keyboard(rcv_from.id, "已廣播作者貼圖", keyboard_admins)
    }
    else if(rcv_message.voice){
      send_keyboard(rcv_from.id, "收到作者音訊檔案", keyboard_admins)
      broadcast_voice(rcv_message.voice.file_id)
      send_keyboard(rcv_from.id, "已廣播作者音訊檔案", keyboard_admins)
    }
    else if(rcv_message.video_note){
      send_keyboard(rcv_from.id, "收到作者視訊檔案", keyboard_admins)
      broadcast_video_note(rcv_message.video_note.file_id)
      send_keyboard(rcv_from.id, "已廣播作者視訊檔案", keyboard_admins)
    }
    else if(rcv_message.document){
      if(rcv_message.animation){
        send_keyboard(rcv_from.id, "收到作者影片", keyboard_admins)
      }
      else{
        send_keyboard(rcv_from.id, "收到作者檔案", keyboard_admins)
      }
      broadcast_document(rcv_message.document.file_id)
      send_keyboard(rcv_from.id, "已廣播作者檔案", keyboard_admins)
    }
    else if(rcv_message.poll){
      var message = send_poll(rcv_from.id, rcv_message.poll)
      var forward_fans = {"from_chat":rcv_from.id,
                          "the_message_id": message.message_id
                         }
      broadcast_poll(forward_fans, undefined)
      send_keyboard(rcv_from.id, "已廣播作者投票議題", keyboard_admins)
    }
    else{
      send_keyboard(rcv_from.id, "收到作者其他訊息", keyboard_admins)
    }
  }
  else{
    // 粉絲區域
    var forward_admin = {"from_chat":rcv_from.id ,
                         "the_message_id": rcv_message.message_id
                        }
    if(rcv_message.text){
      //文字訊息
      if(rcv_message.text=="/start" || rcv_message.text==follow_bt.text){
        var lock = LockService.getScriptLock();
        lock.tryLock(10000) //嘗試最多等待 10 秒完成
        if (lock.hasLock()) {
          if(rcv_message.text=="/start"){
            send_keyboard(rcv_from.id, welcome_msg, keyboard_fans)
            join(rcv_from.id)
          }
          else{
            var row = fan_row(rcv_from.id)
            if(row){
              leave(rcv_from.id, row)
            }
            else{
              join(rcv_from.id, row)
            }
          }
          SpreadsheetApp.flush()
        }
        else{
          send_keyboard(rcv_from.id, "請再試一次。", keyboard_fans)
        }
      }
      else if(rcv_message.text==about_bt.text){
        send_keyboard(rcv_from.id, about_bt.reply_msg, keyboard_fans)
      }
      else if(rcv_message.text==donate_bt.text){
        send_keyboard(rcv_from.id, donate_bt.reply_msg, keyboard_fans)
      }
      else if(rcv_message.text==howto_bt.text){
        send_keyboard(rcv_from.id, howto_bt.reply_msg, keyboard_fans)
      }
      else{
        //其他非點擊按鈕的文字訊息
        broadcast_msg(rcv_message.text, forward_admin)
        send_keyboard(rcv_from.id, "收到粉絲文字訊息", keyboard_fans)
      }
    }
    else if(rcv_message.photo){
      //照片
      var photo = rcv_message.photo[rcv_message.photo.length-1]
      broadcast_photo(photo.file_id, forward_admin)
      send_keyboard(rcv_from.id, "收到粉絲照片", keyboard_fans)
    }
    else if(rcv_message.sticker){
      //貼圖
      forward_admin["first_name"] = rcv_from.first_name
      broadcast_sticker(rcv_message.sticker.file_id, forward_admin)
      if(rcv_message.sticker.is_animated){
        send_keyboard(rcv_from.id, "收到粉絲動態貼圖", keyboard_fans)
      }
      else{
        send_keyboard(rcv_from.id, "收到粉絲靜態貼圖", keyboard_fans)
      }
    }
    else if(rcv_message.voice){
      //音訊
      broadcast_voice(rcv_message.voice.file_id, forward_admin)
      send_keyboard(rcv_from.id, "收到粉絲音訊檔案", keyboard_fans)
    }
    else if(rcv_message.video_note){
      //視訊短片
      broadcast_video_note(rcv_message.video_note.file_id, forward_admin)
      send_keyboard(rcv_from.id, "收到粉絲視訊檔案", keyboard_fans)
    }
    else if(rcv_message.document){
      //檔案
      broadcast_document(rcv_message.document.file_id, forward_admin)
      if(rcv_message.animation){
        send_keyboard(rcv_from.id, "收到粉絲影片", keyboard_fans)
      }
      else{
        send_keyboard(rcv_from.id, "收到粉絲檔案", keyboard_fans)
      }
    }
    else if(rcv_message.poll){
      //投票或問答
      broadcast_poll(undefined, forward_admin)
      send_keyboard(rcv_from.id, "收到投票議題", keyboard_fans)
    }
    else{
      send_keyboard(rcv_from.id, "未收到粉絲其他訊息", keyboard_fans)
    }
  }
  return ret
}

function debug(){
}
