using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingApp.API.Controllers
{

    //lesson 107-108

    [Authorize]
    [Route("api/users/{userId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public PhotosController(IDatingRepository repo,
                                IMapper mapper,
                                IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _repo = repo;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;

            //in this ctor, you're doing some new things:
            //creating new instances of stuff needed to handle photos.

            //in 106, you added CloudinaryDotNot and injected it in this class.
            //now you can start using its methods and stuff.
            //create an instance of the Cloudinary Account info:
            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            //these are the three strings from appsettings.json
            );

            //and set this variable to be a new Cloudinary, passing the Account.
            _cloudinary = new Cloudinary(acc);
        }

        //methods:

        //Primarily, you want this class to be able to upload photos
        //see the HttpPost method below.
        //But you also want that HttpPost to return info about the photo that gets saved.
        //So you need an HttpGet in order to return it. 

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repo.GetPhoto(id);

            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo); //you want more than just ok. You also want the thing being gotten.
        }


        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId,
                                                        [FromForm]PhotoForCreationDto photoForCreationDto)
        {
            //check user is authorized:
            //compare token in route to user's token.
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var userFromRepo = await _repo.GetUser(userId);

            var file = photoForCreationDto.File;

            var uploadedResult = new ImageUploadResult(); //a Cloudinary class.

            //upload the file if there is something to upload:
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream()) //using because it's a stream and will auto-dispose when done.
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };
                    //the uploadParams are just the info we pass along with the upload.
                    //the first one IDs the file
                    //the second one is a Cloudinary transformation to make a square of the face.

                    uploadedResult = _cloudinary.Upload(uploadParams);
                    //uploadedResult is something this gets back from Cloudinary.
                }
            }

            //map what comes back from Cloudinary to the Dto properties:
            photoForCreationDto.Url = uploadedResult.Url.ToString();
            photoForCreationDto.PublicId = uploadedResult.PublicId;

            //then map the Dto properties to the Photo class:
            var photo = _mapper.Map<Photo>(photoForCreationDto);

            //if it's the first photo uploaded, it will be set to main photo.
            //otherwise, not set.
            if (!userFromRepo.Photos.Any(u => u.IsMain))
            {
                photo.IsMain = true;
            }

            //each new photo is added to the Photos collection.
            userFromRepo.Photos.Add(photo);


            //upon a success save, return success/info message.
            if (await _repo.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);

                //with a Post, you _could_ just return Ok()
                //but much better is this, to confirm the item was posted and where:
                return CreatedAtRoute("GetPhoto", new {userId = userId, id = photo.Id}, photoToReturn);
                //that basically gets the info about the photo by calling GetPhoto() and returning it.
            }

            //"else"
            return BadRequest("Something went wrong - photo not added.");
        }
    }
}