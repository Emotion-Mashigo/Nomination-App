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
    public class NominateController : ControllerBase
    {
        public readonly ApplicationDbContext _context;

        public NominateController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Nominate
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Nominate/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Nominate
        [HttpPost]
        public async Task<IActionResult> Nominate([FromBody] NominateRequest request)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!EmployeeExists(request.EmployeeNumber))
            {
                Employees employees = new Employees
                {
                    Number = request.EmployeeNumber,
                    Name = request.EmployeeName,
                    Surname = request.EmployeeSurname,
                    Departments = request.EmployeeDepartment
                };

                _context.Employees.Add(employees);
                await _context.SaveChangesAsync();
            }

            DateTime previousMonth = DateTime.Parse(DateTime.Now.AddMonths(-1).Month +
                                                    "/01/" +
                                                    DateTime.Now.Year + " 00:00:00");

            NominationReasons nominationReasons = new NominationReasons
            {
                EmployeeNumber = request.EmployeeNumber,
                Reason = request.Reason,
                Date = previousMonth
            };

            if (NominationExists(request.EmployeeNumber))
            {
                
                Nomination currentNomination = await _context.Nominations.Where(n => n.EmployeeNumber == request.EmployeeNumber &&
                                                                                n.Date.Date == previousMonth.Date)
                                                                    .FirstOrDefaultAsync();
                currentNomination.Counter += 1;
                _context.Entry(currentNomination).State = EntityState.Modified;

                _context.Add(nominationReasons);

            } else
            {

                Nomination currentNomination = new Nomination
                {
                    EmployeeNumber = request.EmployeeNumber,
                    Date = previousMonth,
                    Counter = 1
                };
                _context.Add(currentNomination);
                _context.Add(nominationReasons);

            }

            try
            {
                await _context.SaveChangesAsync();
            }catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok();
        }

        // PUT: api/Nominate/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        public bool EmployeeExists(int employeeNumber)
        {
            return _context.Employees.Any(e => e.Number == employeeNumber);
        }

        public bool NominationExists(int employeeNumber)
        {
            DateTime.Parse("03/15/2021 13:00:00");
            DateTime previousMonth = DateTime.Parse(DateTime.Now.AddMonths(-1).Month + 
                                                    "/01/" +
                                                    DateTime.Now.Year + " 00:00:00");
            return _context.Nominations.Any(e => e.EmployeeNumber == employeeNumber && e.Date.Date == previousMonth.Date);
        }
    }
}
