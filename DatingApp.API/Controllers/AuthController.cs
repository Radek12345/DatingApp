using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;

        public AuthController(IAuthRepository repo)
        {
            _repo = repo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto dto)
        {
            dto.Username = dto.Username.ToLower();

            if (await _repo.UserExistsAsync(dto.Username))
                return BadRequest("Username already exists");

            var userToCreate = new User { UserName = dto.Username };

            var createdUser = await _repo.RegisterAsync(userToCreate, dto.Password);

            return StatusCode(201);
        }

    }
}