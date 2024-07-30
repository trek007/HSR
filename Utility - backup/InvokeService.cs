using System;
using System.Configuration;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

namespace KIPP.KTCData.UI.Utility
{
    public class InvokeService
    {
        /// <summary>
        /// Get Request Call to Web api service and return response
        /// </summary>
        /// <param name="ApiServiceUrl"></param>
        /// <returns></returns>
        internal HttpResponseMessage GetApiService(string ApiServiceUrl)
        {
            using (var client = new HttpClient())
            {
                var serviceUrl = ConfigurationManager.AppSettings["KIPPServiceURL"] != null
                    ? ConfigurationManager.AppSettings["KIPPServiceURL"]
                    : "http://localhost:80";
                client.BaseAddress = new Uri(serviceUrl);
                client.DefaultRequestHeaders.Accept.Add(
                                    new MediaTypeWithQualityHeaderValue("application/json"));
                var resp = client.GetAsync(ApiServiceUrl).Result;
                resp.EnsureSuccessStatusCode();
                return resp;
            }
        }

        /// <summary>
        /// Post Request Call to Web api service and return response
        /// </summary>
        /// <param name="ApiServiceUrl"></param>
        /// <returns></returns>
        internal HttpResponseMessage PostApiService(string myContent, string KippService)
        {
            using (var client = new HttpClient())
            {
                var serviceUrl = ConfigurationManager.AppSettings["KIPPServiceURL"] != null
                    ? ConfigurationManager.AppSettings["KIPPServiceURL"]
                    : "http://localhost:80/";
                client.BaseAddress = new Uri(serviceUrl);
                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

                //var myContent = JsonConvert.SerializeObject(model);

                var buffer = Encoding.UTF8.GetBytes(myContent);
                var byteContent = new ByteArrayContent(buffer);

                byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                var result = client.PostAsync(KippService, byteContent).Result;

                return result;

            }
        }
    }
}