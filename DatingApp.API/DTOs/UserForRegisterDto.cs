using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.DTOs
{
    //this Data Transfer Object is to take the more compliated User model,
    //which has 4 properties, and make a simpler version that contains
    //only the two things needed for some receiving methods.
    //Note also the model has PasswordSalt and PasswordHash but no Password.

    public class UserForRegisterDto
    {

        [Required]
        public string UserName { get; set; }

        [Required]
        [StringLength(12, MinimumLength=3, ErrorMessage = "Password must be 4-12 characters long.")]
        public string Password { get; set; }
    }
}