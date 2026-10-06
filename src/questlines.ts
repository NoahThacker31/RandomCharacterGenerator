import type {Character} from './model';

// Story progression only: excludes expulsions, optional rewards, and repeatable epilogues.
// Recommendations and parallel jobs use a valid display order, not a required play order.
// Quest titles/order checked against the Elder Scrolls Wiki; see QUEST-SOURCES.md.
export const questlines:Record<string,string[]>={
  'Main Quest':['Tutorial','Deliver the Amulet','Find the Heir','Breaking the Siege of Kvatch','Weynon Priory','The Path of Dawn','Dagon Shrine','Spies','Blood of the Daedra','Blood of the Divines','Miscarcand','Bruma Gate','Allies for Bruma','Defense of Bruma','Great Gate','Paradise','Light the Dragonfires','Imperial Dragon Armor'],
  'Fighters Guild':['Joining the Fighters Guild','A Rat Problem','The Unfortunate Shopkeeper','The Desolate Mine','Unfinished Business','Drunk and Disorderly','Den of Thieves',"Amelion's Debt","The Master's Son",'More Unfinished Business','Azani Blackheart','The Wandering Scholar','The Fugitives','Trolls of Forsaken Mine','The Stone of St. Alessia',"The Noble's Daughter","Mystery at Harlun's Watch",'Information Gathering','Infiltration','The Hist'],
  'Mages Guild':['Joining the Mages Guild','Anvil Recommendation','Bravil Recommendation','Bruma Recommendation','Cheydinhal Recommendation','Fingers of the Mountain','Leyawiin Recommendation','Skingrad Recommendation',"A Mage's Staff",'Ulterior Motives',"Vahtacen's Secret","Necromancer's Moon",'Liberation or Apprehension?','Information at a Price','A Plot Revealed','The Bloodworm Helm',"The Necromancer's Amulet",'Ambush','Confront the King'],
  'Thieves Guild':['Finding the Thieves Guild','May the Best Thief Win','Untaxing the Poor','The Elven Maiden',"Ahdarji's Heirloom",'Misdirection','Lost Histories','Taking Care of Lex','Turning a Blind Eye','Arrow of Extrication','Boots of Springheel Jak','The Ultimate Heist'],
  'Dark Brotherhood':['A Knife in the Dark','Welcome to the Family','A Watery Grave','Blood of the Damned','Accidents Happen','No Rest for the Wicked','Scheduled for Execution','To Serve Sithis','The Assassinated Man',"My Brother's Keeper",'The Lonely Wanderer','Enter the Eliminator','Bad Medicine',"The Night Mother's Child",'Whodunit?',"The Assassin's Gambit",'Permanent Retirement','Of Secret and Shadow','The Purification','The Dead Drop','Affairs of a Wizard','Next of Kin','Broken Vows','Final Justice','A Matter of Honor','The Coldest Sleep','A Kiss Before Dying','Following a Lead','Honor Thy Mother'],
  'Knights of the Nine':['Pilgrimage','The Shrine of the Crusader','Priory of the Nine',"Nature's Fury",'The Path of the Righteous','Wisdom of the Ages',"Stendarr's Mercy",'The Faithful Squire','The Sword of the Crusader','The Blessing of Talos','Umaril the Unfeathered'],
  'Shivering Isles':['A Door in Niben Bay','Through the Fringe of Madness','A Better Mousetrap','Baiting the Trap','Understanding Madness','Addiction','The Lady of Paranoia','The Cold Flame of Agnon','Ritual of Accession','Ritual of Mania','Ritual of Dementia','Retaking the Fringe','Rebuilding the Gatekeeper','The Helpless Army','Symbols of Office','The Roots of Madness','The End of Order','The Prince of Madness']
};
export function isQuestlineComplete(line:string,progress:string):boolean {const list=questlines[line];return !!list?.length&&progress===list.at(-1);}
export function deriveCompletion(c:Character):void {c.mainComplete=isQuestlineComplete('Main Quest',c.mainProgress);c.sideComplete=isQuestlineComplete(c.quest,c.sideProgress);}
export function migrateProgress(c:Character):void {
  // Preserve pre-dropdown completion flags without discarding old text milestones.
  if(c.mainComplete)c.mainProgress=questlines['Main Quest'].at(-1)!;
  if(c.sideComplete&&questlines[c.quest])c.sideProgress=questlines[c.quest].at(-1)!;
  c.mainProgress ||= 'Tutorial';
  deriveCompletion(c);
}

// Shared numbers identify independent jobs or alternative branches at a story stage.
const parallelGroups:Record<string,string[][]>={
 'Mages Guild':[['Anvil Recommendation','Bravil Recommendation','Bruma Recommendation','Cheydinhal Recommendation','Fingers of the Mountain','Leyawiin Recommendation','Skingrad Recommendation'],['The Bloodworm Helm',"The Necromancer's Amulet"]],
 'Fighters Guild':[['Den of Thieves',"Amelion's Debt"],['The Wandering Scholar','The Fugitives'],['The Stone of St. Alessia',"The Noble's Daughter"]],
 'Shivering Isles':[['Addiction','The Lady of Paranoia'],['Ritual of Mania','Ritual of Dementia']]
};
export function questStages(line:string):number[]{let stage=0;const groups=parallelGroups[line]||[];const seen=new Map<string[],number>();return (questlines[line]||[]).map(q=>{const group=groups.find(g=>g.includes(q));if(group&&seen.has(group))return seen.get(group)!;stage++;if(group)seen.set(group,stage);return stage;});}
export function questPercent(line:string,progress:string):number {const index=(questlines[line]||[]).indexOf(progress);const stages=questStages(line);return index<0?0:Math.round(stages[index]/stages.at(-1)!*100);}
