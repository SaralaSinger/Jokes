using System.Text.Json.Serialization;

namespace Jokes.Data
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public List<UsersJokes> UsersJokes { get; set; }
        [JsonIgnore]
        public string PasswordHash { get; set; }
    }
}