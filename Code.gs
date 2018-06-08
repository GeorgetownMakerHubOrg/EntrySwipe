
// try this link: https://script.google.com/a/georgetown.edu/macros/s/AKfycbxzk4ughfsBwVisDsGUAZ5r4LRhXvcYUlNb1F5RuyE/dev

function getStaffOnShift(startTime, endTime, currentTime){
  // find staff that have shifts at this time
  var staffSchedules = getStaffSchedules(startTime, endTime);
  return staffSchedules;
  
}

////  Get Staff Informations
function getStaffChecklist(filter, sort){
  var stafflist = {};
  var allStaffData = staffChecklist
  .getActiveSheet()
  .getDataRange()
  .getValues();
 
  var checklistData = dataIntoHashRows(allStaffData, 1, 2); //, function(row){ return row['NetId'] == netId;}).data;  
  
  stafflist.checklistData = checklistData;
  
  return stafflist;
}


function getStaffData(netId){
  var staffData = {foo:"va"};

  var allStaffData = staffChecklist
  .getActiveSheet()
  .getDataRange()
  .getValues();
  

  var checklistData = dataIntoHashRows(allStaffData, 1, 2, function(row){
    if(row["NetId"].match(new RegExp(netId, "i"))){
      return true;
    }
    return false;
  }); //, function(row){ return row['NetId'] == netId;}).data;
  checklistData.data = checklistData.data[0];
  
 
   staffData.checklistData = JSON.parse(JSON.stringify(checklistData));
   return staffData;
}



function recordEntry(name, netid, herefore, firsttime, mailinglist, workingon, status){
  var now = new Date();
  var date = now.getDate();
  var month = now.getMonth() + 1; 
  var year = now.getFullYear();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var seconds = now.getSeconds();
  var timestamp = month + "/" + date + "/" + year + " " + hour + ":" + minute + ":" + seconds;
  
  var data = {
    'Timestamp' : timestamp,
    'Net ID' : netid,
    "Today I'm probably working with:" : workingon,
    'First Time?' : firsttime, 
    'Can we add you to our mailing list?' : mailinglist, 
    'Name' : name,
    "I'm here for:" : herefore, 
    "I'm a:": status
  }
  
  insertHashRow(signinTable, data, 0);  
}


function toReadableDate(dateString){
  // on March 3, 2017 15:00"
 var myDate = new Date(dateString);
  var dateString = myDate.getMonth() + 1 + "/" + myDate.getDate() + "/" + myDate.getYear() + " " + myDate.getHours() + ":" + myDate.getMinutes();
  return dateString;
}



function getUserTableDataFromSwipe(swipemd5){
  var userTableData = userTable
  .getActiveSheet()
  .getDataRange()
  .getValues();

  var userData = dataIntoHashRows(userTableData, 0, 1, function(row){
    if(row["swipemd5"].toString().trim() == swipemd5.toString().trim()){
      return true;
    }
    return false;
  }); //, function(row){ return row['NetId'] == netId;}).data;
  
  if(userData.data.length > 0){
    return userData.data[0];
  }
  return false;
}


