using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoteController : ControllerBase
    {

        public readonly ApplicationDbContext _context;

        public VoteController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Vote
        [HttpGet]
        [Route("GetVotes")]
        public async Task<IActionResult> GetVotes()
        {
            DateTime previousMonth = DateTime.Parse(DateTime.Now.AddMonths(-1).Month +
                                                    "/01/" +
                                                    DateTime.Now.Year + " 00:00:00");
            IEnumerable<Nomination> nominations = await _context.Nominations
                                                            .Include(n => n.Employee)
                                                            .Where(n => n.Date.Date == previousMonth.Date)
                                                            .OrderByDescending(n => n.Counter)
                                                            .Take(3)
                                                            .ToListAsync();

            return Ok(nominations);
        }

        // POST: api/Vote/212
        [HttpPost("{employeeNumber}")]
        public async Task<IActionResult> Vote([FromRoute] int employeeNumber)
        {
            if (!EmployeeExists(employeeNumber))
            {
                return BadRequest();
            }
            DateTime previousMonth = DateTime.Parse(DateTime.Now.AddMonths(-1).Month +
                                                    "/01/" +
                                                    DateTime.Now.Year + " 00:00:00");



            if (VoteRecordExists(employeeNumber))
            {
                Votes vote = await _context.Votes.Where(v => v.EmployeeNumber == employeeNumber && v.Date.Date == previousMonth.Date).FirstOrDefaultAsync();
                vote.Counter += 1;
                _context.Entry(vote).State = EntityState.Modified;
            } else
            {
                Votes vote = new Votes
                {
                    EmployeeNumber = employeeNumber,
                    Date = previousMonth,
                    Counter = 1
                };
                _context.Add(vote);
            }

            try
            {
                await _context.SaveChangesAsync();
            } catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok();
        }

        // PUT: api/Vote/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        public bool VoteRecordExists(int employeeNumber)
        {
            DateTime previousMonth = DateTime.Parse(DateTime.Now.AddMonths(-1).Month +
                                                    "/01/" +
                                                    DateTime.Now.Year + " 00:00:00");
           return _context.Votes.Any(v => v.EmployeeNumber == employeeNumber && v.Date.Date == previousMonth.Date);
        }
        
        public bool EmployeeExists(int employeeNumber)
        {
            return _context.Employees.Any(e => e.Number == employeeNumber);
        }
    }
}
