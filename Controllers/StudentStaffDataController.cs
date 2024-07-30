using System.Web.Mvc;
using System.Configuration;
using System.Collections;

namespace HSR.Controllers
{
    [Authorize]
    public class StudentStaffDataController : Controller
    {
        public string currentEnvironment = "";

        public StudentStaffDataController()
        {
            ReadSettings();
        }

        /// <summary>
        /// Sets the StudentEnrollment Report as the default report
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View("StudentEnrollment");
        }

        /// <summary>
        /// Returns the TeacherVariationRetention View
        /// </summary>
        /// <returns></returns>
        public ActionResult TeacherVariationRetention()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevStudentStaffDataTeacherVariationRetention");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgStudentStaffDataTeacherVariationRetention");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("StudentStaffDataTeacherVariationRetention");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("StudentStaffDataTeacherVariationRetention");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        /// <summary>
        /// Returns the Student Enrollment View
        /// </summary>
        /// <returns></returns>
        public ActionResult StudentEnrollment()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevStudentStaffDataStudentEnrollments");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgStudentStaffDataStudentEnrollments");
            else if (currentEnvironment == "Production"){
                //TODO: uncomment below line. Prod report coming soon
                report = (Hashtable)ConfigurationSettings.GetConfig("StudentStaffDataStudentEnrollments");
            }
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("StudentStaffDataStudentEnrollments");

            if (report != null) {
                ViewData["SiteRoot"] = report["Root"].ToString();
                ViewData["HostUrl"] = report["Url"].ToString();
                ViewData["ReportName"] = report["Name"].ToString();
                ViewData["CurrentEnvironment"] = currentEnvironment;
            }
            return View();
        }

        /// <summary>
        /// Returns the Caseload View
        /// </summary>
        /// <returns></returns>

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