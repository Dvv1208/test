/*
ผู้พัฒนา: ขวัญชัย แก้วยศ (Khwanchai Kaewyos)
อีเมล: khwanchai@gmail.com
โค้ด: https://github.com/LookHin/jquery.ThaiAddress.En-Th.js
*/
define([
    'jquery',
    'typeahead',
    'jql',
    'uiRegistry',
    'Marvelic_Postcode/js/click',
    'Marvelic_Postcode/js/Thailand_loader'],
    function($,
             typeahead,
             JQL,
             uiRegistry,
             Thailand_loader
    ) {

          
        $.ThaiAddressEnTh = function (options) {
            
            options = $.extend({}, $.ThaiAddressEnTh.defaults, options);
        
            let ThaiAddressEnTh = [];
            let result          = [];
            let field_district  = (options['lang'] === "TH") ? "district" : "district_en";
            let field_amphoe    = (options['lang'] === "TH") ? "amphoe" : "amphoe_en";
            let field_province  = (options['lang'] === "TH") ? "province" : "province_en";
            let field_zipcode   = 'zipcode';

            // autocomplete for shipping or billing
            let addressSelector = (options['typeAddress'] === "shipping")
                ? 'shippingAddress.shipping'
                : 'billingAddress.billing';

            $.getJSON(options['database'], function (result) {
                ThaiAddressEnTh = result;
            });
            
            var SelectItem = function(item){
                if(typeof item !== 'undefined'){
                    
                    if (options['lang'] === "TH") {
                        if(options['district'] != false){
                            if (typeof uiRegistry.get("checkout.steps.shipping-step." + addressSelector + "-address-fieldset.district") !== "undefined") {
                                uiRegistry.get("checkout.steps.shipping-step." + addressSelector + "-address-fieldset.district").value(item.district);
                            }

                            if ($('#district').length !== 0) {
                                $('#district').val(item.district);
                            }

                        }
        
                        if(options['amphoe'] != false){
                            if (typeof uiRegistry.get("checkout.steps.shipping-step." + addressSelector + "-address-fieldset.city") !== "undefined"){
                                uiRegistry.get("checkout.steps.shipping-step." + addressSelector + "-address-fieldset.city").value(item.amphoe);
                            }

                            if ($('#city').length !== 0){
                                $('#city').val(item.amphoe);
                            }
                        }
        
                        if(options['province'] != false){
                            if (typeof uiRegistry.get("checkout.steps.shipping-step." + addressSelector + "-address-fieldset.region_id_input") !== "undefined") {
                                uiRegistry.get("checkout.steps.shipping-step." + addressSelector + "-address-fieldset.region_id_input").value(item.province);
                            }
                            if ($('#region').length !== 0) {
                                $('#region').val(item.province);
                            }
                        }

                        if(options['zipcode'] != false){
                            if (typeof uiRegistry.get("checkout.steps.shipping-step." + addressSelector + "-address-fieldset.postcode") !== "undefined"){
                                uiRegistry.get("checkout.steps.shipping-step." + addressSelector + "-address-fieldset.postcode").value(item.zipcode);
                            }

                            if ($('#zip').length !== 0) {
                                $('#zip').val(item.zipcode);
                            } 
                            $(options['zipcode']).focus();
                        }
                    }else {
                        if(options['district'] != false){
                            if (typeof uiRegistry.get("checkout.steps.shipping-step." + addressSelector + "-address-fieldset.district") !== "undefined") {
                                uiRegistry.get("checkout.steps.shipping-step." + addressSelector + "-address-fieldset.district").value(item.district_en);
                            }

                            if ($('#district').length !== 0) {
                                $('#district').val(item.district_en);
                            }

                        }
        
                        if(options['amphoe'] != false){
                            if (typeof uiRegistry.get("checkout.steps.shipping-step." + addressSelector + "-address-fieldset.city") !== "undefined"){
                                uiRegistry.get("checkout.steps.shipping-step." + addressSelector + "-address-fieldset.city").value(item.amphoe_en);
                            }

                            if ($('#city').length !== 0){
                                $('#city').val(item.amphoe_en);
                            }
                            
                        }
        
                        if(options['province'] != false){
                            if (typeof uiRegistry.get("checkout.steps.shipping-step." + addressSelector + "-address-fieldset.region_id_input") !== "undefined"){
                                uiRegistry.get("checkout.steps.shipping-step." + addressSelector + "-address-fieldset.region_id_input").value(item.province_en);
                            }

                            if ($('#region').length !== 0) {
                                $('#region').val(item.province_en);
                            }
                           
                        }
        
                        if(options['zipcode'] != false){
                            if (typeof uiRegistry.get("checkout.steps.shipping-step." + addressSelector + "-address-fieldset.postcode") !== "undefined"){
                                uiRegistry.get("checkout.steps.shipping-step." + addressSelector + "-address-fieldset.postcode").value(item.zipcode);
                            }

                            if ($('#zip').length !== 0) {
                                $('#zip').val(item.zipcode);
                            }
                            $(options['zipcode']).focus();
                        }
                    }
        
                    result = [];
                    $(".suggestion").remove();
                }
            };
            

            var SearchData = function (obj, field, keycode, keyword) {
        
                if(keycode == 38){ // Key Up
                    currentFocus--;
        
                    if(currentFocus < 0){
                        currentFocus = 0;
                    }
        
                    if($(obj).next(".suggestion").find("div").length > 0){
                        itemTop = $(obj).next(".suggestion").find("div").eq(currentFocus).position().top;
                        itemHeight = $(obj).next(".suggestion").find("div").eq(currentFocus).height();
                        itemWrapper = $(obj).next(".suggestion").height();
        
                        if(itemTop+itemHeight <= 0){
                            $(obj).next(".suggestion").stop(true, false).animate({
                                scrollTop: "-="+itemWrapper
                            }, 500);
                        }
                    }
        
                    $(obj).next(".suggestion").find("div").removeClass("suggestion-active");
                    $(obj).next(".suggestion").find("div").eq(currentFocus).addClass("suggestion-active");
                }else if(keycode == 40){ // Key Down
                    currentFocus++;
        
                    if(currentFocus >= $(obj).next(".suggestion").find("div").length){
                        currentFocus = $(obj).next(".suggestion").find("div").length - 1;
                    }
        
                    if($(obj).next(".suggestion").find("div").length > 0){
                        itemTop = $(obj).next(".suggestion").find("div").eq(currentFocus).position().top;
                        itemHeight = $(obj).next(".suggestion").find("div").eq(currentFocus).height();
                        itemWrapper = $(obj).next(".suggestion").height();
        
                        if(itemTop+itemHeight >= itemWrapper){
                            $(obj).next(".suggestion").stop(true, false).animate({
                                scrollTop: "+="+itemTop
                            }, 500);
                        }
                    }
        
                    $(obj).next(".suggestion").find("div").removeClass("suggestion-active");
                    $(obj).next(".suggestion").find("div").eq(currentFocus).addClass("suggestion-active");
                }else if(keycode == 13){ // Key Enter
                    SelectItem(result[currentFocus]);
                }else{
                    result = [];
        
                    $.each(ThaiAddressEnTh, function (i, item) {
                        if (item[field].toLowerCase().indexOf(keyword.toLowerCase()) > -1 && keyword != "") {
                            result.push(item);
                        }
        
                        if (result.length == 500) {
                            return false;
                        }
                    });
        
                    currentFocus = -1;
        
                    $(".suggestion").remove();
                    $(obj).after("<div class=\"suggestion\"></div>");
                    $(obj).next(".suggestion").css("width", $(obj).css("width"));
        
                    $.each(result, function (i, item) {
                        district = item[field_district].replace(keyword, "<strong>" + keyword + "</strong>");
                        amphoe = item[field_amphoe].replace(keyword, "<strong>" + keyword + "</strong>");
                        province = item[field_province].replace(keyword, "<strong>" + keyword + "</strong>");
                        zipcode = item[field_zipcode].replace(keyword, "<strong>" + keyword + "</strong>");
                        
        
                        $(obj).next(".suggestion").append("<div>" + district + " » " + amphoe + " » " + province + " " + zipcode + "</div>");
                      
                    });
        
                    if(result.length > 0){
                        $(obj).next(".suggestion").on("mouseover", function(){
                            $(obj).unbind("focusout");
                            $(obj).next(".suggestion").find("div").unbind();
                            $(obj).next(".suggestion").find("div").on("click", function(){
                                SelectItem(result[$(this).index()]);
                            });
                        });
        
                        $(obj).next(".suggestion").on("mouseout", function(){
                            $(obj).on("focusout", function () {
                                $(".suggestion").remove();
                            });
                        });
                    }else{
                        $(".suggestion").remove();
                    }
                }
            }
        
            if (options['district'] != false) {
                $(options['district']).on('keyup keypress', function(event) {
                    var keyCode = event.keyCode || event.which;
                    if (keyCode === 13) {
                        event.preventDefault();
                        return false;
                    }
                });
        
                $(options['district']).on("keyup focus", function (event) {
                    SearchData(this, field_district, event.which, $(this).val().trim());
                });
        
                $(options['district']).on("focusout", function () {
                    $(".suggestion").remove();
                });
            }
        
            if (options['amphoe'] != false) {
                $(options['amphoe']).on('keyup keypress', function(event) {
                    var keyCode = event.keyCode || event.which;
                    if (keyCode === 13) {
                        event.preventDefault();
                        return false;
                    }
                });
        
                $(options['amphoe']).on("keyup focus", function (event) {
                    SearchData(this, field_amphoe, event.which, $(this).val().trim());
                });
        
                $(options['amphoe']).on("focusout", function () {
                    $(".suggestion").remove();
                });
            }
        
            if (options['province'] != false) {
                $(options['province']).on('keyup keypress', function(event) {
                    var keyCode = event.keyCode || event.which;
                    if (keyCode === 13) {
                        event.preventDefault();
                        return false;
                    }
                });
        
                $(options['province']).on("keyup focus", function (event) {
                    SearchData(this, field_province, event.which, $(this).val().trim());
                });
        
                $(options['province']).on("focusout", function () {
                    $(".suggestion").remove();
                });
            }
        
            if (options['zipcode'] != false) {
                $(options['zipcode']).on('keyup keypress', function(event) {
                    var keyCode = event.keyCode || event.which;
                    if (keyCode === 13) {
                        console.log("keyin");
                        event.preventDefault();
                        return false;
                        
                    }
                });
        
                $(options['zipcode']).on("keyup focus", function (event) {
                    SearchData(this, field_zipcode, event.which, $(this).val().trim());
                });
        
                $(options['zipcode']).on("focusout", function () {
                    $(".suggestion").remove();
                });
            }
        };
        
        $.ThaiAddressEnTh.defaults = {
            lang: 'TH',
            database: 'thai_address_database_th_en.js',
            district: false,
            amphoe: false,
            province: false,
            zipcode: false
        };
        
        $.ThaiAddressEnTh.setup = function (options) {
            $.extend($.ThaiAddressEnTh.defaults, options);
        };
        
});

