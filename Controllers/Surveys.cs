using System.Web.Mvc;
using System.Configuration;
using System.Collections;

namespace HSR.Controllers
{
    [Authorize]
    public class SurveysController : Controller
    {
        public string currentEnvironment = "";

        public SurveysController()
        {
            ReadSettings();
        }

        /// <summary>
        /// Sets the TeacherVariationRetention Report as the default report
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View("TNTP");
        }

        /// <summary>
        /// Returns the TNTP School Report View
        /// </summary>
        /// <returns></returns>
        public ActionResult TNTP()
        {
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        /// <summary>
        /// Returns the TNTP Regional Report View
        /// </summary>
        /// <returns></returns>
        public ActionResult Regional()
        {
            return View();
        }

        /// <summary>
        /// Returns the TNTP Foundation Report View
        /// </summary>
        /// <returns></returns>
        public ActionResult Foundation()
        {
            return View();
        }

        [Route("School/SurveyQuestionTable")]
        /// <summary>
        /// Returns the Survey Question Table View
        /// </summary>
        /// <returns></returns>
        public ActionResult SurveyQuestionTable()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevTNTPSurveyQuestionTable");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgTNTPSurveyQuestionTable");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPSurveyQuestionTable");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPSurveyQuestionTable");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["FriendlyName"] = report["FriendlyName"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        [Route("School/TeacherSurveyReports")]
        /// <summary>
        /// Returns the TNTP Teacher Survey Reports View
        /// </summary>
        /// <returns></returns>
        public ActionResult TeacherSurveyReports()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevTNTPSchoolTeacher");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgTNTPSchoolTeacher");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPSchoolTeacher");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPSchoolTeacher");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["FriendlyName"] = report["FriendlyName"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        [Route("School/TeacherSurveyReportsPrintableFall2019")]
        /// <summary>
        /// Returns the Fall 2019 Printable TNTP Teacher Survey Reports View
        /// </summary>
        /// <returns></returns>
        public ActionResult TeacherSurveyReportsPrintableFall2019()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevTNTPSchoolTeacherPrintableFall2019");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgTNTPSchoolTeacherPrintableFall2019");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPSchoolTeacherPrintableFall2019");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPSchoolTeacherPrintableFall2019");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["FriendlyName"] = report["FriendlyName"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        [Route("School/TeacherSurveyReportsPrintableSpring2020")]
        /// <summary>
        /// Returns the Spring 2020 Printable TNTP Teacher Survey Reports View
        /// </summary>
        /// <returns></returns>
        public ActionResult TeacherSurveyReportsPrintableSpring2020()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevTNTPSchoolTeacherPrintableSpring2020");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgTNTPSchoolTeacherPrintableSpring2020");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPSchoolTeacherPrintableSpring2020");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPSchoolTeacherPrintableSpring2020");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["FriendlyName"] = report["FriendlyName"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        [Route("School/SchoolLeadershipTeamSurvey")]
        /// <summary>
        /// Returns the TNTP School Leadership Team Survey Reports View
        /// </summary>
        /// <returns></returns>
        public ActionResult SchoolLeadershipTeamSurvey()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevTNTPSchoolLeadershipTeam");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgTNTPSchoolLeadershipTeam");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPSchoolLeadershipTeam");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPSchoolLeadershipTeam");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["FriendlyName"] = report["FriendlyName"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        [Route("School/NonteachingSchoolBasedStaffSurvey")]
        /// <summary>
        /// Returns the TNTP Non-teaching School Based Staff Survey Report View
        /// </summary>
        /// <returns></returns>
        public ActionResult NonteachingSchoolBasedStaffSurvey()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevTNTPSchoolNonTeachingSchoolStaff");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgTNTPSchoolNonTeachingSchoolStaff");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPSchoolNonTeachingSchoolStaff");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPSchoolNonTeachingSchoolStaff");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["FriendlyName"] = report["FriendlyName"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        [Route("School/NonteachingSchoolBasedStaffSurveyPrintableFall2019")]
        /// <summary>
        /// Returns the Fall 2019 Printable TNTP Non-teaching School Based Staff Survey Report View
        /// </summary>
        /// <returns></returns>
        public ActionResult NonteachingSchoolBasedStaffSurveyPrintableFall2019()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevTNTPSchoolNonTeachingSchoolStaffPrintableFall2019");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgTNTPSchoolNonTeachingSchoolStaffPrintableFall2019");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPSchoolNonTeachingSchoolStaffPrintableFall2019");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPSchoolNonTeachingSchoolStaffPrintableFall2019");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["FriendlyName"] = report["FriendlyName"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        [Route("School/NonteachingSchoolBasedStaffSurveyPrintableSpring2020")]
        /// <summary>
        /// Returns the Spring 2020 Printable TNTP Non-teaching School Based Staff Survey Report View
        /// </summary>
        /// <returns></returns>
        public ActionResult NonteachingSchoolBasedStaffSurveyPrintableSpring2020()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevTNTPSchoolNonTeachingSchoolStaffPrintableSpring2020");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgTNTPSchoolNonTeachingSchoolStaffPrintableSpring2020");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPSchoolNonTeachingSchoolStaffPrintableSpring2020");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPSchoolNonTeachingSchoolStaffPrintableSpring2020");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["FriendlyName"] = report["FriendlyName"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        [Route("Regional/TeacherSurveyReports")]
        /// <summary>
        /// Returns the TNTP Regional Teacher Survey Reports View
        /// </summary>
        /// <returns></returns>
        public ActionResult RegionalTeacherSurveyReports()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevTNTPRegionTeacher");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgTNTPRegionTeacher");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPRegionTeacher");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPRegionTeacher");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["FriendlyName"] = report["FriendlyName"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        [Route("Regional/RegionalSchoolLeadershipTeamSurvey")]
        /// <summary>
        /// Returns the TNTP Regional School Leadership Team Survey Reports View
        /// </summary>
        /// <returns></returns>
        public ActionResult RegionalSchoolLeadershipTeamSurvey()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevTNTPRegionSchoolLeadershipTeam");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgTNTPRegionSchoolLeadershipTeam");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPRegionSchoolLeadershipTeam");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPRegionSchoolLeadershipTeam");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["FriendlyName"] = report["FriendlyName"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        [Route("Regional/RegionalNonteachingSchoolBasedStaffSurvey")]
        /// <summary>
        /// Returns the TNTP Regional Non-teaching School Based Staff Survey Report View
        /// </summary>
        /// <returns></returns>
        public ActionResult RegionalNonteachingSchoolBasedStaffSurvey()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevTNTPRegionNonTeachingSchoolStaff");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgTNTPRegionNonTeachingSchoolStaff");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPRegionNonTeachingSchoolStaff");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPRegionNonTeachingSchoolStaff");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["FriendlyName"] = report["FriendlyName"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        [Route("Regional/RegionalStaffSurvey")]
        /// <summary>
        /// Returns the TNTP Regional Staff Survey Report View
        /// </summary>
        /// <returns></returns>
        public ActionResult RegionalStaffSurvey()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevTNTPRegionStaff");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgTNTPRegionStaff");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPRegionStaff");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPRegionStaff");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["FriendlyName"] = report["FriendlyName"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }


        [Route("Regional/RegionalStaffSurveyPrintableFall2019")]
        /// <summary>
        /// Returns the Fall 2019 TNTP Regional Staff Survey Report View
        /// </summary>
        /// <returns></returns>
        public ActionResult RegionalStaffSurveyPrintableFall2019()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevTNTPRegionStaffPrintableFall2019");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgTNTPRegionStaffPrintableFall2019");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPRegionStaffPrintableFall2019");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPRegionStaffPrintableFall2019");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["FriendlyName"] = report["FriendlyName"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        [Route("Regional/RegionalStaffSurveyPrintableSpring2020")]
        /// <summary>
        /// Returns the Spring 2020 TNTP Regional Staff Survey Report View
        /// </summary>
        /// <returns></returns>
        public ActionResult RegionalStaffSurveyPrintableSpring2020()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevTNTPRegionStaffPrintableSpring2020");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgTNTPRegionStaffPrintableSpring2020");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPRegionStaffPrintableSpring2020");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPRegionStaffPrintableSpring2020");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["FriendlyName"] = report["FriendlyName"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }


        [Route("Foundation/FoundationTeacherSurveyReports")]
        /// <summary>
        /// Returns the TNTP Foundation Teacher Survey Reports View
        /// </summary>
        /// <returns></returns>
        public ActionResult FoundationTeacherSurveyReports()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevTNTPFoundationTeacher");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgTNTPFoundationTeacher");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPFoundationTeacher");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPFoundationTeacher");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["FriendlyName"] = report["FriendlyName"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        [Route("Foundation/FoundationSchoolLeadershipTeamSurvey")]
        /// <summary>
        /// Returns the TNTP Foundation School Leadership Team Survey Reports View
        /// </summary>
        /// <returns></returns>
        public ActionResult FoundationSchoolLeadershipTeamSurvey()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevTNTPFoundationSchoolLeadershipTeam");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgTNTPFoundationSchoolLeadershipTeam");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPFoundationSchoolLeadershipTeam");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPFoundationSchoolLeadershipTeam");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["FriendlyName"] = report["FriendlyName"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        [Route("Foundation/FoundationNonteachingSchoolBasedStaffSurvey")]
        /// <summary>
        /// Returns the TNTP Foundation Non-teaching School Based Staff Survey Report View
        /// </summary>
        /// <returns></returns>
        public ActionResult FoundationNonteachingSchoolBasedStaffSurvey()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevTNTPFoundationNonTeachingSchoolStaff");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgTNTPFoundationNonTeachingSchoolStaff");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPFoundationNonTeachingSchoolStaff");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPFoundationNonTeachingSchoolStaff");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["FriendlyName"] = report["FriendlyName"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        [Route("Foundation/FoundationRegionalStaffSurvey")]
        /// <summary>
        /// Returns the TNTP Regional Staff Survey Report View
        /// </summary>
        /// <returns></returns>
        public ActionResult FoundationRegionalStaffSurvey()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevTNTPFoundationRegionStaff");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgTNTPFoundationRegionStaff");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPFoundationRegionStaff");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPFoundationRegionStaff");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["FriendlyName"] = report["FriendlyName"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        [Route("Foundation/MatchCounselors")]
        /// <summary>
        /// Returns the TNTP Regional Staff Survey Report View
        /// </summary>
        /// <returns></returns>
        public ActionResult MatchCounselors()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevTNTPFoundationMatchCounselors");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgTNTPFoundationMatchCounselors");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPFoundationMatchCounselors");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPFoundationMatchCounselors");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["FriendlyName"] = report["FriendlyName"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        /// <summary>
        /// Returns the School Culture Diagnostic Survey Report View
        /// </summary>
        /// <returns></returns>
        public ActionResult SchoolCultureDiagnostic()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevSchoolCultureDiagnostic");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgSchoolCultureDiagnostic");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("SchoolCultureDiagnostic");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("SchoolCultureDiagnostic");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["FriendlyName"] = report["FriendlyName"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        /// <summary>
        /// Returns the TNTP School Report View
        /// </summary>
        /// <returns></returns>
        public ActionResult TNTPSchool()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevTNTPSchool");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgTNTPSchool");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPSchool");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPSchool");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["FriendlyName"] = report["FriendlyName"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        /// <summary>
        /// Returns the TNTP School Printable Report View
        /// </summary>
        /// <returns></returns>
        public ActionResult TNTPSchoolPrintable()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevTNTPSchoolPrintable");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgTNTPSchoolPrintable");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPSchoolPrintable");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPSchoolPrintable");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["FriendlyName"] = report["FriendlyName"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        /// <summary>
        /// Returns the TNTP Region Report View
        /// </summary>
        /// <returns></returns>
        public ActionResult TNTPRegion()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevTNTPRegion");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgTNTPRegion");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPRegion");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPRegion");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["FriendlyName"] = report["FriendlyName"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        /// <summary>
        /// Returns the TNTP Region Printable Report View
        /// </summary>
        /// <returns></returns>
        public ActionResult TNTPRegionPrintable()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevTNTPRegionPrintable");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgTNTPRegionPrintable");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPRegionPrintable");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPRegionPrintable");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["FriendlyName"] = report["FriendlyName"].ToString();
            ViewData["CurrentEnvironment"] = currentEnvironment;

            return View();
        }

        /// <summary>
        /// Returns the TNTP Match Counselor Report View
        /// </summary>
        /// <returns></returns>
        public ActionResult TNTPMatchCounselor()
        {
            Hashtable report = null;

            if (currentEnvironment == "Development")
                report = (Hashtable)ConfigurationSettings.GetConfig("DevTNTPMatchCounselor");
            else if (currentEnvironment == "Staging")
                report = (Hashtable)ConfigurationSettings.GetConfig("StgTNTPMatchCounselor");
            else if (currentEnvironment == "Production")
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPMatchCounselor");
            else
                report = (Hashtable)ConfigurationSettings.GetConfig("TNTPMatchCounselor");

            ViewData["SiteRoot"] = report["Root"].ToString();
            ViewData["HostUrl"] = report["Url"].ToString();
            ViewData["ReportName"] = report["Name"].ToString();
            ViewData["FriendlyName"] = report["FriendlyName"].ToString();
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