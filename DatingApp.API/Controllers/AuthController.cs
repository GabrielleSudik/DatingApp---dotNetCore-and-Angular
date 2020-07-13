using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        //inject the IAuthRepo:
        private readonly IAuthRepository _repo;
        public AuthController(IAuthRepository repo)
        {
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
    }
}