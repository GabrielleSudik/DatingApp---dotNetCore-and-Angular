using System;
using System.Collections.Generic;
using DatingApp.API.Models;

namespace DatingApp.API.DTOs
{
    //created in 77.
    //so we don't return ALL of the info about a user from a UI call.
    //this will be like User.cs model, but remove (and maybe add) some properties.

    //this one is the longer version of each user, for details page.

    public class UserForDetailsDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PhotoUrl { get; set; } //whatever photo they choose as their main.
        public ICollection<Photo> Photos { get; set; } //all their photos.
    }
}