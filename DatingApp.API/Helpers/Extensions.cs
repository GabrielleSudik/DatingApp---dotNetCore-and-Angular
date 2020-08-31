using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Helpers
{
    public static class Extensions //note static. so we don't have to create instances.
    {
        //created first for lesson 52
        //to put the CORS headers back so the client
        //will be able to correctly see our custom error messages.

        //this will be called in Startup.cs - Configure()
        //in the global error handling block.
        //It will add CORS headers, which are needed to correctly
        //show our custom error messages in the browser console.
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message); //"message" is the value, will show the error message.
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");

        }

        //lesson 79: we need a method so Automapper can convert DOB to Age.
        public static int CalculateAge(this DateTime theDateTime)
        {
            var age = DateTime.Today.Year - theDateTime.Year;
            if (theDateTime.AddYears(age) > DateTime.Today)
            {
                age--;
            }
            return age;
        }
    }
}