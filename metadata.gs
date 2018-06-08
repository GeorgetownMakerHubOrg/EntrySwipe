
var userTable = SpreadsheetApp
        .openById(getUserTableId()); // functions like getUserTableId() are in a file called secrets.gs, which is not in the repo.

var staffChecklist = SpreadsheetApp
        .openById(getStaffChecklistId());

var signinTable = SpreadsheetApp
        .openById(getSigninTableId());

var staffScheduleCal = false;

function getStaffScheduleCal(){
  if(!staffScheduleCal){
    var calendars = CalendarApp.getCalendarsByName(getStaffScheduleCalName);
    staffScheduleCal = calendars[0];
  }
  return staffScheduleCal;
}

function getStaffScheduleEvents(startTime, endTime){
  var cal = getStaffScheduleCal();
  return getCalEvents(cal, startTime, endTime);  
}


function getCalEvents(cal, startTime, endTime){
  var realStartDate = new Date(startTime);
  var realEndDate = new Date(endTime);
  try{
    var events = cal.getEvents(new Date(startTime), new Date(endTime));
    var returnEvents = events.map(function(event){
      Logger.log(JSON.stringify(event));
      var returnEvent = {
        id: event.getId(),
        calendarName : cal.getName(),
        startTime: event.getStartTime().toString(),
        endTime : event.getEndTime().toString(),
        title : event.getTitle(),
        description : event.getDescription(),
        guestList : event.getGuestList(true).map(function(guest){
          return {name : guest.getName(),
                  email : guest.getEmail(),
                  status: guest.getGuestStatus()
                 };
        }),
        creators : event.getCreators(),
        dateCreated : event.getDateCreated.toString(),
        location : event.getLocation()
      }
      return returnEvent;
    });
    return returnEvents;
  }catch (error){
    Logger.log(error);
    throw error; 
  }
}

function getStaffSchedules(startDate, endDate){

  var staffCal = getStaffScheduleCal();
  var staffSchedules = {};
  
  var now = new Date();
  var startDateTime = new Date(startDate);
  var endDateTime = new Date(endDate);
  var events = staffCal.getEvents(startDateTime, endDateTime);  
  Logger.log("got them");
  Logger.log(JSON.stringify(events, null, " "));
  
  for(var i = 0; i < events.length; i++){
    var guests = events[i].getGuestList(true);
    for(var j = 0; j < guests.length; j++){
      var guest = guests[j];
      var email  = guest.getEmail().toLowerCase();
      var eventDetails = {title: events[i].getTitle(),
                          startTime: events[i].getStartTime(),
                          endTime: events[i].getEndTime(),
                          guestList : events[i].getGuestList(),
                          staffEmail : events[i].getGuestList()[0].toString(),
                          id : events[i].getId()
                         };
      if(!staffSchedules[email]){
        staffSchedules[email] = [];
      }
      staffSchedules[email].push(eventDetails);
    }    
  }
  return JSON.parse(JSON.stringify(staffSchedules));
}



var checklistItems  = [
  'Recieved Safety Orientation' ,
  'Signed Safety Waiver'
];

function getChecklistItems(){
  return checklistItems; 
}

var MeritBadges = [
  'Laser Cutter',
  '3D Printing',	
  'Hand Tools',	
  'HandiBot',	
  'Power Tools',
  'Print Shop',	
  'Sewing Machine',
  'Embroidery Machine',	
  'Vinyl Cutter',
  'FormLabs',	
  'Soldering',
  'Arduino',
  'Button Maker',
  'Raspberry Pi'
];

function getMeritBadges(){
  return MeritBadges; 
}

var entryReasons = [
  'Staff/Volunteer Shift',
  'Looking for Advice',
  'Just wandered in, checking things out',  
  'My own project',
  'Workshop',
  'Class assignment',
  'Club meeting',
  'Tour',
  'Class Session',
  'Hanging out/meeting a friend/nothing very maker-y (that\'s OK too!)',
  'Office Hours (Faculty or Student)',
  'Class Preparation (Faculty)'
];

function getEntryReasons(){
 return entryReasons; 
}

var workingOn = [
  '3D Modeling and Printing',  
  'Laser Cutter',  
  'Vinyl Cutter',  
  'Print Shop/Book Binding',  
  'Wood Shop/Power Tools',  
  'Electronics',  
  'Sewing, Embroidery, Knitting and Other Textiles',  
  'Button Makers',  
  'Arts and Crafts'  
]

function getWorkingOn(){
  return workingOn; 
}

var openHouse = {
  "Monday" : {
    open : "12:00",
    close : "17:00",
  },
  "Tuesday" : {
    open : "17:00",
    close : "20:00",
  },
  "Wednesday" : {
    open : "17:00",
    close : "20:00",
  },
  "Thursday" : {
    open : "17:00",
    close : "20:00",
  },
  "Friday" : {
    open : "12:00",
    close : "17:00",
  },
  "Saturday" : {
    open : "12:00",
    close : "17:00",
  }
};
