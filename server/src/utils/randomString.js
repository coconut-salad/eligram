const generateRandomString = (length) => {
  const chars =
    'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
  const randomArray = Array.from(
    { length },
    (v, k) => chars[Math.floor(Math.random() * chars.length)]
  );

  const randomString = randomArray.join('');
  return randomString;
};

module.exports = generateRandomString;
