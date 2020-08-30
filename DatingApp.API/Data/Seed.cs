using System.Collections.Generic;
using System.Linq;
using DatingApp.API.Models;
using Newtonsoft.Json;

namespace DatingApp.API.Data
{
    //lesson 74: moving json data to the DB.
    //serialize the json objects into User objects to match User model.

    public class Seed
    {
        public static void SeedUsers(DataContext context)
        {
            if (!context.Users.Any())
            {
                //read the file:
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                //convert it to a list of users:
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                //each user create salt and hash, make lower case,
                //then add to list of Users.
                foreach (var user in users)
                {
                    byte[] passwordHash;
                    byte[] passwordSalt;

                    CreatePasswordHash("password", out passwordHash, out passwordSalt);

                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;
                    user.UserName = user.UserName.ToLower();

                    context.Users.Add(user);
                }

                context.SaveChanges();
            }
        }

        // copy of the method in AuthRepository.cs (which is private, so not reusable here).
        // made static to match its call above.
        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512()){
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}