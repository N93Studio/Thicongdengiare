using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TCP.DTO
{
    public class DTO_Products
    {
        public int ProductId { get; set; }
        public string ParentID { get; set; }
        public string ParentName { get; set; }
        public string ProductTitle { get; set; }
        public string ProductUrl { get; set; }
        public string ProductImage { get; set; }
        public float ProductPrice { get; set; }
        public float ProductPriceDrop { get; set; }
        public string Age { get; set; }
        public string Weeks { get; set; }
        public string SoNgay { get; set; }
        public string PhuongTien { get; set; }
        public string ProductDesc { get; set; }
        public string ProductContents { get; set; }
        public int DisplayOrder { get; set; }
        public int IsShow { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ProductCategoryTitle { get; set; }


        public string Title { get; set; }
        public string Url { get; set; }
        public string MetaDescription { get; set; }
        public string MetaKeywords { get; set; }
        public string multiImage { get; set; }
    }
}
