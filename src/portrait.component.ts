import {Component,Input,Output,EventEmitter,OnChanges,SimpleChanges} from '@angular/core';
import type {Character} from './model';
import {portraitSource,portraitKey} from './portraits';
@Component({selector:'app-portrait',standalone:true,template:`
<div class="portrait-frame" [attr.data-portrait-key]="portraitKey(character)">
  <div class="portrait-card" [class.flipped]="character.portraitVariant==='Female'" [class.animate-flip]="animateFlip" (transitionend)="animateFlip=false">
    <div class="portrait-face portrait-front" [attr.aria-hidden]="character.portraitVariant==='Female'"><img class="character-portrait" [src]="portraitSource(character,'Male')" [alt]="character.race+' male portrait'"></div>
    <div class="portrait-face portrait-back" [attr.aria-hidden]="character.portraitVariant!=='Female'"><img class="character-portrait" [src]="portraitSource(character,'Female')" [alt]="character.race+' female portrait'"></div>
  </div><span class="portrait-corners" aria-hidden="true"></span>
  <button class="portrait-flip" [attr.aria-label]="'Flip to '+(character.portraitVariant==='Female'?'male':'female')+' portrait'" [title]="'Flip to '+(character.portraitVariant==='Female'?'male':'female')+' portrait'" (click)="flip()"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 7a9 9 0 0 0-15-2L2 8m0-5v5h5M4 17a9 9 0 0 0 15 2l3-3m0 5v-5h-5"/></svg></button>
</div>`})
export class PortraitComponent implements OnChanges {
  @Input({required:true}) character!:Character;
  @Output() variantChange=new EventEmitter<'Male'|'Female'>();
  animateFlip=false;
  ngOnChanges(changes:SimpleChanges){const change=changes['character'];if(change&&change.previousValue?.id!==change.currentValue?.id)this.animateFlip=false;}
  flip(){this.animateFlip=true;this.variantChange.emit(this.character.portraitVariant==='Female'?'Male':'Female');}
  portraitSource=portraitSource;portraitKey=portraitKey;
}
