module.exports = {
  getPlaybackTime: function (records, user_id) {
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
}

/*
  Q6: Shortcomings / Limitations of 'Q4 getPlaybackTime':
  * Not much error handling (e.g. for invalid argument entry) but seemed out of scope

  Strengths:
  * Handles instances where db records are not provided in order of date_actioned
  * Handles instances where a device has just a start or stop action
  * Handles instances where a device has multiple start and stop times
*/