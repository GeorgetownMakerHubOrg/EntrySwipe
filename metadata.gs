var userTable = SpreadsheetApp
        .openById(getUserTableId()); // functions like getUserTableId() are in a file called secrets.gs, which is not in the repo.



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

var checklistItems = [
'Signed Safety Waiver',
'Recieved Safety Orientation'
];
function getChecklistItems(){
  return checklistItems; 
}
