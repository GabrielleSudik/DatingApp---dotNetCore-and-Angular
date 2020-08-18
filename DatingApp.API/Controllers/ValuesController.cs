using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase // "Controller" will support views.
    {
        //add a constructor so we can inject the DbContext.
        private readonly DataContext _context;
        public ValuesController(DataContext context)
        {
            _context = context;
        }

        //we'll revise the boilerplate methods to suit our needs.

        // GET api/values
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetValues() //IActionResults allows returning status codes, plus stuff.
        {
            var values = await _context.Values.ToListAsync();
            return Ok(values);
            //
        }

        // GET api/values/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetValue(int id)
        {
            var value = await _context.Values.FirstOrDefaultAsync(x => x.Id == id); 
            //FirstOrDefault is usually better than First because
            //if the value isn't found in First, you'll get an exception.
            //With FirstOrDefault, you'll at least get _something_.
            //In the case of ints, the default is "null"
            return Ok(value);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
