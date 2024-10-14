using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TCP.DTO
{
    public class DTO_ProductOrders
    {
        public string ProductTitle { get; set; }
        public string ProductImage { get; set; }
        public float Prices { get; set; }
        public int Amount { get; set; }
        public float Total { get; set; }
    }
}
