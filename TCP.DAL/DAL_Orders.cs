using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using TCP.DTO;

namespace TCP.DAL
{
    public class DAL_Orders
    {
        public bool UpdateProducts(DTO_Customer data)
        {
            var param = new DynamicParameters();
            param.Add("@Name", data.Name);
            param.Add("@Adress", data.Adress);
            param.Add("@Phone", data.Phone);
            param.Add("@Desciptions", data.Desciptions);
            return DapperHelper.Execute("TCP_Customer_SAVE", param) >= 1 ? true : false;
        }

        public bool UpdateOrders(string Desciptions, float totals)
        {
            var param = new DynamicParameters();
            param.Add("@Desciptions", Desciptions);
            param.Add("@Totals", totals);
            return DapperHelper.Execute("TCP_Orders_SAVE", param) >= 1 ? true : false;
        }
        public bool UpdateOrdersDetail(DTO_OrderDetail data)
        {
            var param = new DynamicParameters();
            param.Add("@ProductId", data.ProductId);
            param.Add("@Amount", data.Amount);
            param.Add("@Prices", data.Prices);
            return DapperHelper.Execute("TCP_Orderdetail_SAVE", param) >= 1 ? true : false;
        }
        public IEnumerable<DTO_CusOrders> TCP_CusOrder_SEL()
        {
            try
            {
                var param = new DynamicParameters();
                return DapperHelper.Query<DTO_CusOrders>("TCP_CusOrder_SEL", param);
            }
            catch (Exception ex)
            { throw ex; }
        }
        public IEnumerable<DTO_ProductOrders> TCP_Orderdetail_SEL(int OrderID)
        {
            try
            {
                var param = new DynamicParameters();
                param.Add("@OrderID", OrderID);
                return DapperHelper.Query<DTO_ProductOrders>("TCP_Orderdetail_SEL", param);
            }
            catch (Exception ex)
            { throw ex; }
        }
        public bool UpdateNewsshow(int OrderID, int IsShow)
        {
            var param = new DynamicParameters();
            param.Add("@OrderID", OrderID);
            param.Add("@IsShow", IsShow);
            return DapperHelper.Execute("TCP_Order_Show", param) >= 1 ? true : false;
        }
        public IEnumerable<DTO_Orders> TCP_Order_SELECT(int OrderID)
        {
            try
            {
                var param = new DynamicParameters();
                param.Add("@OrderID", OrderID);
                return DapperHelper.Query<DTO_Orders>("TCP_Order_SEL", param);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
   

} 