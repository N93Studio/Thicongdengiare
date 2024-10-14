using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TCP.DTO;

namespace TCP.DAL
{
    public  class DAL_Menubar
    {
        public bool UpdateMenubar(int MenubarId, int IsShow)
        {
            var param = new DynamicParameters();
            param.Add("@MenubarId", MenubarId);
            param.Add("@IsShow", IsShow);
            return DapperHelper.Execute("TCP_Menubar_Show", param) >= 1 ? true : false;
        }
        public IEnumerable<DTO_Menubar> GETALL()
        {
            try
            {
                var param = new DynamicParameters();
                return DapperHelper.Query<DTO_Menubar>("TCP_Menubar_SEL", param);
            }
            catch (Exception ex)
            { throw ex; }
        }
    }
}
