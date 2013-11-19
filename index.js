var http = require('http'),
    htmlToPdf = require('wkhtmltopdf')

http
    .createServer(acceptHtmlAndProvidePdf)
    .listen(1337, '0.0.0.0');

function acceptHtmlAndProvidePdf(request, response) {
    console.log('Request received: ' + request);

    request.content = '';

    request.addListener("data", function (chunk) {
        if (chunk) {
            request.content += chunk;
        }
    });

    request.addListener("end", function () {
        response.writeHead(200, { 'Content-Type': 'application/pdf' });

        htmlToPdf(request.content)
            .pipe(response);

        console.log('Processed HTML to PDF: ' + response);
    });
}

console.log('Server running at http://127.0.0.1:1337/');




