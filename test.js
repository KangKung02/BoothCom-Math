function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

async function Question_Number_1() {
  let RandomedNumber = getRandomInt(10, 1000);
  console.log(RandomedNumber)
};

Question_Number_1()
Question_Number_1()