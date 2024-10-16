import { Component, HostListener, Input, OnInit } from '@angular/core';
import {language,notifications,userItems} from './header-dummy-data'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  @Input() collapsed = false;
  @Input() screenWidth = 0;
  canShowSearchAsOverly = false;
  selectedLanguage:any;
  languages=language;
  notifications=notifications;
  userItems=userItems;
  constructor() { }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);

  }
  ngOnInit(): void {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
    this.selectedLanguage=this.languages[0]
  }
  getHeadClass():string{
    let styleClass='';
    if(this.collapsed && this.screenWidth>768){
      styleClass='head-trimmed';
    }else{
      styleClass ='head-md-screen'
    }
    return styleClass
  }
  checkCanShowSearchAsOverlay(innerWidth:number):void{
    if(innerWidth <845){
      this.canShowSearchAsOverly=true
    }else{
      this.canShowSearchAsOverly=false
    }
  }

}
