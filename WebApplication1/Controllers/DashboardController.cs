using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;
using WebApplication1.Models.Responses;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    public class DashboardController : Controller
    {
        public readonly ApplicationDbContext _context;

        public DashboardController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Vote
        [HttpGet]
        [Route("employee")]
        public IActionResult GetDashboardDataAsync()
        {
            int numberOfEmployees = _context.Employees.Count();
            int numberOfNominees = _context.Nominations
                                            .GroupBy(n => n.Counter)
                                            .Select(n => n.Sum(x => x.Counter)).Sum();
            int numberOfComments = _context.NominationReasons.Count();
            int numberOfVotes = _context.Votes
                                            .GroupBy(n => n.Counter)
                                            .Select(n => n.Sum(x => x.Counter)).Sum();

            return Ok(new EmployeeDashboard
            {
                NumberOfEmployees = numberOfEmployees,
                NumberOfNominees = numberOfNominees,
                NumberOfComments = numberOfComments,
                NumberOfVotes = numberOfVotes
            });
        }

        // GET: api/Vote
        [HttpGet]
        [Route("previouses")]
        public async Task<IActionResult> GetDashboardPreviousesAsync()
        {

            List<string> previousMonths = new List<string>();
            List<Winner> previousWinner = new List<Winner>();
            for (int i = 1; i <= 4; i++)
            {
                int previousMonth = i * -1;
                Votes votes = await _context.Votes
                                        .Include(p => p.Employee)
                                        .Where(p => p.Date.Date.Month == DateTime.Now.AddMonths(previousMonth).Date.Month)
                                        .OrderByDescending(p => p.Counter)
                                        .Take(1).FirstOrDefaultAsync();
                if (votes != null)
                {
                    previousWinner.Add(new Winner { Name = votes.Employee.Name, Surname = votes.Employee.Surname });

                } else
                {
                    previousWinner.Add(null);
                }
                previousMonths.Add(DateTime.Now.AddMonths(previousMonth).ToString("MMMM"));
            }
            
            return Ok(new PreviousDashboard
            {
                PreviousMonths = previousMonths,
                PreviousEmployees = previousWinner
            });
        }

        [HttpGet]
        [Route("table")]
        public async Task<IActionResult> GetDashboardTableAsync()
        {

            IEnumerable<Employees> List = await _context.Employees.ToListAsync();
            return Ok(List);
        }

        [HttpGet]
        [Route("votes")]
        public async Task<IActionResult> GetDashboardVotesAsync()
        {

            IEnumerable<Votes> List = await _context.Votes.ToListAsync();
            return Ok(List);
        }


        [HttpGet]
        [Route("reasons")]
        public async Task<IActionResult> GetDashboardReasonsAsync()
        {

            IEnumerable<NominationReasons> List = await _context.NominationReasons.ToListAsync();
            return Ok(List);
        }

        [HttpGet]
        [Route("nominees")]
        public async Task<IActionResult> GetDashboardNominationsAsync()
        {

            IEnumerable<Nomination> List = await _context.Nominations.ToListAsync();
            return Ok(List);
        }
    }

}
