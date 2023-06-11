namespace Jokes.Data
{
    public class Joke
    {
        public int Id { get; set; }
        public string Setup { get; set; }
        public string Punchline { get; set; }
        public List<UsersJokes> UsersJokes { get; set; }
    }
}