module.exports = {
  getUsers: function (records, action, start_time, end_time) {
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
}

/*
  Q6. Shortcomings / Limitations of 'Q3 getUsers':
  * Not much error handling (e.g. for invalid argument entry) but that seemed out of scope
*/
