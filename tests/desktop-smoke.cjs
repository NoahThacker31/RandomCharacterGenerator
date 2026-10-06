// Runs the real Electron main process with an isolated save directory.
const {app,BrowserWindow}=require('electron');const path=require('node:path');const fs=require('node:fs/promises');
const testDir=path.join(__dirname,'../.smoke-data',String(Date.now()));
require(process.argv.includes('--packaged')?'../release/win-unpacked/resources/app.asar/electron/main.cjs':'../electron/main.cjs');
app.setPath('userData',testDir);
app.whenReady().then(async()=>{try{const win=BrowserWindow.getAllWindows()[0];if(win.webContents.isLoading())await new Promise(r=>win.webContents.once('did-finish-load',r));const result=await win.webContents.executeJavaScript(`(async()=>{
const wait=()=>new Promise(r=>setTimeout(r,300));await wait();
const click=(text)=>{const b=[...document.querySelectorAll('button')].find(b=>b.textContent.includes(text));if(!b)throw Error('Missing button '+text);b.click();};
if(document.querySelector('.portrait-frame'))throw Error('Portrait visible before generation');
click('Forge a character');await wait();if(document.querySelectorAll('.skill-columns li').length!==7)throw Error('Expected 7 skills');
const sheet=document.querySelector('.sheet').getBoundingClientRect();const portrait=document.querySelector('.portrait-frame').getBoundingClientRect();if(portrait.height<600||Math.abs(portrait.height-sheet.height*.9)>1||Math.abs(portrait.width/portrait.height-9/16)>.002)throw Error('Generated portrait size incorrect');if(getComputedStyle(document.querySelector('.sheet-content>.hint')).textAlign!=='center')throw Error('Hint not centered');
const name=document.querySelector('.name');if(name.value!=='New Character')throw Error('Wrong default name');
const columns=[...document.querySelectorAll('.skill-columns ul')];if(columns[0].children.length!==4||columns[1].children.length!==3)throw Error('Wrong skill columns');
const displayed=[...document.querySelectorAll('.skill-columns li')].map(x=>x.textContent.trim());if(displayed.join('|')!==[...displayed].sort((a,b)=>a.localeCompare(b)).join('|'))throw Error('Skills not alphabetical');
if([...document.querySelectorAll('.sheet-section h2')].map(x=>x.textContent).join('|')!=='Race|Birthsign|Class|Objectives')throw Error('Wrong section order');
if([...document.querySelectorAll('.sheet-actions button')].map(x=>x.textContent.trim()).join('|')!=='Reroll|Save')throw Error('Wrong action order');
const logo=document.querySelector('.app-logo');if(!logo.complete||logo.naturalWidth===0)throw Error('Logo not loaded');
click('Save');await wait();const detail=document.querySelector('.saved-character-preview .sheet').getBoundingClientRect();const savedPortrait=document.querySelector('.portrait-frame').getBoundingClientRect();if(Math.abs(savedPortrait.height-detail.height*.9)>1)throw Error('Saved portrait size incorrect');let d=await window.ledger.load();if(d.characters.length!==1)throw Error('Save failed');
const c=d.characters[0];const status=document.querySelector('.detail select');status.value='Dead';status.dispatchEvent(new Event('change',{bubbles:true}));await wait();
const cause=[...document.querySelectorAll('input')].find(x=>x.placeholder.startsWith('A clannfear'));cause.value='Smoke test clannfear';cause.dispatchEvent(new Event('input',{bubbles:true}));
await wait();let restored=await window.ledger.load();if(restored.characters[0].killedBy!=='Smoke test clannfear'||restored.characters.filter(c=>c.status==='Dead').length!==1)throw Error('Death tracking failed');
document.querySelector('.trash-button').click();await wait();click('Yes');await wait();restored=await window.ledger.load();if(restored.characters.length!==0)throw Error('Empty challenge run retained');
click('Forge');await wait();click('Forge a character');await wait();if(!document.body.textContent.includes('0 of 0 death-earned changes remaining'))throw Error('Successor allowance failed');
return {name:c.name,skills:c.skills,save:await window.ledger.path(),verified:['create','save','death','no double counting','delete','empty run cleanup','successor allowance']};})()`);console.log(JSON.stringify(result));await win.webContents.capturePage().then(img=>fs.writeFile(path.join(__dirname,'../smoke-preview.png'),img.toPNG()));console.log('Desktop smoke passed');app.exit(0);}catch(e){console.error(e);app.exit(1);}});

