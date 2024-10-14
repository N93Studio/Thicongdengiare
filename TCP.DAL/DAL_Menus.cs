using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TCP.DTO;
namespace TCP.DAL
{
    public class DAL_Menus
    {
        public IEnumerable<DTO_Menus> GetSiteMap(string actionBy)
        {
            try
            {
                var param = new DynamicParameters();
                return DapperHelper.Query<DTO_Menus>("GenerateSitemap", actionBy, param);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<DTO_Menus> GETALL(int intParentId,int templateid)
        {
            try
            {
                var param = new DynamicParameters();
                param.Add("@RelateId", intParentId);
                param.Add("@templateid", templateid);
                return DapperHelper.Query<DTO_Menus>("TCP_Menu_SEL", param);
            }
            catch (Exception ex)
            { throw ex; }
        }
        public IEnumerable<DTO_Menus> GETMenuTemplate(string url)
        {
            try
            {
                var param = new DynamicParameters();
                param.Add("@url", url);
                return DapperHelper.Query<DTO_Menus>("TCP_Menu_Template_SEL", param);
            }
            catch (Exception ex)
            { throw ex; }
        }
        public IEnumerable<DTO_Menus> GETALL(int MenuId)
        {
            try
            {
                var param = new DynamicParameters();
                param.Add("@MenuId", MenuId);
                return DapperHelper.Query<DTO_Menus>("TCP_Menu_SELECT", param);
            }
            catch (Exception ex)
            { throw ex; }
        }

        public bool UpdateMenu(DTO_Menus data)
        {
            var param = new DynamicParameters();
            param.Add("@MenuId", data.MenuId);
            param.Add("@Title", data.Title);
            param.Add("@Url", data.Url);
            param.Add("@MetaDescription", data.MetaDescription);
            param.Add("@MetaKeywords", data.MetaKeywords);
            return DapperHelper.Execute("TCP_Menu_SAVE", param) >= 1 ? true : false;
        }
    }
}
