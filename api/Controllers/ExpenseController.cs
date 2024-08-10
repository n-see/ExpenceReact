using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpenseController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ExpenseController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task <IEnumerable<Expense>> GetExpense()
        {
            var expenses = await _context.Expenses.AsNoTracking().ToListAsync();
            return expenses;
        }

        [HttpPost]

        public async Task<IActionResult> Create(Expense expense){
            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            await _context.Expenses.AddAsync(expense);

            var result = await _context.SaveChangesAsync();
            
            if(result > 0){
                return Ok();
            }
            return BadRequest();
        }

        [HttpDelete("{id:int}")]

        public async Task<IActionResult> Delete(int id){
            var expense = await _context.Expenses.FindAsync(id);
            if(expense == null){
                return NotFound();
            }

            _context.Remove(expense);

            var result = await _context.SaveChangesAsync();

            if(result > 0){
                return Ok("Expense deleted");
            }
            return BadRequest("Unable to delete expense");
        }
    }
}