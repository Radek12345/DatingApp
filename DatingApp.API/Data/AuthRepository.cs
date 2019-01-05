using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<User> LoginAsync(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(p => p.UserName == username);

            if (user == null)
                return null;
            
            using (var hmac = new HMACSHA512(user.PasswordSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

                if(!user.PasswordHash.SequenceEqual(computedHash))
                    return null;
            }

            return user;
        }

        public async Task<User> RegisterAsync(User user, string password)
        {
            using(var hmac = new HMACSHA512())
            {
                user.PasswordSalt = hmac.Key;
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }



        public async Task<bool> UserExistsAsync(string username)
        {
            return await _context.Users.AnyAsync(p => p.UserName == username);
        }
    }
}