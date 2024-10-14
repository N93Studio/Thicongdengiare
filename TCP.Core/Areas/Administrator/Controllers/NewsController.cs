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
    public class NewsController : Controller
    {
        DAL_NewsCategories objDal_Productcate = new DAL_NewsCategories();
        DAL_News objDal_Product = new DAL_News();
        // GET: Administrator/Products

        [HttpPost]
        public bool NewsSort(int id, int idorder)
        {
            var result = objDal_Product.UpdateProductCategoriesOrder(id, idorder);
            return result;
        }
        public ActionResult NewsGetList(int ? NewsCategoryId)
        {
            ViewBag.NewsCategoryId = NewsCategoryId;
            ViewBag.Listcate = objDal_Productcate.GETALL("", 0, 0, -1).ToList();
            return View();
        }
        [HttpPost]
        public ActionResult NewsGetData(int idcate,string keysearch, int? NewsCategoryId)
        {
            ViewBag.NewsCategoryId = NewsCategoryId;
            keysearch = keysearch != null ? keysearch : "";
            var model = objDal_Product.GETALL("", 0, 0, 1, 1000).Where(m => Tool.Utils.CheckSplit(m.ParentID, int.Parse(idcate.ToString())) || idcate == 0).ToList();
            if(!string.IsNullOrEmpty(keysearch))
            {
                model = model.Where(m => m.NewsTitle.ToLower().Contains(keysearch.ToLower())).ToList();
            }
            model = model.OrderByDescending(m => m.DisplayOrder).ToList();
            foreach(var item in model)
            {
                var getsplit = item.ParentID.Split(',');
                item.NewsCategoryTitle= objDal_Productcate.GETALL("", 0, int.Parse(getsplit[1].ToString()), -1).FirstOrDefault().NewsCategoryTitle;
            }
            return PartialView(model);
        }
        public ActionResult NewsInsertList(int? NewsId, int? NewsCategoryId)
        {
            ViewBag.NewsCategoryId = NewsCategoryId;
            if (NewsId == null)
                NewsId = -1;

            var model = objDal_Product.GETALL("", int.Parse(NewsId.ToString()), -1, 1, 20);
            if (model != null && model.Count() > 0)
            {
                var lsts = model.FirstOrDefault().ParentID.Split(',');
                ViewBag.Selected = lsts[lsts.Length - 1];
            }
            else
            {
                ViewBag.Selected = 0;
            }
            ViewBag.ListProCate = objDal_Productcate.GETALL("", 0, 0, -1).ToList();
         
            return View(model);
        }
        [HttpPost]
        [ValidateInput(false)]
        public bool UpdateNews(string data)
        {
            DTO_News model = JsonConvert.DeserializeObject<DTO_News>(data);
            model.CreatedBy = 1;
            if (model.Title == "")
                model.Title = model.NewsTitle;
            if (model.Url == "")
            {
                model.Url = Utils.ConvertToUnSign(model.Title);

            }
            model.NewsUrl = model.Url;
              var lastRow = objDal_Product.GETALL("", 0, 0, 1, 1000).LastOrDefault();
            if (lastRow != null)
            {
                model.DisplayOrder = lastRow.DisplayOrder+1;
            }
            else
            {
                model.DisplayOrder = 1;
            }
            string newsImage = model.NewsImage;
            //
            if (!System.IO.File.Exists(Server.MapPath("~/Upload/News/" + newsImage)))
            {
                if (newsImage != "")
                {
                    try
                    {
                        if (!System.IO.File.Exists(Server.MapPath("~/Upload/News/" + newsImage)))
                        {
                            Directory.CreateDirectory(Server.MapPath("~/Upload/News"));
                            System.IO.File.Move(Server.MapPath("~/Upload/Temp/" + newsImage), Server.MapPath("~/Upload/News/" + newsImage));
                        }
                    }
                    catch (Exception) { }
                }
            }
            //
            bool result = objDal_Product.UpdateNews(model);
            //Multi images
            int idProductsnews = 0;
            if (model.NewsId == 0)
            {
                idProductsnews = objDal_Product.GETALL("", 0, 0, 1, 20).OrderByDescending(m => m.NewsId).FirstOrDefault().NewsId;
            }
            else
            {
                idProductsnews = model.NewsId;
            }

         

            return result;
        }
        public ActionResult NewsCategoryselect(int parentId)
        {
            var model = objDal_Productcate.GETALL("", parentId, 0, -1).ToList();
            return PartialView(model);
        }

        [HttpPost]
        public int NewsDelete(int NewsID)
        {
            var model = objDal_Product.NewsDelete(NewsID);
            return 1;
        }
        [HttpPost]
        public bool NewsShow(int id, int idorder)
        {
            var result = objDal_Product.UpdateNewsshow(id, idorder);
            return result;
        }
    }
}