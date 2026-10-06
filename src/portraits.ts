import type {Character} from './model';
export type PortraitArmor = 'heavy' | 'light' | 'robes';
// Heavy armor takes precedence when True Random grants both armor skills.
export function portraitArmor(c:Pick<Character,'skills'>):PortraitArmor {
  return c.skills.includes('Heavy Armor')?'heavy':c.skills.includes('Light Armor')?'light':'robes';
}
export function portraitKey(c:Pick<Character,'race'|'skills'>):string {
  return `${c.race.toLowerCase().replaceAll(' ','-')}-${portraitArmor(c)}`;
}
export function portraitSource(c:Pick<Character,'race'|'skills'>,variant:'Male'|'Female'='Male'):string {
  const file=portraitArmor(c)==='heavy'?'HeavyArmor':portraitArmor(c)==='light'?'LightArmor':'Unarmored';
  return `assets/portraits/${c.race.replaceAll(' ','')}/${variant==='Female'?'F':'M'}${file}.png`;
}
