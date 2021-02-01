import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {UniversityInformationService} from "../../../../../core/service/university-information-service";
import {UniversityInfoModel} from "../../../../../core/models/university-info-model";
import {CountryService} from "../../../../../core/service/country-service";
import {CityService} from "../../../../../core/service/city-service";
import {UniversityService} from "../../../../../core/service/university-service";
import {fuseAnimations} from "../../../../../../@fuse/animations";

@Component({
    selector: 'app-university-list-info',
    templateUrl: './university-list-info.component.html',
    styleUrls: ['./university-list-info.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UniversityListInfoComponent implements OnInit {
    @Input() universityInfoId: number;
    universityInfo: UniversityInfoModel = new UniversityInfoModel();

    // @ Showing university information
    countryName: string;
    cityName: string;
    universityName: string;

    constructor(private _universityInformation: UniversityInformationService,
                private _countryService: CountryService,
                private _cityService: CityService,
                private _universityService: UniversityService) {
    }

    ngOnInit(): void {
        this.getInfoById();
    }

    // #1 Get Main Information
    getInfoById(): void {
        this._universityInformation.getInformationById(this.universityInfoId).subscribe(res => {
            this.universityInfo = res;

            // #2 User information view
            this.getCountryName();
            this.getCityName();
            this.getUniversityName();
        });
    }


    // #2 View user info - country
    getCountryName(): void {

        if (this.universityInfo.countryId !== null) {
            this._countryService.getCountryById(this.universityInfo.countryId).subscribe(res => {
                this.countryName = res.name;
            });
        } else {
            this.countryName = null;
        }
    }

    // #2 View user info - city
    getCityName(): void {

        if (this.universityInfo.cityId !== null) {
            this._cityService.getCityById(this.universityInfo.cityId).subscribe(res => {
                this.cityName = res.name;
            });
        } else {
            this.cityName = null;
        }
    }

    // #2 View user info - university
    getUniversityName(): void {

        if (this.universityInfo.universityId !== null) {
            this._universityService.getUniversityById(this.universityInfo.universityId).subscribe(res => {
                this.universityName = res.name;
            });
        } else {
            this.universityName = null;
        }
    }

}
