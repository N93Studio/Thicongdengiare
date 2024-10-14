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
    public class ProductsController : Controller
    {
        private int phanTrangSP=15;
        DAL_ProductCategories objDal_Productcate = new DAL_ProductCategories();
        DAL_Products objDal_Product = new DAL_Products();
        // GET: Administrator/Products
        public ActionResult Index()
        {
           
            return View();
        }
        [HttpPost]
        public bool ProductShow(int id, int idorder)
        {
            var result = objDal_Product.UpdateProductshow(id, idorder);
            return result;
        }
        [HttpPost]
        public bool ProductAge(int id, string Age)
        {
            var result = objDal_Product.UpdateProductAge(id, Age);
            return result;
        }
        public bool updateDeXuat(int id, int idorder)
        {
            var result = objDal_Product.updateDeXuat(id, idorder);
            return result;
        }
        public bool updateKhoihanh(int id, int idorder)
        {
            var result = objDal_Product.updateKhoihanh(id, idorder);
            return result;
        }
        [HttpPost]
        public bool ProductSort(int id, int idorder)
        {
            var result = objDal_Product.UpdateProductOrder(id, idorder);
            return result;
        }
        public ActionResult ProductsGetList(int ? idcate,int ? page)
        {
            var lstparent = objDal_Productcate.GETALL("", 0, 0, -1).ToList();
            ViewBag.Listcate = lstparent;
            return View();
        }
        public ActionResult ProductsGetListChild(int ParentID)
        {
            ViewBag.Listcate = objDal_Productcate.GETALL("", ParentID, 0, -1).ToList();
            return View();
        }
        [HttpPost]
        public string GetNameImages(int ProductID)
        {
            var nod = objDal_Product.GETImages(int.Parse(ProductID.ToString()));
            string img = "";
            foreach(var item in nod)
            {
                img += item.Images + ",";

            }
            return img;
        }
        [HttpPost]
        public ActionResult ProductsGetData(int idcate)
        {
            var model = objDal_Product.GETALL("",0, 0, 1, 20).Where(m =>Tool.Utils.CheckSplit(m.ParentID,idcate) || idcate==0).OrderByDescending(m=>m.DisplayOrder).ToList();
            if (model != null)
            {
                foreach (var item in model)
                {
                    var getsplit = item.ParentID.Split(',');
                    if (getsplit!=null)
                    {
                        string ProductCategoryTitle = "";
                        for (int i = 0; i <= getsplit.Length - 1; i++)
                        {
                            if (getsplit[i] != "0" && getsplit[i] != "")
                            {
                                if (i < (getsplit.Length - 1))
                                    ProductCategoryTitle += objDal_Productcate.GETALL("", -1, int.Parse(getsplit[i]), -1).FirstOrDefault().ProductCategoryTitle + " - ";
                                else
                                    ProductCategoryTitle += objDal_Productcate.GETALL("", -1, int.Parse(getsplit[i]), -1).FirstOrDefault().ProductCategoryTitle;
                            }
                        }
                        item.ProductCategoryTitle = ProductCategoryTitle;
                    }
                   
                }
            }
           
            return PartialView(model);
        }
        public ActionResult ProductsInsertList(int? ProductId)
        {
            if (ProductId == null)
                ProductId = -1;

            var model = objDal_Product.GETALL("", int.Parse(ProductId.ToString()), - 1,1,20);
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
            //
            var nod = objDal_Product.GETImages(int.Parse(ProductId.ToString()));
           
            ViewBag.ListImage = nod;
            return View(model);
        }
        [HttpPost]
        [ValidateInput(false)]
        public bool UpdateProductCategories(string data)
        {
            DTO_Products model = JsonConvert.DeserializeObject<DTO_Products>(data);
            DTO_Products dtprod = objDal_Product.GETALL("", 0, 0, 1, 1).ToList().OrderByDescending(m => m.ProductId).FirstOrDefault();
            var get = dtprod != null ? dtprod.DisplayOrder + 1 : 1;
            model.DisplayOrder = get;
            model.CreatedBy = 1;
            if (model.Title == "")
                model.Title = model.ProductTitle;
            if (model.Url == "")
            {
                model.Url = Utils.ConvertToUnSign(model.Title);

            }
            model.ProductUrl = model.Url;

            string newsImage = model.ProductImage;
            //
            if (!System.IO.File.Exists(Server.MapPath("~/Upload/Products/" + newsImage)))
            {
                if (newsImage != "")
                {
                    try
                    {
                        if (!System.IO.File.Exists(Server.MapPath("~/Upload/Products/" + newsImage)))
                        {
                            Directory.CreateDirectory(Server.MapPath("~/Upload/Products"));
                            System.IO.File.Move(Server.MapPath("~/Upload/Temp/" + newsImage), Server.MapPath("~/Upload/Products/" + newsImage));
                        }
                    }
                    catch (Exception) { }
                }
            }
            //
            bool result = objDal_Product.UpdateProducts(model);
            //Multi images
            int idProductsnews = 0;
            if (model.ProductId == 0)
            {
                 idProductsnews = objDal_Product.GETALL("", 0, 0, 1, 20).OrderByDescending(m => m.ProductId).FirstOrDefault().ProductId;
            }
            else
            {
                idProductsnews = model.ProductId;
            }

            string[] lstStr = model.multiImage.Split(',');
            foreach(var item in lstStr.ToList())
            {
                if (!string.IsNullOrEmpty(item))
                {
                   var rs= objDal_Product.UpdateProductImg(idProductsnews, item);
                    if (!System.IO.File.Exists(Server.MapPath("~/Upload/ProductsImg/" + item)))
                    {
                        if (item != "")
                        {
                            try
                            {
                                if (!System.IO.File.Exists(Server.MapPath("~/Upload/ProductsImg/" + item)))
                                {
                                    Directory.CreateDirectory(Server.MapPath("~/Upload/ProductsImg"));
                                    System.IO.File.Move(Server.MapPath("~/Upload/Temp/" + item), Server.MapPath("~/Upload/ProductsImg/" + item));
                                }
                            }
                            catch (Exception) { }
                        }
                    }
                }
               
            }

            return result;
        }
        public ActionResult ProductCategoryselect(int parentId)
        {
            var model = objDal_Productcate.GETALL("", parentId, 0, -1).ToList();
            return PartialView(model);
        }
        [HttpPost]
        public bool DeleteProductsImage(int ProductId,string Images)
        {
            var result = objDal_Product.DeleteProductImage(ProductId, Images);
            return true;
        }
        [HttpPost]
        public int ProductsDelete(int ProductID)
        {
            var model = objDal_Product.ProductsDelete(ProductID);
            return 1;
        }
    }
}