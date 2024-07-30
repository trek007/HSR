using System.Web.Optimization;

namespace KIPP.HSR.UI
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js",
                      "~/Scripts/bootbox.min.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            //bundles.Add(new ScriptBundle("~/bundles/kendo").Include(
            // "~/Scripts/Kendo/js/kendo.all.min.js",
            // "~/Scripts/Kendo/js/kendo.aspnetmvc.min.js"));

            bundles.Add(new StyleBundle("~/Content/kendo/css").Include(
                        "~/Content/Kendo/kendo.common-bootstrap.min.css",
                        "~/Content/Kendo/kendo.bootstrap.min.css",
                        "~/Content/Kendo/kendo.common.min.css",
                        "~/Content/Kendo/kendo.default.min.css"
                        //"~/Content/Kendo/kendo.default.mobile.min.css",
                        //"~/Content/Kendo/kendo.common-material.min.css"
                        ));
            //bundles.Add(new ScriptBundle("~/bundles/smt").Include(
            //    "~/Scripts/HSR/smt.js"
            //    ));

            //bundles.Add(new ScriptBundle("~/bundles/rpt").Include(
            //   "~/Scripts/HSR/rpt.js"
            //   ));

            //bundles.Add(new ScriptBundle("~/bundles/vmt").Include(
            //    "~/Scripts/HSR/vmt.js"
            //    ));

            bundles.Add(new ScriptBundle("~/bundles/kipplayout").Include(
                "~/Scripts/HSR/kipplayout.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/rolemanager").Include(
                "~/Scripts/HSR/rolemanager.js"
                ));

            bundles.Add(new StyleBundle("~/bundles/rolemanager/css").Include(
                "~/Content/HSR/rolemanager.css"
                ));

            bundles.Add(new StyleBundle("~/bundles/kipplayout/css").Include(
                "~/Content/HSR/kipplayout.css"
                ));

            bundles.Add(new StyleBundle("~/bundles/smt/css").Include(
                "~/Content/HSR/smt.css"
                ));

            bundles.Add(new StyleBundle("~/bundles/vmt/css").Include(
                "~/Content/HSR/vmt.css"
                ));
        }
    }
}
