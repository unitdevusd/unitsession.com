if (
    window.location.origin == "http://localhost" ||
    window.location.origin == "http://35.193.152.37" ||
    window.location.origin == "http://192.168.1.25:8080" ||
    window.location.origin == "http://104.197.167.156" ||
    window.location.origin == "http://localhost:8080"
) {
    var IMK_OBJECT = {
        SERVER_URL: "http://imk.dev.imkloud.com/",
        user_id: "D3jYgfnXyodjoN3at",
        group: "tG59dtYCAXj8cd3je",
        siteurl: `${window.location.origin}`,
        env: "dev"
    }
} else {
    var IMK_OBJECT = {
        SERVER_URL: "https://prod.imkloud.com/",
        user_id: "P3nK2yfTnhHkRzcXi",
        group: "5AGoCJRRkGyERkHMZ",
        siteurl: `${window.location.origin}`,
        env: "prod"
    }
}
$(document).ready(function () {
 $(".phoneMask").mask("(999) 999-9999");
    $.validate({
        form: "#Joinwaitlist",
        ignore: [],
        validateHiddenInputs: true,
        onSuccess: function ($form) {
            leadhome(
                "Joinwaitlist",
                "A new lead from IMKCTA.",
                "Please login to IMK Platform to follow-up.",
                "JOIN THE WAITLIST",
                "Joinwaitlist-message"
            );
            return false;
        }
    });
    $.validate({
        form: "#Registernow",
        ignore: [],
        validateHiddenInputs: true,
        onSuccess: function ($form) {
            leadhome(
                "Registernow",
                "A new lead from IMKCTA.",
                "Please login to IMK Platform to follow-up.",
                "Register Now",
                "Registernow-message"
            );
            return false;
        }
    });

});
function leadhome(formId, subject, message, type, alertMsg) {
    var leadData;
    leadData = objectifyForm($("#" + formId).serializeArray());
    if (leadData.contactNumber) {
        leadData.contactNumber = leadData
            .contactNumber
            .replace(/[-() ]+/g, "");
    }
    $("#" + formId + " .theme-btn").prop('disabled', true);
    $.ajax({
        url: IMK_OBJECT.SERVER_URL + "/api/v1/cta/" + IMK_OBJECT.user_id + "/" +
            IMK_OBJECT.group + "?type=" + type + "&isOpportunity=true",
        type: "POST",
        contentType: 'application/x-www-form-urlencoded',
        crossDomain: true,
        data: {
            meta: leadData,
            subject: subject,
            message: message
        },
        success: function (res) {
            console.log(res, 'response');
            $("#" + formId + " .theme-btn").prop('disabled', false);

            if (res.success) {
                console.log('alertMsg',alertMsg);
                $("#" + formId)[0].reset();
                $("#" + alertMsg).removeClass('hidden');
                $("#" + alertMsg).addClass('alert-success');
                $("#" + alertMsg).html("Thank you. We'll get in touch shortly ! ");
                $("#" + formId).addClass("btnenent");
                $("#" + alertMsg)
                    .addClass("alert-success check")
                    .fadeIn()
                    .delay(3000)
                    .fadeOut("slow", function () {
                        
                    });
            } else {
                $("#" + formId)[0].reset();
                $("#" + alertMsg).removeClass('hidden');
                $("#" + alertMsg).addClass('alert-warning');
                $("#" + alertMsg).html('Something goes wrong, please try again.');
            }
        },
        error: function (err) {
            console.log(err, 'error');
            $("#" + formId)[0].reset();
            $("#" + alertMsg).removeClass('hidden');
            $("#" + alertMsg).addClass('alert-warning');
            $("#" + alertMsg).html('Something goes wrong, please try again.');
        }
    });
    return false;
}
function objectifyForm(formArray) {
    returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}