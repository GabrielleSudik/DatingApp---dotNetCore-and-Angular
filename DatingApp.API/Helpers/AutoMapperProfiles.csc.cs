using AutoMapper;
using DatingApp.API.DTOs;
using DatingApp.API.Models;

//created for lesson 78.
//Automapper needs profiles - ie, what model matches up with what Dto(s)
//In UsersController.cs you have code that maps them in the methods.

//So why do you need this?
//In the methods, when, eg, Username is in both models,
//Automapper knows they are the same thing.
//But the DTOs have age vs DOB in the User model , eg.
//So you have to tell Automapper what the relationship is.

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDTO>();
            CreateMap<User, UserForDetailsDto>();
        }
    }
}