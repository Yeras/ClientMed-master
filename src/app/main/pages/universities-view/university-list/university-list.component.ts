import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {UniversityInfoListPage} from '../../../../core/models/university-info-list-page';
import {GradeUniversityPointsService} from '../../../../core/service/grade-university-points-service';

@Component({
    selector: 'app-university-list',
    templateUrl: './university-list.component.html',
    styleUrls: ['./university-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UniversityListComponent implements OnInit {
    // @ Universities list view information
    universityInfoListPage: UniversityInfoListPage[] = [];
    collectionSize: number;

    // @ Page new data for scroll
    pageScroll: number;
    pageSizeScroll: number;
    scrollLoaderStat: boolean;

    // @ University - Search and filter
    searchUniversityName: string;
    searchCountryName: string;
    universitySearchStatByUniversity: boolean;
    universitySearchStatByCountry: boolean;

    constructor(private _gradeUniversityPointsService: GradeUniversityPointsService) {
    }

    ngOnInit(): void {
        this.searchCountryName = '';
        this.searchUniversityName = '';

        this.pageScroll = 0;
        this.pageSizeScroll = 12;

        this.getFullUniversityInfo(this.pageScroll, this.pageSizeScroll);
    }

    /***
     * #1 Information about University (List)
     * */
    getFullUniversityInfo(page: number, pageSize: number): void {

        const params = 'page=' + page + '&size=' + pageSize;

        this._gradeUniversityPointsService.findAllUniversityWithRating(params).subscribe(res => {
            this.universityInfoListPage = res.list;
            this.collectionSize = res.totalSize;
        });
    }

    /***
     * #2 Add new element by scrolling
     * */
    findMoreDataScrolling(): void {
        this.scrollLoaderStat = true;

        this.pageScroll = this.pageScroll + 1;
        const params = 'page=' + this.pageScroll + '&size=' + this.pageSizeScroll;

        this._gradeUniversityPointsService.findAllUniversityWithRating(params).subscribe(res => {

            if (res.list.length !== 0) {
                res.list.forEach(loopPush => {
                    const index = res.list.indexOf(loopPush);

                    this.universityInfoListPage.push(loopPush);

                    if (index === res.list.length - 1) {
                        this.scrollLoaderStat = false;
                    }
                });
            } else {
                this.scrollLoaderStat = false;
            }
        });
    }

    /***
     * #3 Search University
     * */
    searchFullUniversityInfo(): void {
        this.pageScroll = 0;
        const params = 'page=' + 0 + '&size=' + 12;

        if (this.searchUniversityName.trim() !== '' && this.searchCountryName.trim() === '') {
            this.universitySearchStatByUniversity = true;
            this.universitySearchStatByCountry = false;

            this._gradeUniversityPointsService.searchUniversityWithRatingByName(params, this.searchUniversityName).subscribe(res => {
                this.universityInfoListPage = res.list;
                this.collectionSize = res.totalSize;
            });
        } else if (this.searchCountryName.trim() !== '' && this.searchUniversityName.trim() === '') {
            this.universitySearchStatByUniversity = false;
            this.universitySearchStatByCountry = true;

            this._gradeUniversityPointsService.searchUniversityWithRatingByCountry(params, this.searchCountryName).subscribe(res => {
                this.universityInfoListPage = res.list;
                this.collectionSize = res.totalSize;
            });
        } else if (this.searchCountryName.trim() === '' && this.searchUniversityName.trim() === '') {
            this.universitySearchStatByUniversity = false;
            this.universitySearchStatByCountry = false;

            this.getFullUniversityInfo(this.pageScroll, this.pageSizeScroll);
        } else if (this.searchCountryName.trim() !== '' && this.searchUniversityName.trim() !== '') {
            this.universitySearchStatByUniversity = true;
            this.universitySearchStatByCountry = true;

            this._gradeUniversityPointsService.searchUniversityWithRatingByCountryAndUniversity(params, this.searchCountryName, this.searchUniversityName).subscribe(res => {
                this.universityInfoListPage = res.list;
                this.collectionSize = res.totalSize;
            });
        }
    }

    /***
     * #4 Add new element by scrolling by searching name
     * */
    searchMoreDataScrollingByName(): void {
        this.scrollLoaderStat = true;

        this.pageScroll = this.pageScroll + 1;
        const params = 'page=' + this.pageScroll + '&size=' + this.pageSizeScroll;

        this._gradeUniversityPointsService.searchUniversityWithRatingByName(params, this.searchUniversityName).subscribe(res => {
            res.list.forEach(loopPush => {
                this.universityInfoListPage.push(loopPush);
            });
            this.scrollLoaderStat = false;
        });
    }

    /***
     * #4 Add new element by scrolling by searching country
     * */
    searchMoreDataScrollingByCountry(): void {
        this.scrollLoaderStat = true;

        this.pageScroll = this.pageScroll + 1;
        const params = 'page=' + this.pageScroll + '&size=' + this.pageSizeScroll;

        this._gradeUniversityPointsService.searchUniversityWithRatingByCountry(params, this.searchCountryName).subscribe(res => {
            res.list.forEach(loopPush => {
                this.universityInfoListPage.push(loopPush);
            });
            this.scrollLoaderStat = false;
        });
    }

    /***
     * #4 Add new element by scrolling by searching country
     * */
    searchMoreDataScrollingByCountryAndUniversity(): void {
        this.scrollLoaderStat = true;

        this.pageScroll = this.pageScroll + 1;
        const params = 'page=' + this.pageScroll + '&size=' + this.pageSizeScroll;

        this._gradeUniversityPointsService.searchUniversityWithRatingByCountryAndUniversity(params, this.searchCountryName, this.searchUniversityName).subscribe(res => {
            res.list.forEach(loopPush => {
                this.universityInfoListPage.push(loopPush);
            });
            this.scrollLoaderStat = false;
        });
    }

}
