using System.ComponentModel.DataAnnotations;

namespace OutOfOffice.Entities;

public class EntityBase
{
    [Key]
    public int Id { get; set; }
}