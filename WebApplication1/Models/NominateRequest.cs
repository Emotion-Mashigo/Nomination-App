using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class NominateRequest
    {
        [Required]
        public int EmployeeNumber { get; set; }
        [Required]
        public string EmployeeName { get; set; }
        [Required]
        public string EmployeeSurname { get; set; }
        [Required]
        public string EmployeeDepartment { get; set; }
        [Required]
        public string Reason { get; set; }
    }
}
