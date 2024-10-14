using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TCP.DAL;
using TCP.DTO;
using Tool;

namespace TCP.Core.Areas.Administrator.Controllers
{
    public class MenuController : Controller
    {
        DAL_Menus DAL_Menus =new DAL_Menus();
        // GET: Administrator/Menu
        public ActionResult MenuGetList()
        {
            var model= DAL_Menus.GETALL(0).OrderByDescending(m=>m.CreatedOn).ToList();
            return View(model);
        }
        public ActionResult MenuInsertList(int? MenuId)
        {
            if (MenuId == null)
                MenuId = -1;

            var model = DAL_Menus.GETALL(MenuId.Value);
            return View(model);
        }

        [HttpPost]
        [ValidateInput(false)]
        public bool UpdateMenus(string data)
        {
            DTO_Menus model = JsonConvert.DeserializeObject<DTO_Menus>(data);
            bool result = DAL_Menus.UpdateMenu(model);
            return result;
        }
    }
}