define([
    'jquery',
    'uiRegistry',
    'Magento_Checkout/js/model/quote'
], function ($ ,registry, quote) {
    'use strict';

    return function (validator) {
        $(document).on("change","[name='postcode']",function () {
            var validate = registry.get("checkout.steps.shipping-step.shippingAddress.shipping-address-fieldset.postcode").validation;
        });       
        
        $(document).on("keyup","[name='shippingAddress.postcode'] [name='postcode']",function(){
            //alert(registry.get("checkout.steps.shipping-step.shippingAddress.shipping-address-fieldset.postcode").value());
            
            registry.get("checkout.steps.shipping-step.shippingAddress.shipping-address-fieldset.postcode").value($(this).val());
            //registry.get("checkout.steps.billing-step.billingAddress.billing-address-fieldset.district").value($(this).val());
            //registry.get("checkout.steps.shipping-step.shippingAddress.shipping-address-fieldset.city").value($(this).val());    
        });
        $(document).on("focusout","[name='shippingAddress.postcode'] [name='postcode']",function(){
            //alert(registry.get("checkout.steps.shipping-step.shippingAddress.shipping-address-fieldset.postcode").value());
            registry.get("checkout.steps.shipping-step.shippingAddress.shipping-address-fieldset.postcode").value($(this).val());
            //registry.get("checkout.steps.billing-step.billingAddress.billing-address-fieldset.district").value($(this).val());
            
        });

        return validator;
        
    };

});