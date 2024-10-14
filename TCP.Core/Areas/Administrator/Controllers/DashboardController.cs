using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TCP.DAL;
using Tool;
using TCP.DTO;
using Newtonsoft.Json;
namespace TCP.Core.Areas.Administrator.Controllers
{
    public class DashboardController : Controller
    {
        DAL_Login objlogin = new DAL_Login();
        // GET: Administrator/Dashboard
        public ActionResult Index()
        {
           
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public bool Login(string data)
        {
            string pass = Tool.Utils.DecryptMD5("admin123@456");
            bool isLogin = false;
            DTO_Login models = JsonConvert.DeserializeObject<DTO_Login>(data);
            models.Password = Tool.Utils.DecryptMD5(models.Password);
            IEnumerable<DTO_Login> tmp = objlogin.TCP_Logincheck(models.UserName, models.Password);
            if (tmp != null && tmp.Count() > 0)
            {
                isLogin = true;
                foreach (var it in tmp)
                {

                    HttpCookie userinfo1 = new HttpCookie("userinfoadmin");
                    userinfo1["username"] = it.UserName;
                    userinfo1["id"] = it.Id.ToString();
                    userinfo1.Expires = DateTime.Now.AddDays(365);
                    Response.Cookies.Add(userinfo1);
                }
            }
            return isLogin;
        }
        public bool Logout()
        {
            HttpCookie cookie = new HttpCookie("userinfoadmin");
            cookie.Expires = DateTime.Now.AddDays(-1000); // Đặt ngày hết hạn để xóa cookie
            Response.Cookies.Remove("userinfoadmin");
            Response.Cookies.Add(cookie);
            return true;
        }
    }
}