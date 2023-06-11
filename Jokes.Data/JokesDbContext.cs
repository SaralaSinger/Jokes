using Microsoft.EntityFrameworkCore;

namespace Jokes.Data
{
    public class JokesDbContext : DbContext
    {
        private string _connectionString;

        public JokesDbContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Joke> Jokes { get; set; }
        public DbSet<UsersJokes> UsersJokes { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }
            modelBuilder.Entity<UsersJokes>()
            .HasKey(uj => new { uj.UserId, uj.JokeId });
        }
    }
}