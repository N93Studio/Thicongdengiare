addLoadEvent(function () {
    var aff_id_ck = getCookie("aff_id");
    var aff_id = getParameterByName("aff_id");
    var aff_tracking_id = getParameterByName("aff_tracking_id");
    if (aff_id_ck == null || aff_id_ck == "") {
        if (aff_id !== null && aff_id !== "") {
            setCookie("aff_id", aff_id, 30);
        }

        if (aff_tracking_id !== null && aff_tracking_id !== "") {
            setCookie("aff_tracking_id", aff_tracking_id, 30);
        }
    }
    else {
        if (aff_id == aff_id_ck) {
            if (aff_tracking_id !== null && aff_tracking_id !== "") {
                setCookie("aff_tracking_id", aff_tracking_id, 30);
            }
        }
    }

    var kd = getParameterByName("kd");
    if (kd !== null && kd !== "")
        setCookie("kd", kd, 30);

    var sales_team = getParameterByName("sales_team");
    if (sales_team !== null && sales_team !== "")
        setCookie("sales_team", sales_team, 30);

    var ref = getParameterByName("ref");
    if (ref !== null && ref !== "")
        setCookie("ref", ref, 30);

    var campaign = getParameterByName("campaign");
    if (campaign !== null && campaign !== "")
        setCookie("campaign", campaign, 30);

    if (document.referrer && document.referrer != '') {
        if (document.referrer.indexOf("www.sapo.vn") == -1) {
            setCookie("referral", document.referrer, 30);
        }
    }

    var partner = getParameterByName("aff_partner_id");
    if (partner !== null && partner !== "")
        setCookie("partner", partner, 30);

    var landingPage = getCookie("landing_page");
    if (landingPage == null || landingPage == "") {
        setCookie("landing_page", document.location.href, 0.0115);
    }

    var startTime = getCookie("start_time");
    if (startTime == null || startTime == "") {
        setCookie("start_time", getDateTime(), 0.0115);
    }

    var pageview = getCookie("pageview");
    if (pageview == null || pageview == "" || pageview == "NaN") {
        setCookie("pageview", 1, 0.0115);
    }
    else {
        setCookie("pageview", parseInt(pageview) + 1, 0.0115);
    }
});

function encodeURIParams(params, addQuestionMark) {
    var pairs = [];
    for (var key in params) if (params.hasOwnProperty(key)) {
        var value = params[key];
        if (value != null) /* matches null and undefined */ {
            pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
        }
    }
    if (pairs.length == 0)
        return '';
    return (addQuestionMark ? '?' : '') + pairs.join('&');
}

function bodauTiengViet(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function onInputStoreName(e, element) {
    if (e.keyCode == 13) {
        return false;
    }
}

function generateAlias(text) {
    text = text.toLowerCase();
    text = text.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    text = text.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    text = text.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    text = text.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    text = text.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    text = text.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    text = text.replace(/đ/g, "d");
    text = text.replace(/'|\"|\(|\)|\[|\]/g, "");
    text = text.replace(/\W+/g, "-");
    if (text.slice(-1) === "-")
        text = text.replace(/-+$/, "");

    if (text.slice(0, 1) === "-")
        text = text.replace(/^-+/, "");

    return text;
}

function setCookie(cname, cvalue, exdays) {
    if (!exdays)
        exdays = 30;

    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires + ";domain=.sapo.vn;path=/";
}

function newSetCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue;
}

function getUrlWithoutDomain(url) {
    return url.replace(/^.*\/\/[^\/]+/, '');
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return null;
}

function getSessionStorage(sname) {
    return window.sessionStorage.getItem(sname);
}

function setSessionStorage(sname, svalue) {
    window.sessionStorage.setItem(sname, svalue);
}

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toUpperCase();
}

function setParameter(url, paramName, paramValue) {
    if (url.indexOf(paramName + "=") >= 0) {
        var prefix = url.substring(0, url.indexOf(paramName));
        var suffix = url.substring(url.indexOf(paramName));
        suffix = suffix.substring(suffix.indexOf("=") + 1);
        suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
        url = prefix + paramName + "=" + paramValue + suffix;
    }
    else {
        if (url.indexOf("?") < 0)
            url += "?" + paramName + "=" + paramValue;
        else
            url += "&" + paramName + "=" + paramValue;
    }

    return url;
}

function getDateTime(datetime) {
    var today = new Date(),
        dd = today.getDate(),
        mm = today.getMonth() + 1,
        yyyy = today.getFullYear(),
        hour = today.getHours(),
        minute = today.getMinutes(),
        second = today.getSeconds();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    var datetime = mm + '/' + dd + '/' + yyyy + ' ' + hour + ':' + minute + ':' + second;
    return datetime;
}

function checkShowCaptcha(popupType, type, storeName, source, preferredService, phoneNumber, fnbType) {
    $.ajax({
        url: urlCheckIpLocation,
        method: "POST",
        success: function (t) {
            if (t.CountryCode != "VN") {
                showCaptcha = true;
            } else {
                showCaptcha = false;
            }
            if (popupType == "fnb") {
                createModalFnB(phoneNumber, t.CountryCode, fnbType);
            } else {
                createModal(type, storeName, source, preferredService, t.CountryCode);
            }
        },
        error: function (t) {
            showCaptcha = true;
            if (popupType == "fnb") {
                createModalFnB(phoneNumber, t.CountryCode, fnbType);
            } else {
                createModal(type, storeName, source, preferredService, t.CountryCode);
            }
        }
    });
}

function createCaptcha($form) {
    $form.find('#CaptchaInput').val('');
    $form.find('#Captcha').html('');
    var charsArray = "0123456789abcdefghijklmnopqrstuvwxyz";
    var lengthOtp = 4;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
        var index = Math.floor(Math.random() * charsArray.length);
        captcha.push(charsArray[index]);
    }
    var canvas = document.createElement('canvas');
    canvas.id = "CaptchaCanv";
    canvas.width = 95;
    canvas.height = 48;
    var ctx = canvas.getContext("2d");
    ctx.font = "bold 25px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "#333333";
    ctx.fillText(captcha.join(""), 48, 33);
    codeCaptcha = captcha.join("");
    $form.find('#Captcha').append(canvas);
}

function resetCaptcha(item) {
    $(item).parent().find('#CaptchaInput').val('');
    $(item).parent().find('#Captcha').html('');
    var charsArray = "0123456789abcdefghijklmnopqrstuvwxyz";
    var lengthOtp = 4;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
        var index = Math.floor(Math.random() * charsArray.length);
        captcha.push(charsArray[index]);
    }
    var canvas = document.createElement('canvas');
    canvas.id = "CaptchaCanv";
    canvas.width = 95;
    canvas.height = 48;
    var ctx = canvas.getContext("2d");
    ctx.font = "bold 25px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "#333333";
    ctx.fillText(captcha.join(""), 48, 33);
    codeCaptcha = captcha.join("");
    $(item).parent().find('#Captcha').append(canvas);
}

// Popup trial
function showModalTrial(e, type, chkOmni) {
    if (popupOpen == false) {
        popupOpen = true;

        var preferredService = "";
        if (chkOmni) {
            preferredService = "OMNI";
        }

        var storeName = $(e).parent().parent().find(".input-site-name").val();

        var sales_team = getParameterByName("sales_team");
        if (sales_team !== null && sales_team !== "")
            setCookie("sales_team", sales_team, 30);

        var kd = getParameterByName("kd");
        if (kd !== null && kd !== "")
            setCookie("kd", kd, 30);

        var ref = getParameterByName("ref");
        if (ref !== null && ref !== "")
            setCookie("ref", ref, 30);

        var campaign = getParameterByName("campaign");
        if (campaign !== null && campaign !== "")
            setCookie("campaign", campaign, 30);

        var startTime = getCookie("start_time");
        if (startTime == null || startTime == "") {
            setCookie("start_time", getDateTime(), 0.0115);
        }
        var source = window.location.href;
        setCookie("source", source, 30);

        checkShowCaptcha("", type, storeName, source, preferredService);
    }
}

function createModal(type, storeName, source, preferredService, location) {
    var $modal = $('<div id="trialPopupModal" class="modal fade modal-register modal-register-sso" role="dialog">'
        + '<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-body"></div></div></div></div>'),
        $modalbody = $modal.find('.modal-body'),
        $form, $logo, $title, $buttonClose;
    $logo = '<div class="logo"><img src="https://www.sapo.vn/Themes/Portal/Default/StylesV2/images/logo/Sapo-logo.svg?v=202101071107" alt="Sapo logo" class="fade show"></div>';
    $buttonClose = '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 3.02143L26.9786 0L15 11.9786L3.02143 0L0 3.02143L11.9786 15L0 26.9786L3.02143 30L15 18.0214L26.9786 30L30 26.9786L18.0214 15L30 3.02143Z" /></svg></button>';
    switch (type) {
        case 1:
            $title = "<h2>Dùng thử Sapo miễn phí 7 ngày</h2><p>+230,000 doanh nghiệp & chủ shop tin dùng</p>";
            break;
        case 2:
            $title = "<h2>Dùng thử Sapo Web miễn phí 7 ngày</h2><p>+230,000 doanh nghiệp & chủ shop tin dùng</p>";
            break;
        case 3:
            $title = "<h2>Dùng thử phần mềm quản lý fanpage Sapo Social</h2><p>Được tích hợp miễn phí trên Sapo</p>";
            break;
        case 4:
            $title = "<h2>Dùng thử Sapo POS miễn phí 7 ngày</h2><p>+230,000 doanh nghiệp & chủ shop tin dùng</p>";
            break;
        case 5:
            $title = "<h2>Dùng thử Sapo Omnichannel miễn phí 7 ngày</h2><p>+230,000 doanh nghiệp & chủ shop tin dùng</p>";
            break;
        case 6:
            $title = "<h2>Dùng thử Sapo POS miễn phí 7 ngày</h2><p>+230,000 doanh nghiệp & chủ shop tin dùng</p>";
            break;
        case 7:
            $title = "<h2>Dùng thử Sapo miễn phí 7 ngày</h2><p>+230,000 doanh nghiệp & chủ shop tin dùng</p>";
            break;
        default:
            $title = "<h2>Dùng thử Sapo miễn phí 7 ngày</h2><p>+230,000 doanh nghiệp & chủ shop tin dùng</p>";
            break;
    }

    // Block form
    if (jQuery.ui) { // Check jQuery UI add autocomplete
        $form = $("<form/>", { action: urlRegister, id: "trialForm", class: "form-request", onsubmit: "return handleSubmit(event, " + type + ")", method: "POST", "accept-charset": "UTF-8" });
        $form.autocomplete({ source: "" });
    } else {
        $form = $("<form/>", { action: urlRegister, id: "trialForm", autocomplete: "off", class: "form-request", onsubmit: "return handleSubmit(event, " + type + ")", method: "POST", "accept-charset": "UTF-8" });
    }
    var $row = $("<div/>", { class: "row" });
    var $col6 = $("<div/>", { class: "col-md-6" });
    var $formGroup = $("<div/>", { class: "form-group mdc-text-field" });
    var $formGroupSelect = $("<div/>", { class: "form-group mdc-selectize" });
    var $label = $("<label/>", { for: "" });
    var $listError = $("<ul/>", { class: "register-form-error" });

    // Input form
    var $storeName = $("<input/>", { type: "text", pattern: "^.{3,60}$", maxlength: "60", id: "StoreName", class: "form-control form-input", name: "StoreName", required: "", title: "Tên của hàng dài từ 3 đến 60 ký tự" });
    if (storeName != undefined && storeName != "") {
        $storeName.val(storeName).addClass('valid');
    }
    var $fullName = $("<input/>", { type: "text", maxlength: "60", id: "FullName", class: "form-control form-input", name: "FullName", required: "" });
    var $phoneNumber = $("<input/>", { type: "tel", pattern: "^0\\d{7,24}$", maxlength: "25", id: "PhoneNumber", class: "form-control form-input", name: "PhoneNumber", required: "" });

    //City & District
    var $selectCity = $("<select/>", { id: "CityDistrict", name: "CityDistrict", required: "" });
    $selectCity.append("<option value='' hidden></option>");
    if (jsonCity != null && jsonCity.length > 0) {
        $.each(jsonCity, function (index, city) {
            if (city != null && city != undefined) {
                var tempOp = '<option value="' + city.Title + ',' + city.Code + '" data-data=\'{"code":"' + city.Code + '","city":"' + city.Title.replace('\'', '&#x27;') + '"}\'>' + city.Title + '</option>';
                $selectCity.append(tempOp);
            }
        });
    }
    var $select = $("<select/>", { id: "PackageType", name: "PackageType", required: "" });
    var $selectOmni = $("<select/>", { id: "PreferredService", name: "PreferredService", required: "" });
    var $selectType1 = '<option value="" hidden></option>'
        + '<option value="pos">Phần mềm quản lý bán hàng</option>'
        + '<option value="web">Thiết kế website bán hàng</option>'
        + '<option value="sapo_go">Quản lý bán hàng online (Facebook & Sàn TMĐT)</option>'
        + '<option value="omni">Quản lý và bán hàng đa kênh</option>"';
    var $selectType5 = '<option value="" hidden></option>'
        + '<option value="POS">Bán tại cửa hàng</option>'
        + '<option value="EWEB">Bán trên website</option>'
        + '<option value="ESOCIAL">Bán trên Facebook</option>'
        + '<option value="MARKET">Bán trên sàn TMĐT</option>"';
    var $selectType7 = '<option value="" hidden></option><option value="sapo_go">Quản lý bán hàng online (Facebook & Sàn TMĐT)</option>'
        + '<option value="omni">Quản lý và bán hàng đa kênh</option>"';
    var $captcha = '<input autocomplete="off" type="text" value="" name="CaptchaInput" id="CaptchaInput" maxlength="4" required class="form-control form-input"><a onclick=\"resetCaptcha(this)\" class="resetCaptchaBtn" id="captchaReset" href="javascript:void(0);"></a><div id="Captcha"></div>';

    var $actions = $("<button/>", { type: "submit", class: "btn-registration" }).html("<span>Đăng ký dùng thử</span><svg class=\"pulse\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z\"></path></svg>");

    // Block social login
    var $socialLogin = $("<div/>", { class: "social-login" }).html('<span>Hoặc đăng ký nhanh bằng tài khoản</span>'),
        $socialLoginBtn = '<a href="javascript:void(0)" onclick="registerFacebook(' + type + ')"><img src="https://www.sapo.vn/Themes/Portal/Default/StylesV2/images/svg_sociallogin_fb_new.svg" alt="Sapo" /></a>'
            + '<a href="javascript:void(0)" onclick="registerGoogle(' + type + ')"><img src="https://www.sapo.vn/Themes/Portal/Default/StylesV2/images/svg_sociallogin_gg_new.svg" alt="Sapo" /></a>';
    $socialLogin.append($("<div/>", { class: "social-login__btn-group" }).html($socialLoginBtn));

    // Hidden input
    var $hiddenInput = '<input id="Preferred" name="Preferred" type="hidden" value="' + (getCookie('preferred') != null ? getCookie('preferred') : "") + '">'
        + '<input id="SaleName" name="SaleName" type="hidden" value="' + (getCookie('kd') != null ? getCookie('kd') : "") + '">'
        + '<input id="Reference" name="Reference" type="hidden" value="' + (getCookie('ref') != null ? getCookie('ref') : "") + '">'
        + '<input id="Source" name="Source" type="hidden" value="' + (source != null ? source : "") + '">'
        + '<input id="Referral" name="Referral" type="hidden" value="' + (getCookie('referral') != null ? getCookie('referral') : "") + '">'
        + '<input id="Campaign" name="Campaign" type="hidden" value="' + (getCookie('campaign') != null ? getCookie('campaign') : "") + '">'
        + '<input id="LandingPage" name="LandingPage" type="hidden" value="' + (getCookie('landing_page') != null ? getCookie('landing_page') : "") + '">'
        + '<input id="StartTime" name="StartTime" type="hidden" value="' + (getCookie('start_time') != null ? getCookie('start_time') : "") + '">'
        + '<input id="EndTime" name="EndTime" type="hidden" value="' + (getDateTime() != null ? getDateTime() : "") + '">'
        + '<input id="PageView" name="PageView" type="hidden" value="' + (getCookie('pageview') != null ? getCookie('pageview') : "") + '">'
        + '<input id="AffId" name="AffId" type="hidden" value="' + (getCookie('aff_id') != null ? getCookie('aff_id') : "") + '">'
        + '<input id="AffTrackingId" name="AffTrackingId" type="hidden" value="' + (getCookie('aff_tracking_id') != null ? getCookie('aff_tracking_id') : "") + '">'
        + '<input id="Type" name="Type" type="hidden" value="' + type + '">'
        + '<input id="SalesTeam" name="SalesTeam" type="hidden" value="' + (getCookie('sales_team') != null ? getCookie('sales_team') : "") + '">'
        + '<input id="City" name="City" type="hidden">'
        + '<input id="CityId" name="CityId" type="hidden">'
        + '<input id="CityNameAndId" name="CityNameAndId" type="hidden">'
        + '<input id="SocialSource" name="SocialSource" type="hidden" value="">'
        + '<input id="FacebookName" name="FacebookName" type="hidden" value="">'
        + '<input id="FacebookAvatar" name="FacebookAvatar" type="hidden" value="">';

    // Create form group input & label
    $form.append($listError);
    $fullName = $formGroup.clone().append($fullName).append($label.clone().attr("for", "FullName").text("Họ tên của bạn"));
    $storeName = $formGroup.clone().append($storeName).append($label.clone().attr("for", "StoreName").text("Tên cửa hàng của bạn"));
    $phoneNumber = $formGroup.clone().append($phoneNumber).append($label.clone().attr("for", "PhoneNumber").text("Số điện thoại của bạn"));
    $selectCity = $formGroupSelect.clone().append($selectCity).append($label.clone().attr("for", "CityDistrict-selectized").text("Bạn ở tỉnh/ thành phố nào?"));

    // Grouping multiple input to one line
    var $rowList = $row.clone().append($col6.clone().append($phoneNumber)).append($col6.clone().append($storeName));
    var $rowList2;

    // Add input to form
    $form.append($fullName).append($rowList);

    // Check & add select, captcha to form
    if (type != 2 && type != 3 && type != 4 && type != 5 && type != 6 && type != 7) {
        $select = $formGroup.clone().addClass('mdc-select-field').append($select.html($selectType1)).append($label.clone().attr("for", "PackageType").text("Chọn sản phẩm bạn quan tâm"));
        $rowList2 = $row.clone().append($col6.clone().append($selectCity)).append($col6.clone().append($select));
        $form.append($rowList2);
    } else if (type == 7) {
        $select = $formGroup.clone().addClass('mdc-select-field').append($select.html($selectType7)).append($label.clone().attr("for", "PackageType").text("Chọn sản phẩm bạn quan tâm"));
        $rowList2 = $row.clone().append($col6.clone().append($selectCity)).append($col6.clone().append($select));
        $form.append($rowList2);
    } else if (type == 5) {
        $selectOmni = $formGroup.clone().addClass('mdc-select-field').append($selectOmni.html($selectType5)).append($label.clone().attr("for", "PreferredService").text("Chọn kênh bán hàng ưu tiên"));
        $rowList2 = $row.clone().append($col6.clone().append($selectCity)).append($col6.clone().append($selectOmni));
        $form.append($rowList2);
    } else {
        $form.append($selectCity);
    }
    if (location != "VN") {
        $captcha = $formGroup.clone().addClass('mdc-text-field captcha-field').append($captcha).append($label.clone().attr("for", "CaptchaInput").text("Mã an toàn"));
        var $rowSelectCaptcha = $row.clone().append($col6.clone().append($captcha));
        $form.append($rowSelectCaptcha);
        createCaptcha($form);
    }

    var $policy = $("<input/>", { type: "checkbox", required: "", checked: true, id: "ConfirmPolicy" });
    $policy = $formGroup.clone().removeClass('mdc-text-field').addClass('mdc-checkbox').append($label.clone().attr("for", "ConfirmPolicy").append($policy).append("<span style='font-size: 14px;'>Tôi đồng ý với <a href='https://support.sapo.vn/quy-dinh-su-dung?campaign=form_dungthu_sapo&utm_campaign=form_dungthu_sapo_ref_quy_dinh_su_dung&utm_source=form_dungthu&utm_medium=textlink_referral' target='_blank'>quy định sử dụng</a> và <a href='https://support.sapo.vn/chinh-sach-bao-mat?campaign=form_dungthu_sapo&utm_campaign=form_dungthu_sapo_ref_chinh_sach_bao_mat&utm_source=form_dungthu&utm_medium=textlink_referral' target='_blank'>chính sách bảo mật</a> của Sapo</span>"));
    $form.append($policy);

    // Add action & hidden input
    $form.append($formGroup.clone().append($actions)).append($socialLogin).append($hiddenInput);

    // Add form vao modal
    $modalbody.html("");
    $modalbody.append($buttonClose);
    $modalbody.append($logo);
    $modalbody.append($title);
    $modalbody.append($form);

    // Remove modal old & add modal new
    $('#trialPopupModal').remove();
    $modal.modal({ backdrop: false, keyboard: false });
    $modal.modal('show');

    $modal.on('hidden.bs.modal', function () {
        popupOpen = false;
    });

    $modal.find("#CityDistrict").selectize({
        positionDropdown: "auto",
        openOnFocus: false,
        placeholder: "",
        chooseItemOnBlur: true,
        render: {
            option: function (data, escape) {
                return "<div data-city='" + data.city + "' data-code='" + data.code + "' class=\"option\">" + data.city + "</div>"
            }
        },
        onFocus: function () {
            ($(this.$wrapper).parent()).children('label').addClass('filled');
        },
        onBlur: function () {
            if (this.items.length == 0) {
                ($(this.$wrapper).parent()).children('label').removeClass('filled');
            }
        },
        onChange: function (value) {
            var item = value.split(",");
            $('input[name="City"]').val(item[0]);
            $('input[name="CityId"]').val(item[1]);
            $('input[name="CityNameAndId"]').val(value);
        },
        onInitialize: function () {
            if (this.items.length > 0) {
                $(this.$wrapper).siblings('label').addClass('filled');
            }
        }
    });

    $modal.find('#PhoneNumber').bind('focus', function () {
        var formGroup = $(this).parents('.form-group');
        formGroup.addClass('valid');
    });

    $modal.find('#PhoneNumber').bind('focusout', function () {
        var input = $(this);
        var formGroup = input.parents('.form-group');
        if (input.val() == '') {
            formGroup.removeClass('valid');
        }
    });

    $modal.find('input[type="text"], input[type="tel"], input[type="email"], input[type="password"]').on('change keyup input', function () {
        var input = $(this);
        var formGroup = input.parents('.form-group');
        if (input.val() == '') {
            formGroup.removeClass('valid');
        } else {
            formGroup.addClass('valid');
        }
    });

    //var intlTelInstance = window.intlTelInput(document.querySelector('#PhoneNumber'), {
    //    onlyCountries: ["vn"],
    //    hiddenInput: "mobile",
    //    separateDialCode: true,
    //    allowDropdown: false
    //});

    //intlTelInstance.setCountry("vn");
}

function handleSubmit(e, type) {
    var $form = $('form#trialForm');

    $form.find(".register-form-error").empty();
    $form.find('.btn-registration').addClass("btn-loading");

    var error = "";
    var storeName = $form.find("#StoreName").val();

    //Check captcha
    if ($form.find('#CaptchaInput').val() != codeCaptcha && showCaptcha == true) {
        $form.find('#CaptchaInput').val('').removeClass('valid');
        $form.find(".register-form-error").html('<li>Sai mã an toàn</li>');
        $('.resetCaptchaBtn').trigger('click');
        $form.find('#CaptchaInput').focus();
        $form.find('.btn-registration').removeClass("btn-loading");
        return false;
    }

    checkAlias(storeName, function (responseAlias) {
        if (responseAlias) {
            e.preventDefault();
            $.ajax({
                url: urlRegister,
                type: "post",
                data: $form.serialize(),
                success: function (data) {
                    if (data.result) {
                        setTimeout(function () { window.location.href = data.result.RedirectUrl; }, 400);
                    } else {
                        $form.find('.btn-registration').removeClass('btn-loading');
                        if (data.error) {
                            if (data.error == "TENANT_EXISTED") {
                                error += "<li>Cửa hàng <strong>" + storeName + "</strong> đã tồn tại trong hệ thống!</li>";
                            } else if (data.error == "REGISTER_FAILED") {
                                error += "<li>Có lỗi xảy ra</li>";
                            } else {
                                var errorResponse = data.error.replace(/\n/g, '; ').replace(/; $/, '');
                                var array = errorResponse.split(";")
                                var index;
                                for (index = 0; index < array.length; ++index) {
                                    error += "<li>" + array[index] + "</li>";
                                }
                            }
                        }
                        else {
                            error += "<li>Có lỗi xảy ra</li>";
                        }
                        if (!!error) {
                            $form.find(".register-form-error").html(error);
                            $form.find(".register-form-error").addClass("show");
                            return false;
                        }
                    }
                },
                error: function (data) {
                    $form.find('.btn-registration').removeClass('btn-loading');
                    if (data.responseJSON && data.responseJSON.error) {
                        var errorResponse = data.responseJSON.error.replace(/\n/g, '; ').replace(/; $/, '');
                        var array = errorResponse.split(";")
                        var index;
                        for (index = 0; index < array.length; ++index) {
                            error += "<li>" + array[index] + "</li>";
                        }
                    }
                    else {
                        error += "<li>Có lỗi xảy ra</li>";
                    }

                    if (!!error) {
                        $form.find(".register-form-error").html(error);
                        $form.find(".register-form-error").addClass("show");
                        return false;
                    }
                }
            })
        } else {
            $form.find(".register-form-error").html("<li>Cửa hàng <strong>" + storeName + "</strong> đã tồn tại trong hệ thống!</li>");
            $form.find(".register-form-error").addClass("show");
            $form.find('.btn-registration').removeClass('btn-loading');
            return false;
        }
    })

    return false;
}

function checkAlias(domain, callback) {
    var url = urlCheckAlias;
    $.ajax({
        url: url,
        jsonp: "callback",
        dataType: "jsonp",
        data: {
            alias: domain
        },
        success: callback,
        error: function (data) {
            callback(false);
        }
    });
}

function buildRedirectUrl(type, social) {
    if (!redirectUri || redirectUri === "" || redirectUri.toString().toLowerCase() === "iphone" || redirectUri.toString().toLowerCase() === "android")
        return window.location.href;
    var url = new URL(redirectUri);
    var query_string = url.search;
    var search_params = new URLSearchParams(query_string);
    search_params.set('type', type);
    search_params.set('show_popup', 'true');

    $('form#trialForm').find('input').each(function () {
        var item = $(this);
        if (item.val() != "" && item.val() != null && item.attr('name') != "Type" && item.attr('name') != "Password" && item.attr('name') != "StoreName" && item.attr('name') != "PhoneNumber" && item.attr('name') != "Email") {
            search_params.set(item.attr('name'), item.val());
        }
    });
    if ($('form#trialForm').find('select').length > 0) {
        $('form#trialForm').find('select').each(function () {
            var item = $(this);
            if (item.attr('name') != "CityDistrict" && item.attr('name') != "PackageType" && item.attr('name') != "PreferredService") {
                url += "&" + item.attr('name') + "=" + item.val();
            }
        });
    }

    search_params.set("lang", "vi-VN");

    search_params.set('sourceInfo', social);
    url.search = search_params.toString();
    return url.toString();
}

function registerFacebook(type) {
    var params = {
        "client_id": facebookClientId,
        "redirect_uri": facebookRedirectUri,

        "state": JSON.stringify({
            redirectUrl: buildRedirectUrl(type, "facebook"),
            type: "signup"
        }),
        "scope": "email",
        "response_type": "code"
    }
    var url = "https://www.facebook.com/v3.2/dialog/oauth" + encodeURIParams(params, true);
    window.location.href = url;
}

function registerGoogle(type) {
    var params = {
        "client_id": googleClientId,
        "redirect_uri": googleRedirectUri,

        "scope": "email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
        "access_type": "online",
        "state": JSON.stringify({
            redirectUrl: buildRedirectUrl(type, "google"),
            type: "signup"
        }),
        "response_type": "code"
    }
    var url = "https://accounts.google.com/o/oauth2/v2/auth" + encodeURIParams(params, true);
    window.location.href = url;
}

// Popup trial FnB
function showModalTrialFnB(e, fnbType) {
    if (popupOpen == false) {
        popupOpen = true;

        var phoneNumber = $(e).parent().parent().find("#phone_number_fnb").val();

        var sales_team = getParameterByName("sales_team");
        if (sales_team !== null && sales_team !== "")
            setCookie("sales_team", sales_team, 30);

        var kd = getParameterByName("kd");
        if (kd !== null && kd !== "")
            setCookie("kd", kd, 30);

        var ref = getParameterByName("ref");
        if (ref !== null && ref !== "")
            setCookie("ref", ref, 30);

        var campaign = getParameterByName("campaign");
        if (campaign !== null && campaign !== "")
            setCookie("campaign", campaign, 30);

        var startTime = getCookie("start_time");
        if (startTime == null || startTime == "") {
            setCookie("start_time", getDateTime(), 0.0115);
        }
        var source = window.location.href;
        setCookie("source", source, 30);

        checkShowCaptcha("fnb", "", "", "", "", phoneNumber, fnbType);
    }
}

function createModalFnB(phoneNumber, location, fnbType) {
    var $modal = $('<div id="trialPopupModalFnB" class="modal fade modal-register modal-register-sso" role="dialog">'
        + '<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-body"></div></div></div></div>'),
        $modalbody = $modal.find('.modal-body'),
        $form, $logo, $title, $buttonClose;
    $logo = '<div class="logo"><img src="https://www.sapo.vn/Themes/Portal/Default/StylesV2/images/logo/Sapo-logo.svg?v=202101071107" alt="Sapo logo" class="fade show"></div>';
    $buttonClose = '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 3.02143L26.9786 0L15 11.9786L3.02143 0L0 3.02143L11.9786 15L0 26.9786L3.02143 30L15 18.0214L26.9786 30L30 26.9786L18.0214 15L30 3.02143Z" /></svg></button>';
    if (fnbType && fnbType == "GrabFood") {
        $title = "<h2>Đăng ký bán hàng trên GrabFood qua Sapo FnB</h2><p>Hưởng trọn ưu đãi hấp dẫn</p>";
    } else {
        $title = "<h2>Đăng ký dùng thử Sapo FnB</h2><p>Miễn phí 7 ngày với đầy đủ tính năng</p>";
    }

    // Block form
    if (jQuery.ui) { // Check jQuery UI add autocomplete
        $form = $("<form/>", { action: urlRegisterFnb, id: "trialFormFnB", class: "form-request", onsubmit: "return handleSubmitFnB(event)", method: "POST", "accept-charset": "UTF-8" });
        $form.autocomplete({ source: "" });
    } else {
        $form = $("<form/>", { action: urlRegisterFnb, id: "trialFormFnB", autocomplete: "off", class: "form-request", onsubmit: "return handleSubmitFnB(event)", method: "POST", "accept-charset": "UTF-8" });
    }

    var $row = $("<div/>", { class: "row" });
    var $col6 = $("<div/>", { class: "col-md-6" });
    var $formGroup = $("<div/>", { class: "form-group mdc-text-field" });
    var $formGroupSelect = $("<div/>", { class: "form-group mdc-selectize" });
    var $label = $("<label/>", { for: "" });
    var $listError = $("<ul/>", { class: "register-form-error" });
    var $notiErrorExist = $("<div/>", { class: "register-phone-exist" });

    // Input form
    var $storeName = $("<input/>", { type: "text", pattern: "^.{3,60}$", maxlength: "60", id: "StoreName", class: "form-control form-input", name: "StoreName", required: "", title: "Tên của nhà hàng dài từ 3 đến 60 ký tự" });
    var $fullName = $("<input/>", { type: "text", maxlength: "60", id: "FullName", class: "form-control form-input", name: "FullName", required: "" });
    var $phoneNumber = $("<input/>", { type: "tel", maxlength: "15", pattern: "((0|84|\\+84)(3|5|7|8|9)[0-9]{8}$|^$)", id: "Phone", class: "form-control form-input", name: "Phone", required: "" });
    if (phoneNumber != undefined && phoneNumber != "") {
        $phoneNumber.val(phoneNumber).addClass('valid');
    }
    var $email = $("<input/>", { type: "email", pattern: "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$", maxlength: "50", id: "Email", class: "form-control form-input", name: "Email", required: "" });

    //City & District
    var $selectCity = $("<select/>", { id: "CityDistrict", name: "CityDistrict", required: "" });
    $selectCity.append("<option value='' hidden></option>");
    if (jsonCity != null && jsonCity.length > 0) {
        $.each(jsonCity, function (index, city) {
            if (city != null && city != undefined) {
                if (city.Districts != undefined && city.Districts.length > 0) {
                    $.each(city.Districts, function (index, district) {
                        var tempOp = '<option value="' + city.Title + ' - ' + district.Title + '" data-data=\'{"city":"' + city.Title.replace('\'', '&#x27;') + '","district":"' + district.Title.replace('\'', '&#x27;') + '"}\'>' + city.Title + ' - ' + district.Title + '</option>';
                        $selectCity.append(tempOp);
                    });
                }
            }

        });
    }

    //Captcha
    var $captcha = '<input autocomplete="off" type="text" value="" name="CaptchaInput" id="CaptchaInput" maxlength="4" required class="form-control form-input"><a onclick=\"resetCaptcha(this)\" class="resetCaptchaBtn" id="captchaReset" href="javascript:void(0);"></a><div id="Captcha"></div>';

    //Noti
    var $noti = '<p class="text-noti"><span>*</span>Sapo cam kết bảo mật toàn bộ thông tin đăng ký dùng thử của khách hàng</p>';

    var $actions = $("<button/>", { type: "submit", class: "btn-registration btn-fnb" }).html("<span>Đăng ký dùng thử</span><svg class=\"pulse\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z\"></path></svg>");

    // Hidden input
    var $hiddenInput = '<input id="Preferred" name="Preferred" type="hidden" value="' + (getCookie('preferred') != null ? getCookie('preferred') : "") + '">'
        + '<input id="SaleName" name="SaleName" type="hidden" value="' + (getCookie('kd') != null ? getCookie('kd') : "") + '">'
        + '<input id="Reference" name="Reference" type="hidden" value="' + (getCookie('ref') != null ? getCookie('ref') : "") + '">'
        + '<input id="Source" name="Source" type="hidden" value="' + (getCookie('source') != null ? getCookie('source') : "") + '">'
        + '<input id="Referral" name="Referral" type="hidden" value="' + (getCookie('referral') != null ? getCookie('referral') : "") + '">'
        + '<input id="Campaign" name="Campaign" type="hidden" value="' + (getCookie('campaign') != null ? getCookie('campaign') : "") + '">'
        + '<input id="LandingPage" name="LandingPage" type="hidden" value="' + (getCookie('landing_page') != null ? getCookie('landing_page') : "") + '">'
        + '<input id="StartTime" name="StartTime" type="hidden" value="' + (getCookie('start_time') != null ? getCookie('start_time') : "") + '">'
        + '<input id="EndTime" name="EndTime" type="hidden" value="' + (getDateTime() != null ? getDateTime() : "") + '">'
        + '<input id="PageView" name="PageView" type="hidden" value="' + (getCookie('pageview') != null ? getCookie('pageview') : "") + '">'
        + '<input id="AffId" name="AffId" type="hidden" value="' + (getCookie('aff_id') != null ? getCookie('aff_id') : "") + '">'
        + '<input id="AffTrackingId" name="AffTrackingId" type="hidden" value="' + (getCookie('aff_tracking_id') != null ? getCookie('aff_tracking_id') : "") + '">'
        + '<input id="Province" name="Province" type="hidden">'
        + '<input id="District" name="District" type="hidden">';

    // Create form group input & label
    $form.append($notiErrorExist).append($listError);
    $storeName = $formGroup.clone().append($storeName).append($label.clone().attr("for", "StoreName").text("Tên quán của bạn"));
    $fullName = $formGroup.clone().append($fullName).append($label.clone().attr("for", "FullName").text("Họ và tên của bạn"));
    $phoneNumber = $formGroup.clone().append($phoneNumber).append($label.clone().attr("for", "Phone").text("Số điện thoại của bạn"));
    $email = $formGroup.clone().append($email).append($label.clone().attr("for", "Email").text("Email đăng ký"));
    $selectCity = $formGroupSelect.clone().append($selectCity).append($label.clone().attr("for", "CityDistrict-selectized").text("Bạn đang ở quận/huyện nào?"));

    // Grouping multiple input to one line
    var $rowList = $row.clone().append($col6.clone().append($fullName)).append($col6.clone().append($phoneNumber));

    // Add input to form
    $form.append($storeName).append($rowList).append($email).append($selectCity);

    // Check & add captcha to form
    if (location != "VN") {
        $captcha = $formGroup.clone().addClass('mdc-text-field captcha-field').append($captcha).append($label.clone().attr("for", "CaptchaInput").text("Mã an toàn"));
        var $rowCaptcha = $row.clone().append($col6.clone().append($captcha));
        $form.append($rowCaptcha);
        createCaptcha($form);
    }

    var $policy = $("<input/>", { type: "checkbox", required: "", checked: true, id: "ConfirmPolicy" });
    $policy = $formGroup.clone().removeClass('mdc-text-field').addClass('mdc-checkbox').append($label.clone().attr("for", "ConfirmPolicy").append($policy).append("<span style='font-size: 14px;'>Tôi đồng ý với <a href='https://support.sapo.vn/quy-dinh-su-dung?campaign=form_dungthu_sapo&utm_campaign=form_dungthu_sapo_ref_quy_dinh_su_dung&utm_source=form_dungthu&utm_medium=textlink_referral' target='_blank'>quy định sử dụng</a> và <a href='https://support.sapo.vn/chinh-sach-bao-mat?campaign=form_dungthu_sapo&utm_campaign=form_dungthu_sapo_ref_chinh_sach_bao_mat&utm_source=form_dungthu&utm_medium=textlink_referral' target='_blank'>chính sách bảo mật</a> của Sapo</span>"));
    $form.append($policy);

    //$form.append($noti);

    // Add action & hidden input
    $form.append($formGroup.clone().append($actions)).append($hiddenInput);
    // Add form vao modal
    $modalbody.html("");
    $modalbody.append($buttonClose);
    $modalbody.append($logo);
    $modalbody.append($title);
    $modalbody.append($form);

    // Remove modal old & add modal new
    $('#trialPopupModalFnB').remove();
    $modal.modal({ backdrop: false, keyboard: false });
    $modal.modal('show');

    $modal.on('hidden.bs.modal', function () {
        popupOpen = false;
    });
    $modal.find("#CityDistrict").selectize({
        positionDropdown: "auto",
        openOnFocus: false,
        placeholder: "",
        chooseItemOnBlur: true,
        render: {
            option: function (data, escape) {
                return "<div data-city='" + data.city + "' data-district='" + data.district + "' class=\"option\">" + data.value + "</div>"
            }
        },
        onFocus: function () {
            ($(this.$wrapper).parent()).children('label').addClass('filled');
        },
        onBlur: function () {
            if (this.items.length == 0) {
                ($(this.$wrapper).parent()).children('label').removeClass('filled');
            }
        },
        onChange: function (value) {
            var item = value.split(" - ");
            $('input[name="Province"]').val(item[0]);
            $('input[name="District"]').val(item[1]);
            $('input[name="CityDistrict"]').val(value);
        },
        onInitialize: function () {
            if (this.items.length > 0) {
                $(this.$wrapper).siblings('label').addClass('filled');
            }
        }
    });

    $modal.find('input[type="text"], input[type="tel"], input[type="email"]').on('change keyup input', function () {
        var input = $(this);
        if (input.val() == '') {
            input.removeClass('valid');
        } else {
            input.addClass('valid');
        }
    });
}

function modalVerifiedOTP() {
    var $modal = $('<div id="modalVerifiedOTP" class="modal fade modal-login-sso" role="dialog">'
        + '<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-body"></div></div></div></div>'),
        $modalbody = $modal.find('.modal-body'),
        $form, $logo, $title, $buttonClose;
    var $noti = $("<div/>", { class: "notification" });
    $logo = '<div class="logo"><img src="https://www.sapo.vn/Themes/Portal/Default/StylesV2/images/logo/Sapo-logo.svg?v=202101071107" alt="Sapo logo" class="fade show"></div>';
    $buttonClose = '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 3.02143L26.9786 0L15 11.9786L3.02143 0L0 3.02143L11.9786 15L0 26.9786L3.02143 30L15 18.0214L26.9786 30L30 26.9786L18.0214 15L30 3.02143Z" /></svg></button>';
    $title = "<h2>Xác minh mã OTP của bạn</h2>";

    // Block form
    if (jQuery.ui) { // Check jQuery UI add autocomplete
        $form = $("<form/>", { action: urlRegisterFnb, id: "fnbVerifiedOTP", onsubmit: "return verifiedOTP(this);", class: "form-request", method: "POST", "accept-charset": "UTF-8" });
        $form.autocomplete({ source: "" });
    } else {
        $form = $("<form/>", { action: urlRegisterFnb, id: "fnbVerifiedOTP", onsubmit: "return verifiedOTP(this);", autocomplete: "off", class: "form-request", method: "POST", "accept-charset": "UTF-8" });
    }

    var $formGroup = $("<div/>", { class: "form-group mdc-text-field" });
    var $label = $("<label/>", { for: "" });

    // Input form
    var $phoneNumber = $("<input/>", { type: "tel", id: "Phone", class: "form-control form-input valid", name: "Phone", required: "", "readOnly": true, disabled: true, value: phoneNumber });
    var $fnbCode;
    if (jQuery.ui) {
        $fnbCode = $("<input/>", { type: "text", id: "FnBCode", maxlength: 6, pattern: "^\\d{6}$", class: "form-control form-input", name: "FnBCode", required: "", title: "Mã xác minh phải là số và gồm 6 kí tự" });
        $fnbCode.autocomplete({ source: "one-time-code" });
    } else {
        $fnbCode = $("<input/>", { type: "text", id: "FnBCode", maxlength: 6, autocomplete: "one-time-code", pattern: "^\\d{6}$", class: "form-control form-input", name: "FnBCode", required: "", title: "Mã xác minh phải là số và gồm 6 kí tự" });
    }

    $noti.html('<div class="noti d-flex"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 0C4.48672 0 0 4.48672 0 10C0 15.5133 4.48672 20 10 20C15.5133 20 20 15.5133 20 10C20 4.48672 15.5133 0 10 0ZM15.0688 7.88125L9.65234 13.2977C9.48984 13.4602 9.27578 13.5414 9.06328 13.5414C8.85 13.5414 8.63672 13.4602 8.47422 13.2977L5.76562 10.5891C5.44063 10.2641 5.44063 9.73672 5.76562 9.41016C6.09063 9.08359 6.61797 9.08516 6.94453 9.41016L9.06328 11.5289L13.8906 6.70156C14.2156 6.37656 14.743 6.37656 15.0695 6.70156C15.3961 7.02656 15.3938 7.55469 15.0688 7.88125Z" fill="#0FD186"/></svg><span>Mã xác minh đã được gửi vào số điện thoại của bạn.<br>Nếu không nhận được vui lòng <a href="javascript:;" onclick="return resendOTP(this);" class="btn-retry">thử lại<svg class=\"pulse\" style="display: none;" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z\"></path></svg></a></div>');

    // Actions
    var $wrapperActions = $("<div/>", { class: "text-center" });
    var $actions = $("<button/>", { type: "submit", class: "btn-registration btn-fnb", }).html("<span>Xác nhận</span><svg class=\"pulse\" style=\"display: none;\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z\"></path></svg>");

    // Create form group input & label
    $phoneNumber = $formGroup.clone().append($phoneNumber).append($label.clone().attr("for", "Phone").text("Số điện thoại của bạn"));
    $fnbCode = $formGroup.clone().append($fnbCode).append($label.clone().attr("for", "FnBCode").text("Mã xác minh")).append('<span class="text-danger" data-valmsg-for="FnBCode" style="display: none;"></span>');
    $wrapperActions.append($formGroup.clone().append($actions));

    // Add input to form
    $form.append($noti).append($phoneNumber).append($fnbCode).append($wrapperActions);

    // Add form vao modal
    $modalbody.html("");
    $modalbody.append($buttonClose);
    $modalbody.append($logo);
    $modalbody.append($title);
    $modalbody.append($form);

    // Remove modal old & add modal new
    $('#trialPopupModalFnB').modal('hide');
    $('#modalVerifiedOTP').remove();
    $modal.modal({ backdrop: false, keyboard: false });
    $modal.modal('show');

    $modal.on('shown.bs.modal', function () {
        if ($('.modal.show').length > 0) {
            $('body').addClass('modal-open');
        }
    });

    $modal.on('hidden.bs.modal', function () {
        formData = null;
        phoneNumber = null;
        $('#modalVerifiedOTP').remove();
        $('#trialPopupModalFnB').remove();
        popupVerifiedOpen = false;
    });

    $modal.find('input[type="text"], input[type="tel"], input[type="email"], input[type="password"]').on('change keyup input', function () {
        var input = $(this);
        if (input.val() == '') {
            input.removeClass('valid');
        } else {
            input.addClass('valid');
        }
    });
}

function modalCreateStatus(status, url) {
    var $modal = $('<div id="modalCreateStatus" class="modal fade modal-register-success-default" role="dialog">'
        + '<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-body"></div></div></div></div>'),
        $modalbody = $modal.find('.modal-body'),
        $logo, $title, $buttonClose;
    $logo = '<div class="logo"><img src="https://www.sapo.vn/Themes/Portal/Default/StylesV2/images/logo/Sapo-logo.svg?v=202101071107" alt="Sapo logo" class="fade show"></div>';
    $buttonClose = '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 3.02143L26.9786 0L15 11.9786L3.02143 0L0 3.02143L11.9786 15L0 26.9786L3.02143 30L15 18.0214L26.9786 30L30 26.9786L18.0214 15L30 3.02143Z" /></svg></button>';

    // Add form vao modal
    if (status == 'failed') {
        $title = "<h2>Đăng ký dùng thử Sapo FnB <br/>không thành công!</h2>"
        var $htmlBody = '<svg class="icon-failed" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1000 1000"><g><path d="M500,10C229,10,10,229,10,500s219,490,490,490c271,0,490-219,490-490S771,10,500,10z M814.1,772.8l-41.3,41.3L500,541.3L227.2,814.1l-41.3-41.3L458.7,500L185.9,225.4l41.3-41.3L500,456.9l272.8-272.8l41.3,41.3L541.3,500L814.1,772.8z"/></g></svg>'
            + '<p>Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại sau!</p>';
        $modalbody.addClass('modal-failed');
    } else {
        $title = "<h2>Đăng ký dùng thử Sapo FnB thành công!</h2>"
        var $htmlBody = '<p>Chuyển hướng đến nhà hàng của bạn sau</p>'
            + '<div class="count-down"><span>5</span><svg class="svg-countdown" width="116" height="116" xmlns="http://www.w3.org/2000/svg"><circle r="50" cy="58" cx="58" stroke-width="10" fill="none" /></svg><svg class="svg-countdown-progress" width="116" height="116" xmlns="http://www.w3.org/2000/svg"><circle class="circle-animation" r="50" cy="58" cx="-58" stroke-width="10" stroke="#0cc2ed" fill="none" /></svg></div>'
            + '<p class="text-redirect">HOẶC</p>'
            + '<a href="' + url + '" class="btn-registration btn-fnb" rel="nofollow">Vào nhà hàng của bạn</a>';
    }

    // Remove modal old & add modal new
    $('#modalVerifiedOTP').modal('hide');
    $modalbody.html("");
    $modalbody.append($buttonClose);
    $modalbody.append($logo);
    $modalbody.append($title);
    $modalbody.append($htmlBody);

    formData = null;
    phoneNumber = null;
    popupVerifiedOpen = false;
    $modal.modal({ backdrop: false, keyboard: false });
    $modal.modal('show');

    $modal.on('shown.bs.modal', function () {
        if ($('.modal.show').length > 0) {
            $('body').addClass('modal-open');
        }
    });

    if (status == 'success') {
        var iMax = 5
        var interval = setInterval(function () {
            $modal.find('.count-down').find('span').text(iMax);
            if (iMax == 0) {
                clearInterval(interval);
                window.location.href = url;
                return;
            }
            $modal.find('.svg-countdown-progress').find('.circle-animation').css('stroke-dashoffset', 315 - ((iMax - 1) * (315 / 5)));
            iMax--;
        }, 1000);
    }
    $modal.on('hidden.bs.modal', function () {
        $('#modalCreateStatus').remove();
    });
}

function handleSubmitFnB(e) {
    var $form = $('form#trialFormFnB');

    $form.find(".register-form-error").empty();
    $form.find(".register-phone-exist").empty();
    $form.find('.btn-registration').addClass("btn-loading");

    var error = "";
    phoneNumber = $form.find("#Phone").val();
    //Check captcha
    if ($form.find('#CaptchaInput').val() != codeCaptcha && showCaptcha == true) {
        $form.find('#CaptchaInput').val('').removeClass('valid');
        $form.find(".register-form-error").html('<li>Sai mã an toàn</li>');
        $('.resetCaptchaBtn').trigger('click');
        $form.find('#CaptchaInput').focus();
        $form.find('.btn-registration').removeClass("btn-loading");
        return false;
    }
    validateModel(function (isValid) {
        if (isValid) {
            checkPhone(function (responsePhoneNumber) {
                if (responsePhoneNumber) {
                    e.preventDefault();
                    sendOTP(function (responseOTP) {
                        if (responseOTP) {
                            formData = $form;
                            modalVerifiedOTP();
                        } else {
                            $form.find('.btn-registration').removeClass('btn-loading');
                            $form.find('#CaptchaInput').val('').removeClass('valid');
                            $('.resetCaptchaBtn').trigger('click');
                            return false;
                        }
                    });
                } else {
                    $form.find(".register-phone-exist").html("Số điện thoại <strong>" + phoneNumber + "</strong> đã tồn tại trong hệ thống.<br/>Để đăng nhập vào nhà hàng của bạn vui lòng <a href=\"" + urlFnb + "/admin/authorization/login\" target=\"_blank\" rel=\"nofollow\">click vào đây!</a>");
                    $form.find(".register-phone-exist").addClass("show");
                    $form.find('.btn-registration').removeClass('btn-loading');
                    $form.find('#CaptchaInput').val('').removeClass('valid');
                    $('.resetCaptchaBtn').trigger('click');
                    return false;
                }
            });
        } else {
            $form.find('.btn-registration').removeClass("btn-loading");
            $('.resetCaptchaBtn').trigger('click');
        }
    });
    return false;
}

function validateModel(callback) {
    var $form = $('form#trialFormFnB');
    var error = "";
    var url = "/fnb/validateregister";
    $.ajax({
        url: url,
        type: "post",
        data: $form.serialize(),
        success: function (data) {
            if (data != null && data != "") {
                if (data.error) {
                    var errorResponse = data.error.replace(/\n/g, ';').replace(/; $/, '');
                    var array = errorResponse.split(";")
                    array = array.filter(function (elem, index, self) {
                        return index === self.indexOf(elem);
                    });
                    var index;
                    for (index = 0; index < array.length; ++index) {
                        if (array[index] != null && array[index] != "") {
                            error += "<li>" + array[index] + "</li>";
                        }
                    }
                }
                if (!!error) {
                    $form.find(".register-form-error").html(error);
                    $form.find(".register-form-error").addClass("show");
                    callback(false);
                }
            }
            callback(true);
        },
        error: function (data) {
            if (data != null && data != "") {
                if (data.responseJSON && data.responseJSON.error) {
                    var errorResponse = data.responseJSON.error.replace(/\n/g, ';').replace(/; $/, '');
                    var array = errorResponse.split(";")
                    array = array.filter(function (elem, index, self) {
                        return index === self.indexOf(elem);
                    });
                    var index;
                    for (index = 0; index < array.length; ++index) {
                        if (array[index] != null && array[index] != "") {
                            error += "<li>" + array[index] + "</li>";
                        }
                    }
                }

                if (!!error) {
                    $form.find(".register-form-error").html(error);
                    $form.find(".register-form-error").addClass("show");
                }
            }
            callback(false);
        }
    });
    return false;
}

function checkPhone(callback) {
    var url = "/fnb/checkphonenumber";
    $.ajax({
        url: url,
        data: {
            phonenumber: phoneNumber
        },
        success: callback,
        error: function (data) {
            callback(false);
        }
    });
}

function sendOTP(callback) {
    var $form = $('form#trialFormFnB');
    var url = "/fnb/sendotp";
    $.ajax({
        url: url,
        type: "post",
        data: {
            phonenumber: phoneNumber
        },
        success: function (data) {
            if (data == true) {
                callback(true);
            } else if (data.error != null && data.error != '') {
                $form.find(".register-form-error").html("<li>" + data.error + "</li>");
                $form.find(".register-form-error").addClass("show");
            }
            callback(false);
        },
        error: function (data) {
            callback(false);
        }
    });
}

function resendOTP(elem) {
    var $form = $('#fnbVerifiedOTP');
    var url = "/fnb/sendotp";

    $form.find('.has-error').html('');
    $(elem).find('svg').show();

    $.ajax({
        url: url,
        type: "post",
        data: {
            phonenumber: phoneNumber
        },
        success: function (data) {
            $(elem).find('svg').hide();
            $form.find('#FnBCode').val('').removeClass('valid');
            if (data.error != null && data.error != '') {
                $form.find('[data-valmsg-for="FnBCode"]').text(data.error).show();
                return false;
            }
            return true;
        },
        error: function (data) {
            $(elem).find('svg').hide();
            $form.find('[data-valmsg-for="FnBCode"]').text("Có lỗi xảy ra khi gửi lại mã OTP. Vui lòng thử lại sau!").show();
            return false;
        }
    });
}

function verifiedOTP(elem) {
    var $form = $('#fnbVerifiedOTP');
    var fnbCode = $form.find('#FnBCode').val();
    var url = "/fnb/verifiedotp";

    $form.find('.invalid').removeClass('invalid');
    $(elem).find('.btn-registration').find('svg').show();

    if (fnbCode == '' || fnbCode == null) {
        $(elem).find('svg').hide();
        $form.find('#FnBCode').parent('.form-group').addClass('invalid');
        $form.find('[data-valmsg-for="FnBCode"]').text('Bạn chưa nhập mã xác minh').show();
        $form.find('#FnBCode').focus();
        return false;
    }

    if (fnbCode != null & fnbCode != '') {
        $.ajax({
            url: url,
            type: "post",
            data: {
                fnbcode: fnbCode,
                phonenumber: phoneNumber
            },
            success: function (data) {
                if (data.error != null && data.error != '') {
                    $form.find('#FnBCode').parent('.form-group').addClass('invalid');
                    $form.find('[data-valmsg-for="FnBCode"]').text(data.error).show();
                    $(elem).find('.btn-registration').find('svg').hide();
                } else {
                    createStore(fnbCode);
                }
                return false;
            },
            error: function (data) {
                $(elem).find('.btn-registration').find('svg').hide();
                $form.find('[data-valmsg-for="FnBCode"]').text("Có lỗi xảy ra. Vui lòng thử lại sau!").show();
                return false;
            }
        });
    } else {
        $(elem).find('.btn-registration').find('svg').hide();
        $form.find('[data-valmsg-for="FnBCode"]').text("Có lỗi xảy ra. Vui lòng thử lại sau!").show();
        return false;
    }
    return false;
}

function createStore(fnbCode) {
    var url = "/fnb/registerfnb";
    var formDataFinal = formData.serializeArray();
    formDataFinal.push({ name: "Otp", value: fnbCode });
    $.ajax({
        url: url,
        type: "post",
        data: formDataFinal,
        success: function (data) {

            if (data.result != null && data.result != '') {
                var urlRedirect = urlFnb + '/admin/authorization/login?phone=' + data.result.Phone + '&token_redirect=' + data.result.TokenRedirect;
                gtag_report_conversion();
                modalCreateStatus('success', urlRedirect);
            } else {
                modalCreateStatus('failed', '');
            }
            return false;
        },
        error: function (data) {
            modalCreateStatus('failed');
            return false;
        }
    });
    return false;
}

function gtag_report_conversion() {
    gtag('event', 'conversion', {
        'send_to': 'AW-529280946/3S49CJPb6eIBELLfsPwB'
    });
    return false;
}