var Logging = function(save_lv){
  this.log_document_id = "<開發者記錄程式 log 的 Google Doc ID>"
  this.save_lv = save_lv;
  this.DEBUG = 4
  this.INFO  = 3
  this.WARN  = 2
  this.ERROR = 1
  this.body = DocumentApp.openById(this.log_document_id).getBody();
  this.text = this.body.editAsText();
  
  this.ERR = function(msg, module){
    if(this.ERROR > this.save_lv){
      return 0;
    }
    this.text.appendText("[erro] ");
    if(module == undefined){
      this.text.appendText(msg);
    }
    else{
      this.text.appendText(module+" "+msg);
    }
    this.text.appendText(" - "+get_timestamp()+'\n');
    return 0;
  }
  
  this.WARN = function(msg, module){
    if(this.WARN > this.save_lv){
      return 0;
    }
    this.text.appendText("[warn] ");
    if(module == undefined){
      this.text.appendText(msg);
    }
    else{
      this.text.appendText(module+" "+msg);
    }
    this.text.appendText(" - "+get_timestamp()+'\n');
    return 0;
  }
  
  this.INFO = function(msg, module){
    if(this.INFO > this.save_lv){
      return 0;
    }
    this.text.appendText("[info] ");
    if(module == undefined){
      this.text.appendText(msg);
    }
    else{
      this.text.appendText(module+" "+msg);
    }
    this.text.appendText(" - "+get_timestamp()+'\n');
    return 0;
  }
  
  this.DEBUG = function(msg, module){
    if(this.DEBUG > this.save_lv){
      return 0;
    }
    this.text.appendText("[debg] ");
    if(module == undefined){
      this.text.appendText(msg);
    }
    else{
      this.text.appendText(module+" "+msg);
    }
    this.text.appendText(" - "+get_timestamp()+'\n');
    return 0;
  }
  
};

var log = new Logging(4);