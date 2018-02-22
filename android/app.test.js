import wd from 'wd';
//import Dimensions from 'Dimension';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000000;
const PORT = 4723;
const config = {
  platformName: 'Android',
  deviceName: 'Android Emulator',
  app: './android/app/build/outputs/apk/app-debug.apk' // relative to root of project
};
const driver = wd.promiseChainRemote('localhost', PORT);

beforeAll(async () => {
  await driver.init(config);
  await driver.sleep(12000); // wait for app to load
})
// test('Get height & width',async()=>{
// await driver.sleep(25000)
// let {width, height} = Dimensions.get('screen')
// console.log(width,height)
// });
    
//     test('swipe in chat',async()=>{
//       await driver.sleep(13000)
//       let {width, height} = Dimensions.get('screen')
//  const action = new wd.TouchAction(driver);
//       action.press({ x: width, y: height }).wait(1000).moveTo({ x: width, y: height/2 }).release();
//       driver.performTouchAction(action); 

// });

test('touchAction', async() => {
  await driver.sleep(2000);
  console.log("scrolling........");
    var action = new wd.TouchAction(driver);
      action.press({ x: 500, y: 1800 }).wait(1000).moveTo({ x: 500, y: 700 }).release();
      driver.performTouchAction(action); 
      console.log("scrolled.");
      await driver.sleep(1200);
});

test('appium renders', async () => {
  console.log("going to click on Alice");
  expect(await driver.hasElementByAccessibilityId('Alice')).toBe(true);
  await driver.elementByAccessibilityId('Alice').click();
  console.log("Alice is clicked");
  await driver.sleep(1000);
});
// test('Get height & width',async()=>{
// await driver.sleep(25000)
// let {width, height} = Dimensions.get('screen')
// console.log(width,height)
// });
    
//     test('swipe in chat',async()=>{
//       await driver.sleep(13000)
//       let {width, height} = Dimensions.get('screen')
//  const action = new wd.TouchAction(driver);
//       action.press({ x: width, y: height }).wait(200).moveTo({ x: width/2, y: height }).release();
//       driver.performTouchAction(action); 

// });
test('touchAction', async() => {
  console.log("we are swapping");
  var action = new wd.TouchAction(driver);
    action.press({ x: 1065, y:595 }).wait(200).moveTo({ x: 100, y:595 }).release();
    driver.performTouchAction(action);
    console.log("swapped");
    await driver.sleep(2000);
});
test('appium game renders', async () => {
  console.log("clicking on multiple choices");
expect(await driver.hasElementByAccessibilityId('Multiple-choice')).toBe(true);
await driver.elementByAccessibilityId('Multiple-choice').click();
console.log("multiple choices clicked");
await driver.sleep(4000);
});
test('appium letter renders', async () => {
  console.log("clicking on letters");
expect(await driver.hasElementByAccessibilityId('Letters')).toBe(true);
await driver.elementByAccessibilityId('Letters').click();
console.log("clicked on letter");
await driver.sleep(18000);
});
test('appium onlineTries renders', async () => {
  console.log("clicking on OnlineTries");
expect(await driver.hasElementByAccessibilityId('OnlineTries')).toBe(true);
await driver.elementByAccessibilityId('OnlineTries').click();
console.log("clicked on OnlineTries");
await driver.sleep(8000);
});
// test('Get height & width',async()=>{
// await driver.sleep(25000)
// let {width, height} = Dimensions.get('screen')
// console.log(width,height)
// });
    
//     test('swipe in chat',async()=>{
//       await driver.sleep(13000)
//       let {width, height} = Dimensions.get('screen')
//  const action = new wd.TouchAction(driver);
//       action.press({ x: width, y: height }).wait(1000).moveTo({ x: width, y: height/2 }).release();
//       driver.performTouchAction(action); 

// });

test('touchAction 2', async() => {
  await driver.sleep(18000);
  console.log("scrolling........");
    var action = new wd.TouchAction(driver);
      action.press({ x: 500, y: 1600 }).wait(1000).moveTo({ x: 500, y: 700 }).release();
      driver.performTouchAction(action); 
      console.log("scrolled.");
      await driver.sleep(5000);
});
test('appium Madhatter renders', async () => {
  console.log("clicking on Mad Hatter");
expect(await driver.hasElementByAccessibilityId('Mad Hatter')).toBe(true);
await driver.elementByAccessibilityId('Mad Hatter').click();
console.log("clicked on Mad Hatter");
});


