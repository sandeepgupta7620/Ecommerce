using System.ComponentModel.DataAnnotations;

namespace UserAuthenticationSandeepGupta.Models
{
    public class Products
    {
        [Key]
        public int productId { get; set; }
        public string productName { get; set; }
        public string productCategory { get; set; }
        public int productPrice { get; set; }
        public string productDescription { get; set; }
        public string productUrl { get; set; }
    }
}
