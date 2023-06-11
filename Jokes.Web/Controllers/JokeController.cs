using Jokes.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System;
using static System.Net.WebRequestMethods;
using Jokes.Web.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace Jokes.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JokeController : ControllerBase
    {
        private readonly string _connectionString;
        public JokeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getall")]
        [HttpGet]
        public List<Joke> GetAll()
        {
            var repo = new JokeRepository(_connectionString);
            return repo.GetAll();
        }

        [Route("getjoke")]
        [HttpGet]
        public Joke GetJoke()
        {
            string joke = "https://jokesapi.lit-projects.com/jokes/programming/random";
            var client = new HttpClient();

            string json = client.GetStringAsync(joke).Result;
            var jkArray = JsonSerializer.Deserialize<Joke[]>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
            var repo = new JokeRepository(_connectionString);
            var jokeFromDb = repo.Add(jkArray[0]);
            return jokeFromDb;

        }
        [Route("like")]
        [HttpPost]
        [Authorize]
        public Joke Like(UsersJokes uj)
        {
            var userRepo = new UserRepository(_connectionString);
            uj.UserId = userRepo.GetByEmail(User.Identity.Name).Id;
            var repo = new JokeRepository(_connectionString);
            return repo.UpdateLikes(uj);
        }
    }
}
