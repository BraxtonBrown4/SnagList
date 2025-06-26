using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using SnagList.Models;
using Microsoft.AspNetCore.Identity;

namespace SnagList.Data;

public class SnagListDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;

    /* public DbSet<example> examples { get; set; } */
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<List> Lists { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<ListTag> ListTags { get; set; }
    public DbSet<Item> Items { get; set; }
    public DbSet<Notification> Notifications { get; set; }

    public SnagListDbContext(DbContextOptions<SnagListDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "ADMIN"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Robopolo",
            Email = "braxtoncarterbrown@gmail.com",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Robopolo",
            FirstName = "Braxton",
            LastName = "Brown",
            Address = "Admin Lane",
            ProfilePic = "https://store-images.s-microsoft.com/image/apps.9168.71037132718083264.9e558f9c-31e4-4757-b43c-05a53e0c4977.2cabd63d-49ce-4a77-af56-0a1d6a33f61b?q=90&w=480&h=270"
        });

        modelBuilder.Entity<List>().HasData(new List[]
        {
            new List
            {
                Id = 1,
                UserProfileId = 1,
                Name = "WishList for after job",
                IsPublic = false,
            },
            new List
            {
                Id = 2,
                UserProfileId = 1,
                Name = "Christmas list",
                IsPublic = true,
            },
        });

        modelBuilder.Entity<Tag>().HasData(new Tag[]
        {
            new Tag
            {
                Id = 1,
                Name = "Reward"
            },
            new Tag
            {
                Id = 2,
                Name = "When I get money"
            },
            new Tag
            {
                Id = 3,
                Name = "Christmas"
            },
        });

        modelBuilder.Entity<ListTag>().HasData(new ListTag[]
        {
            new ListTag
            {
                Id = 1,
                ListId = 1,
                TagId = 1,
            },
            new ListTag
            {
                Id = 2,
                ListId = 1,
                TagId = 2,
            },
            new ListTag
            {
                Id = 3,
                ListId = 2,
                TagId = 3,
            },
            new ListTag
            {
                Id = 4,
                ListId = 2,
                TagId = 1,
            },
        });

        modelBuilder.Entity<Item>().HasData(new Item[]
        {
            new Item
            {
                Id = 1,
                ListId = 1,
                Name = "AirPods",
                Price = 170,
                TargetPrice = 70,
                Image = null,
                Notify = true,
            },
            new Item
            {
                Id = 2,
                ListId = 2,
                Name = "socks",
                Price = 6,
                TargetPrice = null,
                Image = null,
                Notify = false,
            },
        });

        /*
        modelBuilder.Entity<Example>().HasData(new Example[]
        {
            new Example
            {
                Example = 1,
            },

        });
        */
    }
}