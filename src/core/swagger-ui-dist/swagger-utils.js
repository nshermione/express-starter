const SwaggerUtils = {
  getIndexHtml(config) {
    return /*html*/` 
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Swagger UI</title>
          <link rel="stylesheet" type="text/css" href="./swagger-ui.css" />
          <link rel="stylesheet" type="text/css" href="index.css" />
          <link rel="icon" type="image/png" href="./favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="./favicon-16x16.png" sizes="16x16" />
        </head>

        <body>
          <div id="swagger-ui"></div>
          <script src="./swagger-ui-bundle.js" charset="UTF-8"> </script>
          <script src="./swagger-ui-standalone-preset.js" charset="UTF-8"> </script>
          <script charset="UTF-8">
            window.onload = function() {
              //<editor-fold desc="Changeable Configuration Block">

              // the following lines will be replaced by docker/configurator, when it runs in a docker-container
              window.ui = SwaggerUIBundle({
                dom_id: '#swagger-ui',
                presets: [
                  SwaggerUIBundle.presets.apis,
                  SwaggerUIStandalonePreset
                ],
                plugins: [
                  SwaggerUIBundle.plugins.DownloadUrl
                ],
                ...${JSON.stringify(config)}
              });

              //</editor-fold>
            };
          </script>
        </body>
      </html>
      `;
  }
}

module.exports = {
  SwaggerUtils
}