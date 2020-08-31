using System;

namespace DatingApp.API.DTOs
{
    //created in lesson 77.
    //so we don't return ALL of the info about a user from a UI call.
    //this will be like User.cs model, but remove (and maybe add) some properties.

    //this one is the short version of each user, for a list.

    public class UserForListDTO
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PhotoUrl { get; set; } //this one is not in User.cs
            //it will be whatever photo they choose as their main.
    }
}