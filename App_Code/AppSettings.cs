using System.Configuration;

/// <summary>
/// OL App Setting
/// 
/// Each app should as a minimum have the following:
///  - A issuer url
///  - A assertion consumer url to receive response
/// </summary>

namespace KIPP.HSR.UI
{
    public class OLAppSettings
    {
        public string issuer;
        public string assertionConsumerServiceUrl;

        public OLAppSettings()
        {
            if (System.Web.HttpContext.Current.Request.Url.Host.Contains("dev") || System.Web.HttpContext.Current.Request.Url.Host.Contains("localhost"))
            {
                issuer = ConfigurationManager.AppSettings["DevIssuerUrl"] != null ? ConfigurationManager.AppSettings["DevIssuerUrl"] : string.Empty;
                assertionConsumerServiceUrl = ConfigurationManager.AppSettings["DevAssertionConsumerServiceUrl"] != null ? ConfigurationManager.AppSettings["DevAssertionConsumerServiceUrl"] : string.Empty;
            }
            else if (System.Web.HttpContext.Current.Request.Url.Host.Contains("stg"))
            {
                issuer = ConfigurationManager.AppSettings["StgIssuerUrl"] != null ? ConfigurationManager.AppSettings["StgIssuerUrl"] : string.Empty;
                assertionConsumerServiceUrl = ConfigurationManager.AppSettings["StgAssertionConsumerServiceUrl"] != null ? ConfigurationManager.AppSettings["StgAssertionConsumerServiceUrl"] : string.Empty;
            }
            else
            {
                issuer = ConfigurationManager.AppSettings["IssuerUrl"] != null ? ConfigurationManager.AppSettings["IssuerUrl"] : string.Empty;
                assertionConsumerServiceUrl = ConfigurationManager.AppSettings["AssertionConsumerServiceUrl"] != null ? ConfigurationManager.AppSettings["AssertionConsumerServiceUrl"] : string.Empty;
            }
        }
    }
}
