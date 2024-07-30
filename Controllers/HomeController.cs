using System.Web.Mvc;
using System.Configuration;
using System.Collections;

namespace HSR.Controllers
{
    public class HomeController : Controller
    {
        public string currentEnvironment = "";

        public HomeController()
        {
            ReadSettings();
        }

        [Authorize]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        /// <summary>
        /// Returns the StateTestScores View
        /// </summary>
        /// <returns></returns>
        public ActionResult StateTestScores()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevStateTestScores");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgStateTestScores");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("StateTestScores");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("StateTestScores");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        public ActionResult Attainment()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevStateOfStateAttainmentReports");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgStateOfStateAttainmentReports");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("StateOfStateAttainmentReports");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("StateOfStateAttainmentReports");

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