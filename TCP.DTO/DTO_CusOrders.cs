using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TCP.DTO
{
    public class DTO_CusOrders
    {
        public int OrderID { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Adress { get; set; }
        public string DateCreated { get; set; }
        public string Desciptions { get; set; }
        public float Totals { get; set; }
        public int Status { get; set; }
    }
}
