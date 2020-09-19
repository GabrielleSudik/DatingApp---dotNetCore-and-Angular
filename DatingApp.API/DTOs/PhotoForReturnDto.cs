using System;

namespace DatingApp.API.DTOs
{
    //lesson 108: the photo properties that will be returned
    //to the client after a user successfully uploads a photo.
    //you don't want to send all info about the photo, just some, so Dto.
    //This will be almost the same as PhotosForDetailsDto
    //but also with PublicId, which is the Cloudinary id.

    public class PhotoForReturnDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
    }
}