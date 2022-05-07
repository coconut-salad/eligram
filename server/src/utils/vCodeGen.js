let i = 1;
while (true) {
  let otp = Math.floor(100000 + Math.random() * 99999);
  if (otp.toString().length != 6) {
    throw new Error('no');
  }
  console.log(otp + '\t' + i);
  i++;
}
