//Newsletter Subscription form to api.cypruscodes.com
function validateForm() {
  var email =
    document.forms["newsletter-subscription"]["newsletter-form-email"].value;
  if (!email) {
    alert("Email must be filled out");
    return false;
  } else {
    $("#form-result2").css("display", "none");
    $('button[type="submit"]').addClass("clicked");
    $("#newsletter-wiki-submit").prop("disabled", true);
    $("#newsletter-wiki-submit").html(
      "<i class='icon-loader fa-spin' > </i> Sending..."
    );

    $.ajax({
      url: "https://api.cypruscodes.com/subscribe",
      method: "POST",
      dataType: "json",
      data: { email: email, channel: "agency" },
      success: function success() {
        $("#form-result2")
          .addClass("alert-success")
          .removeClass("alert-warning alert-danger")
          .css("display", "block");
        $("#form-result2 > .content").html("Email sent successfully!");
      },
      error: function error() {
        $("#form-result2")
          .addClass("alert-danger")
          .removeClass("alert-warning alert-success")
          .css("display", "block");
        $("#form-result2 > .content").html(
          "Unsuccesful attempt. Please try again."
        );
      },
      complete: function () {
        $('button[type="submit"]').removeClass("clicked");
        $("#newsletter-wiki-submit").prop("disabled", false);
        $("#newsletter-wiki-submit").html(
          "<button class='button-mail' type='submit' id='newsletter-wiki-submit'><ion-icon name='mail'></ion-icon></button>"
        );
      },
    });
  }
}
