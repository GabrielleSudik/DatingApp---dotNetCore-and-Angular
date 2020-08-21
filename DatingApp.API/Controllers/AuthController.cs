using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        //inject the IAuthRepo,
        //which are our methods for registering and login.
        //inject IConfig, 
        //which is a Microsoft library for configurations, for the token stuff.
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _config = config;
            _repo = repo;

        }

        //Note on the Register() method below in lesson 31.
        //When we first write it, it takes in userName and password.
        //But what we really need to pass in is a combined name/password object,
        //which we haven't created yet. We will in lesson 32.

        [HttpPost("Register")]
        //public async Task<IActionResult> Register(string userName, string password) //lesson 31
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto) //lesson 32
        {
            //validate request:
            //only needed if we don't use [ApiController]
            // if(!ModelState.IsValid)
            // {
            //     return BadRequest(ModelState);
            // }

            //convert userName to lowercase, to make sure John and john are treated as the same name.
            userForRegisterDto.UserName = userForRegisterDto.UserName.ToLower();

            //check if the userName is taken:
            if (await _repo.UserExists(userForRegisterDto.UserName))
            {
                return BadRequest("Username already exists.");
            }

            var userToCreate = new User
            {
                UserName = userForRegisterDto.UserName
            };
            //ugh this semicolon outside the } always throws me off.

            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

            //we need to send to the client the location of the new entity:
            //as of lesson 31, we don't have the code to send back via CreatedAtRoute.
            //so in the meantime, we'll "cheat" and just send the code that means CreatedAtRoute.
            //return CreatedAtRoute()
            return StatusCode(201);
        }

        //lesson 35: user login with tokens.
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            //lesson 51:
            //throw new Exception("This is a not-useful error message!"); 
            //it's only at the top while you see it in action in Postman and the browser tools.

            //usual approach to handling errors is the Try-Catch block:

            try
            {
            var userFromRepo = await _repo.Login(userForLoginDto.UserName.ToLower(), userForLoginDto.Password);

            if (userFromRepo == null)
            {
                return Unauthorized();
                //when someone logs in wrong
                //don't give them a hint about what's wrong (ie, not found or wrong password, etc)
                //it's safer that way (and more annoying for the user ahem.)
            }

            //create a token to return to the user:
            //we add info here so the server won't have to check the db each time
            //it just has to look at the token.
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.UserName)
            };

            //the next lines encrypt the key
            //and prepare stuff to put into the token.

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
            //the proj just knew what to type here.
            //GetSection is a built in method from the IConfig stuff.
            //"AppSettings:Token" value will be added to / found in appsettings.json

            //for the next parts, again -- prof just knows what to type to create the variables.

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            //actual creation of the token itself.
            var token = tokenHandler.CreateToken(tokenDescriptor);
            //this is what gets returned to the client.

            //this return statement will send OK
            //plus the token, written so the client will understand it.
            return Ok(new {
                token = tokenHandler.WriteToken(token)
            });
            }
            catch
            {
                //new in lesson 51:
                return StatusCode(500, "There is really an error somewhere.");
            }
            
        }
    }
}