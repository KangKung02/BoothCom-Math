
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import fs from "fs";
import path from "path";


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
      โจทย์จะถูกสุ่มขึ้นมาจากระดับ ง่าย -> ปานกลาง -> ยาก -> พระเจ้า
      ถ้าทำโจทย์ระดับพระเจ้าสำเร็จ รางวัลโนเบล ก็ไม่ไกลเกินเอื้อม!
      รูปแบบการให้คะแนน:
          ${chalk.bgGreenBright("ข้อ 1-5  ข้อละ 1 คะแนน")}
          ${chalk.bgGreen("ข้อ 6-8  ข้อละ 2 คะแนน")}
          ${chalk.bgYellowBright("ข้อ 9-12  ข้อละ 3 คะแนน")}
          ${chalk.bgYellow("ข้อ 13-15 ข้อละ 5 คะแนน")}

      ${chalk.bgBlue("มาเริ่มเกมกันเถอะ!")}
  
    `);
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

}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner('กำลังตรวจสอบคำตอบ...').start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `เป็นคำตอบที่ถูกต้องแล้วครับ!` });
    playerScore = playerScore + 1;
    inquirer.prompt({
      name: "response",
      message: `คุณ ${playerName} คุณต้องการไปต่อหรือไม่`,
      type: "confirm"
    }).then((answers) => {
      if (!answers.response) {
        spinner.success({ text: `คะแนนของคุณ ${playerName} ตอนนี้คือ ${playerScore}/15 โอกาสหน้าเชิญใหม่นะครับ.` })
      }
    })
  } else {
    spinner.error({ text: `คำตอบยังไม่ถูกต้องนะครับ คุณ ${playerName} คะแนนสูงสุดของคุณคือ ${playerScore}/15 โอกาสหน้าลองใหม่!` });
    process.exit(1);
  }
};

async function Question_Number_1() {
  let RandomedNumber_1 = getRandomInt(0, 1000);
  let RandomedNumber_2 = getRandomInt(0, 1000);
  let X = RandomedNumber_1 + RandomedNumber_2;

  const answers = await inquirer.prompt({
    name: "response",
    type: "number",
    message: `ข้อที่ 1). จาก ${RandomedNumber_1} + ${RandomedNumber_2} = X จงหาค่าของ X
    คำตอบ :`
  });

  return handleAnswer(answers.response == X);
};

async function startGame() {
  await welcome();
  await askName();
  await Question_Number_1();
};

startGame()