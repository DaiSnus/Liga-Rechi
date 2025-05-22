using Liga_Rechi.DataLayer;
using Liga_Rechi.DataLayer.Entities;
using Liga_Rechi.Services.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace Liga_Rechi.Services.Initializers;

public class DbContextInitializer
{
    public static void InitializeDbContext(LigaAppDbContext dbContext, IEncrypt encrypt)
    {
        var existingUsers = dbContext.Users.ToArray();
        var existingProjects = dbContext.Projects.ToArray();
        var existingEvents = dbContext.Events.ToArray();


        dbContext.Database.Migrate();

        AddUserIfNotExist(
            id: 1,
            level: 1,
            firstName: "Nikita",
            lastName: "Kozlov",
            email: "nikita.kozlov.200516@gmail.com",
            password: "Qwerty123",
            number: "89120548599",
            isAdmin: true);

        AddProjectIfNotExist(
            id: 1,
            title: "RedBull Rampage", 
            description: "The most imposible show!");

        AddEventIfNotExist(
            id: 1,
            title: "Rampage in Ekaterinburg",
            description: "Russian riders will drive the best trail track!",
            price: 5500.0m,
            date: DateTime.Today.ToUniversalTime());

        void AddUserIfNotExist(int id, int level, string firstName, string lastName, string email, string password, string number, bool isAdmin)
        {
            if (existingUsers.Any(eb => eb.Email == email || eb.Number == number)) return;

            string salt = Guid.NewGuid().ToString();
            var date = DateTime.UtcNow.AddMonths(new Random().Next(-4, 0));

            dbContext.Users.Add(new UserEntity
            {
                Id = id,
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                Password = encrypt.HashPassword(password, salt),
                IsActive = true,
                IsAdmin = isAdmin,
                Level = level,
                Number = number,
                Salt = salt,
                Status = "active",
                CreationDate = date,
            }); 
        }

        void AddProjectIfNotExist(int id, string title, string description)
        {
            if (existingProjects.Any(p => p.Id == id)) return;

            dbContext.Projects.Add(new ProjectEntity
            {
                Id = id,
                Title = title,
                Description = description,
            });
        }

        void AddEventIfNotExist(int id, string title, string description, decimal price, DateTime date)
        {
            if (existingEvents.Any(e => e.Id == id)) return;

            dbContext.Events.Add(new EventEntity
            {
                Id = id,
                Title = title,
                Description = description,
                Price = price,
                Date = date,
            });
        }

        dbContext.SaveChanges();

        //void ConfigureLinks()
        //{
        //    async void ConfigureProject()
        //    {
        //        var leader = await dbContext.Users.FirstAsync();
        //        var team = await dbContext.Users.Take(5).ToListAsync();


        //    }

        //    async void ConfigureEvent()
        //    {
        //        var managers = await dbContext.Users.Take(5).ToListAsync();
        //        var participants = await dbContext.Users.OrderBy(e => EF.Functions.Random()) 
        //                                                .Take(new Range(5,10))
        //                                                .ToListAsync();
        //        var project = await dbContext.Projects.FirstAsync();

        //        var e = await dbContext.Events.FindAsync();
        //        e.Project = project;
        //        //e.Managers = new EventTeamEntity;
        //    }
        //}
    }
}
