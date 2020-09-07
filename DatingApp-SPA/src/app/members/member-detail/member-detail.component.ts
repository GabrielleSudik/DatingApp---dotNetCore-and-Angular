import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery-9';


// lesson 90: to get user details
// need to fetch their data from the API

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {

  user: User;

  // lesson 94 for image gallery:
  // the docs on npm website helped with what you needed to bring in.
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService,
              private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // this.loadUser() // call this method when this component is called.
    // later, lesson 93: instead of directly loadUser,
    // use the resolver to load the data into the route:
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    // lesson 94 gallery:
    // set size, etc for the gallery itself.
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];

    // get the images by calling the getImages() method.
    this.galleryImages = this.getImages();
  }

  // lesson 94 gallery:
  getImages() {
    const imageUrls = []; // empty array for the images

    // push each image in user.photos into the array.
    for (const photo of this.user.photos){
      imageUrls.push({
        // and set its properties in the array.
        // again, see docs on the npm page for gallery image properties.
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description
      });
    }
    return imageUrls;
  }

  // when a user clicks on a Details button
  // the URL will end in members/5 (or whatever id)
  // we need this method to get and pass that id.
  // route is needed because that's where it will fetch the id from.
  // later: commented out in lesson 93, to do what we added to onInit instead.

  // loadUser() {
  //   this.userService.getUser(+this.route.snapshot.params.id)
  //   .subscribe((user: User) => {
  //   this.user = user;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  //   // note the + in GetUser param converts a string from the URL to an int for the method.
  // }
}
