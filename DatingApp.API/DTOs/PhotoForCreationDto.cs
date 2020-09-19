using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.DTOs
{
    //lesson 107: for sending photo info to and from Cloudinary.

    public class PhotoForCreationDto
    {
        public string Url { get; set; }
        public IFormFile File { get; set; } //a file send with an http request.
            //this property does not (yet?) exist in the Photo.cs class.
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public string PublicId { get; set; } //this is what you'll get back from Cloudinary

        //constructor to always create the DateTime as Now
        public PhotoForCreationDto()
        {
            DateAdded = DateTime.Now;
        }
    }
}