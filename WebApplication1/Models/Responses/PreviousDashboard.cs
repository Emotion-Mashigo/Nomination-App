using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models.Responses
{
    public class Winner
    {
        public string Name { get; set; }
        public string Surname { get; set; }
    }
    public class PreviousDashboard
    {
        public List<string> PreviousMonths { get; set; }
        public List<Winner> PreviousEmployees { get; set; }
    }
}
