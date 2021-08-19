using API.Data;
using API.Entities;
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
        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        public ActionResult<IEnumerable<AppUser>> GetUsers() {

            var users = _context.Users.ToList();

            return users;
        }

        [Authorize]
        [HttpGet("{id}")]
        public ActionResult<IEnumerable<AppUser>> GetUser(int id)
        {
            var user = _context.Users.Find(id);

            return Ok(user);
        }
    }
}
