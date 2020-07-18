namespace DatingApp.API.DTOs
{
    //similar to UserForRegisterDto
    //it's like a mini class to pass some info
    //to the method Login() in AuthController.cs
    public class UserForLoginDto
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        
    }
}