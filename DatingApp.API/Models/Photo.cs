using System;

//created in lesson 70.
//A collection of photos is a property of User.
//So think of this class as part of the User class.

namespace DatingApp.API.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }

        //next two are from 72
        //to define the relationship explicitly
        //between Photo and User.
        //This will ensure that, eg, if a User is deleted,
        //all of her photos will be deleted as well,
        //because we have this explicit link between them. 
        public User User { get; set; }
        public int UserId { get; set; }
    }
}