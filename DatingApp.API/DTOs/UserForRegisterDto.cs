namespace DatingApp.API.DTOs
{
    //this Data Transfer Object is to take the more compliated User model,
    //which has 4 properties, and make a simpler version that contains
    //only the two things needed for some receiving methods.
    //Note also the model has PasswordSalt and PasswordHash but no Password.

    public class UserForRegisterDto
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}