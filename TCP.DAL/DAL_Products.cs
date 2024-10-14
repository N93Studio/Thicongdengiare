using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using TCP.DTO;
namespace TCP.DAL
{
    public  class DAL_Products
    {
        public bool UpdateProductshow(int ProductId, int IsShow)
        {
            var param = new DynamicParameters();
            param.Add("@ProductId", ProductId);
            param.Add("@IsShow", IsShow);
            return DapperHelper.Execute("TCP_Product_Show", param) >= 1 ? true : false;
        }
        public bool UpdateProductAge(int ProductId, string Age)
        {
            var param = new DynamicParameters();
            param.Add("@ProductId", ProductId);
            param.Add("@Age", Age);
            return DapperHelper.Execute("TCP_Product_Age", param) >= 1 ? true : false;
        }
        public bool updateDeXuat(int ProductId, int IsShow)
        {
            var param = new DynamicParameters();
            param.Add("@ProductId", ProductId);
            param.Add("@Age", IsShow);
            return DapperHelper.Execute("TCP_Product_updateDeXuat", param) >= 1 ? true : false;
        }
        public bool updateKhoihanh(int ProductId, int IsShow)
        {
            var param = new DynamicParameters();
            param.Add("@ProductId", ProductId);
            param.Add("@Weeks", IsShow);
            return DapperHelper.Execute("TCP_Product_updateKhoiHanh", param) >= 1 ? true : false;
        }
        public bool UpdateProductOrder(int ProductId, int DisplayOrder)
        {
            var param = new DynamicParameters();
            param.Add("@ProductId", ProductId);
            param.Add("@DisplayOrder", DisplayOrder);
            return DapperHelper.Execute("TCP_Product_Sort", param) >= 1 ? true : false;
        }
        public IEnumerable<DTO_Products> GETALL(string strKey,int ProductId, int isShow,int page,int pageSize)
        {
            try
            {
                var param = new DynamicParameters();
                param.Add("@strKey", strKey);
                param.Add("@isShow", isShow);
                param.Add("@ProductId", ProductId);
                param.Add("@page", page);
                param.Add("@pageSize", pageSize);
                return DapperHelper.Query<DTO_Products>("TCP_Products_SEL", param);
            }
            catch (Exception ex)
            { throw ex; }
        }
        public bool UpdateProducts(DTO_Products data)
        {
            var param = new DynamicParameters();
            param.Add("@ProductId", data.ProductId);
            param.Add("@ProductTitle", data.ProductTitle);
            param.Add("@ProductUrl", data.ProductUrl);
            param.Add("@ProductImage", data.ProductImage);
            param.Add("@ProductPrice", data.ProductPrice);
            param.Add("@ProductPriceDrop", data.ProductPriceDrop);
            param.Add("@Age", data.Age);
            param.Add("@Weeks", data.Weeks);
            param.Add("@SoNgay", data.SoNgay);
            param.Add("@PhuongTien", data.PhuongTien);
            param.Add("@ProductDesc", data.ProductDesc);
            param.Add("@ProductContents", data.ProductContents);
            param.Add("@DisplayOrder", data.DisplayOrder);
            param.Add("@IsShow", data.IsShow);
            param.Add("@ParentID", data.ParentID);
            param.Add("@CreatedBy", data.CreatedBy);

            param.Add("@Title", data.Title);
            param.Add("@Url", data.Url);
            param.Add("@MetaDescription", data.MetaDescription);
            param.Add("@MetaKeywords", data.MetaKeywords);
            return DapperHelper.Execute("TCP_Products_SAVE", param) >= 1 ? true : false;
        }

        //

        public bool UpdateProductImg(int ProductId,string Images)
        {
            var param = new DynamicParameters();
            param.Add("@ProductId", ProductId);
            param.Add("@Images", Images);
            return DapperHelper.Execute("TCP_Img_SAVE", param) >= 1 ? true : false;
        }

        //

        public IEnumerable<DTO_Images> GETImages(int ProductId)
        {
            try
            {
                var param = new DynamicParameters();
                param.Add("@ProductId", ProductId);
                return DapperHelper.Query<DTO_Images>("TCP_Img_SEL", param);
            }
            catch (Exception ex)
            { throw ex; }
        }
        public bool DeleteProductImage(int ProductId,string Images)
        {
            var param = new DynamicParameters();
            param.Add("@ProductId", ProductId);
            param.Add("@Images", Images);
            var result= DapperHelper.Execute("TCP_Delete_Img", param);

            return true;

        }
        public int ProductsDelete(int ProductID)
        {
            try
            {
                var param = new DynamicParameters();
                param.Add("@ProductId", ProductID);
                return DapperHelper.Execute("TCP_Products_DEL", param);
            }
            catch (Exception ex)
            { throw ex; }
        }
    }
}
