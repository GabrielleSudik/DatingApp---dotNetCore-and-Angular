using System;

namespace DatingApp.API.DTOs
{
    //lesson 79 - Automapper
    //in a User's details page, we want photos returned
    //but not all of the info about the User to whom it is linked.

    public class PhotosForDetailsDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
    }
}