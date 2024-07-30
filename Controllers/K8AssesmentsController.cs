using System.Web.Mvc;
using System.Configuration;
using System.Collections;

namespace HSR.Controllers
{
    [Authorize]
    public class K8AssessmentsController : Controller
    {
        public string currentEnvironment = "";

        public K8AssessmentsController()
        {
             ReadSettings();
        }

        /// <summary>
        /// Sets the Amplify View as the default report
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View("Amplify");
        }

        /// <summary>
        /// Returns the Amplify View
        /// </summary>
        /// <returns></returns>
        public ActionResult Amplify()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevK8AssessmentsAmplify");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgK8AssessmentsAmplify");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("K8AssessmentsAmplify");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("K8AssessmentsAmplify");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        /// <summary>
        /// Returns the Eureka View
        /// </summary>
        /// <returns></returns>
        public ActionResult Eureka()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevK8AssessmentsEureka");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgK8AssessmentsEureka");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("K8AssessmentsEureka");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("K8AssessmentsEureka");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        /// <summary>
        /// Returns the Wheatley View
        /// </summary>
        /// <returns></returns>
        public ActionResult Wheatley()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevK8AssessmentsWheatley");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgK8AssessmentsWheatley");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("K8AssessmentsWheatley");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("K8AssessmentsWheatley");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;


            return View();
        }

        /// <summary>
        /// Returns the mCLASSDIBELS 8 View
        /// </summary>
        /// <returns></returns>
        public ActionResult mclassdibels8()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevK8AssessmentsmCLASSDIBELS8");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgK8AssessmentsmCLASSDIBELS8");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("K8AssessmentsmCLASSDIBELS8");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("K8AssessmentsmCLASSDIBELS8");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        /**************************************MAP Dashboards*************************************/
        /// <summary>
        /// Returns the Network Variation View
        /// </summary>
        /// <returns></returns>
        public ActionResult NetworkVariation()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevK8AssessmentsMapNetworkVariation");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgK8AssessmentsMapNetworkVariation");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("K8AssessmentsMapNetworkVariation");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("K8AssessmentsMapNetworkVariation");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] =  report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        /// <summary>
        /// Returns the Multi-Grade View
        /// </summary>
        /// <returns></returns>
        public ActionResult QuartileDistribution()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevK8AssessmentsMapQuartileDistribution");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgK8AssessmentsMapQuartileDistribution");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("K8AssessmentsMapQuartileDistribution");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("K8AssessmentsMapQuartileDistribution");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        /// <summary>
        /// Returns the Sub-Group Analysis by Starting Performance View
        /// </summary>
        /// <returns></returns>
        public ActionResult SubGroupStartingPerformance()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevK8AssessmentsMapSubGroupStartingPerformance");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgK8AssessmentsMapSubGroupStartingPerformance");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("K8AssessmentsMapSubGroupStartingPerformance");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("K8AssessmentsMapSubGroupStartingPerformance");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        /// <summary>
        /// Returns the Sub-Group Analysis by Gender View
        /// </summary>
        /// <returns></returns>
        public ActionResult SubGroupGender()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevK8AssessmentsMapSubGroupGender");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgK8AssessmentsMapSubGroupGender");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("K8AssessmentsMapSubGroupGender");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("K8AssessmentsMapSubGroupGender");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        /// <summary>
        /// Returns the Year Over Year View
        /// </summary>
        /// <returns></returns>
        public ActionResult YearOverYear()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevK8AssessmentsMapYOY");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgK8AssessmentsMapYOY");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("K8AssessmentsMapYOY");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("K8AssessmentsMapYOY");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        /// <summary>
        /// Returns the Multi-Grade View
        /// </summary>
        /// <returns></returns>
        public ActionResult MultiGrade()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevK8AssessmentsMapMultiGrade");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgK8AssessmentsMapMultiGrade");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("K8AssessmentsMapMultiGrade");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("K8AssessmentsMapMultiGrade");

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