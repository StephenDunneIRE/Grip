function getPlaybackTime(records, user_id) {
  if (!records || !user_id) {
    throw new Error('User must provide every argument: records, user_id.');
  }
  var userRecords = records.filter(record => record.user_id === user_id).sort((a, b) => a.date_actioned > b.date_actioned);
  var prevStopTime = -1;
  // Use Array.reduce to accumulate total unique playback time from the users records
  var totalPlayback = userRecords.reduce(function (acc, startRecord) {
    if (startRecord.action === 'start') {
      // Find the stop record for current start record
      var stopRecord = userRecords.find(r => r.action === 'stop' && r.device === startRecord.device && r.date_actioned > startRecord.date_actioned);
      // Only increase accumulator if current stop time is after previous stop time.
      if (stopRecord && stopRecord.date_actioned > prevStopTime) {
        // If previous device stopped after current device started, only increase acc by the intercepting time on the playback range upward
        acc += stopRecord.date_actioned - Math.max(prevStopTime, startRecord.date_actioned);
        prevStopTime = stopRecord.date_actioned;
      }
    }
    return acc;
  }, 0);
  return totalPlayback;
}

/*
  Q6: Shortcomings / Limitations of 'Q4 getPlaybackTime':
  * Not much error handling (e.g. for invalid argument entry) but seemed out of scope

  Strengths:
  * Handles instances where db records are not provided in order of date_actioned
  * Handles instances where a device has just a start or stop action
  * Handles instances where a device has multiple start and stop times
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
  var playbackTime = getPlaybackTime(userRecords, 1);
  console.log(`Total playback time for user: ${playbackTime}`);
} catch(err) {
  console.log(`Error whilst calculating users playback time: ${err.message}`)
}
