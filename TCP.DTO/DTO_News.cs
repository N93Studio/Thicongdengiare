﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TCP.DTO
{
    public class DTO_News
    {
        public int NewsId { get; set; }
        public string ParentID { get; set; }
        public string NewsTitle { get; set; }
        public string NewsUrl { get; set; }
        public string NewsImage { get; set; }
        public string NewsDesc { get; set; }
        public string NewsContents { get; set; }
        public int DisplayOrder { get; set; }
        public int IsShow { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }

        public string NewsCategoryTitle { get; set; }

        public string Title { get; set; }
        public string Url { get; set; }
        public string MetaDescription { get; set; }
        public string MetaKeywords { get; set; }
    }
}
