import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let restartProcessVar;
let playerName;
let playerScore = 0;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
      "โฮ้ โฮ้ อยากวัดความรู้คณิตศาสตร์อย่างงั้นรึ! \nแน่จริงก็เข้ามาสิ!\n"
    );
  
    await sleep();
    rainbowTitle.stop();
  
    console.log(`
      ${chalk.bgBlue("วิธีเล่น")} 
      โจทย์จะถูกสุ่มขึ้นมาจากระดับ ง่าย -> ปานกลาง -> ยาก -> ยากมาก -> ไม่ใช่มนุษย์
      ถ้าทำโจทย์ระดับไม่ใช่มนุษย์สำเร็จ รางวัลโนเบล ก็อาจจะไม่ไกลเกินเอื้อม!
      รูปแบบการให้คะแนน:
          ${chalk.bgGreenBright("ข้อ 1-6  ข้อละ 1 คะแนน")}
          ${chalk.bgGreen("ข้อ 7-9  ข้อละ 2 คะแนน")}
          ${chalk.bgYellowBright("ข้อ 9-12  ข้อละ 3 คะแนน")}
          ${chalk.bgYellow("ข้อ 13-15 ข้อละ 5 คะแนน")}

      ${chalk.bgBlue("มาเริ่มเกมกันเถอะ!")}
  
    `);
}

async function restartProcess() {
  restartProcessVar = true;
  playerName;
  playerScore = 0;

  const answers = await inquirer.prompt({
    name: "response",
    type: "confirm",
    message: `ต้องการเริ่มใหม่ใช่หรือไม่?`
  });

  if (!answers.response) { console.log("ไม่ละ จงอยู่กับ Loop นรกนี้ไปซะ!") };
  const spinner = createSpinner('กำลังเริ่มต้นเกมใหม่ อีกครั้ง...').start();
  await sleep();
  spinner.success({ text: "เสร็จสิ้น" });
  restartProcessVar = false;
  await sleep();
  console.clear();
  startGame();
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "response",
    type: "input",
    message: "คุณชื่ออะไร?",
    default() { return "นิรนาม"}
  });

  playerName = answers.response;
  await sleep();
  let spinner = createSpinner('กำลังลงทะเบียน...').start();
  await sleep();
  await spinner.success({ text : `ลงทะเบียนเสร็จสิ้น! ขอให้โชคดี!` });
};

async function winner() {
  if (restartProcessVar) return;
  figlet(`Congrats!, ${playerName} You Win This Game!`, (err, data) => {
    console.log(gradient.pastel.multiline(data) + '\n')
    console.log(chalk.green(`ชัยชนะที่ได้มาด้วยความพยายามนั้น... อา~ ช่างมันเถอะ ขี้เกียจคิดแล้ว`));
    // console.log(chalk.green(`ชัยชนะที่ได้มาด้วยความพยายาม นั้นสำคัญกว่าใด และใช่ Millennium Prize Problems รอให้คุณแก้อยู่!`));
  });
  await sleep(5000);
  restartProcess();
};

async function handleAnswer(isCorrect, countAddPoint) {
  const spinner = createSpinner('กำลังตรวจสอบคำตอบ...').start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `เป็นคำตอบที่ถูกต้องแล้วครับ!` });
    playerScore = playerScore + countAddPoint;
    await inquirer.prompt({
      name: "response",
      message: `คุณ ${playerName} คุณต้องการไปต่อใช่หรือไม่`,
      type: "confirm"
    }).then((answers) => {
      if (!answers.response) {
        spinner.success({ text: `คะแนนของคุณ ${playerName} ตอนนี้คือ ${playerScore} โอกาสหน้าเชิญใหม่นะครับ.` })
        restartProcess();
      }
    })
  } else {
    spinner.error({ text: `คำตอบยังไม่ถูกต้องนะครับ คุณ ${playerName} คะแนนสูงสุดของคุณคือ ${playerScore} โอกาสหน้าลองใหม่!` });
    restartProcess();
  }
};


async function Question_Number_1() {
  if (restartProcessVar) return;
  let RandomedNumber_1 = getRandomInt(0, 99);
  let RandomedNumber_2 = getRandomInt(0, 99);
  let X = RandomedNumber_1 + RandomedNumber_2;

  const answers = await inquirer.prompt({
    name: "response",
    type: "number",
    message: `ข้อที่ 1). จาก ${RandomedNumber_1} + ${RandomedNumber_2} = X จงหาค่าของ X
    คำตอบ :`
  });

  return handleAnswer(answers.response == X, 1);
};

async function Question_Number_2() {
  if (restartProcessVar) return;
  let RandomedNumber_1 = getRandomInt(0, 99);
  let RandomedNumber_2 = getRandomInt(0, 99);
  while (RandomedNumber_1 <= RandomedNumber_2) { RandomedNumber_1 = getRandomInt(0, 99) };

  let X = RandomedNumber_1 - RandomedNumber_2;

  const answers = await inquirer.prompt({
    name: "response",
    type: "number",
    message: `ข้อที่ 2). จาก ${RandomedNumber_1} - ${RandomedNumber_2} = X จงหาค่าของ X
    คำตอบ :`
  });

  return handleAnswer(answers.response == X, 1);
};

async function Question_Number_3() {
  if (restartProcessVar) return;
  let RandomedNumber_1 = getRandomInt(0, 12);
  let RandomedNumber_2 = getRandomInt(0, 12);
  let X = RandomedNumber_1 * RandomedNumber_2;

  const answers = await inquirer.prompt({
    name: "response",
    type: "number",
    message: `ข้อที่ 3). จาก ${RandomedNumber_1} * ${RandomedNumber_2} = X จงหาค่าของ X
    คำตอบ :`
  });

  return handleAnswer(answers.response == X, 1);
};

async function Question_Number_4() {
  if (restartProcessVar) return;
  let RandomedNumber_1 = getRandomInt(0, 99);
  let RandomedNumber_2 = getRandomInt(0, 99);
  let X = RandomedNumber_2 + RandomedNumber_1;

  const answers = await inquirer.prompt({
    name: "response",
    type: "number",
    message: `ข้อที่ 4). จาก X - ${RandomedNumber_1} = ${RandomedNumber_2} จงหาค่าของ X
    คำตอบ :`
  });

  return handleAnswer(answers.response == X, 1);
};

async function Question_Number_5() {
  if (restartProcessVar) return;
  let RandomedNumber_1 = getRandomInt(0, 99);
  let RandomedNumber_2 = getRandomInt(0, 99);
  while (RandomedNumber_1 >= RandomedNumber_2) { RandomedNumber_1 = getRandomInt(0, 99) };
  let X = RandomedNumber_2 - RandomedNumber_1;

  const answers = await inquirer.prompt({
    name: "response",
    type: "number",
    message: `ข้อที่ 5). จาก X + ${RandomedNumber_1} = ${RandomedNumber_2} จงหาค่าของ X
    คำตอบ :`
  });

  return handleAnswer(answers.response == X, 1);
};


async function Question_Number_6() {
  if (restartProcessVar) return;
  let RandomedNumber_1 = getRandomInt(0, 12);
  let RandomedNumber_2 = getRandomInt(0, 12);
  let X = RandomedNumber_2 * RandomedNumber_1;

  const answers = await inquirer.prompt({
    name: "response",
    type: "number",
    message: `ข้อที่ 6). จาก X / ${RandomedNumber_1} = ${RandomedNumber_2} จงหาค่าของ X
    คำตอบ :`
  });

  return handleAnswer(answers.response == X, 1);
};

async function Question_Number_7() {
  if (restartProcessVar) return;
  let QuestionList = [
    { Question: "(a^2 - b^2) แยกตัวประกอบได้อย่างไร", Choices: ["(a + b)(a + b)", "(a - b)(a + b)", "(a - b)(a - b)"], Answers: "(a - b)(a + b)" },
    { Question: "2^0 มีค่าเท่าไหร่", Choices: ["0", "1", "2", "0^2"], Answers: "1" },
    { Question: "0^1 มีค่าเท่าไหร่", Choices: ["0", "1", "2", "10"], Answers: "0" },
    { Question: "จากสมการ |-15| + 4 - x = 32 x มีค่าเท่าใด", Choices: ["13", "-13", "19", "-19"], Answers: "-13" },
    { Question: "จากสมการ |-15| + 4 - x = 32 x มีค่าเท่าใด", Choices: ["13", "-13", "19", "-19"], Answers: "-13" },
    { Question: "จากสมการ (-3/(-3/16)) = (r+1)/((r^5)+(r^4)) r มีค่าเท่าใด", Choices: ["1/2", "2", "3", "3/4"], Answers: "1/2" },
  ]
  let RandomQuestion = QuestionList[getRandomInt(0, QuestionList.length - 1)];

  const answers = await inquirer.prompt({
    name: "response",
    type: "list",
    choices: RandomQuestion.Choices,
    message: `ข้อที่ 7). ${RandomQuestion.Question} 
    คำตอบ :`
  });

  return handleAnswer(answers.response == RandomQuestion.Answers, 3);
};
async function Question_Number_8() {
  if (restartProcessVar) return;
  let QuestionList = [
    { Question: "จงหา lim n -> ∞ (5 - 2(n^2)) / (n^2 + 1)", Answers: -2 },
    { Question: "จงหา lim n -> ∞ (sqrt(4(n^2) - 1)) / ( 2n + sqrt((n^3)+ 2))", Answers: 0 },
    { Question: "จงหา lim n -> ∞ (5(n)^2 - 4n) / (2(n^2) + 3)", Answers: 5/2 },
    { Question: "จงหา lim n -> ∞ (13 - n^13) / (2(n^13) + 10^32)", Answers: -1/7 },
    { Question: "จงหา lim n -> ∞ ((n^999) + 10^32 - 54^3) / ((n^1000) - 24)", Answers: 0 },
    { Question: "จงหา lim n -> ∞ (2(n^2) + 3) / (5(n^2) + 7)", Answers: 2/5 },
  ]
  let RandomQuestion = QuestionList[getRandomInt(0, QuestionList.length - 1)];

  const answers = await inquirer.prompt({
    name: "response",
    type: "number",
    message: `ข้อที่ 8). ${RandomQuestion.Question} 
    คำตอบ :`
  });

  return handleAnswer(answers.response == RandomQuestion.Answers, 2);
};

async function Question_Number_9() {
  if (restartProcessVar) return;
  let QuestionList = [
    { Question: "ผลบวก 99 พจน์แรก ทีได้จาก ลำดับเลขคณิต {1, 2, 4, 6, ...} คือเท่าใด", Answers: 9801 },
    { Question: "ผลบวกของอนุกรมเลขคณิต 7 + 10 + 13 + . . . + 157 คือเท่าใด", Answers: 4182 },
    { Question: "จงหาผลรวมของอนุกรม {1/(2*3) + 1/(3/4) + 1/(4*5) + ... + 1/(n + 1)(n + 2) + ...}", Answers: 1/2 },
    { Question: "จงหาผลรวมของอนุกรม {1/(5*9) + 1/(9/13) + 1/(13*17) + ... + 1/(4n + 1)(4n + 5) + ...}", Answers: 1/20 },
    { Question: "จงหาผลรวมของอนุกรม {1 + 2/3 + 3/9 + 4/27 + ...}", Answers: 9/4 },
    { Question: "จงหาผลรวมของอนุกรม {1 - 3/3 + 5/9 - 7/27 + ...}", Answers: 3/8 },
  ]
  let RandomQuestion = QuestionList[getRandomInt(0, QuestionList.length - 1)];

  const answers = await inquirer.prompt({
    name: "response",
    type: "number",
    message: `ข้อที่ 9). ${RandomQuestion.Question} 
    คำตอบ :`
  });

  return handleAnswer(answers.response == RandomQuestion.Answers, 3);
};


async function Question_Number_10() {
  if (restartProcessVar) return;
  let QuestionList = [
    { Question: "จงหา lim x -> -3 (sqrt(2x + 22) - 4)/(x + 3)", Answers: 1/4 },
    { Question: "จงหา lim x -> 0 (x)/(3 + sqrt(x + 9))", Answers: -6 },
    { Question: "จงหา lim x -> 5 (10 + |x - 5|)", Answers: 10 },
    { Question: "จงหา lim x -> 0 sin(12x)/sin(5x)", Answers: 12/5 },
    { Question: "จงหาอินทริกรัลของฟังชั่น ∫ (2x + 3 dx) โดยจำกัดขอบเขตที่ 1 ถึง 4", Answers: 24 },
    { Question: "จงหาอินทริกรัลของฟังชั่น ∫ (ุ6x(x - 1) dx) โดยจำกัดขอบเขตที่ 0 ถึง 1", Answers: -1 },
    { Question: "จงหาอินทริกรัลของฟังชั่น ∫ (ุ3x - 2 dx) โดยจำกัดขอบเขตที่ 1 ถึง 4", Answers: 33/2 },
    { Question: "จงหาอินทริกรัลของฟังชั่น ∫ (ุ((2(y^3) - 6(y^2))/(y^2)) dy) โดยจำกัดขอบเขตที่ 2 ถึง 1", Answers: 3 },
  ]
  let RandomQuestion = QuestionList[getRandomInt(0, QuestionList.length - 1)];

  const answers = await inquirer.prompt({
    name: "response",
    type: "number",
    message: `ข้อที่ 10). ${RandomQuestion.Question} 
    คำตอบ :`
  });

  return handleAnswer(answers.response == RandomQuestion.Answers, 3);
};

async function Question_Number_11() {
  if (restartProcessVar) return;
  let QuestionList = [
    { Question: "ค่ำของปริพันธ์ ∫ (1/(2 + 3x)) dx โดยจำกัดขอบเขตที่ 0 ถึง 2", Choices: ["ln 2", "ln 2/3", "ln 4/3", "ln 8/3", "ln 16/3"], Answers: "ln 4/3" },
    { Question: "ค่าของปริพันธ์ ∫ tan^2x dx เท่ากับข้อใด", Choices: ["sec x + c", "(ln|sec x|)^2 + c)", "tan x + c", "tan x - x + c", "ln|tan x|+c"], Answers: "tan x - x + c" },
    { Question: "ค่าของ ∫ 1/(1 + (x^2)) dx โดยจำกัดขอบเขตที่ 0 ถึง ∞", Choices: ["π", "π/2", "π/4", "π/6", "∞"], Answers: "π/4" },
    { Question: "ข้อใดมีค่า ∫ (x/(4 + x^2)^2) dx โดยจำกัดขอบเขตที่ 0 ถึง 1", Choices: ["-(1/16)", "-(1/40)", "1", "1/40", "1/16"], Answers: "1/40" },
    { Question: "ข้อใดมีค่า ∫ (1/sqrt(4 - x^2)) dx โดยจำกัดขอบเขตที่ 0 ถึง sqrt(2)", Choices: ["π/8", "π/6", "π/4", "π/3", "π/2"], Answers: "π/4" },
  ]
  let RandomQuestion = QuestionList[getRandomInt(0, QuestionList.length - 1)];

  const answers = await inquirer.prompt({
    name: "response",
    type: "list",
    choices: RandomQuestion.Choices,
    message: `ข้อที่ 11). ${RandomQuestion.Question} 
    คำตอบ :`
  });

  return handleAnswer(answers.response == RandomQuestion.Answers, 3);
};

async function Question_Number_12() {
  if (restartProcessVar) return;
  let QuestionList = [
    { Question: "จงหา lim (x, y) -> (2, 1) ((x^2) - 2xy)/((x^2) - 4(y^2))", Answers: 1/2 },
    { Question: "จงหา lim (x, y) -> (0, 1) ((x^2) + xy)/y", Answers: 0 },
    { Question: "จงหา lim (x, y) -> (0, 0) (6x)/((x^2) + y)", Answers: 3 },
    { Question: "จงคำนวน ∫∫∫ 4(x^2)y - z^3 dz dy dx โดยจำกัดขอบเขต dz ที่ 2 ถึง 3, จำกัดขอบเขต dy ที่ -1 ถึง 4 และ จำกัดขอบเขต dx ที่ 1 ถึง 0", Answers: -755/4 },
    { Question: "จงคำนวน ∫∫∫ y cos(z^5) dx dy dz โดยจำกัดขอบเขต dx ที่ 0 ถึง 1, จำกัดขอบเขต dy ที่ 0 ถึง z^2 และ จำกัดขอบเขต dz ที่ 0 ถึง 3", Answers: 0.2524 },
  ]
  let RandomQuestion = QuestionList[getRandomInt(0, QuestionList.length - 1)];

  const answers = await inquirer.prompt({
    name: "response",
    type: "number",
    message: `ข้อที่ 12). ${RandomQuestion.Question} 
    คำตอบ :`
  });

  return handleAnswer(answers.response == RandomQuestion.Answers, 3);
};

async function Question_Number_13() {
  if (restartProcessVar) return;

  let x = await inquirer.prompt({
    name: "response",
    type: "number",
    message: `ข้อที่ 13). จงหา x, y, z, w จากสมการ x^4 + y^4 + z^4 = w^4 โดยที่ x, y, z, w ⊂ N & x ≠ y ≠ z ≠ w
    x =`
  });

  let y = await inquirer.prompt({
    name: "response",
    type: "number",
    message: `  y =`
  });

  let z = await inquirer.prompt({
    name: "response",
    type: "number",
    message: `  z =`
  });

  let w = await inquirer.prompt({
    name: "response",
    type: "number",
    message: `  w =`
  });

  let X = Math.floor(x.response);
  let Y = Math.floor(y.response);
  let Z = Math.floor(z.response);
  let W = Math.floor(w.response);

  return handleAnswer(!(X == Y || X == Z || X == W || Y == Z || Y == W || Z == W) && (Math.pow(X, 4) + Math.pow(Y, 4) + Math.pow(Z, 4) == Math.pow(W, 4)), 5);
};

async function Question_Number_14() {
  if (restartProcessVar) return;

  const x = await inquirer.prompt({
    name: "response",
    type: "number",
    message: `ข้อที่ 14). จงหา x, y, z, w, v จากสมการ x^5 + y^5 + z^5 + w^5 = v^5 โดยที่ x, y, z, w, v ⊂ N & x ≠ y ≠ z ≠ w ≠ v
    x =`
  });

  const y = await inquirer.prompt({
    name: "response",
    type: "number",
    message: `  y =`
  });

  const z = await inquirer.prompt({
    name: "response",
    type: "number",
    message: `  z =`
  });

  const w = await inquirer.prompt({
    name: "response",
    type: "number",
    message: `  w =`
  });

  const v = await inquirer.prompt({
    name: "response",
    type: "number",
    message: `  v =`
  });
  let X = Math.floor(x.response);
  let Y = Math.floor(y.response);
  let Z = Math.floor(z.response);
  let W = Math.floor(w.response);
  let V = Math.floor(v.response);

  return handleAnswer(!(X == Y || X == Z || X == W || X == V || Y == Z || Y == W || Y == V || Z == W || W == V || V == Z) && Math.pow(X, 5) + Math.pow(Y, 5) + Math.pow(Z, 5) + Math.pow(W, 5) == Math.pow(V, 5), 5);
};

async function startGame() {
  await welcome();
  await askName();
  await Question_Number_1();
  await Question_Number_2();
  await Question_Number_3();
  await Question_Number_4();
  await Question_Number_5();
  await Question_Number_6();
  await Question_Number_7();
  await Question_Number_8();
  await Question_Number_9();
  await Question_Number_10();
  await Question_Number_11();
  await Question_Number_12();
  await Question_Number_13();
  await Question_Number_14();
  await winner();
};

startGame();