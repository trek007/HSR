using System.Web.Mvc;
using System.Configuration;
using System.Collections;

namespace HSR.Controllers
{
    public class DemoController : Controller
    {
        public string currentEnvironment = "";

        public DemoController()
        {
            ReadSettings();
        }      

        public ActionResult AcademicHealth()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgAcademicHealth");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgAcademicHealth");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("AcademicHealth");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("AcademicHealth");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }
        public ActionResult Profile()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgProfile");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgProfile");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("Profile");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("Profile");

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