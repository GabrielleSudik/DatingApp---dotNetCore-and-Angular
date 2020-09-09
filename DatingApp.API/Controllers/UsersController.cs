using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    //created in lesson 76
    //mapper added in 78

    [Authorize] //methods in this class will work only if user is authorized.
    [Route("api/[controller]")] //ie, "[webURL/api/users"]
    [ApiController]
    public class UsersController : ControllerBase
    {
        //inject the DatingRepo:
        //because that's where the methods that call the DB are.
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();
            //return Ok(users);

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDTO>>(users);
            return Ok(usersToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            //return Ok(user); //this returned all info about a user. we don't want that.

            var userToReturn = _mapper.Map<UserForDetailsDto>(user); //maps the full User to UserForDetails
            return Ok(userToReturn); //returns the DTO instead of full User.

        }

        //lesson 101: a method to save user's changes to their profile.
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            //check that user matches the token
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var userFromRepo = await _repo.GetUser(id);

            _mapper.Map(userForUpdateDto, userFromRepo);
            //see how those params mimic CreateMap<UserForUpdateDto, User>(); in AutoMapperProfiles

            if (await _repo.SaveAll())
            {
                return NoContent();
            } 

            //if neither of the above returns hit, throw an exception:
            throw new Exception($"Updating user {id} failed on save.");
        }
    }
}