public with sharing class productController {
    @AuraEnabled
    public static List<Object> retriveProducts() {
        HttpRequest httpRequest = new HttpRequest();
        httpRequest.setEndpoint('https://fakestoreapi.com/products/category/jewelery');
        httpRequest.setMethod('GET');

        List<Object> productJsonData = new List<Object>();
        String strResponse = null;

        try {
            Http http = new Http();
            HttpResponse httpResponse = http.send(httpRequest);
            if (httpResponse.getStatusCode() == 200) {
                strResponse = httpResponse.getBody();
            } else {
                throw new CalloutException(httpResponse.getBody());
            }
        } catch (Exception ex) {
            throw ex;
        }

        if (!String.isBlank(strResponse)) {
            productJsonData = (List<Object>)JSON.deserializeUntyped(strResponse);
        }
        if (!productJsonData.isEmpty()) {
            return productJsonData;
        } else {
            return null;
        }
    }
}