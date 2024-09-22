using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using api.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace api.Services
{
    public class UserServices : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserServices(AppDbContext context)
        {
            _context = context;
        }

        //Does User Exist
        public bool DoesUserExist(string username)
        {
            return _context.UserInfo.SingleOrDefault(user => user.Username == username) != null;
        }

        //adding user logic

        public bool AddUser(CreateAccountDTO userToAdd)
        {
            bool result = false;

            if (!DoesUserExist(userToAdd.Username))
            {
                UserModel User = new UserModel();
                UserModel newUser = new UserModel();

                var newHashedPassword = HashPassword(userToAdd.Password);

                newUser.Id = userToAdd.Id;
                newUser.Username = userToAdd.Username;
                newUser.Salt = newHashedPassword.Salt;
                newUser.Hash = newHashedPassword.Hash;

                _context.Add(newUser);
                result = _context.SaveChanges() != 0;

            }

            return result;
        }

        public PasswordDTO HashPassword(string password)
        {
            PasswordDTO newHashedPassword = new PasswordDTO();

            byte[] SaltBytes = new Byte[64];
            var provider = new RNGCryptoServiceProvider();
            provider.GetNonZeroBytes(SaltBytes);
            var Salt = Convert.ToBase64String(SaltBytes);

            var Rfc2898DeriveBytes = new Rfc2898DeriveBytes(password, SaltBytes, 10000);
            var Hash = Convert.ToBase64String(Rfc2898DeriveBytes.GetBytes(256));

            newHashedPassword.Salt = Salt;
            newHashedPassword.Hash = Hash;

            return newHashedPassword;
        }

        //Function to verify user password

        public bool VerifyUserPassword(string? Password, string? StoredHash, string? StoredSalt)
        {
            var SaltBytes = Convert.FromBase64String(StoredSalt);
            var Rfc2898DeriveBytes = new Rfc2898DeriveBytes(Password, SaltBytes, 10000);
            var newHash = Convert.ToBase64String(Rfc2898DeriveBytes.GetBytes(256));

            return newHash == StoredHash;
        }

        public IEnumerable<UserModel> GetAllUsers()
        {
            return _context.UserInfo;
        }

        public UserModel GetAllUserDataByUsername(string username)
        {
            return _context.UserInfo.FirstOrDefault(user => user.Username == username);
        }

        public IActionResult Login(LoginDTO user)
        {
            IActionResult Result = Unauthorized();
            if (DoesUserExist(user.Username))
            {
                UserModel foundUser = GetAllUserDataByUsername(user.Username);
                if (VerifyUserPassword(user.Password, foundUser.Hash, foundUser.Salt))
                {
                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("letsaddmorereallylongkeysuperSecretKey@345"));
                    var signInCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                    var tokeOptions = new JwtSecurityToken(
                issuer: "https://localhost:5001",
                audience: "https://localhost:5001",
                claims: new List<Claim>(),
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: signInCredentials
                );
                    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                    Result = Ok(new { Token = tokenString });
                }

            }
            return Result;
        }

        public UserIdDTO GetUserIdDTOByUserName(string username)
    {
        var UserInfo = new UserIdDTO();
        var foundUser = _context.UserInfo.SingleOrDefault(user => user.Username == username);
        UserInfo.UserId = foundUser.Id;
        UserInfo.PublisherName = foundUser.Username;
        return UserInfo;
    }

        public UserModel GetUserByUsername(string? username)
        {
            return _context.UserInfo.SingleOrDefault(user => user.Username == username);

        }


        public bool DeleteUser(string userToDelete)
        {
            UserModel foundUser = GetUserByUsername(userToDelete);
            bool result = false;
            if (foundUser != null)
            {
                foundUser.Username = userToDelete;
                _context.Remove<UserModel>(foundUser);
                result = _context.SaveChanges() != 0;
            }
            return result;

        }

        public UserModel GetUserById(int id )
        {
            return _context.UserInfo.SingleOrDefault(user => user.Id == id);
        }

        public bool UpdateUser(int id, string username)
        {
            UserModel foundUser = GetUserById(id);
            bool result = false;
            if(foundUser != null)
            {
                foundUser.Username = username;
                _context.Update<UserModel>(foundUser);
                result = _context.SaveChanges() != 0;
            }
            return result;
        }

    }
}