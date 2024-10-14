using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using TCP.DTO;
namespace TCP.DAL
{
    public class DAL_Contacts
    {
        public IEnumerable<DTO_Contacts> GETALL()
        {
            try
            {
                var param = new DynamicParameters();
                return DapperHelper.Query<DTO_Contacts>("TCP_Contact_SEL", param);
            }
            catch (Exception ex)
            { throw ex; }
        }
        public bool UpdateInfors(DTO_Contacts data)
        {
            var param = new DynamicParameters();
            param.Add("@ContactName", data.ContactName);
            param.Add("@ContactEmail", data.ContactEmail);
            param.Add("@ContactContent", data.ContactContent);
            param.Add("@ContactPhone", data.ContactPhone);
            return DapperHelper.Execute("TCP_Contacts_SAVE", param) >= 1 ? true : false;
        }

        public int InfoDelete(int ContactId)
        {
            try
            {
                var param = new DynamicParameters();
                param.Add("@ContactId", ContactId);
                return DapperHelper.Execute("TCP_Infor_DEL", param);
            }
            catch (Exception ex)
            { throw ex; }
        }
    }
}
