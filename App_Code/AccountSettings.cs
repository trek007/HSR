using System.Configuration;

/// <summary>
/// AccountSettings
/// 
/// 
/// Each account should as a minimum have the following:
///  - A URL pointing to the identity provider for sending Auth Requests
///  - A X.509 certificate for validating the SAML Responses from the identity provider
/// 
/// These should be retrieved from the account store/database on each request in the authentication flow.
/// </summary>
/// 
namespace KIPP.HSR.UI
{
    public class OLAccountSettings
    {
        public string kippCertificate;
        public string idp_sso_target_url;

        public OLAccountSettings()
        {

            if (System.Web.HttpContext.Current.Request.Url.Host.Contains("dev") || System.Web.HttpContext.Current.Request.Url.Host.Contains("localhost"))
            {
                kippCertificate = ConfigurationManager.AppSettings["DevCertificate"] != null ? ConfigurationManager.AppSettings["DevCertificate"] : string.Empty;
                idp_sso_target_url = ConfigurationManager.AppSettings["DevIdpTargetUrl"] != null ? ConfigurationManager.AppSettings["DevIdpTargetUrl"] : string.Empty;
            }
            else if (System.Web.HttpContext.Current.Request.Url.Host.Contains("stg"))
            {
                kippCertificate = ConfigurationManager.AppSettings["StgCertificate"] != null ? ConfigurationManager.AppSettings["StgCertificate"] : string.Empty;
                idp_sso_target_url = ConfigurationManager.AppSettings["StgIdpTargetUrl"] != null ? ConfigurationManager.AppSettings["StgIdpTargetUrl"] : string.Empty;
            }
            else
            {
                kippCertificate = ConfigurationManager.AppSettings["Certificate"] != null ? ConfigurationManager.AppSettings["Certificate"] : string.Empty;
                idp_sso_target_url = ConfigurationManager.AppSettings["IdpTargetUrl"] != null ? ConfigurationManager.AppSettings["IdpTargetUrl"] : string.Empty;
            }
        }
    }
}
