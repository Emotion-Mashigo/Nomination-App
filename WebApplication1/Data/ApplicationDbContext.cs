using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        {

        }

        public DbSet<Employees> Employees { get; set; }
        public DbSet<Votes> Votes { get; set; }
        public DbSet<Nomination> Nominations { get; set; }
        public DbSet<NominationReasons> NominationReasons { get; set; }
    }
}
