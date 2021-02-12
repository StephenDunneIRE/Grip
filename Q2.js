// Including for reference
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const charReferences = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;'
};

function sanitizeUserInput(value, regexMatcher) {
  // Validating the arguments are provided
  if (!value) throw new Error('User must provide value argument.');
  // remove trailing whitespaces and validate against regex
  var sanitizedValue = value.trim();
  if (regexMatcher && !regexMatcher.test(sanitizedValue)) {
    throw new Error(`Value '${sanitizedValue}' is not valid. Must match following regex: ${regexMatcher}`);
  }
  // Encode '&<>"'/' chars as HTML entities using table above to avoid switching into any random execution contexts!
  sanitizedValue = sanitizedValue.replace(/[&<>"'/]/ig, match => charReferences[match]);
  // At this point, the fields would be sent for further processing.. but I will just log the outputs
  console.log(`Input sanitized.\nWas: '${value}'\nNow: '${sanitizedValue}'`);
}

try {
  sanitizeUserInput(' stevey&dunne&@gmail.com ', emailRegex);
} catch(err) {
  console.log(`Error whilst sanitizing User input: ${err.message}`)
}
