import {Directive,ElementRef,AfterViewChecked,AfterViewInit,OnDestroy} from '@angular/core';
@Directive({selector:'input[fitName]',standalone:true})
export class FitNameDirective implements AfterViewInit,AfterViewChecked,OnDestroy {
  private observer?:ResizeObserver;private previous='';private frame=0;
  constructor(private element:ElementRef<HTMLInputElement>){}
  ngAfterViewInit(){this.observer=new ResizeObserver(()=>this.schedule());this.observer.observe(this.element.nativeElement);}
  ngAfterViewChecked(){const value=this.element.nativeElement.value;if(value!==this.previous){this.previous=value;this.schedule();}}
  private schedule(){cancelAnimationFrame(this.frame);this.frame=requestAnimationFrame(()=>{const input=this.element.nativeElement;const style=getComputedStyle(input);const available=input.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight)-4;const ctx=document.createElement('canvas').getContext('2d');if(!ctx||available<=0)return;ctx.font='30px '+style.fontFamily;const width=ctx.measureText(input.value||'New Character').width;input.style.fontSize=Math.min(30,30*available/Math.max(width,1))+'px';});}
  ngOnDestroy(){this.observer?.disconnect();cancelAnimationFrame(this.frame);}
}
