export const isEmailValid = (email) => {
  let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(email.toLowerCase());
};

export const isChildEmpty = (data) => {
  for (let obj of Object.getOwnPropertyNames(data)) {
    if (obj === 'student') {
      continue;
    }
    if (!data[obj]) {
      return true;
    }
  }
  return false;
};
