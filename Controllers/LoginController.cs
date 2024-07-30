using System;
using System.Configuration;
using System.Web.Mvc;
using System.Web.Security;
using System.DirectoryServices.AccountManagement;
using System.Linq;
using KIPP.HSR.UI;

namespace HSR.Controllers
{
    public class LoginController : Controller
    {
        /// <summary>
        /// Default action, Authenticate user from OneLogin by sending SAML request.
        /// </summary>
        /// <returns></returns>
        public ActionResult Login()
        {
            try
            {
                if (HttpContext.User.Identity.IsAuthenticated && Session["UserRole"] != null)
                {
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    //Destory session object
                    FormsAuthentication.SignOut();
                    Session.Abandon();

                    //Construct Saml Request
                    OLAccountSettings olAccountSettings = new OLAccountSettings();
                    OLAuthRequest req = new OLAuthRequest(new OLAppSettings(), olAccountSettings);
                    return Redirect(olAccountSettings.idp_sso_target_url + "?SAMLRequest=" + Server.UrlEncode(req.OLGetRequest(OLAuthRequest.AuthRequestFormat.Base64)));
                }
            }
            catch (Exception ex)
            {
                //LogManager.WriteLog(ex.Message);
                return RedirectToAction("Index", "Error");
            }
        }

        /// <summary>
        /// This method will receive the SAML response from OneLogin and Authorize the user
        /// </summary>
        /// <returns></returns>
        public ActionResult Consume()
        {
            try
            {
                //Read SAML Response
                // need the three parameter to login for oneLogin
                OLAccountSettings OlAccountSettings = new OLAccountSettings();
                OLSamlResponse samlResponse = new OLSamlResponse(OlAccountSettings);
                samlResponse.LoadXmlFromBase64(Request.Form["SAMLResponse"]);

                if (samlResponse.IsValid())
                {
                    if (samlResponse.GetNameID() != string.Empty)
                    {
                        FormsAuthentication.SetAuthCookie(samlResponse.GetNameID(), false);
                        return RedirectToAction("Index", "Home");
                    }
                    else
                    {
                        return RedirectToAction("Index", "Error");
                    }
                }
                else
                {
                    // LogManager.WriteLog("One login Failed");
                    return RedirectToAction("Index", "Error");
                }
            }
            catch (Exception ex)
            {
                // LogManager.WriteLog(ex.Message);
                return RedirectToAction("Index", "Error");
            }
        }

        /// <summary>
        /// Logout DT application and redirected to OneLogin
        /// </summary>
        /// <returns></returns>
            public ActionResult Logout()
            {
            FormsAuthentication.SignOut();
            Session.Abandon();
            var url = ConfigurationManager.AppSettings["OneLoginUrl"] != null ? ConfigurationManager.AppSettings["OneLoginUrl"] : "https://kipp.onelogin.com/login/";
            return JavaScript("window.location = '" + url + "'");
        }

        /// <summary>
        /// Implemented SLO. Logout DT application and OneLogin application.
        /// </summary>
        /// <returns></returns>
        public ActionResult LogoutOL()
        {
            FormsAuthentication.SignOut();
            Session.Abandon();

            String Url = string.Empty;

            if (System.Web.HttpContext.Current.Request.Url.Host.Contains("dev") || System.Web.HttpContext.Current.Request.Url.Host.Contains("localhost"))
            {
                Url = ConfigurationManager.AppSettings["DevSLOEndpoint"] != null ? ConfigurationManager.AppSettings["DevSLOEndpoint"] : string.Empty;
            }
            else if (System.Web.HttpContext.Current.Request.Url.Host.Contains("stg"))
            {
                Url = ConfigurationManager.AppSettings["StgSLOEndpoint"] != null ? ConfigurationManager.AppSettings["StgSLOEndpoint"] : string.Empty;
            }
            else
            {
                Url = ConfigurationManager.AppSettings["SLOEndpoint"] != null ? ConfigurationManager.AppSettings["SLOEndpoint"] : string.Empty;
            }

            if (Url == string.Empty)
                return RedirectToAction("Index", "Error");
            else
                return Redirect(Url);
        }

    }
}