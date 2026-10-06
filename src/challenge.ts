import type {Character,Ledger} from './model';
// Credits always reflect the currently saved records; no historical counter is kept.
export function deathCount(data:Ledger):number{return data.characters.filter(c=>c.challenge&&c.status==='Dead').length;}
export function migrateChallenge(data:Ledger):Ledger {
  const {campaigns,campaignNumbers,nextCampaignNumber,...ledger}=data as Ledger&{campaigns?:unknown;campaignNumbers?:unknown;nextCampaignNumber?:unknown};
  return {...ledger,characters:data.characters.map(c=>{const {campaignId,...character}=c as Character&{campaignId?:unknown};return character;})};
}
