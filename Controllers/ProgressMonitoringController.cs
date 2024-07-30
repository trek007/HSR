using System.Web.Mvc;
using System.Configuration;
using System.Collections;

namespace HSR.Controllers
{
    [Authorize]
    public class ProgressMonitoringController : Controller
    {
        public string currentEnvironment = "";

        public ProgressMonitoringController()
        {
            ReadSettings();
        }

        /// <summary>
        /// Sets the PMHome View as the default landing page
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View("PMHome");
        }

        /// <summary>
        /// Returns the Progress Monitoring home page
        /// </summary>
        /// <returns></returns>
        public ActionResult PMHome()
        {
            return View();
        }

        /// <summary>
        /// Returns the Grade View
        /// </summary>
        /// <returns></returns>
        public ActionResult Grade()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevProgressMonitoringGradeView");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgProgressMonitoringGradeView");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("ProgressMonitoringGradeView");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("ProgressMonitoringGradeView");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        /// <summary>
        /// Returns the Course View
        /// </summary>
        /// <returns></returns>
        public ActionResult Course()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevProgressMonitoringCourseView");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgProgressMonitoringCourseView");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("ProgressMonitoringCourseView");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("ProgressMonitoringCourseView");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        /// <summary>
        /// Returns the Teacher View
        /// </summary>
        /// <returns></returns>
        public ActionResult Teacher()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevProgressMonitoringTeacherView");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgProgressMonitoringTeacherView");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("ProgressMonitoringTeacherView");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("ProgressMonitoringTeacherView");

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