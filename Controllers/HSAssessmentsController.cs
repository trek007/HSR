using System.Web.Mvc;
using System.Configuration;
using System.Collections;

namespace HSR.Controllers
{
    [Authorize]
    public class HSAssessmentsController : Controller
    {
        public string currentEnvironment = "";

        public HSAssessmentsController()
        {
            ReadSettings();
        }

        /// <summary>
        /// Sets the AP For All Report as the default report
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View("ACT");
        }

        /// <summary>
        /// Returns the APForAll View
        /// </summary>
        /// <returns></returns>
        public ActionResult APForAll()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevHSAssessmentsAPForAll");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgHSAssessmentsAPForAll");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("HSAssessmentsAPForAll");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("HSAssessmentsAPForAll");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        /// <summary>
        /// Returns the ACTPrePostTest View
        /// </summary>
        /// <returns></returns>
        public ActionResult ACTPrePostTest_Archive()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevHSAssessmentsACTPrePostTest");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgHSAssessmentsACTPrePostTest");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("HSAssessmentsACTPrePostTest");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("HSAssessmentsACTPrePostTest");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View("ACTPrePostTest");
        }

        /// <summary>
        /// Returns the ACTInterims View
        /// </summary>
        /// <returns></returns>
        public ActionResult ACTInterims_Archive()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevHSAssessmentsACTInterims");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgHSAssessmentsACTInterims");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("HSAssessmentsACTInterims");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("HSAssessmentsACTInterims");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View("ACTInterims");
        }

        /// <summary>
        /// Returns the ACTInterims View
        /// </summary>
        /// <returns></returns>
        public ActionResult ACT()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevHSAssessmentsACT");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgHSAssessmentsACT");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("HSAssessmentsACT");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("HSAssessmentsACT");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }
        private void ReadSettings()
        {
            if (System.Web.HttpContext.Current.Request.Url.Host.Contains("dev") || System.Web.HttpContext.Current.Request.Url.Host.Contains("localhost"))
                currentEnvironment = "Development";
            else if (System.Web.HttpContext.Current.Request.Url.Host.Contains("stg"))
                currentEnvironment = "Staging";
            else
                currentEnvironment = "Production";
        }
    }

}