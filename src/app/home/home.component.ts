import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { AddressService } from "../services/address.service";
import { Address } from "../model/address";
import { Carousel } from "nativescript-carousel";
import { SlideItem } from "../model/slideItem";
import { ItemService } from "./item.service";
import { interval } from 'rxjs';

import { registerElement } from '@nativescript/angular';
import { CarouselItem } from 'nativescript-carousel';
import { CategoryService } from "./category.service";
import { Category } from "./category";

registerElement('Carousel', () => Carousel);
registerElement('CarouselItem', () => CarouselItem);

@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
    providers: [AddressService, ItemService, CategoryService]
})
export class HomeComponent implements OnInit,AfterViewInit  {
    cartLength: number = 3;
    address: Address;

    @ViewChild('martCarousel', { static: false }) carouselRef: ElementRef;
    items: SlideItem[];
    categories: Category[];
    currentPage: number = 1;
    tappedPage: number = 0;
    indicatorEnabled: boolean = true;

    carouselView: Carousel;

    constructor(private addressService:AddressService,
        private itemService: ItemService, private categoryService: CategoryService) {
    }

    ngOnInit(): void {
        this.getDefaultAddress();

        this.items = this.itemService.getItems();
        this.categories = this.categoryService.getCategory();

        interval(3000).subscribe(x => {
            this.changePageAuto();
        });
    }

        onDrawerButtonTap(): void {
          const sideDrawer = <RadSideDrawer>app.getRootView();
          sideDrawer.showDrawer();
      }

      getDefaultAddress(){
        this.addressService.getDefaultAddress().subscribe(add => this.address = add);
      }

      ngAfterViewInit(): void {
        this.carouselView = this.carouselRef.nativeElement as Carousel;
        this.carouselView.indicatorColor = '#FFF8DC';
      }

    /*   toggleColor(): void {
        this.carouselView.indicatorColor = '#FED700';
        this.carouselView.indicatorColorUnselected = '#50FED700';
      } */

      toggleIndicator(): void {
        this.carouselView.showIndicator = !this.indicatorEnabled;
        this.indicatorEnabled = !this.indicatorEnabled;
      }

      pageChangedEvent(args: any): void {
        this.currentPage = args.index + 1;
      }

      changePageAuto(){
        if(this.carouselView.selectedPage > this.items.length){
            this.carouselView.selectedPage = 0;
        }else{
        this.carouselView.selectedPage = this.carouselView.selectedPage + 1;
        }
      }

      pageTappedEvent(args: any): void {
        this.tappedPage = this.carouselView.selectedPage + 1;
      }

}
