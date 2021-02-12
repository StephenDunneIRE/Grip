var Q2 = require('./Q2');
var Q3 = require('./Q3');
var Q4 = require('./Q4');

var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var userRecords = [
  { user_id: 1, device: 'Windows 10', action: 'start', date_actioned: 100 },
  { user_id: 2, device: 'OSX 15.4', action: 'start', date_actioned: 200 },
  { user_id: 1, device: 'iPhone 8s', action: 'start', date_actioned: 300 },
  { user_id: 1, device: 'Windows 10', action: 'stop', date_actioned: 350 },
  { user_id: 1, device: 'iPhone 8s', action: 'stop', date_actioned: 410 },
  { user_id: 2, device: 'OSX 15.4', action: 'stop', date_actioned: 490 },
  { user_id: 3, device: 'fS 9.1', action: 'start', date_actioned: 700 }
];

// Q2
try {
  console.log('\nQuestion 2...')
  Q2.sanitizeUserInput(' stevey&dunne&@gmail.com ', emailRegex);
} catch(err) {
  console.log(`Error whilst sanitizing User input: ${err.message}`)
}

// Q3
try {
  console.log('\nQuestion 3...')
  var userIds = Q3.getUsers(userRecords, 'start', 700, 900);
  console.log(`Found ${userIds.length} user id(s): ${userIds.join(', ')}.`);
} catch(err) {
  console.log(`Error whilst finding user ids: ${err.message}`)
}

// Q4
try {
  console.log('\nQuestion 4...')
  var playbackTime = Q4.getPlaybackTime(userRecords, 1);
  console.log(`Total playback time for user: ${playbackTime}`);
} catch(err) {
  console.log(`Error whilst calculating users playback time: ${err.message}`)
}
