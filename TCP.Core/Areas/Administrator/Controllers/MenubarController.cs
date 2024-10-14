using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TCP.DAL;
namespace TCP.Core.Areas.Administrator.Controllers
{
    public class MenubarController : Controller
    {
        DAL_Menubar DAL_Menubar = new DAL_Menubar();

        // GET: Administrator/Menubar
        public ActionResult GeMenubartList()
        {
            var model = DAL_Menubar.GETALL();
            return View(model);
        }

        [HttpPost]
        public bool MenubarShow(int id, int idorder)
        {
            var result = DAL_Menubar.UpdateMenubar(id, idorder);
            return result;
        }
    }
}