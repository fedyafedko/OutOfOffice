using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using OutOfOffice.Entities;

namespace OutOfOffice.DAL.EF;

public class ApplicationDbContext : IdentityDbContext<Employee, IdentityRole<int>, int>
{
    public DbSet<ApprovalRequest> ApprovalRequests { get; set; } = null!;
    public DbSet<LeaveRequest> LeaveRequests { get; set; } = null!;
    public DbSet<Project> Projects { get; set; } = null!;

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);

        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.HasOne(e => e.PeoplePartner)
                  .WithMany()
                  .HasForeignKey(e => e.PeoplePartnerId)
                  .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
