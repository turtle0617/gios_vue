module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/gios_vue/" : "/",
  outputDir: "docs",
  pwa: {
    name: "田阿姨",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "white",
    // configure the workbox plugin
    workboxPluginMode: "InjectManifest"
  }
};
