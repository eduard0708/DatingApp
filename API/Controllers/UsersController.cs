using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            
            _userRepository = userRepository;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers() {

            var users = await _userRepository.GetUsersAsync();

            return Ok(users);
        }

        // [Authorize]
        [HttpGet("{username}")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUser(string username)
        {
            var user = await _userRepository.GetUserByUsernameAsync(username);

            return Ok(user);
        }
    }
}
