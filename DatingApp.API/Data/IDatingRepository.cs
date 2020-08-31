using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    //created in lesson 75.

    public interface IDatingRepository
    {
        //these are generic methods.
        //instead of one AddUser and one AddPhoto
        //we do Add<Type> which can be use by both (and more).
         void Add<T>(T entity) where T: class; //where is the constraint. T/entity must be a class.

         void Delete<T>(T entity) where T: class;

         Task<bool> SaveAll(); //It's a bool to return T/F, depending on whether anything was saved.
            //ie, either no changes to save, or a problem with saving.

         Task<IEnumerable<User>> GetUsers();

         Task<User> GetUser(int id);
    }
}