using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IAuthRepository
    {
        //We want three methods to handle basic user registration/login.

         Task<User> Register(User user, string password);

         Task<User> Login(string userName, string password);

         Task<bool> UserExists(string userName);
    }
}

//tip: Create the I first, then auto-implement the methods when you
//create the concrete classes.