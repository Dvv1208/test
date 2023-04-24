define([
    'jquery',
    'thailand',
    'thaieng',
    'uiComponent',
    'Magento_Checkout/js/checkout-data',
    'uiRegistry',
    'Marvelic_Postcode/js/Thailand_loader',
    'text!Marvelic_Postcode/js/database/db.json'
], function ($,
             Thailand,
             ThaiAddressEnTh,
             Component,
             checkoutData,
             uiRegistry,
             Thailand_loader) {
    const config        = window.checkoutConfig.postcode.options.enable;
    const method        = window.checkoutConfig.postcode.activePaymentMethods;
    const lang          = (window.checkoutConfig.storeCode === 'th') ? 'TH' : 'EN';
    const typeAddress   = 'billing';
    const dbUrl         = require.toUrl('Marvelic_Postcode/js/thai_address_database_en_th.js');
    let keepInterval    = true;
    delete method.paypal_billing_agreement;
    delete method.free;

    if (config === '1') {
        Thailand_loader.done(function () {
 
            // BEGIN
            // check until all field ready

            let intervalAutocomplete = setInterval(function(){
                if (!keepInterval) {
                    clearInterval(intervalAutocomplete);
                    return;
                }
 
                if (uiRegistry.get("checkout.steps.shipping-step.billingAddress.billing-address-fieldset.country_id")
                    && uiRegistry.get("checkout.steps.shipping-step.billingAddress.billing-address-fieldset.city")
                    && uiRegistry.get("checkout.steps.shipping-step.billingAddress.billing-address-fieldset.region_id_input")
                    && uiRegistry.get("checkout.steps.shipping-step.billingAddress.billing-address-fieldset.postcode")) {
 
                    let selectElement = $('#'+uiRegistry.get("checkout.steps.shipping-step.billingAddress.billing-address-fieldset.country_id").uid);

                    // setup autocomplete when load page
                    automation(selectElement.val());

                    // add event liston on country select
                    selectElement.on('change', function() {
                        let countryCode = $(this).val();
                        automation(countryCode);
                    });
 
                } else{
                    //console.log('Not yet load field');
                }
 
            }, 500);
        }).fail(function () {
            console.error("ERROR: library failed to load");
        });
    }

    let automation = (countrySelect) =>  {
        if(countrySelect) {
            keepInterval = false;
            if (typeof(uiRegistry.get("checkout.steps.shipping-step.billingAddress.billing-address-fieldset.district")) !== 'undefined') {
                var districtAddress = uiRegistry.get("checkout.steps.shipping-step.billingAddress.billing-address-fieldset.district").uid;
                var cityAddress = uiRegistry.get("checkout.steps.shipping-step.billingAddress.billing-address-fieldset.city").uid;
                var provinceAddress = uiRegistry.get("checkout.steps.shipping-step.billingAddress.billing-address-fieldset.region_id_input").uid;
                var postcodeAddress = uiRegistry.get("checkout.steps.shipping-step.billingAddress.billing-address-fieldset.postcode").uid;
            }

            if (countrySelect === "TH") {
                $.ajax({
                    url: dbUrl,
                    error: function()
                    {
                        console.log('File does not exists');
                    },
                    success: function()
                    {
                        $.ThaiAddressEnTh({
                            lang        : lang,
                            database    : dbUrl,
                            typeAddress : typeAddress,
                            district    : $('#' + districtAddress), // input ของตำบล
                            amphoe      : $('#' + cityAddress), // input ของอำเภอ
                            province    : $('#' + provinceAddress), // input ของจังหวัด
                            zipcode     : $('#' + postcodeAddress), // input ของรหัสไปรษณีย์

                            onLoad: function(){
                                console.info('Autocomplete is ready!');
                            }
                        });

                        //console.log("Thai");
                    }
                });
            }
        }
    };

    return Component;
});