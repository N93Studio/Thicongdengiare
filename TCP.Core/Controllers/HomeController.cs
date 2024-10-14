using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TCP.DAL;
using TCP.DTO;
using System.Data;
using System.Globalization;
using System.Text;
namespace TCP.Core.Controllers
{

    public class HomeController : Controller
    {
        DAL_Scripts objscript = new DAL_Scripts();
        #region Khai báo
        private int phanTrangSP = 20;
        DAL_NewsCategories objnewsCategory = new DAL_NewsCategories();
        DAL_Slideshow objslide = new DAL_Slideshow();
        DAL_News objnews = new DAL_News();
        DAL_Menus _objmenu = new DAL_Menus();
        DAL_Contacts objcontact = new DAL_Contacts();
        DAL_Products objproduct = new DAL_Products();
        DAL_ProductCategories objprodcate = new DAL_ProductCategories();
        DAL_Orders objorder = new DAL_Orders();
        //Infor
        DAL_Infors objInfo = new DAL_Infors();
        DAL_Orders objOrder = new DAL_Orders();
        DAL_Doitac objDoitac = new DAL_Doitac();
        DAL_KhoaHoc objKhoahoc = new DAL_KhoaHoc();

        #endregion
        public ActionResult ThankYou()
        {
            return View();
        }
        public ActionResult Page404()
        {
            return View();
        }

        public ActionResult ProductcateMenuchild(int ParentID)
        {
            ViewBag.ParentID = ParentID;
            var model = objprodcate.GETALL("", ParentID, 0, -1).ToList();
            return PartialView(model);
        }

        public ActionResult ProductcateMenu(int ParentID)
        {
            var model = objprodcate.GETALL("", ParentID, 0, -1).ToList();
            return PartialView(model);
        }
        public ActionResult GetBreadcumsProduct(string parentid)
        {
            var getstring = parentid.Split(',');
            List<DTO_ProductCategories> listCate = new List<DTO_ProductCategories>();
            foreach(var item in getstring)
            {
                var it = objprodcate.GETALL("", -1, int.Parse(item), -1).FirstOrDefault();
                listCate.Add(it);
            }
            return PartialView(listCate);
        }
        public ActionResult GetProductImages(int idproduct)
        {
            var model = objproduct.GETImages(idproduct).ToList();
            return PartialView(model);
        }
        public ActionResult Search(string key)
        {
            var model = objproduct.GETALL("", 0, 0, 1, 100).Where(m=>RemoveUnicode(m.ProductTitle.ToLower()).Contains(RemoveUnicode(key.ToLower()))).ToList();
            return PartialView(model);
        }
        public ActionResult ProductsCategory(int id, string name, int? page,string url)
        {
            ViewBag.Parant = objprodcate.GETALL("",-1, id, -1).FirstOrDefault();
            ViewBag.title = name;
            ViewBag.Info = objInfo.GETALL().FirstOrDefault();
            ViewBag.productctate = objprodcate.GETALL("", 0, 0, -1).ToList();
            ViewBag.SeoCate = objprodcate.GETALL("", -1, id, -1).FirstOrDefault().ProductCategoryContents;
            ViewBag.url = url;
            int pages = 0;
            if (page == null)
                pages = 1;
            else
                pages = int.Parse(page.ToString());
            var model = objproduct.GETALL("", 0, 0, 1, 1).Where(m=>m.IsShow==1).Where(m => Tool.Utils.CheckSplit(m.ParentID, id) || id == 0).OrderByDescending(m => m.DisplayOrder).ToList();
            //
            int totalSP = model.Count();
            int tongSoTrang = totalSP / phanTrangSP;
            int sodu = totalSP - (tongSoTrang * phanTrangSP);
            if (sodu > 0)
                tongSoTrang += 1;
            ViewBag.pages = pages;
            ViewBag.tongSoTrang = tongSoTrang;
            ViewBag.Seo = objprodcate.GETALL("",-1, id, -1).ToList();
            model = model.Skip((pages - 1) * phanTrangSP).Take(phanTrangSP).ToList();
            //
            return PartialView(model);
        }

        public ActionResult ProductcategoryChild(int IdCate)
        {
            var model = objproduct.GETALL("", 0, 0, 1, 1).Where(m => m.IsShow == 1).Where(m => Tool.Utils.CheckSplit(m.ParentID, IdCate) || IdCate == 0).OrderByDescending(m => m.DisplayOrder).ToList();

            return PartialView(model);
        }
        //Chi tiết sản phẩm
        public ActionResult Products(int id, string name)
        {

            ViewBag.Info = objInfo.GETALL().FirstOrDefault();
            var model = objproduct.GETALL("", id, 1, 1, 100).ToList();
            ViewBag.ProductImage = objproduct.GETImages(id).ToList();
            ViewBag.title = name;
            ViewBag.ListLienquan = objproduct.GETALL("", 0, 0, 1, 4).ToList().Where(m => m.ProductId != id && m.ParentID== model.FirstOrDefault().ParentID).ToList();
            //Get breadcum Product category
            var getparant = model.FirstOrDefault().ParentID.Split(',');
            var parentid = int.Parse(model.FirstOrDefault().ParentID.Split(',')[getparant.Length-1]);
            ViewBag.Listbreadcum = objprodcate.GETALL("", -1, parentid, -1).ToList();
            ViewBag.Parent= objprodcate.GETALL("", -1, parentid, -1).FirstOrDefault();
            ViewBag.Tintuc = objnews.GETALL("", 0, 1, 1, 100).Where(m => Tool.Utils.CheckSplit(m.ParentID, 3053)).OrderByDescending(m => m.DisplayOrder).Take(5).ToList();

            return PartialView(model);
        }
        public ActionResult MenuTop()
        {
            DataTable dtb = (DataTable)Session["giohang"];
            int totals = 0;
            if (dtb != null)
            {
                foreach (DataRow item in dtb.Rows)
                {
                    totals += int.Parse(item["Amount"].ToString());
                }
                ViewBag.totals = totals;
            }

            ViewBag.Info = objInfo.GETALL().FirstOrDefault();
            ViewBag.Listproductcategory = objprodcate.GETALL("", 0, 0, -1).OrderBy(m => m.DisplayOrder).ToList();
            ViewBag.DichVu = objnews.GETALL("", 0, 1, 1, 100).Where(m => Tool.Utils.CheckSplit(m.ParentID, 3046)).ToList();
            return PartialView();
        }
        public ActionResult MenuTop2()
        {
            ViewBag.Listproductcategory = objprodcate.GETALL("", 0, 0, -1).OrderBy(m => m.DisplayOrder).Where(m => m.ProductCategoryId != 2073 && m.ProductCategoryId != 2074).ToList();

            return PartialView();
        }
        public ActionResult Menuchild(int ParentID)
        {
            var model= objprodcate.GETALL("", ParentID, 0, -1).OrderBy(m => m.DisplayOrder).ToList();
            return PartialView(model);
        }
        public ActionResult Menuchild2(int ParentID)
        {
            var model = objprodcate.GETALL("", ParentID, 0, -1).OrderBy(m => m.DisplayOrder).ToList();
            return PartialView(model);
        }
        public ActionResult Footer()
        {
            ViewBag.Info = objInfo.GETALL().FirstOrDefault();
            ViewBag.Chinhsach = objnews.GETALL("", 0, 1, 1, 100).Where(m => Tool.Utils.CheckSplit(m.ParentID, 3054)).OrderByDescending(m => m.DisplayOrder).ToList();

            return PartialView();
        }
        public ActionResult Test()
        {
            return View();
        }
        public ActionResult Index(string name)
        {
           
            ViewBag.Slideshow = objslide.GETALL(0).ToList();
            ViewBag.Listproductcategory = objprodcate.GETALL("", 0, 0, -1).OrderBy(m => m.DisplayOrder).ToList();
            ViewBag.Tintuc = objnews.GETALL("", 0, 1, 1, 100).Where(m => Tool.Utils.CheckSplit(m.ParentID, 3053)).OrderByDescending(m=>m.DisplayOrder).Take(8).ToList();
            ViewBag.Duan = objnews.GETALL("", 0, 1, 1, 100).Where(m => Tool.Utils.CheckSplit(m.ParentID, 3052)).OrderByDescending(m => m.DisplayOrder).Take(8).ToList();
            //
            ViewBag.Doitac = objDoitac.GETALL(0);
            ViewBag.Vechungtoi = objnewsCategory.GETALL("", -1, 3055, -1);
            ViewBag.Vechungtoilist = objnews.GETALL("", 0, 1, 1, 100).Where(m => Tool.Utils.CheckSplit(m.ParentID, 3055)).OrderByDescending(m => m.DisplayOrder).ToList();

            return PartialView();
        } 
        public ActionResult ProductByCate(int ProductCategoryId,string url)
        {
            var model = objproduct.GETALL("", 0, 0, 1, 1).Where(m => m.IsShow == 1).Where(m => Tool.Utils.CheckSplit(m.ParentID, ProductCategoryId) || ProductCategoryId == 0).OrderByDescending(m => m.DisplayOrder).ToList();
            ViewBag.Parentid = ProductCategoryId;
            ViewBag.Viewall = url;
            return PartialView(model);
        }
        public ActionResult News(int id,string name)
        {
            ViewBag.title = name;
            var model = objnews.GETALL("", id, 1, 1, 10).ToList();

            var lststring = model.FirstOrDefault().ParentID.Split(',');
            List<DTO_NewsCategories> lsts = new List<DTO_NewsCategories>();
            foreach (var item in lststring)
            {
                if (item != "0")
                {
                    DTO_NewsCategories  objs= objnewsCategory.GETALL("", -1, int.Parse(item), -1).FirstOrDefault();
                    lsts.Add(objs);
                }
            }
            ViewBag.Name = name;
            ViewBag.ParentName = lsts;
            ViewBag.Listlienquan = objnews.GETALL("", 0, 1, 1, 5).Where(m => m.NewsId != id).ToList();
            return PartialView(model);
        }
        public ActionResult NewsCategories(int id, string name)
        {
            ViewBag.title = name;
            var model = objnews.GETALL("", 0, 1, 1, 50).Where(m => Tool.Utils.CheckSplit(m.ParentID, int.Parse(id.ToString())) || id == 0);
            var child = objnewsCategory.GETALL("", -1, id, -1).FirstOrDefault();
            if (child.ParentID != 0)
            {
                ViewBag.parent = objnewsCategory.GETALL("", -1, child.ParentID, -1).ToList();

            }
            ViewBag.Title = name;
            ViewBag.Albumn = objnewsCategory.GETALL("", 1034, 0, -1).ToList();
            return PartialView(model);
        }
        public ActionResult About(string name)
        {
            ViewBag.title = name;
            ViewBag.Info = objInfo.GETALL().FirstOrDefault();
            return PartialView();
        }

     
        public ActionResult Handle(string url)
        {
            if (url == "")
                url = "/";
            var model = _objmenu.GETMenuTemplate(url);
            //if (model.Count()>0 && model.FirstOrDefault().Title == "Trang chủ")
            //{
            //    var md = objscript.GETALL(0).Where(m => m.Name== "Meta Description Trang chủ").FirstOrDefault();
            //    var kw= objscript.GETALL(0).Where(m => m.Name == "Meta Keyword Trang chủ").FirstOrDefault();
            //    if (md != null)
            //        model.FirstOrDefault().MetaDescription = md.Contents;
            //    if (kw != null)
            //        model.FirstOrDefault().MetaKeywords = kw.Contents;
            //}
            //else
            //{
               

            //}
            if (model.Count() == 0)
                return View("Page404");
            return View(model);
        }
        public bool SendContact(string data)
        {
            DTO_Contacts model = JsonConvert.DeserializeObject<DTO_Contacts>(data);
            objcontact.UpdateInfors(model);
            return true;
        }
        public ActionResult Contact(string name)
        {
            ViewBag.title = name;

            ViewBag.Info = objInfo.GETALL().FirstOrDefault();
            return PartialView();
        }

        public ActionResult GioHang()
        {
            float totals = 0;
            DataTable dtb = (DataTable)Session["giohang"];
            ViewBag.dt = dtb;
            ViewBag.title = "Giỏ hàng";
            if (dtb != null)
            {
                foreach (DataRow item in dtb.Rows)
                {
                    totals += float.Parse(item["Total"].ToString());
                }
            }
            
            ViewBag.total = totals;
            return PartialView();
        }
        public ActionResult ThanhToan()
        {
            float totals = 0;
            DataTable dtb = (DataTable)Session["giohang"];
            ViewBag.dt = dtb;
            ViewBag.title = "Thanh toán";
            if (dtb != null)
            {
                foreach (DataRow item in dtb.Rows)
                {
                    totals += float.Parse(item["Total"].ToString());
                }
            }
           
            ViewBag.total = totals;
            return PartialView();
        }
        [HttpPost]
        public bool InsertThanhToan(string data)
        {
            DataTable dtb = (DataTable)Session["giohang"];
            float totals = 0;
            foreach (DataRow item in dtb.Rows)
            {
                totals += float.Parse(item["Total"].ToString());
            }
            DTO_Customer model = JsonConvert.DeserializeObject<DTO_Customer>(data);
            var result= objorder.UpdateProducts(model);
            objOrder.UpdateOrders(model.Desciptions,totals);


          
            foreach (DataRow item in dtb.Rows)
            {
                DTO_OrderDetail orderDetail = new DTO_OrderDetail();
                orderDetail.ProductId = int.Parse(item["ProductId"].ToString());
                orderDetail.Prices = float.Parse(item["ProductPrice"].ToString());
                orderDetail.Amount = int.Parse(item["Amount"].ToString());
                objorder.UpdateOrdersDetail(orderDetail);
            }
            Session["giohang"] = null;
            return true;
        }

        public ActionResult LoadAlbumn(int NewsCategoryId)
        {
            ViewBag.parentid = NewsCategoryId;
            var model = objnews.GETALL("", 0, 1, 1, 100).Where(m => Tool.Utils.CheckSplit(m.ParentID, NewsCategoryId)).Take(10).ToList();
            return PartialView(model);
        }
        [HttpPost]
        public void DangKyKhoaHoc(string data)
        {
            
            DTO_KhoaHoc model = JsonConvert.DeserializeObject<DTO_KhoaHoc>(data);
            model.DateCreated = DateTime.Now;
            objKhoahoc.UpdateKhoaHoc(model);

        }

        public ActionResult Tourtrongnuoc()
        {
            var model= objprodcate.GETALL("", 0, 0, -1).ToList();
            return PartialView(model);
        }
        public static string RemoveUnicode(string text)
        {
            string[] arr1 = new string[] { "á", "à", "ả", "ã", "ạ", "â", "ấ", "ầ", "ẩ", "ẫ", "ậ", "ă", "ắ", "ằ", "ẳ", "ẵ", "ặ",
    "đ",
    "é","è","ẻ","ẽ","ẹ","ê","ế","ề","ể","ễ","ệ",
    "í","ì","ỉ","ĩ","ị",
    "ó","ò","ỏ","õ","ọ","ô","ố","ồ","ổ","ỗ","ộ","ơ","ớ","ờ","ở","ỡ","ợ",
    "ú","ù","ủ","ũ","ụ","ư","ứ","ừ","ử","ữ","ự",
    "ý","ỳ","ỷ","ỹ","ỵ",};
            string[] arr2 = new string[] { "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a",
    "d",
    "e","e","e","e","e","e","e","e","e","e","e",
    "i","i","i","i","i",
    "o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o",
    "u","u","u","u","u","u","u","u","u","u","u",
    "y","y","y","y","y",};
            for (int i = 0; i < arr1.Length; i++)
            {
                text = text.Replace(arr1[i], arr2[i]);
                text = text.Replace(arr1[i].ToUpper(), arr2[i].ToUpper());
            }
            return text;
        }
    }
}