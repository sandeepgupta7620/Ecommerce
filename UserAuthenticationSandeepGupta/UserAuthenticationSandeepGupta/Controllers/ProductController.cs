using Microsoft.AspNetCore.Mvc;
using UserAuthenticationSandeepGupta.Models.SearchEntity;
using UserAuthenticationSandeepGupta.Models;
using Microsoft.EntityFrameworkCore;

namespace UserAuthenticationSandeepGupta.Controllers
{
    public class ProductController : ControllerBase
    {
        public ApplicationDbContext _dbContext { get; }
        public ProductController(ApplicationDbContext dbContext) { _dbContext = dbContext; }

        [HttpGet("allProduct")]
        public List<Products> AllPost()
        {
            var posts = _dbContext.products_sandeep.ToList();
            return posts;
        }

        [HttpGet("singleProduct")]
        public Products SingleProduct([FromQuery] FindProduct formdata)
        {
            var product = _dbContext.products_sandeep.Find(formdata.productId);
            return product;
        }

        [HttpGet("category")]
        public async Task<IActionResult> CategoryProduct([FromQuery] findCategory formdata)
        {
            var product = await _dbContext.products_sandeep.Where(p => p.productCategory == formdata.productCategory).ToListAsync(); ;
            return Ok(product);
        }
    }
}
