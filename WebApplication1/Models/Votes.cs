using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    [Table("Votes")]
    public class Votes
    {
        [Key]
        public int ID { get; set; }
        public int EmployeeNumber { get; set; }
        [ForeignKey("EmployeeNumber")]
        public Employees Employee { get; set; }
        public DateTime Date { get; set; }
        public int Counter { get; set; }
    }
}
