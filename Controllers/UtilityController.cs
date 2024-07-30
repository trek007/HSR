using KIPP.DataTools.BL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using Kendo.Mvc.Extensions;
using KIPP.DataTools.BL.Model;

namespace KIPP.DataTools.UI.Controllers
{
    public class UtilityController : Controller
    {
        [HttpGet]
        public JsonResult GetDomainMasters()
        {
            try
            {
                List<DomainModel> lstDomains;

                using (var objVmtBusinessManager = new VmtBusinessManager())
                {
                    lstDomains = objVmtBusinessManager.GetDomainMasters();
                }

                return Json(lstDomains, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        public JsonResult GetRegionMasters()
        {
            try
            {
                List<RegionModel> lstRegions;

                using (var objVmtBusinessManager = new VmtBusinessManager())
                {
                    lstRegions = objVmtBusinessManager.GetRegionMasters();
                }

                return Json(lstRegions, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //public async JsonResult ExecuteApiService<T>(string url, List<T> type)
        //{
        //    using (HttpClient cons = new HttpClient())
        //    {
        //        cons.BaseAddress = new Uri("http://localhost:57055/");
        //        cons.DefaultRequestHeaders.Accept.Clear();
        //        cons.DefaultRequestHeaders.Accept.Add(
        //            new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
        //        using (cons)
        //        {
        //            HttpResponseMessage res = await cons.GetAsync("api/tblTags/2");
        //            res.EnsureSuccessStatusCode();
        //            if (res.IsSuccessStatusCode)
        //            {
        //                type = await res.Content.ReadAsAsync<type>().Result;
        //                return type;
        //            }
        //        }
        //    }
        //}
    }
}