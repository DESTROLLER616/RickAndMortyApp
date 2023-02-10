import { Component, HostListener, Inject, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { Character } from '@app/shared/interfaces/character.interface';
import { CharacterService } from '@app/shared/services/character.service';
import { filter, take } from 'rxjs/operators'
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core/testing';

type RequestInfo = {
  next: string
}

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit{
  characters: Character[] = []

  info:RequestInfo = {
    next: '',
  }

  showGoUpButton = false
  private pageNum = 1
  private query?:string
  private hideScrollHeight = 200
  private showScrollHeight = 500



  constructor(
    @Inject(DOCUMENT) private document: Document,
    private characterSvc: CharacterService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.onUrlChange()
  }

  ngOnInit():void {
    this.getDataFromService()
  }

  @HostListener('window:scroll', [])

  onWindowScroll(): void{
    const yOffSet = window.pageYOffset

    if((yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) > this.showScrollHeight){
      this.showGoUpButton = true
    } else if(this.showGoUpButton && (yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) > this.showScrollHeight){
      this.showGoUpButton = false
    }
  }

  onScrollDown(): void{
    if(this.info.next){
      this.pageNum++
      this.getDataFromService()
    }
  }

  onScrollTop(): void{
    this.document.body.scrollTop = 0
    this.document.documentElement.scrollTop = 0
  }

  private onUrlChange(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)).subscribe(
        () => {
          this.getCharactersByQuery()
          this.pageNum = 1
          this.characters = []
        }
      )
  }

  private getCharactersByQuery(): void{
    this.route.queryParams.pipe(take(1)).subscribe((params: any) => {
      this.query = params['q']
      
      this.getDataFromService()
      this.characters = []
    })
  }

  private getDataFromService ():void{

    this.characterSvc.searchCharacters(this.query, this.pageNum)
      .pipe(
        take(1),
      ).subscribe( (res:any) => {
        if(res?.results?.length){
          const {info, results} = res
          this.characters = [...this.characters, ...results]
          this.info = info
        } else {
          this.characters = []
        }

      } )
  }
}
