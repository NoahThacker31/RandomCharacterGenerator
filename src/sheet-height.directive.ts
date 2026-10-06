import {AfterViewInit,Directive,ElementRef,OnDestroy} from '@angular/core';

@Directive({selector:'[matchPortraitHeight]',standalone:true})
export class SheetHeightDirective implements AfterViewInit,OnDestroy {
  private observer?:ResizeObserver;
  constructor(private element:ElementRef<HTMLElement>){}
  ngAfterViewInit(){
    const host=this.element.nativeElement;
    const sheet=host.querySelector<HTMLElement>('.sheet,.detail');
    if(!sheet)return;
    const update=()=>{
      const height=sheet.getBoundingClientRect().height;
      host.style.setProperty('--sheet-height',`${height}px`);
      host.style.setProperty('--portrait-height',`${height*.9}px`);
      host.style.setProperty('--portrait-width',`${height*.9*9/16}px`);
    };
    this.observer=new ResizeObserver(update);
    this.observer.observe(sheet);
    update();
  }
  ngOnDestroy(){this.observer?.disconnect();}
}
