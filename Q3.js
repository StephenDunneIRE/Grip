function getUsers(records, action, start_time, end_time) {
  if (!records || !action || !start_time || !end_time) throw new Error('User must provide every argument: email, action, start_time, end_time.');
  // Only retrieve records where the:
  // * 'action' field matches the action argument
  // * 'date_actioned' field is in between the start and end time arguments
  var userIds = records.filter(function (record) {
    var actionIsInRange = (record.date_actioned >= start_time && record.date_actioned <= end_time);
    return (actionIsInRange && record.action === action);
  }).map(record => record.user_id);
  // Return the unqiue user_ids from the filtered records
  return userIds.filter((val, i, records) => records.indexOf(val) === i);
}

/*
  Q6. Shortcomings / Limitations of 'Q3 getUsers':
  * Not much error handling (e.g. for invalid argument entry) but that seemed out of scope
*/

var userRecords = [
  { user_id: 1, device: 'Windows 10', action: 'start', date_actioned: 100 },
  { user_id: 2, device: 'OSX 15.4', action: 'start', date_actioned: 200 },
  { user_id: 1, device: 'iPhone 8s', action: 'start', date_actioned: 300 },
  { user_id: 1, device: 'Windows 10', action: 'stop', date_actioned: 350 },
  { user_id: 1, device: 'iPhone 8s', action: 'stop', date_actioned: 410 },
  { user_id: 2, device: 'OSX 15.4', action: 'stop', date_actioned: 490 },
  { user_id: 3, device: 'fS 9.1', action: 'start', date_actioned: 700 }
];

try {
  var userIds = getUsers(userRecords, 'start', 900, 900);
  console.log(`Found ${userIds.length} user id(s): ${userIds.join(', ')}.`);
} catch(err) {
  console.log(`Error whilst finding user ids: ${err.message}`)
}
