using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Tool;
using System.IO;
using TCP.DAL;
namespace TCP.Core.Areas.Administrator.Controllers
{
    public class AjaxController : Controller
    {
        public DAL_Menus objMenu = new DAL_Menus();
        DAL_Menubar objMenubar = new DAL_Menubar(); 
        DAL_NewsCategories objNewsCategories = new DAL_NewsCategories();    
       [HttpPost]
       public string ConvertToUnSign(string url)
        {
            string geturl = Utils.ConvertToUnSign(url);
            return geturl;
        }


        public ActionResult GetSeoBox(int relatedId,int templateid)
        {
            var model = objMenu.GETALL(relatedId, templateid);
            return PartialView(model);
        }
        public ActionResult GetMenubar()
        {
            var model = objMenubar.GETALL().ToList();
            ViewBag.Donvichuquan = model.Where(m => m.MenubarId == 2).FirstOrDefault().IsShow;
            ViewBag.Slideshow = model.Where(m => m.MenubarId == 3).FirstOrDefault().IsShow;
            ViewBag.Danhsachlienhe = model.Where(m => m.MenubarId == 4).FirstOrDefault().IsShow;
            ViewBag.Doitac = model.Where(m => m.MenubarId == 5).FirstOrDefault().IsShow;
            ViewBag.Qlbv = model.Where(m => m.MenubarId == 6).FirstOrDefault().IsShow;
            ViewBag.Qlsp = model.Where(m => m.MenubarId == 7).FirstOrDefault().IsShow;
            ViewBag.Qldh = model.Where(m => m.MenubarId == 8).FirstOrDefault().IsShow;
            ViewBag.Logo = model.Where(m => m.MenubarId == 9).FirstOrDefault().IsShow;
            ViewBag.Qlseo = model.Where(m => m.MenubarId == 10).FirstOrDefault().IsShow;
            ViewBag.QlMenu = model.Where(m => m.MenubarId == 11).FirstOrDefault().IsShow;
            ViewBag.ListNewCate = objNewsCategories.GETALL("", -1,0, -1).ToList();
            return PartialView(model);   
        }
    }
}