using System;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        //need to inject DataContext in the constructor:
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;

        }

        public async Task<User> Login(string userName, string password)
        {
            //look for the userName in the DB:
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userName);

            if (user == null){
                return null;
            }

            //compare password to DB's hash:
            //return null if they don't match.
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt)){
                return null;
            }

            //return user if VerifyPasswordHash is true
            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            //This method will compare the passwordHash from the DB with the
            //password that is typed by the user, on a byte by byte basis (see the for loop).
            //If anything doesn't match, it will return false.

            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt)){
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++){
                    if(computedHash[i] != passwordHash[i]){
                        return false;
                    }
                }
            }
            return true; 
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;

            //we don't want users PWs to be stored as is,
            //so we'll create hashes:
            //the "outs" will get returned from this method:
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            //hashing a password is tricky.
            //we'll use a System.Security.Cryptography
            //but this is not the only way to do it, just one way.
            //don't worry that you don't know every bit - basically,
            //the hashes will generate the Salt and the Hash and
            //send them back as "out"s.

            using (var hmac = new System.Security.Cryptography.HMACSHA512()){
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
            //note the use of "using" - that will make this whole thing
            //implement Dispose(), as you recently learned in another course.
        }

        public async Task<bool> UserExists(string userName)
        {
            if (await _context.Users.AnyAsync(x => x.UserName == userName)){
                return true;
            }

            return false;
        }
    }
}