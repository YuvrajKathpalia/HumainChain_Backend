const validSeverities = ['Low', 'Medium', 'High'];


const validateIncident = (data) => {
  const { title, description, severity } = data;
  
  
  if (!title) {
    return { isValid: false, message: 'Title is required' };
  }
  
  if (!description) {
    return { isValid: false, message: 'Description is required' };
  }
  
  if (!severity) {
    return { isValid: false, message: 'Severity is required' };
  }
  
  
  if (!validSeverities.includes(severity)) {
    return { isValid: false, message: 'Severity can be Low, Medium, or High only' };
  }
  

  return { isValid: true };
};

module.exports = {
  validateIncident,
  validSeverities
};