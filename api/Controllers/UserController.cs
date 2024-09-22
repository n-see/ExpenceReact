using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Models.DTO;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserServices _data;

        public UserController (UserServices dataFromService)
        {
            _data = dataFromService;
        }
        
        //Add User
        [HttpPost("AddUsers")]

        public bool AddUser(CreateAccountDTO UserToAdd){
            return _data.AddUser(UserToAdd);
        }

        //GetAllUsers endpoint
        [HttpGet("GetAllUsers")]

        public IEnumerable<UserModel> GetAllUsers(){
            return _data.GetAllUsers();
        }
        
        //GetUserByUsername

        [HttpGet("GetUserByUsername/{Username}")]

        public UserIdDTO GetUserIdDTOByUserName(string username){
            return _data.GetUserIdDTOByUserName(username);
        }

        //Login

        [HttpPost("Login")]

        public IActionResult Login([FromBody] LoginDTO User){
            return _data.Login(User);
        }

        //Update user Account

        [HttpPost("UpdateUser")]

        public bool UpdateUser(int id, string username){
            return _data.UpdateUser(id, username);
        }
        
        [HttpPost("DeleteUser/{userToDelete}")]

        public bool DeleteUser(String userToDelete)
        {
            return _data.DeleteUser(userToDelete);
        }

        //Get user by userId

     

    }
}