
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            //intentionally blank.
        }

        // We're adding properties for the classes we are creating
        // so DataContext will know about them.
        // !! Every time we add a new model OR change info in the model,
        // we must migrate to the DB too.
        // Do it via the "migration" steps in the CMD.
        public DbSet<Value> Values {get; set; }
        public DbSet<User> Users { get; set; }
    }
}