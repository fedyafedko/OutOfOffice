using OutOfOffice.Seeding.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace OutOfOffice.Seeding.Behaviours;

public class RoleSeedingBehaviour : ISeedingBehaviour
{
    private readonly RoleManager<IdentityRole<int>> _roleManager;

    public RoleSeedingBehaviour(RoleManager<IdentityRole<int>> roleManager)
    {
        _roleManager = roleManager;
    }

    public async Task SeedAsync()
    {
        var roles = new List<string>
        {
            "HR manager",
            "Project manager",
            "Employee"
        };

        foreach (var role in roles)
        {
            if (!await _roleManager.RoleExistsAsync(role))
            {
                await _roleManager.CreateAsync(new IdentityRole<int>(role));
            }
        }
    }
}
