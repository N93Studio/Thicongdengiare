using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TCP.DTO;
using TCP.DAL;

namespace TCP.Core.Areas.Administrator.Controllers
{
    public class OrdersController : Controller
    {
        DAL_Orders objOrder = new DAL_Orders();
        // GET: Administrator/Orders
        public ActionResult Orders()
        {
            var model = objOrder.TCP_CusOrder_SEL();
            return View(model);
        }
        public ActionResult OrdersDetail(int OrderID)
        {
            var model = objOrder.TCP_CusOrder_SEL().Where(m=>m.OrderID==OrderID).ToList();
            ViewBag.OrderDetails = objOrder.TCP_Orderdetail_SEL(OrderID);
            ViewBag.Total = objOrder.TCP_Orderdetail_SEL(OrderID).Sum(m => m.Total);
            ViewBag.OrderID = OrderID;
            ViewBag.Status=objOrder.TCP_Order_SELECT(OrderID).FirstOrDefault().Status;
            return View(model);
        }

        [HttpPost]
        public bool OrderShow(int id, int idorder)
            {
            var result = objOrder.UpdateNewsshow(id, idorder);
            return result;
        }

        [HttpPost]
        public bool UpdateOrderStatus(int id,int status)
        {
            var result = objOrder.UpdateNewsshow(id, status);
            return result;
        }
    }
}