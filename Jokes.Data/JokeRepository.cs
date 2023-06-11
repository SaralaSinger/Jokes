using Microsoft.EntityFrameworkCore;

namespace Jokes.Data
{
    public class JokeRepository
    {
        private readonly string _connectionString;

        public JokeRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<Joke> GetAll()
        {
            using var context = new JokesDbContext(_connectionString);
            return context.Jokes.Include(j => j.UsersJokes).ToList();
        }
        public Joke Add(Joke jk)
        {
            using var context = new JokesDbContext(_connectionString);
            var jokeFromDb = context.Jokes.Include(j => j.UsersJokes).FirstOrDefault(j => j.Punchline == jk.Punchline && j.Setup == jk.Setup);   
            if (jokeFromDb == null)
            {
                context.Jokes.Add(jk);
                context.SaveChanges();
                jokeFromDb = context.Jokes.Include(j => j.UsersJokes).FirstOrDefault(j => j.Punchline == jk.Punchline && j.Setup == jk.Setup); 
            }
            return jokeFromDb;
        }
        public Joke UpdateLikes(UsersJokes userJoke)
        {
            using var context = new JokesDbContext(_connectionString);
            var fromDb = context.UsersJokes.FirstOrDefault(uj => uj.JokeId == userJoke.JokeId && uj.UserId == userJoke.UserId);
            if (fromDb != null)
            {
                context.UsersJokes.Remove(fromDb);   
            }
            context.UsersJokes.Add(userJoke);
            context.SaveChanges();
            return context.Jokes.Include(j => j.UsersJokes).FirstOrDefault(j => j.Id == userJoke.JokeId);
        }
        
    }
}