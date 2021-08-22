using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
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

    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper  _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers() {

            var users = await _userRepository.GetMembersAsync();

            return Ok(_mapper.Map<IEnumerable<MemberDto>>(users));
        }

    
        [HttpGet("{username}")]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUser(string username)
        {
            var user = await _userRepository.GetMemberAsync(username);

            return Ok(_mapper.Map<MemberDto>(user));
        }
    }
}
