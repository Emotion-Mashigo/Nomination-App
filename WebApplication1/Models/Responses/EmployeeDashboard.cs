using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models.Responses
{
    public class EmployeeDashboard
    {
        public int NumberOfEmployees { get; set; }
        public int NumberOfNominees { get; set; }
        public int NumberOfComments { get; set; }
        public int NumberOfVotes { get; set; }
    }
}
