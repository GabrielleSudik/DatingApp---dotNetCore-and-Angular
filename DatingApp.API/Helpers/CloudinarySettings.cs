namespace DatingApp.API.Helpers
{
    //lesson 106, setting up Cloudinary.
    //these 3 props mirror the info in appsettings.json
    //the values come from Cloudinary - dashboard.
    
    public class CloudinarySettings
    {
        public string CloudName { get; set; }
        public string ApiKey { get; set; }
        public string ApiSecret { get; set; }
    }
}