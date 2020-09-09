using System.Linq;
using AutoMapper;
using DatingApp.API.DTOs;
using DatingApp.API.Models;

//created for lesson 78-79.
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
            //CreateMap with no further methods do the straight one-to-one mapping.
            //ie, username = username.
            //CreateMap<User, UserForListDTO>();
            //CreateMap<User, UserForDetailsDto>();
            CreateMap<Photo, PhotosForDetailsDto>();

            //adding on .ForMember provides detail to the mapper.
            //you can do more than one per map.
            //Note CalculateAge is a method you wrote in Extensions.cs
            CreateMap<User, UserForListDTO>()
                .ForMember(dest => dest.PhotoUrl, opt => 
                    opt.MapFrom(src => 
                        src.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(dest => dest.Age, opt =>
                    opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<User, UserForDetailsDto>()
                .ForMember(dest => dest.PhotoUrl, opt => 
                    opt.MapFrom(src => 
                        src.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(dest => dest.Age, opt =>
                    opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotosForDetailsDto>();

            //lesson 101: saving user changes to their profile.
            //mapping the 5 fields they can change to the new UserForUpdateDto.
            //the order is <from here, to here>
            CreateMap<UserForUpdateDto, User>();
        }
    }
}